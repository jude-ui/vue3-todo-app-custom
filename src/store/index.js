import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    todos: [],
    isListRecent: true
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
    deleteTodoItem(state, { id }) {
      state.todos = state.todos.filter(t => t.id !== id)
    },
    unshiftTodos(state, payload) {
      state.todos.unshift(payload)
    },
    pushTodos(state, payload) {
      state.todos.push(payload)
    },
    reverseTodos(state) {
      state.todos.reverse()
    },
    saveStorage(state) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
      localStorage.setItem('isListRecent', JSON.stringify(state.isListRecent))
    },
    initStorage() {
      localStorage.setItem('todos', JSON.stringify([]))
      localStorage.setItem('isListRecent', JSON.stringify(true))
    }
  }
})