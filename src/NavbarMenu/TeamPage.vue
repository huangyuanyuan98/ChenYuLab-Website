<script setup>
import { inject, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import membersData from '../assets/data/team.js';
import labPhotosData from '../assets/data/labPhotos.js';

const router = useRouter();
const { currentLanguage = ref('en') } = inject('language') || {};

const teamContent = ref({
  en: {
    title: "TEAM",
    subtitle: "Meet the people behind our research",
    sections: {
      pi: "Principal Investigator",
      current: "Current Members",
      postdocs: "Postdoctoral Researchers",
      researchAssistants: "Research Assistants",
      administrativeAssistant: "Administrative Assistant",
      students: "Students",
      alumni: "Alumni"
    },
    researchLabel: "RESEARCH:",
    links: ["Google Scholar","Web of Science"],
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
      postdocs: "博士后研究员",
      researchAssistants: "研究助理",
      administrativeAssistant: "行政助理",
      students: "学生"
    },
    researchLabel: "研究方向:",
    links: ["谷歌学术","Web of Science"],
    pi_name: "陈禹",
    position: "博士生导师，课题组长",
    affiliation: "中国科学院深圳先进技术研究院",
    research: "系统生物学 | 代谢模型 | 酶约束模型"
  }
});

const members = ref(membersData);

// 计算属性：按类别分组成员并按加入时间排序（先来的在后面）
const groupedMembers = computed(() => {
  const sortMembers = (category) => {
    return members.value
      .filter(member => member.category === category)
      .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
  };

  return {
    postdocs: sortMembers('postdoc'),
    researchAssistants: sortMembers('researchAssistant'),
    administrativeAssistant: sortMembers('administrativeAssistant'),
    students: sortMembers('student'),
    alumni: sortMembers('alumni')
  };
});

const navigateToPi = async () => {
  try {
    await router.push('/team/pi');
  } catch (error) {
    console.error('Navigation failed:', error);
  }
};

const labPhotos = ref(labPhotosData);
const activePhotoYear = ref(Math.max(...labPhotosData.map(item => item.year))); // 默认最新年份
const showLightbox = ref(false);
const currentPhotoIndex = ref(0);

// 计算属性
const photoYears = computed(() => [...new Set(labPhotos.value.map(item => item.year))].sort((a,b) => b-a));

const filteredPhotos = computed(() => {
  const yearData = labPhotos.value.find(item => item.year === activePhotoYear.value);
  return yearData ? yearData.photos : [];
});

const currentPhoto = computed(() => {
  return filteredPhotos.value[currentPhotoIndex.value] || {};
});

// 方法
function openLightbox(index) {
  currentPhotoIndex.value = index;
  showLightbox.value = true;
  document.body.style.overflow = 'hidden'; // 禁用页面滚动
}

