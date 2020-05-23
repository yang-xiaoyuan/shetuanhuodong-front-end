<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
      <p class="label label-primary">团队活动时间推荐</p>
      <div v-show="isShow">
      <img :src="imgURL" class="result_picture">
      <p>综合判断，您的团队最好的活动时间是：</p>
      <ol>
        <li v-for="item in recommends">周{{item[2]}} {{item[1]}} ({{item[0]}})</li>
      </ol>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'team_info',
  methods: {
    back(){
      this.$router.go(-1);
    },
    get_data(){
      var that = this;
      axios.post('http://localhost:8000/home/results/',{
        team_name: that.team_name,

    })
    .then(function(response){
        that.imgURL = that.imgURL + String(response.data)
    }).catch(function(err){
        console.log(err);
    });
      axios.post('http://localhost:8000/home/results2/',{
        team_name: that.team_name,
    })
    .then(function(response){
        console.log(response);
        that.recommends = response.data
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      username: this.Name.username,
      team_name: this.Name.team,
      isShow: false,
      imgURL:"data:image/jpg;base64,",
      recommends:[]
    }
  },
  mounted(){
    this.get_data()
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
padding: 5px 15px 0 15px;
margin-bottom: 20px;
min-height: 400px;
}
.back{
height: 30px;
}
.label{
font-size:22px;
}
.result_picture{
width: 100%;
height: 200px;
}

</style>
