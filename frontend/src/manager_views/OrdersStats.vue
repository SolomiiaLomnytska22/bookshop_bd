<template>
    <div class="graphs">
        <h3>Orders Distribution By Countries </h3>
        <div><Pie v-if="data.datasets.length" :data="data" :options="options"/></div>
    </div>
     
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { getCountryStats } from '../services/Stats'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  props: {

  },
  components: {
    Pie
  },
  data(){
    return {
        data: {
            labels: [],
            datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
    }
  },
  _get_random_number() {
    return Math.floor(Math.random() * 16);
  },
  async mounted(){
    const country_stats =  await getCountryStats()
    const graph_data = {
        data: [],
        backgroundColor: [
        "#3f1f1f", 
        "#573030",
        "#704545",
        "#895959",
        "#a26e6e",
        "#ae7979"
        ]
    }

    country_stats.forEach(stat =>{
        this.data.labels.push(stat.country)
        graph_data.data.push(stat.ordercount)
    })

    this.data.datasets.push(graph_data)
  
    

  }
}
</script>

<style>
.graphs{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 120px;
}
</style>