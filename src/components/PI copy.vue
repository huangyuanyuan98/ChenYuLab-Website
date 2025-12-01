<template>
    <div class="academic-profile">
      <div class="header">
        <h1>Yu CHEN 陈禹</h1>
        <div class="title">
          PhD, PI, Professor<br>
          Shenzhen Institutes of Advanced Technology (SIAT)<br>
          Chinese Academy of Sciences (CAS)
        </div>
      </div>
  
      <div class="section">
        <h2><i class="fas fa-graduation-cap"></i> Education & Degrees</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="year">June 2018</div>
            <div class="content">
              <strong>Ph.D. in Biochemical engineering</strong><br>
              East China University of Science and Technology
            </div>
          </div>
          <div class="timeline-item">
            <div class="year">June 2012</div>
            <div class="content">
              <strong>B.E. in Bioengineering</strong><br>
              Huazhong Agricultural University
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2><i class="fas fa-briefcase"></i> Positions</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="year">July 2024 – Present</div>
            <div class="content">
              <strong>Adjunct professor</strong><br>
              Shenzhen University of Advanced Technology
            </div>
          </div>
          <div class="timeline-item">
            <div class="year">Dec 2023 – Present</div>
            <div class="content">
              <strong>Professor</strong><br>
              SIAT, CAS
            </div>
          </div>
          <div class="timeline-item">
            <div class="year">Feb 2023 – Dec 2023</div>
            <div class="content">
              <strong>Associate professor</strong><br>
              SIAT, CAS
            </div>
          </div>
          <div class="timeline-item">
            <div class="year">Feb 2018 – Dec 2022</div>
            <div class="content">
              <strong>Post doc</strong><br>
              Chalmers University of Technology
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2><i class="fas fa-book"></i> Key Publications</h2>
        <div class="publications">
          <div class="publication">
            <div class="pub-number">1.</div>
            <div class="pub-content">
              <strong>Reconstruction, simulation and analysis of enzyme-constrained metabolic models using GECKO Toolbox 3.0.</strong><br>
              <em>Nat Protoc</em> (2024) [ESI Highly Cited Paper, highlighted by Nature Reviews Genetics & Current Opinion]
            </div>
          </div>
          <div class="publication">
            <div class="pub-number">2.</div>
            <div class="pub-content">
              <strong>Yeast has evolved to minimize protein resource cost for synthesizing amino acids.</strong><br>
              <em>PNAS</em> (2022)
            </div>
          </div>
          <div class="publication">
            <div class="pub-number">3.</div>
            <div class="pub-content">
              <strong>In vitro turnover numbers do not reflect in vivo activities of yeast enzymes.</strong><br>
              <em>PNAS</em> (2021) [highlighted by Current Opinion, and recommended in Faculty Opinions]
            </div>
          </div>
          <div class="publication">
            <div class="pub-number">4.</div>
            <div class="pub-content">
              <strong>Proteome constraints reveal targets for improving microbial fitness in nutrient-rich environments.</strong><br>
              <em>Mol Syst Biol</em> (2021)
            </div>
          </div>
          <div class="publication">
            <div class="pub-number">5.</div>
            <div class="pub-content">
              <strong>Yeast optimizes metal utilization based on metabolic network and enzyme kinetics.</strong><br>
              <em>PNAS</em> (2021) [highlighted by Current Opinion, and picked up by Mirage News]
            </div>
          </div>
          <div class="publication">
            <div class="pub-number">6.</div>
            <div class="pub-content">
              <strong>Energy metabolism controls phenotypes by protein efficiency and allocation.</strong><br>
              <em>PNAS</em> (2019) [recommended in Faculty Opinions, and picked up by ScienceDaily etc.]
            </div>
          </div>
        </div>
      </div>

      <div class="grants-section">
        <h2 class="section-title">Research Grants</h2>
        <div class="grants-table-container">
        <table class="grants-table">
            <thead>
            <tr>
                <th class="period-column">Period</th>
                <th class="program-column">Program</th>
                <th class="amount-column">Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(grant, index) in grants" :key="index">
                <td class="period">{{ grant.period }}</td>
                <td class="program">{{ grant.program }}</td>
                <td class="amount">{{ grant.amount }}</td>
            </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
  </template>
  <script>
  
  import grantsData from '../assets/data/grants.js'

  export default {
    name: 'AcademicProfile',
    data() {
    return {
      grants: grantsData,
    }
  }
  }
  </script>
  
  <style scoped>
  .academic-profile {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 1.5rem;
  }
  
  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  /* .chinese-name {
    font-size: 1.8rem;
    color: #666;
  } */
  
  .title {
    font-size: 1.1rem;
    color: #555;
    margin-top: 0.5rem;
  }
  
  .contact-info {
    background-color: #f8f9fa;
    padding: 1.2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .email {
    margin-bottom: 0.8rem;
  }
  
  .ids {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .section {
    margin-bottom: 2.5rem;
  }
  
  h2 {
    font-size: 1.4rem;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .timeline {
    position: relative;
    padding-left: 2rem;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #eaeaea;
  }
  
  .timeline-item {
    display: flex;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .year {
    width: 180px;
    font-weight: 500;
    color: #555;
    margin-left: 20px;
  }
  
  .content {
    flex: 1;
    padding-left: 1rem;
  }
  
  .timeline-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3498db;
    z-index: 1;
  }
  
  .publications {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .publication {
    display: flex;
    gap: 0.8rem;
  }
  
  .pub-number {
    font-weight: bold;
  }
  
  .pub-content {
    flex: 1;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .fas, .fab {
    margin-right: 0.5rem;
    color: #555;
  }
  
  .grants-section {
  margin: 2rem 0;
  font-family: 'Arial', sans-serif;
  }

  .section-title {
    color: #2c3e50;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .grants-table-container {
    overflow-x: auto;
  }

  .grants-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .grants-table th {
    background-color: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
    text-align: left;
    padding: 1rem;
    border-bottom: 2px solid #eaeaea;
  }

  .grants-table td {
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
    vertical-align: top;
  }

  .grants-table tr:last-child td {
    border-bottom: none;
  }

  .grants-table tr:hover {
    background-color: #f8f9fa;
  }

  .period-column {
    width: 20%;
    min-width: 150px;
  }

  .program-column {
    width: 60%;
  }

  .amount-column {
    width: 20%;
    text-align: right;
  }

  .period {
    font-weight: 500;
    color: #555;
  }

  .program {
    color: #333;
  }

  .amount {
    font-weight: 500;
    color: #2c3e50;
  }
  @media (max-width: 768px) {
    .academic-profile {
      padding: 1rem;
    }
    
    .ids {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .timeline-item {
      flex-direction: column;
    }
    
    .year {
      margin-bottom: 0.3rem;
    }

    .grants-table th,
    .grants-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.9rem;
    }
    
    .period-column {
      width: 25%;
    }
    
    .program-column {
      width: 50%;
    }
    
    .amount-column {
      width: 25%;
    }
    
  }


  </style>