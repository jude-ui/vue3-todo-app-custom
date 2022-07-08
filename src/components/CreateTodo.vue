<template>
  <div class="create_todo">
    <input
      type="text"
      class="form_ctrl"
      v-model.trim="title"
      @keyup.enter="createTodo()" />
    <button
      class="btn btn_primary"
      @click="createTodo">
      Todo 등록
    </button>
  </div>
</template>

<script>
  import shortid from 'shortid'
  import moment from 'moment'
  import { mapState, mapMutations } from 'vuex'
  

  export default {
    data() {
      return {
        title: '',
      }
    },
    computed: {
      ...mapState([
        'isListRecent'
      ])
    },
    methods: {
      ...mapMutations([
        'deleteTodos',
        'addTodos',
        'saveStorage',
      ]),
      createTodo() {
        if (!this.title) return

        const todo = {
          id: shortid.generate(),
          title: this.title,
          isDone: false,
          time: moment().format('YYYY.MM.DD a h:mm:ss')
        }
        this.isListRecent ? this.deleteTodos(todo) : this.addTodos(todo)
        this.saveStorage()  // 로컬 스토리지 반영

        this.title = ''
      }
    }
  }
</script>