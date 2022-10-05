<template>
  <section class="task-details gap-2" v-if="task">
    <h1>Todo Details</h1>
    <div class="inner-txt flex-col">
      <p>
        <span class="fw-bold clr-teal uppercase">id: </span>
        {{ task._id }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">title: </span>
        {{ task.title }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">Description: </span>
        {{ task.description }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">importance: </span>
        {{ task.importance }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">Status: </span>
        {{ task.status }}
      </p>
      <audio v-if="audioURL" controls :src="audioURL"></audio>
    </div>
    <button @click="goBack" class="btn btn-warning">go back</button>
  </section>
</template>

<script>
  export default {
    name: 'TaskDetails',
    components: {},
    data() {
      return {
        task: null,
        audioURL: null,
      }
    },
    created() {
      this.loadTask()
    },
    methods: {
      async loadTask() {
        const task = await this.$store.dispatch({
          type: 'getTaskById',
          taskId: this.taskId,
        })
        this.task = task
        if (!this.task?.audioSrc) return
        //TODO: change audioSrc to audioBase64 or something
        const binary = this.convertDataURIToBinary(this.task.audioSrc)
        console.log('binary', binary)
        const blob = new Blob([binary], {type: 'audio/ogg; codecs=opus'})
        this.audioURL = window.URL.createObjectURL(blob)
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
      goBack() {
        this.$router.push('/')
      },
    },
    computed: {
      taskId() {
        return this.$route.params.taskId
      },
    },
    unmounted() {},
  }
</script>
