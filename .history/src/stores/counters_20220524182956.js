import { defineStore } from 'pinia'

// 官方链接: https://github.com/vuejs/pinia#create-a-store

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
    // a function that returns a fresh state
    state: () => ({
        counter: 0,
        name: 'Eduardo',
    }),
    // optional getters
    getters: {
        // getters receive the state as first parameter
        doubleCount: (state) => state.counter * 2,
        // use getters in other getters
        // doubleCountPlusOne(): number {
        //   return this.doubleCount + 1
        // },
    },
    // optional actions
    actions: {
        reset() {
            // `this` is the store instance
            this.counter = 0
        },
    },
})