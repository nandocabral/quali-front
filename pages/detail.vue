<template>
  <main class="container mx-auto mt-24">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mb-12">
      <div class="rounded-t px-4 py-3">
        <p class="text-sm">Date creation: <b>{{data.createdAt}}</b></p>
        <form accept-charset="utf-8" class="flex flex-col items-center justify-center"  @submit.prevent="onSubmit">
          <input id="title" v-model="data.title" name="title" required type="text" class="flex-1 border py-3 px-2 m-2 w-full">
          <textarea id="description" v-model="data.description" name="description" required type="text" class="w-full flex-1 border m-2 py-3 px-2" ></textarea>
          <div class="my-2 px-3 py-1" :class="data.completed === true ? 'bg-green-300' : 'bg-red-300'">{{data.completed === true ? 'Completed' : 'Not completed'}}</div>
          <button type="submit" class="px-4 py-3 hover:bg-green-500 bg-green-700 text-white rounded">Edit todo</button>
          <nuxt-link type="button" class="mt-4" to="/">Cancel</nuxt-link>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  async asyncData({query, redirect, error}) {
    const {id} = query
    if (!id) {
      redirect('/')
    }
    try {
      const { data } = await axios.get(`http://localhost:4000/api/todos/${id}`)
      return {data}
    } catch (err) {
      error({ statusCode: 404, message: "Post not found" });
    }
  },
  methods: {
    ...mapActions({
      'updateData': 'updateModelDataFromApi',
    }),
    onSubmit() {
      const {title, description, complete, id} = this.data
      const payload = {
        title,
        description,
        complete,
      }
      this.updateData({payload, id})
      this.$router.push('/')
    }
  }
}
</script>
