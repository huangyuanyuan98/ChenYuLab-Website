<script setup>
import { ref, provide } from 'vue';
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

// 全局语言状态
const currentLanguage = ref('en');

// 提供语言切换函数给所有子组件
const switchLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'zh' : 'en';
};

provide('language', {
  currentLanguage,
  switchLanguage
});

</script>
<template>
  <div class="app-container">
    <header>
      <NavBar />
    </header>

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>
/* 全局样式 - 不需要 scoped */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* 这将使 main 占据剩余空间 */
}
</style>
