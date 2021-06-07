<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Удалить</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(category, index) in categories"
      :key="category.id"
    >
      <td> {{ index + 1 }} </td>
      <td> {{ category.title }} </td>
      <td> {{ category.type }} </td>
      <td>
        <button
          class="btn danger"
          @click="confirm = true, id = category.id"
        >&#10060;</button>
      </td>
    </tr>
    </tbody>
  </table>

  <teleport to="body">
    <app-confirm
      v-if="confirm"
      title="Вы уверены, что хотите удалить категорию?"
      @confirm="removeCategory()"
      @reject="confirm = false"
    />
  </teleport>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const confirm = ref(false)
    const id = ref(null)

    async function removeCategory() {
      confirm.value = false
      await store.dispatch('categories/removeCategory', id.value)
    }

    return {
      confirm,
      id,
      removeCategory
    }
  },
  components: { AppConfirm }
}
</script>
