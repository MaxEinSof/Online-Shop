import { ref } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

export default function useLeaveGuard(hasChanges) {
  const router = useRouter()
  const leaveConfirm = ref(false)
  const canLeave = ref(false)
  const leaveTo = ref('')

  function navigate() {
    leaveConfirm.value = false
    canLeave.value = true
    router.push(leaveTo.value)
  }

  onBeforeRouteLeave(to => {
    leaveTo.value = to.path

    if (canLeave.value) {
      return true
    }

    if (hasChanges.value) {
      leaveConfirm.value = true
      return false
    }

    return true
  })

  return {
    leaveConfirm,
    navigate
  }
}
