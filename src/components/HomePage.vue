<template>
  <div class="page-container">
    <!-- 新增背景装饰元素 -->
    <div class="bg-shapes">
      <div class="shape-1"></div>
      <div class="shape-2"></div>
    </div>
    
    <!-- 改进的标题区域 -->
    <div class="hero-section">
      <h1 class="main-title">Welcome to <span>CHEN LAB</span></h1>
      <!-- <p class="subtitle">Quantitative & Systems Biology of Metabolism</p> -->
    </div>
    
    <!-- 新增研究领域卡片 -->
    <div class="research-cards">
      <div class="research-card" v-for="(item, index) in researchAreas" :key="index">
        <div class="card-icon">
          <i :class="item.icon"></i>
        </div>
        <h3>{{ item.title }}</h3>
        <!-- <p>{{ item.description }}</p> -->
      </div>
    </div>
    
    <!-- 改进的内容区域 -->
    <div class="content-section">
      <p class="lab-description">
        Our laboratory specializes in quantitative and systems biology of metabolism, with a dual focus on developing cutting-edge experimental techniques and computational modeling frameworks. By synergistically combining wet-lab experiments and in silico modeling, we aim to achieve quantitative and systems understanding of cellular metabolism and enable rational cell design for synthetic biology and biomanufacturing applications.
      </p>
      <p class="lab-description">
        While we primarily employ microbes (especially the yeast <em>Saccharomyces cerevisiae</em>), our modeling frameworks are also extended to mammalian systems.
      </p>
    </div>
    
    <div class="button-container">
      <router-link to="/research" class="explore-btn">
        Explore Our Research
        <svg class="arrow-icon" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      researchAreas: [
        {
          icon: 'fas fa-flask',
          title: 'Experimental Techniques',
          description: 'Developing advanced wet-lab methods'
        },
        {
          icon: 'fas fa-laptop-code',
          title: 'Computational Modeling',
          description: 'Creating predictive frameworks'
        },
        {
          icon: 'fas fa-dna',
          title: 'Systems Biology',
          description: 'Understanding metabolic networks'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #333;
}

/* 背景装饰元素 */
.bg-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
}

.shape-1 {
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(62, 146, 204, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
}

.shape-2 {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(10, 36, 99, 0.05);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  bottom: -50px;
  left: -50px;
}

/* 标题区域 */
.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #0a2463;
}

.main-title span {
  color: #3e92cc;
}

.subtitle {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 30px;
}

/* 研究卡片 */
.research-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 50px;
}

.research-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 280px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.card-icon {
  font-size: 2.5rem;
  color: #3e92cc;
  margin-bottom: 20px;
}

.research-card h3 {
  color: #0a2463;
  margin-bottom: 15px;
}

/* 内容区域 */
.content-section {
  max-width: 800px;
  margin: 0 auto 40px;
}

.lab-description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 25px;
}

/* 按钮 */
.button-container {
  display: flex;
  /* justify-content: flex-end; */
  text-align: right;
}

.explore-btn {
  display: inline-flex;
  align-items: right;
  justify-content: right;
  background: #3e92cc;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  margin-left: auto;  /* 修改这里 - 从margin: 0 auto改为margin-left: auto */
  margin-right: 0; 
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.explore-btn:hover {
  background: #0a2463;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .research-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .research-card {
    width: 100%;
    max-width: 350px;
  }
}
</style>