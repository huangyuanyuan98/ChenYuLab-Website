<template>
  <div class="publications-section">
    <h2>{{ currentLanguage === 'zh' ? '发表论文' : 'PUBLICATIONS' }}</h2>
    <div class="publication-filters">
      <button @click="scrollToYear('all')" :class="{active: activeYear === 'all'}">
        {{ currentLanguage === 'zh' ? '全部' : 'ALL' }}
      </button>
      <button @click="scrollToYear('2025')" :class="{active: activeYear === '2025'}">2025</button>
      <button @click="scrollToYear('2024')" :class="{active: activeYear === '2024'}">2024</button>
      <button @click="scrollToYear('2023')" :class="{active: activeYear === '2023'}">2023</button>
      <button @click="scrollToYear('Before 2023')" :class="{active: activeYear === 'Before 2023'}">Before 2023</button>
    </div>

    <div class="author-notes-container">
      <p class="author-notes">
        #: {{ currentLanguage === 'zh' ? '同等贡献' : 'equal contribution' }}, 
        *: {{ currentLanguage === 'zh' ? '通讯作者' : 'corresponding author' }},
        bold: {{ currentLanguage === 'zh' ? '实验室成员' : 'lab member' }}
      </p>
    </div>

    <!-- 按年份分组的论文列表 -->
    <div class="publication-list">
      <div 
        v-for="yearGroup in groupedByYear" 
        :key="yearGroup.year"
        :id="yearGroup.yearLabel"
        class="year-group"
        :class="{highlight: activeYear === yearGroup.yearLabel}"
      >
        <h3 class="year-heading">{{ yearGroup.yearLabel }}</h3>
        <div 
          class="publication-item" 
          v-for="pub in yearGroup.publications" 
          :key="pub.id"
        >
          <!-- 论文项内容 -->
          <div class="pub-badge" :style="{backgroundColor: getBadgeColor(pub.type)}">
            {{ getTypeAbbreviation(pub.type) }}
          </div>
          <div class="pub-content">
            <h3>{{ currentLanguage === 'zh' && pub.title_zh ? pub.title_zh : pub.title }}</h3>
            <!-- <p class="pub-authors">{{ pub.authors }}</p> -->
            <p class="pub-authors" v-html="pub.authors"></p>
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
    </div>

    <button 
      class="back-to-top"
      @click="scrollToTop"
      :class="{visible: showBackToTop}"
      aria-label="Back to Top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
    
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import publicationsData from '@/assets/data/publications.json'

const showBackToTop = ref(false)
const { currentLanguage } = inject('language')
const publications = ref(publicationsData)
const activeYear = ref('all') // 当前激活的年份

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 回到顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  activeYear.value = 'all'
}

// 滚动到指定年份
const scrollToYear = (year) => {
  activeYear.value = year
  
  if (year === 'all') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    const element = document.getElementById(year)
    if (element) {
      // 添加高亮效果
      element.classList.add('highlight')
      setTimeout(() => {
        element.classList.remove('highlight')
      }, 2000)
      
      // 计算偏移量（考虑可能的固定导航栏）
      const offset = 80 // 根据需要调整
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }
}

// 监听滚动事件，更新当前激活的年份
onMounted(() => {
  const yearElements = Array.from(document.querySelectorAll('.year-group'))
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const year = entry.target.id.replace('year-', '').replace('-', ' ')
        if (year !== activeYear.value) {
          activeYear.value = year === 'all' ? 'all' : year
        }
      }
    })
  }, {
    threshold: 0.5,
    rootMargin: '-100px 0px -100px 0px' // 调整触发区域
  })

  yearElements.forEach(el => observer.observe(el))
})

// 分组逻辑保持不变

const groupedByYear = computed(() => {
  const groups = {};
  
  publications.value.forEach(pub => {
    let yearLabel = pub.year;
    if (parseInt(pub.year) < 2023) {
      yearLabel = 'Before 2023';
    }

    if (!groups[yearLabel]) {
      groups[yearLabel] = {
        year: yearLabel,
        yearLabel: yearLabel,
        publications: []
      };
    }
    groups[yearLabel].publications.push(pub);
  });

  // // 对每个年份组内的论文按年份倒序排序
  // Object.values(groups).forEach(group => {
  //   if (group.year === 'Before 2023') {
  //     group.publications.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  //   }else{
  //     group.publications.sort((a, b) => {
  //     const yearDiff = parseInt(b.year) - parseInt(a.year)
  //     if (yearDiff !== 0) return yearDiff
  //     const monthA = a.month || 12
  //     const monthB = b.month || 12
  //     return monthB - monthA
  //   })
  //   }
  // });

  // 对每个年份组内的论文按年份、月份倒序排序
  // Object.values(groups).forEach(group => {
  //   group.publications.sort((a, b) => {
  //     const yearDiff = parseInt(b.year) - parseInt(a.year)
  //     if (yearDiff !== 0) return yearDiff
  //     const monthA = a.month || 12
  //     const monthB = b.month || 12
  //     return monthB - monthA
  //   })
  // })

  Object.values(groups).forEach(group => {
    group.publications.sort((a, b) => {
      const yearDiff = parseInt(b.year) - parseInt(a.year)
      if (yearDiff !== 0) return yearDiff
      const monthA = a.month || 12
      const monthB = b.month || 12
      return monthB - monthA
    })
  })


  // 对年份组本身进行排序
  return Object.values(groups).sort((a, b) => {
    if (a.year === 'Before 2023') return 1;
    if (b.year === 'Before 2023') return -1;
    return parseInt(b.year) - parseInt(a.year);
  });
});

// 其他工具函数保持不变
function getTypeAbbreviation(type) {
  const typeMap = {
    'journal': 'J',
    'commentary': 'C',
    'book chapter': 'B',
    'review': 'R'
  }
  return typeMap[type] || 'P'
}

function getBadgeColor(type) {
  const colorMap = {
    'journal': '#89C7E7',
    'commentary': '#B8A1D9',
    'book chapter': '#A3D9B1',
    'review': '#FFB3BA'
  }
  return colorMap[type] || '#3498db'
}
</script>


<style scoped>
.year-group {
  scroll-margin-top: 100px; /* 防止被固定导航栏遮挡 */
  transition: all 0.3s ease;
}

.year-group.highlight {
  background: rgba(52, 152, 219, 0.1);
  border-left: 4px solid #3498db;
  padding-left: 1rem;
}

.year-heading {
  scroll-margin-top: 100px; /* 与上方一致 */
}

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

.author-notes {
  font-size: 0.9em;
  color: #666;
  text-align: center;
  margin: 10px 0 20px;
  /* font-style: italic; */
  font-family: 'Arial', sans-serif;
}

.author-notes-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0 1.5rem;
}

.author-notes {
  font-size: 1em;
  color: #666;
  /* font-style: italic; */
  font-family: 'Arial', sans-serif;
  padding: 0.5em 1em;
  /* background-color: #f8f8f8; */
  /* border-radius: 4px; */
  display: inline-block;
  max-width: 90%;
  text-align: center;
  /* box-shadow: 0 1px 2px rgba(0,0,0,0.05); */
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
  margin-bottom: 1rem;
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

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #94c4f7;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(20px);
  outline: none;
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #94c4f7;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-3px);
}

.back-to-top:active {
  transform: scale(0.95);
}

.back-to-top svg {
  width: 1.5rem;
  height: 1.5rem;
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