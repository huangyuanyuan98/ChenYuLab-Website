<script setup>
import { inject } from 'vue';

const { currentLanguage } = inject('language');

const footerText = {
  en: {
    copyright: "Copyright © 2025 CHEN Lab. All rights reserved.",
    address: "Address: 1068 Xueyuan Boulevard, University Town of Shenzhen, Shenzhen 518055, China",
    // record: "粤ICP备********号"
  },
  zh: {
    copyright: "Copyright © 2025 CHEN Lab. All rights reserved.",
    address: "地址：深圳市南山区学苑大道1068号深圳大学城",
    // record: "粤ICP备********号"
  }
};
</script>

<template>
  <footer class="lab-footer">
    <div class="footer-content">
      <div class="copyright-section">
        <p>{{ footerText[currentLanguage].copyright }}</p>
        <!-- <p>{{ footerText[currentLanguage].record }}</p> -->
      </div>
      <div class="contact-info">
        <p>{{ footerText[currentLanguage].address }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.lab-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #eaeaea;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
  padding: 1rem 0;
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
