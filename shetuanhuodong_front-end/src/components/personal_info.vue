<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
      <div class="user_icon">
        <img src="../assets/活动图标.jpg" alt="">
      </div>
      <form>
        <p><span class="text-primary">昵称： </span><span>{{ this.username }}</span>
          <span @click="change_name" class="change">点击修改</span></p>
        <p><span class="text-primary">性别： </span><span>{{ this.gender }}</span>
          <span @click="change_sex" class="change">点击修改</span></p>
        <p><span class="text-primary">个人简介： </span><div class="self_introduction">{{ this.introduction }}</div>
          <span @click="change_introduction" class="change">点击修改</span></p>
        <p><span class="text-primary">已上传时间安排： </span>
          <span v-if="whether_upload==false">未上传  </span>
          <span v-if="whether_upload==true">已上传  </span>
          <span @click="go_to_upload" class="change">点击前往上传</span></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'personal_info',
    methods: {
      change_name(){
        var that = this;
        var new_name = prompt("请输入新的昵称：");
        if(new_name!=null){
          axios.post('http://localhost:8000/home/change_name/',{
            username: that.username,
            new_username : new_name
          })
          .then(function(response){
              if(response.data==true){
                alert('修改成功!')
               }else{
                alert('修改失败!')
               };
               that.Name.username = new_name;
               that.username = new_name;
          }).catch(function(err){
              console.log(err);
          });
        };
      },
      change_sex(){
        var that = this;
        var sex = prompt("请输入性别：");
        if(sex!=null){
          axios.post('http://localhost:8000/home/change_sex/',{
            username: that.username,
            sex : sex
          })
          .then(function(response){
              if(response.data==true){
                alert('修改成功!')
               }else{
                alert('修改失败!')
               };
               that.gender = sex;
          }).catch(function(err){
              console.log(err);
          });
        };
      },
      change_introduction(){
        var that = this;
        var introduction = prompt("请输入个人简介：");
        if(introduction!=null){
          axios.post('http://localhost:8000/home/change_introduction/',{
            username: that.username,
            introduction : introduction
          })
          .then(function(response){
              if(response.data==true){
                alert('修改成功!')
               }else{
                alert('修改失败!')
               };
               that.introduction = introduction;
          }).catch(function(err){
              console.log(err);
          });
        };
      },
      go_to_upload(){
        this.$router.push({
                path: '/home/upload_time',
                query:{username: this.username}
                })
      },
      back(){
       this.$router.push({
                path: '/home/me',
                query:{username: this.username}
            });
      },
      get_data(){
        var that = this
        axios.post('http://localhost:8000/home/personal_info/',{
          username: that.username,
        })
        .then(function(response){
            that.gender = response.data.user_gender;
            that.introduction = response.data.user_introduction
            that.whether_upload = response.data.whether_upload
        }).catch(function(err){
            console.log(err);
        });
      }
    },
    data(){
      return{
        username: this.Name.username,
        gender:'',
        introduction:'',
        whether_upload:false
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
}
.back{
height: 30px;
}
form .text-primary{
font-size:20px;
font-weight: bold;
}
.user_icon{
margin:0 0 10px 0;
background-color:  #f8a400;
height:120px;
width: 100%;
text-align: center;
}
.user_icon img{
border-radius: 100px;
height: 100px;
width:100px;
margin-top: 10px;
}
.change{
font-size: 10px;
float: right;
color: blue;
}
.self_introduction{
display: inline-block;
background-color: grey;
border-radius: 15px;
padding: 10px;
height:250px;
width: 280px;
}
</style>
