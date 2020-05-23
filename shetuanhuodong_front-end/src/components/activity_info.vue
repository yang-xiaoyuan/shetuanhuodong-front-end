<template>
    <div class="content">
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
                    <input type="button" value="查看参与人员" v-if="launcher==username" class="btn btn-info left_button"
                           @click="show_people_in_activity">
                    <input type="button" value="删除活动" v-if="launcher==username" class="btn btn-info left_button"
                           @click="delete_activity_check">
                    <input type="button" value="退出活动" class="btn btn-info left_button" @click="sign_out_check">
                </p>
            </form>
        </div>
        <div class="search_board" v-if="isShow">
            <div class="search_results">
                <h2>参与人员（共{{this.participants.length}}人）</h2>
                <div class="member" v-for="item in participants">
                    <router-link :to="{path:'/home/users', query:{user_name: item, nickname: false}}">
                        <img src="../assets/活动图标.jpg" alt="">
                        <p>{{ item }}</p>
                    </router-link>
                </div>
            </div>
            <div class="mask" @click='hide'></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'activity_info',
  methods: {
    hide(){
      this.isShow = false;
    },
    show_people_in_activity(){
        var that = this;
      axios.post('http://localhost:8000/home/show_people_in_activity/',{
        activity: that.activity,
    })
    .then(function(response){
        that.participants = response.data;
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    },
    delete_activity_check(){
        if (confirm("确定删除该活动？")){
            var that = this;
            this.$options.methods.delete_activity(this.name, this.username, that);
        }
    },
    delete_activity(name,username,that){
        axios.post('http://localhost:8000/home/delete_activity/',{
            activity: name,
        })
    .then(function(response){
        if(response.data=='deleted'){
            alert('已删除该活动！');
            that.$router.push({path: '/home'});
        }
    }).catch(function(err){
        console.log(err);
    });
    },
    sign_out_check(){
        if (confirm("确定退出该活动？")){
            var that = this;
            this.$options.methods.sign_out(this.name,this.Name.username, that);
        }
    },
    sign_out(name,username,that){
        axios.post('http://localhost:8000/home/sign_out_activity/',{
            activity: name,
            user_name:username
        })
    .then(function(response){
        console.log(response.data)
        if(response.data=='deleted'){
            alert('已退出该活动！')
            that.$router.push({path: '/home'})
        }
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
        that.name = response.data.name
        that.content = response.data.content
        that.launcher = response.data.launcher
        that.location = response.data.location
        that.requirement = response.data.requirement
        that.team = response.data.team
        that.time = response.data.time
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
      isShow: false,
      participants: []
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
.left_button{
margin: 0 8px;
}
.mask{
    background-color: #666666;
    z-index: 1;
    position: fixed;
    left: 0px;
    top: 100px;
    width: 100%;
    height: 100%;
    opacity: 0.9;
}
.search_board{
    position: fixed;
    left: 0px;
    top: 100px;
    width: 100%;
    height: 100%;
}
.search_results{
    position: fixed;
    top: 175px;
    width: 70%;
    left: 15%;
    height: 500px;
    z-index: 2;
    background-color: white;
    border-radius: 20px;
    overflow-y: auto;
    text-align: center;
}
.search_result{
margin: 10px 0;
padding: 10px;
background-color: grey;
text-align: left;
}
.member img{
border-radius: 100px;
height: 50px;
width:50px;
margin: 0;
}
.member{
padding:0;
margin: 15px 10px;
display: inline-block;
}
.left_button{
margin-bottom: 20px;
}

</style>
