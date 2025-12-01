<template>
  <div class="publications-section">
    <h2>{{ currentLanguage === 'zh' ? '发表论文' : 'PUBLICATIONS' }}</h2>
    <div class="publication-filters">
      <button @click="filterByYear('all')" :class="{active: activeFilter === 'all'}">
        {{ currentLanguage === 'zh' ? '全部' : 'ALL' }}
      </button>
      <button @click="filterByYear('2025')" :class="{active: activeFilter === '2025'}">2025</button>
      <button @click="filterByYear('2024')" :class="{active: activeFilter === '2024'}">2024</button>
      <button @click="filterByYear('2023')" :class="{active: activeFilter === '2023'}">2023</button>
      <button @click="filterByYear('Before 2023')" :class="{active: activeFilter === 'Before 2023'}">Before 2023</button>
    </div>
    
    <!-- 按年份分组的论文列表 -->
    <div class="publication-list">
      <template v-if="filteredPublications.length > 0">
        <!-- 动态生成年份分组 -->
        <div 
          v-for="yearGroup in groupedByYear" 
          :key="yearGroup.year"
          :id="yearGroup.yearLabel"
          class="year-group"
        >
          <h3 class="year-heading">{{ yearGroup.yearLabel }}</h3>
          <div 
            class="publication-item" 
            v-for="pub in yearGroup.publications" 
            :key="pub.id"
          >
            <!-- 原有论文项内容 -->
            <div class="pub-badge" :style="{backgroundColor: getBadgeColor(pub.type)}">
              {{ getTypeAbbreviation(pub.type) }}
            </div>
            <div class="pub-content">
              <h3>{{ currentLanguage === 'zh' && pub.title_zh ? pub.title_zh : pub.title }}</h3>
              <p class="pub-authors">{{ pub.authors }}</p>
              <p class="pub-meta">
                <span class="pub-journal">{{ pub.journal }}</span> | 
                <span class="pub-date">{{ pub.year }}</span> | 
                <span class="pub-doi">
                  {{ currentLanguage === 'zh' ? 'DOI:' : 'DOI:' }} 
                  <a :href="'https://doi.org/'+pub.doi" target="_blank">{{ pub.doi }}</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-state">
        <p>{{ currentLanguage === 'zh' ? '没有找到该年份的论文' : 'No publications found for the selected year' }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref, computed, inject, nextTick } from 'vue' // 添加了nextTick导入
import publicationsData from '@/assets/data/publications.json'

const { currentLanguage } = inject('language')
const publications = ref(publicationsData)
const activeFilter = ref('all')

// 修正过滤逻辑
const filteredPublications = computed(() => {
  if (activeFilter.value === 'all') return publications.value
  if (activeFilter.value === 'Before 2023') {
    return publications.value.filter(pub => parseInt(pub.year) < 2023)
  }
  return publications.value.filter(pub => pub.year === activeFilter.value)
})

// 修正滚动定位
function filterByYear(year) {
  activeFilter.value = year
  
  nextTick(() => {
    const element = document.getElementById(year);
    
    if (element) {
      // 添加滚动偏移量（根据实际导航栏高度调整）
      const offset = 100;
      const targetPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      element.classList.add('highlight');
      setTimeout(() => element.classList.remove('highlight'), 2000);
    } else {
      console.error(`Element with id ${year} not found. Available IDs:`, 
        Array.from(document.querySelectorAll('[id^="year-"]')).map(el => el.id));
    }
  });
  // nextTick(() => {
  //   if (year !== 'all') {
  //     const targetId = year === 'Before 2023' ? 'year-Before 2023' : `year-${year}`
  //     const element = document.getElementById(targetId)
  //     if (element) {
  //       element.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start'
  //       })
  //       element.classList.add('highlight')
  //       setTimeout(() => element.classList.remove('highlight'), 2000)
  //     }
  //   }
  // })
}

const groupedByYear = computed(() => {
  const groups = {};
  
  filteredPublications.value.forEach(pub => {
    // 确定分组标签
    let yearLabel = pub.year;
    if (activeFilter.value === 'Before 2023' && parseInt(pub.year) < 2023) {
      yearLabel = 'Before 2023';
    } else if (activeFilter.value === 'all' && parseInt(pub.year) < 2023) {
      yearLabel = 'Before 2023';
    }

    if (!groups[yearLabel]) {
      groups[yearLabel] = {
        year: yearLabel,  // 保存原始年份值用于排序
        yearLabel: yearLabel,  // 保存显示标签
        publications: []
      };
    }
    groups[yearLabel].publications.push(pub);
  });
  console.log(groups);
  // 排序逻辑
  return Object.values(groups).sort((a, b) => {
    if (a.year === 'Before 2023') return 1;
    if (b.year === 'Before 2023') return -1;
    return parseInt(b.year) - parseInt(a.year);  // 降序排列
  });
});

function getTypeAbbreviation(type) {
  const typeMap = {
    'journal': 'J',
    'commentary': 'C',  // Commentary/评论
    'book chapter': 'B',
    'review': 'R'
  }
  return typeMap[type] || 'P' // 默认返回P(preprint)
}

function getBadgeColor(type) {
  const colorMap = {
    'journal': '#89C7E7',     // 温柔的天空蓝
    'commentary': '#B8A1D9',  // 薰衣草紫
    'book chapter': '#A3D9B1',// 薄荷绿
    'review': '#FFB3BA'       // 樱花粉
  }
  return colorMap[type] || '#3498db' // 默认灰色
}

</script>

<style scoped>
/* 原有样式保持不变 */
.publications-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.publication-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.publication-filters button {
  padding: 0.5rem 1.2rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.publication-filters button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.publication-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.publication-item {
  display: flex;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}

.publication-item:hover {
  transform: translateY(-3px);
}

.pub-badge {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: center;
}

.pub-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pub-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pub-content h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.pub-authors {
  color: #7f8c8d;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.pub-meta {
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.pub-journal {
  font-weight: bold;
}

.pub-button {
  padding: 0.3rem 0.8rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pub-button:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 0.8rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.pagination button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  text-align: center;
  margin-top: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.year-group {
  margin-bottom: 3rem;
  transition: background 0.5s ease;
}

.year-group.highlight {
  background: rgba(52, 152, 219, 0.1);
  border-left: 4px solid #3498db;
  padding-left: 1rem;
}

.year-heading {
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  padding-top: 1rem;
}

@media (max-width: 768px) {
  .publication-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pub-badge {
    align-self: flex-start;
  }
  
  .pub-actions {
    justify-content: flex-start;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>