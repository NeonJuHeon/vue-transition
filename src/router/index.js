import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../Home.vue")
  },
  {
    path: "/main",
    name: "MainPage",
    component: () => import("../pages/MainPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const prevInfo = JSON.parse(window.sessionStorage.getItem("scrollInfo"));
    if (prevInfo[to.name] >= 0) {
      return window.scrollTo(0, prevInfo[to.name]);
    }
  }
});

router.beforeEach((to, from) => {
  const prevInfo = JSON.parse(window.sessionStorage.getItem("scrollInfo"));
  const key = from.name;
  if (key) {
    const scrollObj = { [key]: window.scrollY };
    window.sessionStorage.setItem(
      "scrollInfo",
      JSON.stringify({ ...prevInfo, ...scrollObj })
    );
  }
});

export default router;
