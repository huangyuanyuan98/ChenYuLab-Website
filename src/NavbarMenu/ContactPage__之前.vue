<template>
  <div class="main-container">
    <!-- 1. 联系信息卡片（新增背景） -->
    <div class="contact-card">
      <h1 class="contact-title">📬 CONTACT</h1>
      <div class="contact-content">
        <!-- Email -->
        <div class="contact-section">
          <h3 class="section-title">✉️ Email</h3>
          <p>Prof. Y. Chen</p>
          <p>PhD, PI, Professor</p>
          <p>📧 <a :href="`mailto:${email}`">{{ email }}</a></p>
        </div>

        <!-- Address -->
        <div class="contact-section">
          <h3 class="section-title">📍 Address</h3>
          <p>🏛️ Shenzhen Institutes of Advanced Technology (SIAT)</p>
          <p>1068 Xueyuan Boulevard, University Town of Shenzhen</p>
          <p>Nanshan District, Shenzhen 518055, China</p>
        </div>

        <!-- Social Media -->
        <div class="contact-section" v-if="socialMedia.length">
          <h3 class="section-title">🌐 Social Media</h3>
          <p>
            <span v-for="(item, index) in socialMedia" :key="item.name">
              {{ item.icon }} <a :href="item.url" target="_blank">{{ item.name }}</a>
              <span v-if="index < socialMedia.length - 1"> | </span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 2. 加入我们卡片（背景与联系卡片一致） -->
    <div class="join-card">
      <h2 class="join-title">🌟 JOIN OUR TEAM</h2>
      <div class="join-content">
        <div class="join-text">
          <p>We are looking for motivated students and researchers in:</p>
          <ul>
            <li>Computational Biology</li>
            <li>Microbial Engineering</li>
            <li>Synthetic Circuits</li>
          </ul>
        </div>
        <div class="open-positions">
          <h3>Open Positions</h3>
          <div class="position">
            <h4>PhD Students</h4>
            <p>Rolling admission</p>
          </div>
          <div class="position">
            <h4>Postdoctoral Researchers</h4>
            <p>Open until filled</p>
          </div>
        </div>
        <div class="contact-info">
          <h3>How to Apply</h3>
          <p>Please send your CV and research statement to:</p>
          <a href="mailto:y.chen3@siat.ac.cn" class="contact-button">
            y.chen3@siat.ac.cn
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = "y.chen3@siat.ac.cn";
const socialMedia = [
  { name: "Website", icon: "🔗", url: "https://chenyu.website/" },
  { name: "Google Scholar", icon: "📚", url: "https://scholar.google.com/citations?hl=en&user=tArfdEcAAAAJ" },
  { name: "bilibili", icon: "📺", url: "https://space.bilibili.com/3461576327694348" },
];
</script>

<style scoped>
/* 全局样式 */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 共用卡片样式 */
.contact-card,
.join-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem; /* 卡片间距 */
  border-left: 5px solid var(--primary-color);
}

/* 联系卡片标题 */
.contact-title {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* 加入我们卡片标题 */
.join-title {
  color: var(--primary-color);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* 联系信息内容区域 */
.contact-content {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.contact-section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
}

/* 加入我们内容网格 */
.join-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.join-text, 
.open-positions, 
.contact-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.open-positions .position {
  padding: 1rem;
  background: #eaf4ff;
  border-left: 4px solid #3498db;
  margin-bottom: 1rem;
}

.contact-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border-radius: 4px;
  transition: background 0.3s;
}

.contact-button:hover {
  background: #2980b9;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .contact-card,
  .join-card {
    padding: 1.5rem;
  }
  .join-content {
    grid-template-columns: 1fr;
  }
}
</style>