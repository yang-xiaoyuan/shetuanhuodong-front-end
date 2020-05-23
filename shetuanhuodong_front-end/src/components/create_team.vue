<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
<div class="bg-primary"><h2>创建团队</h2></div>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">团队名称：</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" placeholder="团队名称" v-model="team_name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">团队简介：</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" placeholder="团队简介" v-model="team_introduction"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <input type="button" value="创建" class="btn btn-info" @click="create_team">
            <input type="button" value="清空" class="btn btn-info" @click="clear">
            <input type="button" value="取消" class="btn btn-info" @click="back">
          </div>
        </div>
      </form>
    </div>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'create_team',
  methods: {
      back(){
          this.$router.go(-1);
      },
      clear(){
          this.team_name = '';
          this.team_introduction = '';
      },
      create_team(){
          var that = this;
          axios.post('http://localhost:8000/home/create_team/',{
            username: that.username,
            team_name: that.team_name,
            team_introduction: that.team_introduction,
          })
    .then(function(response){
      if(response.data){
        alert('创建成功！');
        that.team_name = '';
        that.team_introduction = '';
      }
    }).catch(function(err){
        console.log(err);
    });
      }
  },
  data(){
    return{
      username: this.Name.username,
      team_name:'',
      team_introduction:'',
    }
  },
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
padding: 0;
margin-bottom: 20px;
}
.back{
height: 30px;
}
form{
padding: 20px 15px;
}
.btn-info{
margin:0 20px;
}
.choices{
margin-top: 20px;
}
.bg-primary, h2{
margin: 0;
width:100%;
height: 50px;
text-align: center;
vertical-align: middle;
padding-top: 5px;
border-radius: 10px;
}


</style>
