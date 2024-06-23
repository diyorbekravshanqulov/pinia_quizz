<template>
  <div class="container">
    <h1 class="text-3xl text-center font-semibold my-5">Pinia</h1>
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-semibold my-5">Quizzes</h2>
      <router-link to="/create-quizz">
        Create quizz
      </router-link>
    </div>

    <div v-for="quizz in piniaStore.quizzes" :key="quizz.id">
      <router-link :to="{ name: 'quizz-detail', params: { id: quizz.id } }">
        <div class="bg-gray-200 p-5 rounded my-4 flex items-center justify-between">
          <h2 class="text-xl">{{ quizz.theme }}</h2>
          <button @click="deleteQuizz(quizz.id)" class="text-red-600 hover:text-red-900">Delete</button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { usePiniaStore } from '../store/pinia';
import { useRouter } from 'vue-router';

const piniaStore = usePiniaStore();
const router = useRouter();

const deleteQuizz = (quizzId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
  if (confirmDelete) {
    // console.log(quizzId);
    piniaStore.deleteQuizz(quizzId);
    router.push('/pinia')
  }
};
</script>
