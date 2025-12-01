<script setup>
import { inject } from 'vue';

const { currentLanguage } = inject('language');

const researchContent = {
  en: {
    title: "Research Focus",
    focusText: `
      We integrate computational modeling (dry lab) and experimental characterization (wet lab) to gain mechanistic insights into cellular metabolism. </br>
      This synergistic strategy accelerates the rational design and optimization of cellular systems in synthetic biology and biomanufacturing. 
    `,
    cards: [
      {
        title: "Dry Lab",
        items: [
          "We develop next-generation modeling frameworks that integrate metabolism with multi-scale biological data (e.g., kinetics, multiple constraints, and cellular processes). Based on these modeling frameworks, we develop algorithms for 1) high-accuracy simulation of cellular behaviors, 2) integrative analysis of heterogeneous biological data and 3) predictive design of artificial cells, cell factories and microbial consortia."
        ]
      },
      {
        title: "Wet Lab",
        items: [
          "Leveraging automation and high-throughput platforms, we perform systems-level measurements of cellular molecules (e.g., RNA, protein and metabolite) within microbial chassis under precisely controlled genetic and environmental perturbations. The wet-lab data enable 1) quantitative elucidation of metabolic regulation and 2) experimental validation and iterative improvement of computational models."
        ]
      }
    ]
  },
  zh: {
    title: "研究方向",
    focusText: `
      聚焦定量合成生物学领域，发展代谢网络建模方法<br>
      建立组学研究实验平台，整合"干""湿"技术<br>
      定量解析代谢调控机制，提高理性设计能力
    `,
    cards: [
      {
        title: "定量合成生物学",
        items: [
          "代谢网络建模与仿真",
          "多组学数据整合分析",
          "生物系统定量表征"
        ]
      },
      {
        title: "智能设计平台",
        items: [
          "自动化实验验证系统",
          "机器学习辅助设计",
          "高通量筛选技术"
        ]
      },
      {
        title: "代谢调控解析",
        items: [
          "动态代谢通量分析",
          "调控网络建模",
          "细胞工厂优化"
        ]
      }
    ]
  }
};
</script>

<template>
  <div class="research-section">
    <div class="research-focus">
      <div class="focus-container">
        <h2 class="section-title">{{ researchContent[currentLanguage].title }}</h2>
        <div class="focus-content">
          <p class="focus-text" v-html="researchContent[currentLanguage].focusText"></p>
        </div>
      </div>
    </div>

    <div class="research-grid">
      <div 
        v-for="(card, index) in researchContent[currentLanguage].cards" 
        :key="index"
        class="research-card"
        :class="'research-card' + (index + 1)"
      >
        <div class="card-icon">{{ index + 1 }}</div>
        <h3>{{ card.title }}</h3>
        <p> {{ card.items[0] }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保持原有样式不变 */
.research-focus {
  background: #cbd2e4;
  padding: 3rem 0;
  border-top: 1px solid rgba(0,0,0,0.05);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.focus-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #3498db;
}

.focus-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
  padding: 1.5rem;
  background-color: rgba(255,255,255,0.8);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.research-section {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
}


.research-grid {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch; /* 新增：使卡片拉伸对齐 */
}


.research-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border-top: 4px solid #abc8dc;
  position: relative;
  overflow: hidden;
  background: #9AC9DB;
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.card-icon {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(52,152,219,0.3);
}

.research-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  text-align: center;
  border-bottom: 1px dashed #eee;
}

.research-card p {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 0.6rem;
  position: relative;
}


@media (max-width: 768px) {
  .research-grid {
    grid-template-columns: 1fr;
  }
}
</style>