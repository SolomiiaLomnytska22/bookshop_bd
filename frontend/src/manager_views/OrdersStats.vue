<template>
    <div class="graphs">
      <div class="graph">
        <h3>Orders Distribution By Countries </h3>
        <div><Pie v-if="countries_data.datasets.length" :data="countries_data" :options="options"/></div>
      </div>
      <div class="graph">
        <h3>Top 5 Best Sold Books</h3>
        <div><Bar width="500px" height="300px" v-if="books_data.datasets.length" :data="books_data" :options="options"/></div>
      </div>
      <div class="orders"> 
        <h3>Orders Statystics</h3>
        <input type="date" v-model="start_date">
        <input type="date" v-model="end_date">
        <button @click="showOrderStats">Show Data</button>
        <div class="graph">
          <Line width="500px" height="300px" v-if="order_data.datasets.length" :data="order_data" :options="options"/>
          <p v-else-if="display_message">No Data Found for this dates!</p>
        </div>

      </div>
    </div>
     
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import {
  Title,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import {
  PointElement,
  LineElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ChartJS.register(ArcElement, Tooltip, Legend)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { getCountryStats, getTop5Books, getOrdersStats } from '../services/Stats'


export default {
  components: {
    Pie,
    Bar,
    Line
  },
  data(){
    return {
        countries_data: {
            labels: [],
            datasets: []
        },
        books_data: {
            labels: [],
            datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        start_date: '2024-01-01',
        end_date: '2024-05-03',
        order_data: {
            labels: [],
            datasets: []
        },
        display_message: false
    }
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
        this.countries_data.labels.push(stat.country)
        graph_data.data.push(stat.ordercount)
    })

    this.countries_data.datasets.push(graph_data)

    const book_stats =  await getTop5Books()
    const book_data = {
        label: 'Books Sold',
        data: [],
        backgroundColor: [
        "#3f1f1f", 
        "#573030",
        "#704545",
        "#895959",
        "#a26e6e",
        ]
    }

    book_stats.forEach(stat =>{
        this.books_data.labels.push(stat.title)
        book_data.data.push(stat.total_quantity_sold)
    })

    this.books_data.datasets.push(book_data)
    await this.showOrderStats()
  },
  methods:{
    async showOrderStats(){
      if(this.start_date && this.end_date){
        const res = await getOrdersStats(this.start_date, this.end_date)
          if (!res.length){
             this.display_message = true
             this.order_data.datasets = []
          } else {
            this.order_data = {
            labels: [],
            datasets: []
          }
          this.display_message = false
          const display_data = {
            label: 'Orders Quantity',
            data: [],
            backgroundColor: [
            "#3f1f1f", 
            "#573030",
            "#704545",
            "#895959",
            "#a26e6e",
            ]
        }

        res.forEach(stat =>{
            this.order_data.labels.push(stat.order_date)
            display_data.data.push(stat.total_quantity)
        })

        this.order_data.datasets.push(display_data)
        

        }
      }
    }
  }
}
</script>

<style>
.graphs{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 120px 0;
}
.graph{
  margin: 20px;
}

input[type="date"] {
        padding: 5px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
.orders{
  padding: 5% 0;
}
    button {
        padding: 5px 10px;
        background-color: #3f1f1f;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button:hover {
        background-color: #1e1e1e;
    }
</style>