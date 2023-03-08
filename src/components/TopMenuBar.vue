<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'MainPage' }">Main</router-link>
    <p>scrollY : {{ Math.floor(scrollPos) }}</p>
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let scrollPos = ref(0);
    document.addEventListener("scroll", () => {
      scrollPos.value = window.scrollY;
    });
    return {
      scrollPos,
    };
  },
};
</script>

<style>
</style>