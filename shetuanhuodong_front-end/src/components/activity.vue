<template>
  <div class="content">
    <div class="activity">
      <div class="bg-primary"><h2>发布活动</h2></div>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">活动名称：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="活动名称" v-model="activity_name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">活动时间：</label>
          <div class="col-sm-10">
            <input type="ptextassword" class="form-control" placeholder="活动时间" v-model="activity_time">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">活动地点：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="活动地点" v-model="activity_location">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">活动内容：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="活动内容" v-model="activity_content">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">活动要求：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="活动要求" v-model="activity_requirement">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <input type="button" value="发布" class="btn btn-info left_button" @click="launch_activity">
            <input type="button" value="清空" class="btn btn-info" @click="clear">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'activity',
  methods: {
      clear(){
          this.activity_name = '';
          this.activity_time = '';
          this.activity_location = '';
          this.activity_content = '';
          this.activity_requirement = '';
      },
      launch_activity(){
          var that = this;
          axios.post('http://localhost:8000/home/launch_activity/',{
            activity: that.activity_name,
            time: that.activity_time,
            location: that.activity_location,
            content: that.activity_content,
            launcher: that.Name.username,
            requirement: that.activity_requirement,
            team:'无'
          })
    .then(function(response){
      if(response.data == '1'){
        alert('发布成功！');
        that.activity_name = '';
        that.activity_time = '';
        that.activity_location = '';
        that.activity_content = '';
        that.activity_requirement = '';
      }else{
        console.log(response.data)
      }
    }).catch(function(err){
        console.log(err);
    });
      }
  },
  data(){
    return{
      username: this.Name.username,
      activity_name:'',
      activity_time:'',
      activity_location:'',
      activity_content:'',
      activity_requirement:'',
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
padding: 20px 10px 10px 10px;
}
.activity{
border: 1px solid black;
border-radius: 10px;
width: 92%;
height: calc(100vh - 300px);
background-color:white;
padding: 0;
margin: 15px auto;
}
form{
padding: 20px 15px;
}
.left_button{
margin:0 30px;
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
