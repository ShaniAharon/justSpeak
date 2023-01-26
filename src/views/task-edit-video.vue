<template>
  <section v-if="taskToEdit" class="task-edit">
    <h1>{{ taskToEdit._id ? 'Edit' : 'Add' }} Task</h1>
    <div>
      <div class="form-control">
        <label for="title" class="form-label"> Title </label>
        <input
          v-model="taskToEdit.title"
          id="title"
          class="form-input"
          type="text"
        />
      </div>
      <div class="form-control">
        <label for="description" class="form-label"> Description </label>
        <textarea
          v-model="taskToEdit.description"
          class="form-input"
          type="text"
          id="description"
        />
      </div>
      <div class="form-control">
        <label for="importance" class="form-label"> Importance </label>
        <input
          max="3"
          min="1"
          v-model="taskToEdit.importance"
          class="form-input"
          type="number"
          id="importance"
        />
      </div>
      <div class="form-control">
        <label for="status" class="form-label"> Status </label>
        <select
          id="status"
          name="status"
          v-model="taskToEdit.status"
          class="form-input"
        >
          <option>open</option>
          <option>in progress</option>
          <option>done</option>
        </select>
      </div>
      <section ref="soundClips" class="sound-clips"></section>
      <div class="left">
        <div id="startButton" class="button">Start Recording</div>
        <h2>Preview</h2>
        <video
          ref="previewVideo"
          id="preview"
          width="160"
          height="120"
          autoplay
          muted
        ></video>
      </div>

      <div class="right">
        <div id="stopButton" class="button">Stop Recording</div>
        <h2>Recording</h2>
        <video
          ref="recordingVideo"
          id="recording"
          width="160"
          height="120"
          controls
        ></video>
      </div>
    </div>
    <div class="btn-group">
      <button @click="save" class="btn btn-success">save</button>
      <button @click="goBack" class="btn btn-danger">back</button>
      <button @click="onStart" class="btn btn-warning">Record</button>
      <button @click="onStopRec" class="btn btn-danger">Stop</button>
    </div>
  </section>
</template>

