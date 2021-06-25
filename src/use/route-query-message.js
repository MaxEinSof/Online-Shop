import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import getErrorMessage from '@/utils/get-error-message'

export default function useRouteQueryMessage() {
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const message = computed(() => route.query.message)

  watch(message, value => {
    if (value) {
      const query = Object.assign({}, route.query)
      delete query.message
      router.replace({ query })

      store.dispatch('message/setMessage', {
        type: 'warning',
        value: getErrorMessage(value)
      })
    }
  })
}
