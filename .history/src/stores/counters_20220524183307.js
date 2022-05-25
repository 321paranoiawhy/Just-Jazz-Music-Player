// stores/counter.js
import { defineStore } from 'pinia'

// 官方链接: https://pinia.vuejs.org/introduction.html#basic-example

export const useCounterStore = defineStore('counter', {
    state: () => {
        return { count: 0 }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++
        },
    },
})