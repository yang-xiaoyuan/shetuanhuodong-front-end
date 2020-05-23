<template>
    <div class="content" v-if="isShow">
        <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
        <div class="information">
            <div class="user_icon">
                <img src="../assets/活动图标.jpg" alt="">
            </div>
            <form>
                <p><span class="text-primary">昵称： </span><span>{{ this.username }}</span></p>
                <p><span class="text-primary">性别： </span><span>{{ this.sex }}</span></p>
                <p><span class="text-primary">个人简介： </span><span>{{ this.self_introduction }}</span></p>
                <p><span class="text-primary">上传时间安排： </span>
                    <span v-if="whether_upload==false">未上传  </span>
                    <span v-if="whether_upload==true">已上传  </span>
                </p>
                <input type="button" value="加为好友" v-if="show_add_friends" class="btn btn-info left_button"
                           @click="input_verification">
                <div v-show="show_verify" class="input_verification">
                    <p>请输入验证消息：</p>
                <input type="text" class="text" v-model="verify_message">
                    <input type="button" value="发送" @click="send_verify">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'users',
  methods: {
    input_verification(){
        this.show_verify = true;
    },
    send_verify(){
        var that = this;
      axios.post('http://localhost:8000/home/send_verify/',{
        username: that.username,
        user_name: that.user_name,
        verify_message: that.verify_message
    })
    .then(function(response){
        if(response.data=='ok'){
            alert('已发送申请！');
            that.show_verify = false;
        };
        that.whether_upload = response.data.whether_upload
    }).catch(function(err){
        console.log(err);
    });
    },
    back(){
      this.$router.go(-1);
    },
    get_data(){
      var that = this;
      axios.post('http://localhost:8000/home/check_friends/',{
        user: that.user_name,
    })
    .then(function(response){
        if(response.data!='No'){
            that.friends = response.data
            if(that.user_name==that.username){
                that.show_add_friends = false;
            }
            for(var i=0;i<that.friends.length;i++){
                if(that.friends[i]==that.username){
                    that.show_add_friends = false;
                }
            }
        }else if(response.data=='No'){
            that.friends = []
        }
    }).catch(function(err){
        console.log(err);
    });
      if(!that.whether_nick_name){
      axios.post('http://localhost:8000/home/user/',{
        username: that.username,
    })
    .then(function(response){
        if(response.data.user_gender){
            that.sex = response.data.user_gender
        };
        if(response.data.user_gender){
            that.self_introduction = response.data.user_introduction
        };
        that.whether_upload = response.data.whether_upload
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    }else if(that.whether_nick_name){
        axios.post('http://localhost:8000/home/nickname_user/',{
        username: that.username,
    })
    .then(function(response){
        if(response.data.user_gender){
            that.sex = response.data.user_gender
        };
        if(response.data.user_introduction){
            that.self_introduction = response.data.user_introduction
        };
        if(that.user_name==response.data.username){
                that.show_add_friends = false;
            };
        that.whether_upload = response.data.whether_upload;
        that.username = response.data.username;
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    }
    },
  },
  data(){
    return{
      username: this.$route.query.user_name,
      whether_nick_name: this.$route.query.nickname,
      user_name: this.Name.username,
      sex:'无',
      self_introduction:'无',
      whether_upload:'',
      friends: [],
      show_add_friends: true,
      isShow: false,
      show_verify: false,
      verify_message:''
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
.left_button{
margin-bottom: 20px;
}
.input_verification{
margin-bottom: 20px;
}
.text{
width: 70%;
margin-right: 15px;
}
</style>