<script>
  import {taskService} from '../services/task.service.js'

  export default {
    name: 'TaskEdit',
    components: {},
    data() {
      return {
        taskToEdit: null,
        chunks: null,
        recorder: null,
      }
    },
    async created() {
      const taskId = this.taskId
      if (taskId) {
        const task = await this.$store.dispatch({
          type: 'getTaskById',
          taskId,
        })
        this.taskToEdit = task
      } else {
        this.taskToEdit = taskService.getEmptyTask()
      }
      this.chunks = []
      this.createMedia()
    },
    mounted() {
      this.preview = this.$refs.previewVideo
      this.recording = this.$refs.recordingVideo
      console.log('this.preview', this.preview)
      console.log('this.recording', this.recording)
    },
    methods: {
      wait(delayInMS) {
        return new Promise((resolve) => setTimeout(resolve, delayInMS))
      },
      async startRecording(stream) {
        console.log('stream', stream)
        this.recorder = new MediaRecorder(stream)
        let data = []

        this.recorder.ondataavailable = (event) => data.push(event.data)
        this.recorder.start()

        let stopped = new Promise((resolve, reject) => {
          this.recorder.onstop = resolve
          this.recorder.onerror = (event) => reject(event.name)
        })

        return Promise.all([stopped]).then(() => data) //stopped.then(() => data).catch((e) => console.log(e))
      },
      stop(stream) {
        stream.getTracks().forEach((track) => track.stop())
        console.log('stop')
        this.recorder.stop()
      },
      onStopRec() {
        console.log('this.preview.srcObject', this.preview.srcObject)
        this.stop(this.preview.srcObject)
      },
      onStart() {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            this.preview.srcObject = stream
            this.preview.captureStream =
              this.preview.captureStream || this.preview.mozCaptureStream
            return new Promise((resolve) => (this.preview.onplaying = resolve))
          })
          .then(() => this.startRecording(this.preview.captureStream()))
          .then((recordedChunks) => {
            console.log('recordedChunks', recordedChunks)
            console.log('here')
            //test transfer to base64
            async function fileToBase64(file) {
              return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.onerror = reject
                reader.onload = (e) => resolve(e.target.result)
                reader.readAsDataURL(file)
              })
            }
            let recordedBlob = new Blob(recordedChunks, {type: 'video/webm'})
            fileToBase64(recordedBlob).then((res) => {
              console.log(res)
              this.taskToEdit.videoSrc = res
            })
            this.recording.src = URL.createObjectURL(recordedBlob)
            // console.log('this.recording', this.recording)
          })
          .catch((error) => {
            if (error.name === 'NotFoundError') {
              console.log("Camera or microphone not found. Can't record.")
            } else {
              console.log(error)
            }
          })
      },
      convertDataURIToBinary(dataURI) {
        var BASE64_MARKER = ';base64,'
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
        var base64 = dataURI.substring(base64Index)
        var raw = window.atob(base64)
        var rawLength = raw.length
        var array = new Uint8Array(new ArrayBuffer(rawLength))

        for (let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i)
        }
        return array
      },
      async save() {
        await this.$store.dispatch({
          type: 'saveTask',
          task: this.taskToEdit,
        })
        this.$router.push('/')
      },
      goBack() {
        this.$router.push('/')
      },
      createMedia() {
        const constraints = {audio: true}
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(this.onSuccess, this.onError)
      },
      onSuccess(stream) {
        this.mediaRecorder = new MediaRecorder(stream)
        //TODO: change the append childs and dom capturing to vue setup ref and stuff
        this.mediaRecorder.onstop = (e) => {
          console.log('data available after MediaRecorder.stop() called.')

          const clipName = prompt(
            'Enter a name for your sound clip?',
            'My unnamed clip'
          )

          const clipContainer = document.createElement('article')
          const clipLabel = document.createElement('p')
          const audio = document.createElement('audio')
          const deleteButton = document.createElement('button')

          clipContainer.classList.add('clip')
          // audio.setAttribute('controls', '')
          audio.controls = true
          deleteButton.textContent = 'Delete'
          deleteButton.className = 'delete'

          if (clipName === null) {
            clipLabel.textContent = 'My unnamed clip'
          } else {
            clipLabel.textContent = clipName
          }

          clipContainer.appendChild(audio)
          clipContainer.appendChild(clipLabel)
          clipContainer.appendChild(deleteButton)
          this.$refs.soundClips.appendChild(clipContainer)

          //test transfer to base64
          async function audioToBase64(audioFile) {
            return new Promise((resolve, reject) => {
              let reader = new FileReader()
              reader.onerror = reject
              reader.onload = (e) => resolve(e.target.result)
              reader.readAsDataURL(audioFile)
            })
          }
          //creating an audio file then convert it to base64 , save it in the server
          //then in details cmp turn the base64 into binary and convert it to audio file
          //then create audio url that will use in the src of the audio element
          const blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'})
          audioToBase64(blob).then((res) => {
            console.log(res)
            this.taskToEdit.audioSrc = res
          })
          this.chunks = []
          const audioURL = window.URL.createObjectURL(blob)
          audio.src = audioURL // need this url to create the audio
          console.log('recorder stopped')

          deleteButton.onclick = function (e) {
            e.target.closest('.clip').remove()
          }
        }
        this.mediaRecorder.ondataavailable = (e) => {
          console.log('this.chunks', this.chunks)
          this.chunks.push(e.data)
        }
      },
      onRecord() {
        if (!this.mediaRecorder) return
        this.mediaRecorder.start()
        console.log(this.mediaRecorder.state)
        console.log('recorder started')
        console.log('document', document)
        // record.style.background = "red";
        // stop.disabled = false;
        // record.disabled = true;
      },
      // onStop() {
      //   if (!this.mediaRecorder) return
      //   this.mediaRecorder.stop()
      //   console.log(this.mediaRecorder.state)
      //   console.log('recorder stopped')
      //   // record.style.background = "";
      //   // record.style.color = "";
      //   // this.mediaRecorder.requestData()

      //   // stop.disabled = true;
      //   // record.disabled = false;
      // },
      onError(err) {
        console.log('The following error occured: ' + err)
      },
    },
    computed: {
      formTitle() {
        return this.taskId ? 'Edit task' : 'Add task'
      },
      taskId() {
        return this.$route.params.taskId
      },
    },
    unmounted() {},
  }
</script>

<style>
  .main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
</style>
