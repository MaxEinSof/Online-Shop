<template>
  <div class="breadcrumbs" v-if="back">
    <router-link
      :to="back"
      class="text-white"
    >Вернуться к товарам</router-link>
  </div>

  <div
    :class="[
      'card',
      {'text-center': center}
    ]"
  >
    <h1
      :class="[
        'card-title',
        {'text-center': center}
      ]"
    >
      {{ title }}
      <slot name="header"></slot>
    </h1>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Online Shop`
  }
}
</script>
