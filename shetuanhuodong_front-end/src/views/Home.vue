<template>
    <div class="container">
        <div class="header">
            <div class="logo">
                <h1>设团活动</h1>
            </div>
        </div>
        <router-view>
            <!--      渲染的内容-->
        </router-view>
        <footer>
            <div class="btn-group btn-group-justified" role="group" aria-label="">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info" @click="to_home"><span
                            class="glyphicon glyphicon-home"></span>首页
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info" @click="to_activity"><span
                            class="glyphicon glyphicon-check"></span> 活动
                    </button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-info" @click="to_team"><span
                            class="glyphicon glyphicon-flag"></span> 团队
                    </button>
                </div>
                <div class="btn-group" role="group">

                    <button type="button" class="btn btn-info" @click="to_me"><span
                            class="glyphicon glyphicon-user"></span> 我的
                    </button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    to_home(){
    this.$router.push({path: '/home'})
    },
        to_activity(){
    this.$router.push({path: '/home/activity'})
    },
        to_team(){
    this.$router.push({path: '/home/team'})
    },
        to_me(){
    this.$router.push({path: '/home/me'})
    }
  },
  data(){
    return{
      username: this.Name.username,
    }
  }
}

</script>

<style scoped>
body{
    height: 100vh;
    width: 100vw;
}
.app {
margin: 0;
padding: 0;
}
.container{
height: 100vh;
padding: 0;
background-color: #5bc0de;
}
@media screen and (min-width:1280px){
    .container{
        width: 1280px;
    }
}


.logo{
height: 80px;
color: white;
text-align: center;
margin: 0;
padding-top:1px;
}

footer {
position:fixed;
top:calc(100vh - 50px);
height: 50px;
padding: 0;
width: 100%;
}
footer div{
padding: 0;
margin:0;
height:100%;
width: 100%;
}
footer div div{
height:100%;
}
footer div div button{
height:100%;
}


</style>