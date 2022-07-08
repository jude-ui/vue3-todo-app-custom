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
        @click="checkDeleteAllTodo">
        전체 삭제
        <span
          class="material-icons-outlined ico_delete"
          aria-hidden="true">delete</span>
      </button>
      <CommonLayer
        v-if="isDeleteAllLayer"
        @btnFn1="deleteAllTodo"
        @btnFn2="cancelDeleteAllTodo">
        Todo 목록을 모두 삭제하겠습니까?
      </CommonLayer>
      <button
        @click="orderEdit"
        type="button"
        class="btn btn_primary btn_order_change">
        순서 변경
        <span
          class="material-icons-outlined ico_change"
          aria-hidden="true">swap_vert</span>
      </button>
      <button
        @click="checkDeleteSelectedTodo"
        type="button"
        class="btn btn_primary btn_order_change">
        선택 삭제
        <span
          class="material-icons-outlined ico_delete"
          aria-hidden="true">delete</span>
      </button>

      <CommonLayer
        v-if="isDeleteSelectedLayer"
        @btnFn1="deleteSelectedTodo"
        @btnFn2="cancelDeleteSelectedTodo">
        선택한 Todo 목록을 모두 삭제하겠습니까?
      </CommonLayer>
      <ListOrderSetting />
    </div>
    <!-- // info_setting -->
    
    <ul
      class="list_todo"
      :class="{ active: todos.length, 'edit_on': isOrderEdit}"
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
      isDeleteAllLayer: false,
      sortableLists: null,
      isOrderEdit: false,
      isDeleteSelectedLayer: false
    }
  },
  computed: {
    ...mapState([
      'todos',
      'isListRecent',
      'selectedTodoItem'
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
    // 모두 삭제 확인 팝업 open
    checkDeleteAllTodo() {
      this.isDeleteAllLayer = true
    },
    // 모두 삭제 확인 팝업 닫기
    cancelDeleteAllTodo() {
      this.isDeleteAllLayer = false
    },
    // 모두 삭제 기능
    deleteAllTodo() {
      this.updateState({ todos: [] })
      this.initStorage()
      this.isDeleteAllLayer = false
      this.isOrderEdit = false // todo 모두 삭제시 순서 변경 모드 off
    },
    // 순서 변경 모드 on/off
    orderEdit() {
      this.isOrderEdit = !this.isOrderEdit
    },
    // 선택 삭제 확인 팝업 open
    checkDeleteSelectedTodo() {
      if (!this.selectedTodoItem.length) return // 선택된 todo 없을 경우 레이어 작동 X
      this.isDeleteSelectedLayer = true
    },
    // 선택 삭제 확인 팝업 닫기
    cancelDeleteSelectedTodo() {
      this.isDeleteSelectedLayer = false
    },
    // 선택 삭제 기능
    deleteSelectedTodo() {
      this.updateState({
        todos: this.todos.filter(t => {
          return !this.selectedTodoItem.includes(t.id)
        })
      })
      this.saveStorage() // 로컬 스토리지 반영
      this.updateState({selectedTodoItem: []}) // 선택된 todo 정보의 배열 초기화
      this.isDeleteSelectedLayer = false
    },
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
    // 순서 변경 기능
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