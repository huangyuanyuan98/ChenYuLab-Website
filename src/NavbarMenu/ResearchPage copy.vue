<template>
  <div class="research-section">
    <div class="research-focus">
      <div class="focus-container">
        <h2 class="section-title">Research Focus</h2>
        <div class="focus-content">
          <p class="focus-text">
            聚焦定量合成生物学领域，发展代谢网络建模方法<br>
            建立组学研究实验平台，整合"干""湿"技术<br>
            定量解析代谢调控机制，提高理性设计能力
          </p>
        </div>
      </div>
    </div>

    <div class="research-grid">
      <!-- 研究方向1 -->
      <div class="research-card research-card1">
        <div class="card-icon">1</div>
        <h3>定量合成生物学</h3>
        <ul>
          <li>代谢网络建模与仿真</li>
          <li>多组学数据整合分析</li>
          <li>生物系统定量表征</li>
        </ul>
      </div>

      <!-- 研究方向2 -->
      <div class="research-card research-card2">
        <div class="card-icon">2</div>
        <h3>智能设计平台</h3>
        <ul>
          <li>自动化实验验证系统</li>
          <li>机器学习辅助设计</li>
          <li>高通量筛选技术</li>
        </ul>
      </div>

      <!-- 研究方向3 -->
      <div class="research-card research-card3">
        <div class="card-icon">3</div>
        <h3>代谢调控解析</h3>
        <ul>
          <li>动态代谢通量分析</li>
          <li>调控网络建模</li>
          <li>细胞工厂优化</li>
        </ul>
      </div>

      <!-- <div class="research-card">
        <div class="card-icon">4</div>
        <h3>交叉技术开发</h3>
        <ul>
          <li>微流控培养系统</li>
          <li>原位检测技术</li>
          <li>合成生物学DBTL循环</li>
        </ul>
      </div> -->
    </div>
  </div>

</template>

<style scoped>

.research-focus {
  /* background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); */
  background: #cbd2e4;
  padding: 3rem 0;
  border-top: 1px solid rgba(0,0,0,0.05);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.focus-container {
  max-width: 900px;
  /* background: #3D5488; */
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
  max-width: 1200px;
  /* max-width: 100%; */
  margin: 3rem auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(to right, #3498db, #9b59b6);
}

.section-header p {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.research-grid {
  max-width: 1200px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed #eee;
}

.research-card ul {
  padding-left: 1.2rem;
}

.research-card li {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 0.6rem;
  position: relative;
}

.research-card li::before {
  content: "•";
  color: #3498db;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

@media (max-width: 768px) {
  .research-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
}
</style>

<!-- <template>
  <div class="research-focus">
    <div class="focus-container">
      <h2 class="section-title">Research Focus</h2>
      <div class="focus-content">
        <p class="focus-text">
          聚焦定量合成生物学领域，发展代谢网络建模方法，<br>
          建立组学研究实验平台，整合"干""湿"技术<br>
          定量解析代谢调控机制，提高理性设计能力
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Research'
}
</script>

<style scoped>
.research-focus {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
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

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  .focus-text {
    font-size: 1rem;
    padding: 1rem;
  }
}
</style> -->