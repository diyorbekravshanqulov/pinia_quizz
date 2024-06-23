<template>
  <div class="container my-10">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-semibold my-5">Create Quizz</h1>
      <router-link to="/pinia" class="text-xl">back</router-link>
    </div>
    <div>
      <input
        v-model="newQuizz.theme"
        class="border py-3 px-5 rounded w-full focus:outline-none text-2xl focus:border-primary"
        type="text"
        placeholder="theme..."
      />

      <div
        class="mt-3 border border-primary px-5 pb-5 pt-2"
        v-for="question in newQuizz.questions"
        :key="question.id"
      >
        <div class="flex justify-end items-center mb-5">
          <button
            v-if="newQuizz.questions.length > 1"
            @click="removeQuestion(question.id)"
            class="hover:text-black duration-300 text-3xl text-gray-400"
          >
            &times;
          </button>
        </div>
        <input
          v-model="question.question"
          class="border py-3 px-5 rounded w-full focus:outline-none text-2xl focus:border-primary"
          type="text"
          placeholder="question..."
        />

        <div class="mt-3" v-for="answer in question.options" :key="answer.id">
          <div
            class="inline-flex gap-4 items-center cursor-pointer text-xl flex-row-reverse"
          >
            <button
              @click="removeOption(question.id, answer.id)"
              v-if="question.options.length > 2"
              class="text-white px-5 py-3 rounded bg-red-300"
            >
              remove
            </button>
            <input
              v-model="answer.text"
              class="border py-3 px-5 rounded w-full focus:outline-none text-2xl focus:border-primary"
              type="text"
              placeholder="option..."
            />
            <input
              v-model="question.selectAnswer"
              class="w-5 h-5"
              :id="`${question.id}-${answer.id}`"
              type="radio"
              :name="'q' + question.id"
              :value="answer.id"
            />
          </div>
        </div>
        <button
          v-if="question.options.length < 4"
          @click="addOption(question.id)"
          class="px-5 py-3 rounded text-white mt-5 bg-primary hover:bg-white border border-transparent hover:border-primary hover:text-primary duration-300"
        >
          add option
        </button>
      </div>
    </div>

    <div class="flex justify-end mt-5 gap-5">
      <button
        @click="addQuestion"
        class="px-5 py-3 rounded text-white bg-primary hover:bg-white border border-transparent hover:border-primary hover:text-primary duration-300"
      >
        Add Question
      </button>
      <button
        v-if="isFormValid"
        @click="saveQuizz"
        class="px-5 py-3 rounded text-white bg-primary hover:bg-white border border-transparent hover:border-primary hover:text-primary duration-300"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePiniaStore } from "../store/pinia"; 
import { useRouter } from "vue-router";

const router = useRouter();

const store = usePiniaStore();

const newQuizz = ref({
  id: new Date().toISOString(), 
  theme: "",
  questions: [
    {
      id: 1,
      question: "",
      options: [
        { id: 1, text: "" },
        { id: 2, text: "" },
      ],
      answer: 0,
      selectAnswer: null, 
    },
  ],
});

const addOption = (questionId) => {
  const question = newQuizz.value.questions.find((q) => q.id === questionId);
  question.options.push({
    id: question.options.length + 1,
    text: "",
  });
};

const removeOption = (questionId, answerId) => {
  const question = newQuizz.value.questions.find((q) => q.id === questionId);
  const index = question.options.findIndex((option) => option.id === answerId);
  if (index !== -1) {
    question.options.splice(index, 1);
  }
};

const addQuestion = () => {
  newQuizz.value.questions.push({
    id: newQuizz.value.questions.length + 1,
    question: "",
    options: [
      { id: 1, text: "" },
      { id: 2, text: "" },
    ],
    answer: 0,
    selectAnswer: null, 
  });
};

const removeQuestion = (questionId) => {
  const index = newQuizz.value.questions.findIndex((q) => q.id === questionId);
  if (index !== -1) {
    newQuizz.value.questions.splice(index, 1);
  }
};

const saveQuizz = () => {
  // Ensure selectAnswer is set to 0 if null (default value)
  newQuizz.value.questions.forEach((question) => {
    if (question.selectAnswer === null) {
      question.selectAnswer = 0;
    }
  });

  store.saveQuizz(newQuizz.value);
  router.push('/pinia')
  console.log("Quizz saved:", newQuizz.value);
};

// Computed property to check if the form is valid
const isFormValid = computed(() => {
  if (!newQuizz.value.theme.trim()) {
    return false;
  }
  for (const question of newQuizz.value.questions) {
    if (!question.question.trim()) {
      return false;
    }
    if (question.options.length < 2) {
      return false;
    }
    let answered = false;
    for (const option of question.options) {
      if (option.text.trim()) {
        answered = true;
        break;
      }
    }
    if (!answered) {
      return false;
    }
  }
  return true;
});
</script>
