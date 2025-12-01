<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import membersData from '../assets/data/team.js';

const router = useRouter();
const { currentLanguage = ref('en') } = inject('language') || {};

const teamContent = ref({
  en: {
    title: "TEAM",
    subtitle: "Meet the people behind our research",
    sections: {
      pi: "Principal Investigator",
      current: "Current Members",
    },
    researchLabel: "RESEARCH:",
    links: "Google Scholar",
    pi_name: "Yu CHEN",
    position: "PhD, PI, Professor",
    affiliation: "Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences",
    research: "systems biology | metabolic modeling | constraint-based modeling"
  },
  zh: {
    title: "团队成员",
    subtitle: "认识我们的研究团队",
    sections: {
      pi: "课题组长",
      current: "现任成员",
    },
    researchLabel: "研究方向:",
    links: "谷歌学术",
    pi_name: "陈禹",
    position: "博士生导师，课题组长",
    affiliation: "中国科学院深圳先进技术研究院",
    research: "系统生物学 | 代谢模型 | 酶约束模型"
  }
});


const members = ref(membersData);

const navigateToPi = async () => {
  try {
    await router.push('/team/pi');
  } catch (error) {
    console.error('Navigation failed:', error);
  }
};
</script>

<template>
  <div class="team-page">
    <!-- 页眉 -->
    <header class="team-header">
      <h1>{{ teamContent[currentLanguage].title }}</h1>
      <p class="subtitle">{{ teamContent[currentLanguage].subtitle }}</p>
    </header>

    <!-- 主要团队内容 -->
    <main class="team-content">
      <!-- 负责人 -->
      <section class="team-section">
        <h2>{{ teamContent[currentLanguage].sections.pi }}</h2>
        <div class="member-card">
          <div class="member-image">
            <!-- <img src="@/assets/images/team/chen.jpg" alt="Dr. Chen"> -->
          </div>
          <div class="member-info">
            <h2 @click="navigateToPi" class="clickable-name">{{ teamContent[currentLanguage].pi_name }}</h2>
            <p class="position">{{ teamContent[currentLanguage].position }}</p>
            <p class="pi-affiliation">{{ teamContent[currentLanguage].affiliation }} </p> 

            <p class="research">
              {{ teamContent[currentLanguage].researchLabel }} 
              {{ teamContent[currentLanguage].research }} 

            </p>
            <a href="mailto:y.chen3@siat.ac.cn" class="contact-button">
              y.chen3@siat.ac.cn
            </a>
            <div class="member-links">
              <a href="https://scholar.google.com/citations?hl=en&user=tArfdEcAAAAJ" target="_blank">
                <i class="fas fa-graduation-cap"></i> {{ teamContent[currentLanguage].links }} 
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 当前成员 -->
      <section class="team-section">
        <h2>{{ teamContent[currentLanguage].sections.current }}</h2>
        <div class="members-grid">
          <div class="member-card" v-for="member in members" :key="member.id">
            <div class="member-image">
              <img :src="member.image" :alt="member.zhName">
            </div>
            <div class="member-info">
              <!-- <h3>{{ currentLanguage === 'en' ? member.enName : member.zhName }}</h3> -->
              <h3>{{ member.enName }}</h3>
              <h3>{{ member.zhName }}</h3>
              <p class="role">{{ member[currentLanguage + 'Role'] || member.role }}</p>
              <p class="research">{{ member[currentLanguage + 'Research'] || member.research }}</p>
              <p class="email">
                {{ currentLanguage === 'en' ? 'Email:' : '邮箱:' }}
                <a :href="`mailto:${member.email}`">{{ member.email }}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 保持原有样式不变 */
.team-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.clickable-name {
  cursor: pointer;
  color: #2c3e50;
  transition: color 0.2s ease;
}

.clickable-name:hover {
  color: #3498db;
  text-decoration: underline;
}

.team-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3498db;
}

.team-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.team-section {
  margin-bottom: 4rem;
}

.team-section h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  display: inline-block;
}

.member-card {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.member-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .member-info enName {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
} */

.member-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.position, .role, .research, .email {
  margin: 0.5rem 0;
  color: #555;
}

.member-links {
  margin-top: 1rem;
}

.member-links a {
  display: inline-block;
  margin-right: 1rem;
  color: #3498db;
  text-decoration: none;
}

.member-links a:hover {
  text-decoration: underline;
}

.member-links i {
  margin-right: 0.3rem;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.alumni-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.alumni-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.alumni-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
}

.alumni-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.join-section {
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 8px;
  margin-top: 4rem;
}

.join-section h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.join-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.join-text, .open-positions, .contact-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.open-positions .position {
  padding: 1rem;
  background: #f1f8fe;
  border-left: 4px solid #3498db;
  margin-bottom: 1rem;
}

.contact-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.contact-button:hover {
  background: #2980b9;
}

.team-footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .member-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .member-image {
    margin-bottom: 1.5rem;
  }
  
  .members-grid, .alumni-grid {
    grid-template-columns: 1fr;
  }
  
  .join-content {
    grid-template-columns: 1fr;
  }
}
</style>