<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
      <p class="label label-primary">{{ this.Name.username }}曾经参与过的活动</p>
<div class="activities" v-for="item in activities">
      <router-link :to="{path:'/home/previous_activity_info', query:{activity: item[0]}}">
        <div class="up_part">
          <img src="../assets/活动图标.jpg" alt="">
          <div>
            <h3>{{ item[0] }}</h3>
            <p class="text-muted">{{ item[1] }}</p>
          </div>
        </div>
      </router-link>
      <div class="down_part"></div>
    </div>
    </div>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'previous_activities',
  methods: {
    back(){
     this.$router.go(-1);
    },
    get_data(){
      var that = this
      axios.post('http://localhost:8000/home/previous_activities/',{
        username: that.Name.username,
    })
    .then(function(response){
        that.activities = response.data
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      activities: []
    }
  },
  mounted(){
    this.get_data();
  }
}
</script>

<style scoped>
.content{
margin: 20px 10px 0 10px;
height: calc(100vh - 130px);
overflow-y: auto;
background-color: #f7f7ef;
padding:0 5px;
}
.information{
border: 1px solid black;
border-radius: 10px;
width: 100%;
margin: 0 auto;
background-color:white;
padding: 5px 15px 10px 15px;
margin-bottom: 20px;
}
.back{
height: 30px;
}
.activities{
border-radius: 5px;
margin-top: 15px;
}
.up_part{
background-color: #eaeaea;
height: 90px;
}
.down_part{
background-color: #c0c0c0;
height: 35px;
padding: 0;
}
.up_part img{
height: 90px;
width: 90px;
float:left;
}
.up_part div{
float:left;
padding: 5px 0 0 10px;
}
.label{
font-size:22px;
}

</style>
