<script setup>
import { inject } from 'vue';

const { currentLanguage } = inject('language');

const footerText = {
  en: {
    copyright: "Copyright © 2025 CHEN Lab. All rights reserved.",
    address: "Address: 1068 Xueyuan Boulevard, University Town of Shenzhen, Shenzhen 518055, China",
    relatedLinks: "Related Links",
    // record: "粤ICP备********号"
  },
  zh: {
    copyright: "Copyright © 2025 CHEN Lab. All rights reserved.",
    address: "地址：深圳市南山区学苑大道1068号深圳大学城",
    relatedLinks: "相关链接",
    // record: "粤ICP备********号"
  }
};

const relatedLinks = [
  {
    name: "iSynBio",
    url: "https://isynbio.siat.ac.cn/",
    logo: "/images/link-logo/isynbio.png",
    alt: "iSynBio Logo"
  },
  {
    name: "SIAT",
    url: "https://www.siat.ac.cn/",
    logo: "/images/link-logo/SIAT.png",
    alt: "SIAT Logo"
  },
  {
    name: "CAS",
    url: "https://www.cas.cn/",
    logo: "/images/link-logo/CAS.png",
    alt: "Chinese Academy of Sciences Logo"
  }
];

const handleImageError = (e) => {
  e.target.style.display = 'none'; // 图片加载失败时隐藏
  console.error('图片加载失败:', e.target.src);
}

</script>

<template>
  <footer class="lab-footer">
    <!-- 链接区域 -->
    <div class="related-links">
      <h4>{{ footerText[currentLanguage].relatedLinks }}</h4>
      <div class="link-container">
        <a 
          v-for="(link, index) in relatedLinks" 
          :key="index"
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="footer-link"
          :title="link.name"
        >
          <!-- <img 
            :src="link.logo" 
            :alt="link.alt"
            class="link-logo"
          > -->
          <img 
            :src="link.logo" 
            :alt="link.alt"
            class="link-logo"
            @error="handleImageError"
          >
        </a>
      </div>
    </div>
    
    <div class="footer-content">
      <div class="copyright-section">
        <p>{{ footerText[currentLanguage].copyright }}</p>
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
  color: #555;
  text-align: center;
  padding: 2rem 0 1rem;
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}

/* 链接区域样式 */
.related-links {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.related-links h4 {
  color: #3e92cc;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  font-weight: 600;
}

.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 0 auto;
  max-width: 900px;
}

.footer-link {
  display: inline-flex;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

.link-logo {
  height: 40px;
  /* background-color: #6484c4; */
  border-radius: 4px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 轻微阴影 */
}

.footer-link:hover .link-logo {
  filter: grayscale(0%) brightness(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .link-container {
    gap: 1.5rem;
  }
  
  .link-logo {
    height: 35px;
    max-width: 100px;
  }
}

@media (max-width: 480px) {
  .link-container {
    gap: 1rem;
  }
  
  .link-logo {
    height: 30px;
    max-width: 80px;
  }
}
</style>