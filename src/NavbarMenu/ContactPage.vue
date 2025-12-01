<template>
  <div class="main-container">
    <!-- 1. 联系信息卡片 -->
    <div class="contact-card">
      <h1 class="contact-title">{{ currentLanguage === 'zh' ? '📬 联系我们' : '📬 CONTACT' }}</h1>
      <div class="contact-content">
        <!-- Email -->
        <div class="contact-section">
          <h3 class="section-title">{{ currentLanguage === 'zh' ? '✉️ 邮箱' : '✉️ Email' }}</h3>
          <p>{{ currentLanguage === 'zh' ? '陈禹教授' : 'Prof. Y. Chen' }}</p>
          <p>{{ currentLanguage === 'zh' ? '博士生导师，课题组长' : 'PhD, PI, Professor' }}</p>
          <p>📧 <a :href="`mailto:${email}`">{{ email }}</a></p>
        </div>

        <!-- Address -->
        <div class="contact-section">
          <h3 class="section-title">{{ currentLanguage === 'zh' ? '📍 地址' : '📍 Address' }}</h3>
          <p>🏛️ {{ currentLanguage === 'zh' ? '中国科学院深圳先进技术研究院' : 'Shenzhen Institutes of Advanced Technology, Chinese Academy of Sciences' }}</p>
          <p>{{ currentLanguage === 'zh' ? '深圳市南山区学苑大道1068号' : '1068 Xueyuan Boulevard, University Town of Shenzhen' }}</p>
          <p>{{ currentLanguage === 'zh' ? '邮编：518055' : 'Postal Code: 518055' }}</p>
        </div>

        <!-- Social Media -->
        <div class="contact-section" v-if="socialMedia.length">
          <h3 class="section-title">{{ currentLanguage === 'zh' ? '🌐 社交媒体' : '🌐 Social Media' }}</h3>
          <p>
            <span v-for="(item, index) in socialMedia" :key="item.name">
              {{ item.icon }} <a :href="item.url" target="_blank">{{ 
                currentLanguage === 'zh' ? 
                (item.name_zh || item.name) : 
                item.name 
              }}</a>
              <span v-if="index < socialMedia.length - 1"> | </span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="join-card">
      <h2 class="join-title">{{ currentLanguage === 'zh' ? '🌟 加入我们' : '🌟 JOIN OUR TEAM' }}</h2>
      
      <div class="recruitment-content">
        <div class="research-areas">
          <h3>{{ currentLanguage === 'zh' ? '我们正在招募以下方向的优秀研究人员' : 'We are looking for motivated researchers in:' }}</h3>
          <ul>
            <li><p>{{ currentLanguage === 'zh' ? '计算生物学' : 'Computational Biology' }}</p></li>
            <li><p>{{ currentLanguage === 'zh' ? '微生物工程' : 'Microbial Engineering' }}</p></li>
            <li><p>{{ currentLanguage === 'zh' ? '合成生物学' : 'Synthetic Biology' }}</p></li>
          </ul>

        <div class="open-positions">
          <h3>{{ currentLanguage === 'zh' ? '开放职位' : 'Open Positions' }}</h3>
          <div class="position">
            <h4>{{ currentLanguage === 'zh' ? '博士后研究员' : 'Postdoctoral Researchers' }}</h4>
            <p>{{ currentLanguage === 'zh' ? '招聘人数：3人' : 'Positions available: 3' }}</p>
            
            <div class="position-details" v-if="showDetails">
              <h5>{{ currentLanguage === 'zh' ? '岗位描述' : 'Job Description' }}</h5>
              <ol>
                <li>{{ currentLanguage === 'zh' ? '研究方向可选干实验或湿实验或两者结合' : 'Research options: dry lab, wet lab or combination' }}</li>
                <li>{{ currentLanguage === 'zh' ? '发表高水平论文，申请科研项目和专利' : 'Publish high-quality papers and apply for grants/patents' }}</li>
                <li>{{ currentLanguage === 'zh' ? '参与团队管理工作' : 'Participate in team management' }}</li>
              </ol>

              <h5>{{ currentLanguage === 'zh' ? '应聘要求' : 'Requirements' }}</h5>
              <ul>
                <li>{{ currentLanguage === 'zh' ? '生物工程、微生物学、生物信息学等相关专业博士学位' : 'PhD in Bioengineering/Microbiology/Bioinformatics or related fields' }}</li>
                <li>{{ currentLanguage === 'zh' ? '年龄≤35周岁，博士毕业≤3年' : 'Age ≤35, graduated within 3 years' }}</li>
                <li>{{ currentLanguage === 'zh' ? '未在广东省做过博士后' : 'No prior postdoc experience in Guangdong' }}</li>
                <li>{{ currentLanguage === 'zh' ? '优先考虑有编程或微生物培养经验者' : 'Programming or microbial cultivation experience preferred' }}</li>
              </ul>
            </div>
            <button @click="toggleDetails" class="details-button">
              {{ showDetails ? 
                (currentLanguage === 'zh' ? '收起详情' : 'Hide Details') : 
                (currentLanguage === 'zh' ? '查看详情' : 'View Details') }}
            </button>
          </div>
        </div>

        <div class="application">
          <h3>{{ currentLanguage === 'zh' ? '申请方式' : 'How to Apply' }}</h3>
          <p>{{ currentLanguage === 'zh' ? '请将简历发送至：' : 'Send your application to:' }}</p>
          <a href="mailto:y.chen3@siat.ac.cn" class="email-link">y.chen3@siat.ac.cn</a>
          <p v-if="currentLanguage === 'zh'">邮件标题注明："应聘岗位-学校名称-专业-姓名"</p>
          <p v-else>Email title format: "Position-University-Major-Name"</p>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
