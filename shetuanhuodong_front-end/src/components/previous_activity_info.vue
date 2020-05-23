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
                <p>
                    <input type="button" value="删除活动" v-if="launcher==username" class="btn btn-info left_button"
                           @click="delete_activity_check">
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'previous_activity_info',
  methods: {
    delete_activity_check(){
        if (confirm("确定删除该活动？")){
            var that = this;
            this.$options.methods.delete_activity(this.name, that);
        }
    },
    delete_activity(name,username,that){
        axios.post('http://localhost:8000/home/delete_activity/',{
            activity: name,
        })
    .then(function(response){
        if(response.data=='deleted'){
            alert('已删除该活动！')
            that.$router.push({path: '/home/me'})
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

</style>
