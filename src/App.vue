<template>
  <TopMenuBar />

  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import TopMenuBar from "./components/TopMenuBar.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { TopMenuBar },
  setup() {
    return {
      ...useSlide(),
    };
  },
};

const useSlide = () => {
  let transitionName = ref("none");
  let isGoBack = false;

  const route = useRoute();

  window.addEventListener("popstate", () => {
    // 뒤로가기시
    isGoBack = true;
  });

  watch(
    () => route.name,
    (to, from) => {
      transitionName.value = "none";
      if (isGoBack) {
        // 뒤로 가기 버튼 눌렸을 시 왼쪽에서 덮임
        transitionName.value = "slide-left";
        isGoBack = false;
      } else {
        if (from === undefined) return; // 새로고침시
        transitionName.value = "slide-right";
      }
    }
  );

  return {
    transitionName,
  };
};
</script>


<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  align-items: center;
  background-color: white;
  display: flex;
  gap: 1rem;
}
</style>

<style>
/* 슬라이드 START */
.none-enter-active,
.none-leave-active {
  display: none;
}
.none-enter-from {
  display: none;
}
.none-leave-to {
  display: none;
}
/* slide right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.2s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(-100%);
}
/* slide left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.2s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-leave-to {
  transform: translateX(100%);
}
/* 슬라이드 END */

/* overlay START */
.overlay-enter-active,
.overlay-leave-active {
  transition: transform 0.2s ease;
}
.overlay-enter-from {
  transform: translateX(100%);
}
.overlay-leave-to {
  transform: translateX(100%);
}
/* overlay END */
</style>