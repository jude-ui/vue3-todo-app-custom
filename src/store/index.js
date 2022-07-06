import { createStore } from 'vuex'
import _cloneDeep from 'lodash/cloneDeep'

export default createStore({
  state: () => ({
    todos: [],
    isListRecent: true,
    selectedTodoItem: []
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateTodoItem(state, payload){
      state.todos.forEach(todo => {
        if (todo.id === payload.id) {
          Object.keys(payload).forEach(key => {
            if(key !== 'id') {
              todo[key] = payload[key]
            }
          })
        }
      })
    },
    addSelectedTodoItem(state, payload) {
      state.selectedTodoItem.push(payload)
    },
    deleteTodoItem(state, { id }) {
      state.todos = state.todos.filter(t => t.id !== id)
    },
    deleteTodos(state, payload) {
      state.todos.unshift(payload)
    },
    addTodos(state, payload) {
      state.todos.push(payload)
    },
    reverseTodos(state) {
      state.todos.reverse()
    },
    saveStorage(state) {
      // console.log('save')
      localStorage.setItem('todos', JSON.stringify(state.todos))
      localStorage.setItem('isListRecent', JSON.stringify(state.isListRecent))
    },
    initStorage() {
      localStorage.setItem('todos', JSON.stringify([]))
      localStorage.setItem('isListRecent', JSON.stringify(true))
    },
    todosOrder(state, payload) {
      const { oldIndex, newIndex } = payload
      const clone = _cloneDeep(state.todos[oldIndex])
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
      this.commit('saveStorage')
    }
  }
})