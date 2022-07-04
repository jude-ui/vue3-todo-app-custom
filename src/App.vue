<template>
  <div class="container">
    <h1 class="tit_todo">
      Todo List
    </h1>
    <CreateTodo />
    
    <div
      v-if="todos.length"
      class="info_setting">
      <button 
        type="button" 
        class="btn btn_danger btn_init"
        @click="checkInit">
        전체 삭제<span
          class="material-icons-outlined ico_delete"
          aria-hidden="true">delete</span>
      </button>
      <CommonLayer
        v-if="isLayerOn"
        tit-layer="Todo 목록을 모두 초기화 시키겠습니까?"
        :btn-fn1="initTodos"
        :btn-fn2="cancelInit" />
      <ListOrderSetting />
    </div>
    <!-- // info_setting -->
    
    <ul
      class="list_todo"
      ref="listTodos">
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo" />
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CreateTodo from '~/components/CreateTodo'
import ListOrderSetting from '~/components/ListOrderSetting'
import Todo from '~/components/Todo'
import CommonLayer from '~/components/CommonLayer'
import Sortable from 'sortablejs'

export default {
  components: {
    Todo,
    CreateTodo,
    ListOrderSetting,
    CommonLayer
  },
  data() {
    return {
      isLayerOn: false,
      sortableLists: null
    }
  },
  computed: {
    ...mapState([
      'todos',
      'isListRecent'
    ])
  },
  methods: {
    ...mapMutations([
      'updateState',
      'reverseTodos',
      'saveStorage',
      'initStorage',
      'todosOrder'
    ]),
    checkInit() {
      this.isLayerOn = true
    },
    initTodos() {
      this.updateState({ todos: [] })
      this.initStorage()
      this.isLayerOn = false
    },
    cancelInit() {
      console.log('cancelInit');
      this.isLayerOn = false
    }
  },
  created() {
    // 새로고침시 로컬 스토리지 todos를 화면에 반영
    const storageTodos = localStorage.getItem('todos')
    if (storageTodos) {
      this.updateState({ todos: JSON.parse(storageTodos) })
    }

    // 새로고침시 기존 정렬이 과거순이라면 다시 최신순으로 화면에 반영
    const storageOrderRecent = localStorage.getItem('isListRecent')
    if (!JSON.parse(storageOrderRecent)) {
      // 과거순일 경우
      this.updateState({ isListRecent: true })
      this.reverseTodos() // 과거순인 todos 목록을 최신순으로 변경
      this.saveStorage() // 로컬 스토리지도 최신순으로 반영
    }
  },
  mounted() {
    const self = this
    this.sortableLists = new Sortable(this.$refs.listTodos, {
      group: 'Todo Lists',
      handle: '.list_todo .btn_move',
      delay: 50,
      animation: 0,
      forceFallback: true,
      onEnd: function (e) {
        self.todosOrder({
          oldIndex: e.oldIndex,
          newIndex: e.newIndex
        })
      }
    })
  }
}
</script>