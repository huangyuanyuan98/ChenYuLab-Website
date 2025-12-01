<script setup>
import { inject } from 'vue';

const { currentLanguage, switchLanguage } = inject('language');

const translations = {
  en: {
    labName: "CHEN LAB",
    home: "Home",
    research: "Research",
    team: "Team",
    publications: "Publications",
    contact: "Contact"
  },
  zh: {
    labName: "陈禹实验室",
    home: "首页",
    research: "研究方向",
    team: "团队成员",
    publications: "发表论文",
    contact: "联系我们"
  }
};

</script>

<template>
  <nav class="lab-nav">
    <div class="lab-container">
      <div class="lab-name">
        <h1>{{ translations[currentLanguage].labName }}</h1>
        <!-- <p>***********</p> -->
      </div>
      <div class="nav-links">
        <router-link to="/">{{ translations[currentLanguage].home }}</router-link>
        <router-link to="/research">{{ translations[currentLanguage].research }}</router-link>
        <router-link to="/team">{{ translations[currentLanguage].team }}</router-link>
        <router-link to="/publications">{{ translations[currentLanguage].publications }}</router-link>
        <router-link to="/contact">{{ translations[currentLanguage].contact }}</router-link>
        
        <!-- 语言切换按钮 -->
        <!-- <button @click="switchLanguage" class="language-switcher">
          {{ currentLanguage === 'en' ? '中文' : 'EN' }}
        </button> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 原有样式保持不变 */
.lab-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 50px;
  width: 100%;
  background-color: #dad3d3; 
  font-family: 'Arial', sans-serif;
}

.lab-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 50px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.lab-name h1 {
  margin: 0;
  font-size: 34px;
  color: #333;
  font-weight: bold;
}

.lab-name p {
  margin: 5px 0 0;
  font-size: 20px;
  color: #666;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
  padding-right: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 20px;
  padding: 5px 10px;
  transition: color 0.3s ease;
}

/* 新增语言切换按钮样式 */
.language-switcher {
  background: transparent;
  border: 1px solid #504e4e;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;
  transition: all 0.3s ease;
  width: 80px;
  height: 35px;
  background-color: #b4aeae;
}

.language-switcher:hover {
  background: #0066cc;
  color: white;
}

/* 原有hover和active样式 */
.nav-links a:hover {
  color: #0066cc;
}

.nav-links a.router-link-exact-active {
  color: #0066cc;
  border-bottom: 2px solid #0066cc;
}
</style>