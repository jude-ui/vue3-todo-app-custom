<template>
  <li>
    <div
      v-if="isEditMode"
      class="mode_edit">
      <input
        class="form_ctrl"
        type="text"
        :value="title"
        @input="title = $event.target.value"
        @keyup.enter="updateTodo()" />
      <div class="group_btn_m">
        <button
          type="button"
          @click="updateTodo"
          class="material-icons-outlined"
          aria-label="OK">
          check_circle
        </button>
        <button
          type="button"
          @click="offEditMode"
          class="material-icons-outlined">
          cancel
        </button>
      </div>
      <div class="group_btn_pc">
        <button 
          class="btn btn_primary"
          @click="updateTodo">
          OK
        </button>
        <button
          class="btn btn_secondary"
          @click="offEditMode">
          Cancel
        </button>
      </div>
    </div>
    <div
      v-else
      class="mode_normal">
      <div
        class="txt_info"
        :class="{item_done: todo.isDone}">
        <button
          type="button"
          class="material-icons-outlined btn_move"
          aria-label="순서 이동 버튼">
          dehaze
        </button>
        <div class="group_check">
          <input
            title="할일 선택"
            :id="checkId"
            type="checkbox"
            v-model="checked"
            @click="selectTodo"
            class="inp_check" />
          <label
            class="lab_check"
            :for="checkId">
            <span class="screen_out">선택</span>
            <div
              class="material-icons-outlined ico_check"
              aria-hidden="true">
              {{ txtCheckBox }}
            </div>
          </label>
        </div>
        <div class="group_check">
          <input
            title="할일 완료"
            :id="todo.id"
            type="checkbox"
            class="inp_check"
            :checked="todo.isDone"
            @click="updateTodoDone" />
          <label
            class="lab_check"
            :for="todo.id">
            <span class="screen_out">완료</span>
            <div
              class="material-icons ico_check"
              aria-hidden="true">
              done
            </div>
          </label>
        </div>
        <div class="txt_todo">
          <span class="todo_txt">{{ todo.title }}</span>
          <span class="txt_date">{{ todo.time }}</span>
        </div>
        <div class="txt_more">
          {{ todo.title }}
        </div>
      </div>
      <div class="group_btn_m">
        <button
          type="button"
          @click="onEditMode"
          class="material-icons-outlined">
          edit
        </button>
        <button
          type="button"
          @click="onDeleteTodoLayer"
          class="material-icons-outlined">
          delete
        </button>
      </div>
      <div class="group_btn_pc">
        <button
          class="btn btn_secondary"
          @click="onEditMode">
          Edit
        </button>
        <button
          class="btn btn_danger"
          @click="onDeleteTodoLayer">
          Delete
        </button>
      </div>
    </div>

    <CommonLayer
      v-if="isLayerOn"
      tit-layer="삭제하시겠습니까?"
      :btn-fn1="deleteTodo"
      :btn-fn2="cancelDelete" />
  </li>
</template>

<script>
  import moment from 'moment'
  import { mapMutations, mapState } from 'vuex'
  import CommonLayer from '~/components/CommonLayer'

  export default {
    components: {
      CommonLayer
    },
    data() {
      return {
        isEditMode: false,
        title: '',
        isLayerOn: false,
        checked: false,
        checkId: 'select_'+ this.todo.id
      }
    },
    props: {
      todo: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapState([
        'selectedTodoItem'
      ]),
      txtCheckBox() {
        return this.checked ? 'check_box' : 'check_box_outline_blank'
      }
    },
    methods: {
      ...mapMutations([
        'saveStorage',
        'updateState',
        'updateTodoItem',
        'deleteTodoItem',
        'addSelectedTodoItem'
      ]),
      selectTodo() {
        if (this.checked) {
          console.log('체크 해제됨');
          this.updateState({
            selectedTodoItem: this.selectedTodoItem.filter(t => t !== this.todo.id)
          })
        } else {
          console.log('체크됨');
          this.addSelectedTodoItem(this.todo.id)
        }
      },
      onEditMode() {
        // input에 todo 데이터 반영하여 수정 상태 on
        this.title = this.todo.title
        this.isEditMode = true
      },
      offEditMode() {
        this.isEditMode = false
      },

      // update
      updateTodo() {
        // 빈 문자열로 수정할 경우 목록에서 삭제
        if (!this.title.trim()) {
          this.deleteTodoItem(this.todo)
          this.saveStorage() // 로컬 스토리지 반영
          return
        }
        
        this.updateTime() // 시간 업데이트
        this.updateTodoItem({ // store 반영
          id: this.todo.id,
          title: this.title.trim()
        })
        this.saveStorage() // 로컬 스토리지 반영
        this.offEditMode()
      },
      updateTime() {
        // 수정 시각 업데이트 및 (수정됨) 문구 추가
        if (this.todo.title !== this.title.trim()) { // 스토어의 title과 입력한 title.trim()이 다르다면
          this.updateTodoItem({
            id: this.todo.id,
            time: moment().format('YYYY.MM.DD a h:mm:ss') + ' (수정됨)'
          })
        }
      },
      updateTodoDone() {
        this.updateTodoItem({
          id: this.todo.id,
          isDone: !this.todo.isDone
        })
        this.updateTime() // 시간 업데이트
        this.saveStorage() // 로컬 스토리지 반영
      },
      onDeleteTodoLayer() {
        this.isLayerOn = true
      },
      cancelDelete() {
        this.isLayerOn = false
      },
      // delete
      deleteTodo() {
        this.deleteTodoItem(this.todo)
        this.isLayerOn = false // 레이어 닫기
        this.saveStorage() // 로컬 스토리지 반영
      }
    }
  }
</script>