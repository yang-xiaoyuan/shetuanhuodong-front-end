<template>
    <div class="content">
        <form class="search-bar" role="search">
            <input type="button" class="btn" value="搜索" @click="search_status">
            <input type="text" class="search-text" placeholder="请输入活动名称" v-model="search_content">
        </form>
        <h3 class="text-primary">{{ this.Name.username }}近期参加的活动及时间：</h3>
        <div class="activities" v-for="item in activities">
            <router-link :to="{path:'/home/activity_info', query:{activity: item[0]}}">
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
        <div class="search_board" v-if="isShow">
            <div class="search_results">
                <h2>搜索结果</h2>
                <div class="search_result" v-for="x in search_resulted">
                    <router-link :to="{path:'/home/sign_in_activity', query:{activity: x.name}}">
                    <p class="result_title">{{ x.name }}</p>
                    <p class="result_content"><span>时间：{{ x.time }}</span></p>
                    <p class="result_content"><span>地点：{{ x.location }}</span></p>
                    <p class="result_content"><span>发起者：{{ x.launcher }}</span></p>
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
  name: 'home',
  methods: {
    hide(){
      this.isShow = false;
    },
    search_status(){
      var that = this;
      axios.post('http://localhost:8000/home/search_for_activity/',{
        activity_name: that.search_content,
      })
      .then(function(response){
          that.search_resulted = response.data;
          that.isShow = true;
      }).catch(function(err){
          console.log(err);
      });

    },
    get_data(){
      var that = this
      axios.post('http://localhost:8000/home/',{
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
      activities: [],
      isShow: false,
      search_content:'',
      search_resulted:[]
    }
  },
  mounted(){
    this.get_data();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
margin: 20px 10px 0 10px;
height: calc(100vh - 130px);
overflow-y: auto;
background-color: #f7f7ef;
}
.activities{
border-radius: 5px;
margin-bottom: 10px;
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
.search-text{
width: 130px;
vertical-align: middle;
float:right;
height: 34px;
margin: 0 8px;
padding: 0;
border-radius: 8px;
}
.btn{
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    float:right;
}
.search-bar{
padding:5px 10px 0 10px;
height:55px;
}
h3 {
margin-top: 0;
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
.result_title{
font-size: 20px;
font-weight: bold;
color: white;
}
.result_content{
font-size: 13px;
color: white;
}
.search_result p{
margin: 0 0 0 10px;
}

</style>
