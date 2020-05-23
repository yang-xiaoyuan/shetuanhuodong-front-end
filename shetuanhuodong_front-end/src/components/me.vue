
<template>
  <div class="content">
    <div class="user_name">
      <img src="../assets/活动图标.jpg" alt="">
      <div>
        <h3>{{ this.username }}</h3>
        <p class="text-muted">创建时间：{{ this.create_time }}</p>
      </div>
    </div>
    <div class="options">
<div class="option"><router-link :to="{path:'/home/personal_info'}">
  <span class="glyphicon glyphicon-cog"></span>
  <span>个人信息</span>
  <span class="glyphicon glyphicon-menu-right"></span>
  </router-link></div>
      <div class="option"><router-link :to="{path:'/home/upload_time'}">
  <span class="glyphicon glyphicon-calendar"></span>
  <span>上传时间（修改）</span>
  <span class="glyphicon glyphicon-menu-right"></span>
  </router-link></div>
      <div class="option"><router-link :to="{path:'/home/previous_activities'}">
  <span class="glyphicon glyphicon-list-alt"></span>
  <span>往期活动记录</span>
  <span class="glyphicon glyphicon-menu-right"></span>
  </router-link></div>
      <div class="option"><router-link to="/home/help">
  <span class="glyphicon glyphicon-question-sign"></span>
  <span>帮助</span>
  <span class="glyphicon glyphicon-menu-right"></span>
  </router-link></div>
      <div class="option"><router-link to="/">
  <span class="glyphicon glyphicon-question-sign"></span>
  <span>退出登录</span>
  </router-link></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'me',
  methods: {
    get_data(){
      var that = this
      axios.post('http://localhost:8000/home/me/',{
        username: that.Name.username,
    })
    .then(function(response){
        that.create_time = response.data
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      username: this.Name.username,
      create_time:''
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
padding: 0;
}
.options{
border: 1px solid black;
border-radius: 10px;
width: 96%;
height: 300px;
margin: 0 auto;
background-color:white;
padding: 15px;
}
.user_name{
margin:0 0 10px 0;
background-color:  #f8a400;
height:150px;
width: 100%;
}
.user_name img{
border-radius: 100px;
height: 100px;
width:100px;
margin: 20px 30px 10px 20px;
}
.user_name div{
display: inline-block;
color: white;
}
.glyphicon-menu-right{
float:right;
}
.option{
height: 40px;
font-size:18px;
margin-bottom: 15px;
border-bottom: 1px solid #666666;
}
.option a{
text-decoration: none;
}

</style>
