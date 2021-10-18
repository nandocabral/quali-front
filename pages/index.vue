<template>
  <main class="container mx-auto mt-24">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mb-12">
      <div class="rounded-t px-4 py-3">
        <form accept-charset="utf-8" class="flex flex-col md:flex-row items-center justify-center"  @submit.prevent="onSubmit">
          <input id="title" v-model="model.title" name="title" required type="text" class="flex-1 border py-3 px-2 m-2">
          <textarea id="description" v-model="model.description" name="description" required type="text" class="w-full flex-1 border m-2 py-3 px-2" ></textarea>
          <button type="submit" class="px-4 py-3 hover:bg-green-500 bg-green-700 text-white rounded">Add new Todo</button>
        </form>
      </div>
    </div>

    <div class="my-4 bg-white p-4">
      <input v-model="search" type="text" class="w-full bg-white px-4 py-3 border" placeholder="Search here...">
    </div>

    <div class="block w-full">

    <div v-if="filtered.length === 0">
      <transition-group name="show">
        <content-todo v-for="todo, key in todos" :key="`row_${key}`" :todo="todo" @show="showTodo" @delete="deleteData" @update="updateData" />
        <!-- <div v-for="todo, key in todos" :key="`row_${key}`" class="bg-white p-4 shadow hover:shadow-lg transition duration-300 ease-in-out my-4 mx-2" :class="{'bg-gray-300 line-through': todo.completed === true}">
          <div class="flex flex-col relative">
            <nuxt-link class="border-t-0 mb-2 flex-1 text-left text-2xl text-gray-700 font-bold" :to="{ path:'/detail', query: { id: todo.id } }">
              {{todo.title}}
            </nuxt-link>
            <p class="border-t-0 flex-1 text-base">
              {{todo.description}}
            </p>
            <button class="text-sm text-red-600 ont-semibold text-left mt-2" @click="deleteData(todo.id)">Delete Todo</button>
            <div class="flex-1 md:absolute right-0 bottom-0 relative">
              <button class="px-4 py-2 rounded text-sm bg-blue-600 text-white" :disabled="todo.completed === true" @click="udpateData(todo.id)">{{ todo.completed === true ? 'Completed' : 'Complete Todo' }}</button>
            </div>
          </div>
        </div> -->
      </transition-group>
    </div>
    <div v-else>
      <transition-group name="show">
        <content-todo v-for="todo, key in filtered" :key="`row_${key}`" :todo="todo" @show="showTodo" @delete="deleteData" @update="updateData" />
      </transition-group>
    </div>

    </div>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
const ContentTodo = () => import('~/components/ContentTodo')
export default {
  components: {
    ContentTodo
  },
  data() {
    return {
      model: {
        title: '',
        description: ''
      },
      search: ''
    }
  },
  computed: {
    todos() {
      return this.$store.getters.getData('data')
    },
    detail() {
      return this.$store.getters.getData('detail')
    },
    filtered() {
      return this.$store.getters.getData('filters')
    },
  },
  watch: {
    search: {
      immediate: true,
      handler (value) {
        this.searchByTitle(value)
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      'fetchData': 'getDataByApi',
      'sendData': 'saveDataToApi',
      'deleteData': 'deleteDataFromApi',
      'updateData': 'updateCompleteDataToApi',
    }),
    ...mapMutations({
      'searchByTitle': 'searchByTitle',
    }),
    showTodo(id) {
      this.$router.push({ path:'/detail', query: { id } })
    },
    onSubmit(e) {
      try {
        const model = Object.assign({}, this.model)
        this.sendData(model)
        for (const key in this.model) {
          this.model[key] = ''
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
