<template>
  <div class="container">
    <div class="register_form">
      <h2>用户注册</h2>
      <input type="text" placeholder="请输入手机号" v-model="newUsernumber"/>
      <input type="text" placeholder="请输入用户名（昵称）" v-model="newUsername"/>
      <input type="password" placeholder="请输入密码" v-model="newPassword"/>
      <input type="password" placeholder="请再次输入密码" v-model="newPasswordCopy"/>
      <button @click="register">注册</button>
      <p>
        <router-link to="/">已有账号？马上登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    register(){
    var that = this;
    if(!this.newUsernumber){
        alert('请输入手机号！')
    }else if(!this.newUsername){
        alert('请输入用户名！')
    }else if(!this.newPassword){
        alert('请输入密码！')
    }else if(this.newPassword!=this.newPasswordCopy){
        alert('请输入相同的密码！');
        this.newPassword="";
        this.newPasswordCopy="";
    }else{
    axios.post('http://localhost:8000/register/',{
        username:this.newUsername,
        password: this.newPassword,
        phone_number: this.newUsernumber
    })
    .then(function(response){
        if(response.data == true){
            alert('注册成功！');
            that.$router.push({
                path: '/',
            })
        }else{
            console.log(response)
            alert('注册失败请重试！');
        };
    }).catch(function(err){
        console.log(err);
    });
    }
    }
  },
  data(){
  return{
    newUsernumber:"",
    newUsername:"",
    newPassword:"",
    newPasswordCopy:""
  }
  }
}
</script>

<style scoped>
.container{
height: 100vh;
padding: 200px 0;
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


.register_form {
  margin: 0 auto;
  padding:10px;
  width: 70%;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
}
h2 {
margin-bottom: 20px;
margin-top: 0;
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
