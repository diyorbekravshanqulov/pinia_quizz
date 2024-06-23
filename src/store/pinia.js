import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
  state: () => ({
    quizzes: [
      {
        id: 1,
        theme: "Sample Quiz 1",
        questions: [
          {
            id: 1,
            question: "Question 1",
            options: [
              { id: 1, text: "Option A" },
              { id: 2, text: "Option B" },
            ],
            answer: 1,
          },
          {
            id: 2,
            question: "Question 2",
            options: [
              { id: 1, text: "Option C" },
              { id: 2, text: "Option D" },
            ],
            answer: 2,
          },
        ],
      },
      {
        id: 2,
        theme: "Sample Quiz 2",
        questions: [
          {
            id: 1,
            question: "Question 1",
            options: [
              { id: 1, text: "Option X" },
              { id: 2, text: "Option Y" },
            ],
            answer: 1,
          },
          {
            id: 2,
            question: "Question 2",
            options: [
              { id: 1, text: "Option Z" },
              { id: 2, text: "Option W" },
            ],
            answer: 2,
          },
        ],
      },
    ],
  }),

  actions: {
    getQuizzById(id) {
      return new Promise((resolve, reject) => {
        const quiz = this.quizzes.find((q) => q.id === id);
        if (quiz) {
          resolve(quiz);
        } else {
          reject(new Error(`Quiz with id ${id} not found`));
        }
      });
    },

    updateQuizz(updatedQuizz) {
      const index = this.quizzes.findIndex((q) => q.id === updatedQuizz.id);
      if (index !== -1) {
        this.quizzes.splice(index, 1, updatedQuizz);
      }
      // Normally you would save the quizzes to a backend or localStorage here
    },

    saveQuizz(quizz) {
      this.quizzes.push(quizz);
      // Normally you would save the quizzes to a backend or localStorage here
    },

    deleteQuizz(quizzId) {
      const index = this.quizzes.findIndex((q) => q.id === quizzId);
      if (index !== -1) {
        this.quizzes.splice(index, 1);
      }
      // Normally you would also delete the quiz from a backend or localStorage here
    },
  },
});
