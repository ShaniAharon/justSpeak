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
    </div>
    <div class="btn-group">
      <button @click="save" class="btn btn-success">save</button>
      <button @click="goBack" class="btn btn-danger">back</button>
      <button @click="onRecord" class="btn btn-warning">Record</button>
      <button @click.stop="onStop" class="btn btn-danger">Stop</button>
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
        mediaRecorder: null,
        chunks: null,
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
    methods: {
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

          // audio.controls = true
          const blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'})
          this.chunks = []
          const audioURL = window.URL.createObjectURL(blob)
          audio.src = audioURL // need this url to create the audio
          this.taskToEdit.audioSrc = audioURL
          console.log('this.taskToEdit', this.taskToEdit)
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
      onStop() {
        if (!this.mediaRecorder) return
        this.mediaRecorder.stop()
        console.log(this.mediaRecorder.state)
        console.log('recorder stopped')
        // record.style.background = "";
        // record.style.color = "";
        // this.mediaRecorder.requestData()

        // stop.disabled = true;
        // record.disabled = false;
      },
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
