<template>
  <app-message/>

  <component
    v-if="layout"
    :is="`${layout}-layout`"
  />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layout/AuthLayout'
import AdminLayout from '@/layout/AdminLayout'
import MainLayout from '@/layout/MainLayout'
import AppMessage from '@/components/ui/AppMessage'
import useRouteQueryMessage from '@/use/route-query-message'

export default {
  setup() {
    const route = useRoute()

    const layout = computed(() => route.meta.layout)

    useRouteQueryMessage()

    return {
      layout
    }
  },
  components: { AuthLayout, AdminLayout, MainLayout, AppMessage }
}
</script>
