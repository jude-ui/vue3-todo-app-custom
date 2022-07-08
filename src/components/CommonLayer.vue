<template>
  <div
    class="dimmed_layer"
    @click.self="btnFn2">
    <div class="inner_dimmed_layer">
      <div class="layer_body">
        <strong>{{ titLayer }}</strong>
      </div>
      <div class="layer_foot">
        <button
          class="btn btn_danger"
          @click="btnFn1">
          {{ btnTxt1 }}
        </button>
        <button
          class="btn btn_secondary"
          @click="btnFn2">
          {{ btnTxt2 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      btnFn1: {
        type: Function,
        default: () => 1
      },
      btnFn2: {
        type: Function,
        default: () => 1
      },
      btnTxt1: {
        type: String,
        default: '확인'
      },
      btnTxt2: {
        type: String,
        default: '취소'
      },
      titLayer: {
        type: String,
        default: '레이어 제목'
      }
    }
  }
</script>