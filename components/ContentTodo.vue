<template>
  <div class="bg-white p-4 shadow hover:shadow-lg transition duration-300 ease-in-out my-4 mx-2" :class="{'bg-gray-300 line-through': todo.completed === true}">
    <div class="flex flex-col relative">
      <button class="border-t-0 mb-2 flex-1 text-left text-2xl text-gray-700 font-bold" @click="$emit('show', todo.id)">
        {{todo.title}}
      </button>
      <p class="border-t-0 flex-1 text-base">
        {{todo.description}}
      </p>
      <button class="text-sm text-red-600 ont-semibold text-left mt-2" @click="$emit('delete', todo.id)">Delete Todo</button>
      <div class="flex-1 md:absolute right-0 bottom-0 relative">
        <button class="px-4 py-2 rounded text-sm bg-blue-600 text-white" :disabled="todo.completed === true" @click="$emit('update', todo.id)">{{ todo.completed === true ? 'Completed' : 'Complete Todo' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>
