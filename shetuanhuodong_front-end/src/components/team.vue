<template>
    <div class="content">
        <div class="my_team">
            <p class="label label-primary">我的团队</p>
            <ul>
                <li v-for="item in teams">
                    <p @click="select_team(item)">{{ item }}</p>
                </li>
            </ul>
        </div>
        <div class="create_team">
            <p class="label label-primary">创建团队</p>
            <div>
                <button type="button" @click="create_team" class="btn btn-success">创建团队</button>
            </div>
        </div>
        <div class="search_team">
            <p class="label label-primary">搜索团队</p>
            <div>
                <input type="text" class="search_team_text" placeholder="请输入团队名称" v-model="search_content">
                <input type="button" class="btn btn_search" value="搜索" @click="search_team">
            </div>
        </div>
        <div class="friends">
            <div>
                <p class="label label-primary">我的好友</p>
                <div class="search_bar" role="search">
                    <input type="button" class="btn btn_search" value="搜索" @click="search_status">
                    <input type="text" class="search-text" placeholder="请输入昵称" v-model="search_content">
                </div>
            </div>
            <div class="member" v-for="item in friends">
                <router-link :to="{path:'/home/users', query:{user_name: item, nickname: false}}">
                    <img src="../assets/活动图标.jpg" alt="">
                    <p>{{ item }}</p>
                </router-link>
            </div>
            <div class="add_friends" v-if="show_to_add_friends">
                <div v-for="item in to_add_friends" class="add_friend">
                    <p>{{item[0]}}请求添加为好友 </p>
                    <p>验证消息：{{item[1]}}</p>
                    <input type="button" value="同意" class="response" @click="response('consent', item[0])">
                    <input type="button" value="拒绝" class="response" @click="response('dissent', item[0])">
                </div>
            </div>
        </div>
        <div class="search_board" v-if="isShow">
            <div class="search_results">
                <h2>搜索结果</h2>
                <div class="search_result member" v-for="item in search_results" v-show="search_results">
                    <router-link :to="{path:'/home/users', query:{user_name: item, nickname: false}}">
                        <img src="../assets/活动图标.jpg" alt="">
                        <p>{{ item }}</p>
                    </router-link>
                </div>
                <div class="search_result no_result" v-show="show_no_match">
                    <p>抱歉，未找到结果！</p>
                </div>
            </div>
            <div class="mask" @click='hide'></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'team',
  methods: {
    hide(){
      this.isShow = false;
      this.show_no_match = false;
    },
    search_team(){
        var that = this;
      axios.post('http://localhost:8000/home/search_team/',{
        team_name: that.search_content
      })
      .then(function(response){
        console.log(response)
      }).catch(function(err){
          console.log(err);
      });
    },
    response(choice, user){
      var that = this;
      axios.post('http://localhost:8000/home/response/',{
        user: that.username,
        target_user: user,
        choice: choice
      })
      .then(function(response){
        if(response.data=="ok"){
          that.show_to_add_friends = false;
          }
      }).catch(function(err){
          console.log(err);
      });
    },
    search_status(){
      var that = this;
      axios.post('http://localhost:8000/home/search_for_users/',{
        user: that.search_content
      })
      .then(function(response){
          if(response.data!='No'){
              that.search_results = response.data;
          };
          if(response.data=='No'){
              that.show_no_match = true;
          };
          that.isShow = true;
      }).catch(function(err){
          console.log(err);
      });
    },
    select_team(item){
      this.Name.team = item;
      this.$router.push({path: '/home/team_info'})
    },
    create_team(){
      this.$router.push({path: '/home/create_team'})
    },
    get_data(){
      var that = this
      axios.post('http://localhost:8000/home/team/',{
        username: that.username,
    })
    .then(function(response){
        that.friends = response.data[0];
        that.teams = response.data[1];
        that.to_add_friends = response.data[2];
        if(that.to_add_friends.length>=1){
            that.show_to_add_friends = true;
        }
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      username: this.Name.username,
      friends:[],
      teams:[],
      search_content: '',
      isShow: false,
      search_results: [],
      show_no_match: false,
      to_add_friends: [],
      show_to_add_friends: false
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
.my_team, .create_team, .friends, .search_team{
border: 1px solid black;
border-radius: 10px;
width: 100%;
margin: 0 auto;
background-color:white;
padding: 0 15px 0 15px;
margin-bottom: 20px;
}
.label{
font-size:22px;
display: inline-block;
}
.my_team li{
font-size: 20px;
border-bottom: 1px solid #666666;
list-style: none;
height: 30px;
}
.my_team ul{
margin:20px 0 0 0;
padding-left: 0;
}
.create_team div{
margin-top: 15px;
}
.create_team{
padding-bottom: 15px;
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
.search-text{
width: 100px;
vertical-align: middle;
float:right;
padding: 0;
border-radius: 10px;
}
.btn_search{
    border-radius: 4px;
    float:right;
    height: 26px;
    margin-left:10px;
    padding:3px 8px;
}
.search_bar{
height:auto;
display: inline-block;
float: right;
margin-top: 5px;
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
.no_result{
margin-top: 100px;
}
.response{
margin: 0 10px;
}
.add_friend{
margin: 10px 0;
border: 1px dotted blue;
}
.search_team_text{
width: 80%;
margin-bottom: 20px;
}

</style>