function closeLightbox() {
  showLightbox.value = false;
  document.body.style.overflow = '';
}

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
            <img src="/images/members-photos/陈禹.jpg" alt="Dr. Chen">
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

            <div class="member-links-container">
              <div class="member-links">
                <a href="https://scholar.google.com/citations?hl=en&user=tArfdEcAAAAJ" target="_blank">
                  <i class="fas fa-graduation-cap"></i> {{ teamContent[currentLanguage].links[0] }} 
                </a>
              </div>
              <div class="member-links">
                <a href="https://www.webofscience.com/wos/author/record/AAL-3329-2020" target="_blank">
                  <i class="fas fa-graduation-cap"></i> {{ teamContent[currentLanguage].links[1] }} 
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 当前成员 -->
      <section class="team-section">
        <h2>{{ teamContent[currentLanguage].sections.current }}</h2>
        
        <!-- 博士后研究员 -->
        <div class="member-category" v-if="groupedMembers.postdocs.length > 0">
          <h3>{{ teamContent[currentLanguage].sections.postdocs }}</h3>
          <div class="members-grid">
            <div class="member-card" v-for="member in groupedMembers.postdocs" :key="member.id">
              <div class="member-image">
                <img :src="member.image" :alt="member.zhName">
              </div>
              <div class="member-info">
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
        </div>

        <!-- 研究助理 -->
        <div class="member-category" v-if="groupedMembers.researchAssistants.length > 0">
          <h3>{{ teamContent[currentLanguage].sections.researchAssistants }}</h3>
          <div class="members-grid">
            <div class="member-card" v-for="member in groupedMembers.researchAssistants" :key="member.id">
              <div class="member-image">
                <img :src="member.image" :alt="member.zhName">
              </div>
              <div class="member-info">
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
        </div>

        <!-- 行政助理 -->
        <div class="member-category" v-if="groupedMembers.administrativeAssistant.length > 0">
          <h3>{{ teamContent[currentLanguage].sections.administrativeAssistant }}</h3>
          <div class="members-grid">
            <div class="member-card" v-for="member in groupedMembers.administrativeAssistant" :key="member.id">
              <div class="member-image">
                <img :src="member.image" :alt="member.zhName">
              </div>
              <div class="member-info">
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
        </div>

        <!-- 学生 -->
        <div class="member-category" v-if="groupedMembers.students.length > 0">
          <h3>{{ teamContent[currentLanguage].sections.students }}</h3>
          <div class="members-grid">
            <div class="member-card" v-for="member in groupedMembers.students" :key="member.id">
              <div class="member-image">
                <img :src="member.image" :alt="member.zhName">
              </div>
              <div class="member-info">
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
        </div>
      </section>
    </main>


    <section class="team-section lab-photos">
      <h2>{{ currentLanguage === 'en' ? 'Lab Photos' : '实验室照片' }}</h2>
      
      <!-- 按年份分类 -->
      <div class="year-tabs">
        <button 
          v-for="year in photoYears" 
          :key="year"
          @click="activePhotoYear = year"
          :class="{active: activePhotoYear === year}"
        >
          {{ year }}
        </button>
      </div>

      <!-- 照片网格 -->
      <div class="photo-grid">
        <div 
          v-for="(photo, index) in filteredPhotos" 
          :key="index"
          class="photo-item"
          @click="openLightbox(index)"
        >
          <img 
            :src="photo.thumbnail" 
            :alt="photo.description || `${activePhotoYear} Lab Photo`"
            loading="lazy"
          >
          <div class="photo-meta" v-if="photo.description">
            {{ photo.description }}
          </div>
        </div>
      </div>

      <!-- 图片预览弹窗 -->
      <div class="lightbox" v-if="showLightbox" @click.self="closeLightbox">
        <button class="close-btn" @click="closeLightbox">&times;</button>
        <img :src="currentPhoto.fullSize" :alt="currentPhoto.description">
        <div class="photo-caption">
          <p>{{ currentPhoto.description || '' }}</p>
          <p>{{ activePhotoYear }}</p>
        </div>
      </div>
    </section>

    <div  class="team-section" v-if="groupedMembers.alumni.length > 0">
      <h2>{{ teamContent[currentLanguage].sections.alumni }}</h2>
      <table class="alumni-table">
          <tbody>
          <tr v-for="(alumni, index) in groupedMembers.alumni" :key="index">
              <td class="name">{{ alumni.enName + ' ' + alumni.zhName }}</td>
              <td class="role">{{ alumni.role }}</td>
              <td class="period">{{ alumni.period }}</td>
          </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 原有样式保持不变，新增以下样式 */
.member-category {
  margin-bottom: 2.5rem;
}

.member-category h3 {
  color: #3498db;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

/* 其他原有样式保持不变 */
.team-page {
  max-width: 1300px;
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
  height: 180px;
  /* border-radius: 50%; */
  overflow: hidden;
  flex-shrink: 0;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.position, .role, .research, .email {
  margin: 0.5rem 0;
  color: #555;
}

.member-links-container {
  display: flex;
  margin-top: 1rem;
}

.member-links {
  margin-right: 1rem;
}

.member-links a {
  display: inline-block;
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


/* 照片专区样式 */
.lab-photos {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #eee;
}

.year-tabs {
  display: flex;
  gap: 0.8rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.year-tabs button {
  padding: 0.5rem 1.2rem;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.year-tabs button.active {
  background: #3498db;
  color: white;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.photo-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  aspect-ratio: 4/3;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 替换原来的cover */
  background: #f5f5f5; /* 添加背景色填充空白区域 */
  transition: transform 0.3s;
}

.photo-item:hover img {
  transform: scale(1.03);
}

.photo-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.8rem;
  font-size: 0.9rem;
}

/* 灯箱样式 */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.photo-caption {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  padding: 1rem;
  background: rgba(0,0,0,0.5);
}

.alumni-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.alumni-table th {
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #eaeaea;
}

.alumni-table td {
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
  vertical-align: top;
}

.alumni-table tr:last-child td {
  border-bottom: none;
}

.alumni-table tr:hover {
  background-color: #f8f9fa;
}

.name {
  width: 40%;
  min-width: 150px;
}

.role {
  width: 80%;
}

.alumni-table .role {
  width: 40%;
}

.period {
  width: 20%;
  font-weight: 500;
  color: #555;
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
  
  .members-grid {
    grid-template-columns: 1fr;
  }
  
  .join-content {
    grid-template-columns: 1fr;
  }

  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  
  .lightbox img {
    max-width: 95%;
  }
}
</style>