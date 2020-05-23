<template>
    <div class="container">
        <div class="login">
            <h2>登录</h2>
            <input type="text" placeholder="请输入用户名" v-model="username"/>
            <input type="password" placeholder="请输入密码" v-model="password"/>
            <button @click="login" @keyup.enter="login">登录</button>
            <p>
                <router-link to="register">没有账号？马上注册</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    login(username, password){
    var that = this
    if(!username){
        alert('请输入用户名！')
    }else{
    axios.post('http://localhost:8000',{
        username: this.username,
        password: this.password
    })
    .then(function(response){
        if(response.data == true){
            that.Name.username = that.username,
            that.$router.push({
                path: '/home',
                name: 'home',
            })
        }else{
            alert('用户名或密码错误！');
            that.username = '';
            that.password = '';
            console.log(response)
        };
    }).catch(function(err){
        console.log(err);
    });
    }
    },
    register(){
    this.$router.push('/register').catch(data => {  })
    }
  },
  data(){
    return{
        username:"",
        password:""
    }
  }
}
</script>

<style scoped>
.container{
margin: 0;
padding: 200px 0;
height: 100vh;
background-image:url("../assets/background-image.jpg");
background-repeat: no-repeat;
-moz-background-size:100% 100%;
background-size:100% 100%;
}
@media screen and (min-width:1280px){
    .container{
        width: 1280px;
    }
}


.login {
  margin: 0 auto;
  padding:10px;
  width: 70%;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  text-align: center;
}
h2{
margin-bottom: 20px;
margin-top: 0;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}



</style>
