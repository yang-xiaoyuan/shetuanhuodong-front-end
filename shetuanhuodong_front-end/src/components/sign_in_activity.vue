<template>
  <div class="content" v-if="isShow">
<div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
<form>
        <p><span class="text-primary">活动名称： </span><span>{{ this.name }}</span></p>
        <p><span class="text-primary">活动时间： </span><span>{{ this.time }}</span></p>
        <p><span class="text-primary">活动地点： </span><span>{{ this.location }}</span></p>
        <p><span class="text-primary">活动内容： </span><span>{{ this.content }}</span></p>
        <p><span class="text-primary">活动要求： </span><span>{{ this.requirement }}</span></p>
        <p><span class="text-primary">发起人： </span><span>{{ this.launcher }}</span></p>
        <p><span class="text-primary">团队： </span><span>{{ this.team }}</span></p>
        <p class="choices">
<input type="button" value="加入活动" class="btn btn-info left_button" @click="sign_in" v-show="show_sign_in">
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'activity_info',
  methods: {
    sign_in(){
        var that = this;
        axios.post('http://localhost:8000/home/sign_in_activity/',{
            activity: that.activity,
            username: that.Name.username
        })
        .then(function(response){
            if(response.data=='have_been_in'){
                alert('您已参加该活动！');
            };
            if(response.data=='sign_in'){
                alert('加入成功！');
            };
    }).catch(function(err){
        console.log(err);
    });
    },
    back(){
      this.$router.go(-1);
    },
    get_data(){
      var that = this;
      axios.post('http://localhost:8000/home/activity_info/',{
        activity: that.activity,
    })
    .then(function(response){
        that.name = response.data.name;
        that.content = response.data.content;
        that.launcher = response.data.launcher;
        that.location = response.data.location;
        that.requirement = response.data.requirement;
        that.team = response.data.team;
        that.time = response.data.time;
        for(var i=0;i<response.data.activity_users.length;i++){
            if(response.data.activity_users[i] == that.username){
                that.show_sign_in = false;
            }
        }
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      activity: this.$route.query.activity,
      username: this.Name.username,
      name:'',
      content:'',
      launcher:'',
      location:'',
      requirement:'',
      team:'',
      time:'',
      show_sign_in: true,
      isShow: false
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

</style>