// import { inject } from 'vue';
import { ref, inject } from 'vue';

const { currentLanguage } = inject('language');

const email = "y.chen3@siat.ac.cn";
const socialMedia = [
  { 
    name: "Website", 
    name_zh: "个人网站",
    icon: "🔗", 
    url: "https://chenyu.website/" 
  },
  { 
    name: "Google Scholar", 
    name_zh: "谷歌学术",
    icon: "📚", 
    url: "https://scholar.google.com/citations?hl=en&user=tArfdEcAAAAJ" 
  },
  { 
    name: "bilibili", 
    name_zh: "哔哩哔哩",
    icon: "📺", 
    url: "https://space.bilibili.com/3461576327694348" 
  },
];


const showDetails = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

</script>

<style scoped>
/* 全局样式 */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* 共用卡片样式 */
.contact-card,
.join-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border-left: 5px solid #3498db;
  transition: transform 0.3s ease;
}

.contact-card:hover,
.join-card:hover {
  transform: translateY(-3px);
}

/* 卡片标题 */
.contact-title,
.join-title {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.join-title {
  font-size: 1.8rem;
}

/* 联系信息内容区域 */
.contact-content {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.contact-section {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.section-title {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

/* 加入我们内容网格 */
.join-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.join-text, 
.open-positions {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.6;
}

.join-text ul {
  padding-left: 1.2rem;
}

.join-text li {
  margin-bottom: 0.5rem;
}

.open-positions .position {
  padding: 1rem;
  background: #eaf4ff;
  border-left: 4px solid #3498db;
  margin-bottom: 1rem;
}


.recruitment-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.recruitment-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.research-areas,
.open-positions,
.application {
  margin-bottom: 2rem;
}

h3 {
  color: #3498db;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.position {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.position h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.position-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #ddd;
}

.position-details h5 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem 0;
}

.details-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.details-button:hover {
  background: #2980b9;
}

.email-link {
  color: #e74c3c;
  font-weight: 500;
  word-break: break-all;
}

@media (max-width: 768px) {
  .recruitment-section {
    padding: 1rem;
  }
  
  .recruitment-content {
    padding: 1.5rem;
  }
}



/* 响应式设计 */
@media (max-width: 768px) {
  .contact-card,
  .join-card {
    padding: 1.5rem;
  }
  
  .join-content {
    grid-template-columns: 1fr;
  }
  
  .contact-title,
  .join-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-section p,
  .join-text p,
  .contact-info p {
    font-size: 0.9rem;
  }
}
</style>