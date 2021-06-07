<template>
  <div
    :class="['alert', message.type]"
    v-if="message"
  >
    <p
      class="alert-title"
      v-if="title"
    > {{ title }} </p>

    <p> {{ message.value }} </p>

    <span
      class="alert-close"
      @click="close"
    >&times;</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const titleMap = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }

    const message = computed(() => store.getters['message/message'])
    const title = computed(() => message.value ? titleMap[message.value.type] : null)

    function close() {
      store.commit('message/clearMessage')
    }

    return { message, title, close }
  }
}
</script>
