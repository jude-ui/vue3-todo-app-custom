<template>
  <div
    class="group_opt"
    :class="{opt_open: isOptOpen}">
    <!-- opt_open 으로 제어 -->
    <a
      href="#none"
      class="link_opt"
      @click="isOptOpen = !isOptOpen">
      {{ isListRecent ? '최신순' : '과거순' }}
      <span
        class="material-icons-outlined ico_arr"
        aria-hidden="true">
        expand_more
      </span>
    </a>
    <ul class="list_opt">
      <li>
        <a
          href="#none"
          :class="{on: isListRecent}"
          @click.prevent="updateListOrder('최신순')">
          최신순
        </a>
      </li><!-- 선택시 on -->
      <li>
        <a
          href="#none"
          :class="{on: !isListRecent}"
          @click.prevent="updateListOrder('과거순')">
          과거순
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
        isOptOpen: false
      }
    },
    computed: {
      ...mapState([
        'isListRecent'
      ]),
      ...mapGetters([
        'txtCurrentSort'
      ])
    },
    methods: {
      ...mapMutations([
        'updateState',
        'reverseTodos',
        'initStorage',
        'saveStorage'
      ]),
      updateListOrder(str) {
        this.isOptOpen = false
        if((str === '최신순' && this.isListRecent) ||
           (str === '과거순' && !this.isListRecent)) return

        this.isListRecent
          ? this.updateState({isListRecent: false})
          : this.updateState({isListRecent: true})
        
        this.reverseTodos()
        this.initStorage() // 로컬 스토리지의 store 데이터 초기화
        this.saveStorage() // 로컬 스토리지에 store 데이터 반영
      }
    }
  }
</script>