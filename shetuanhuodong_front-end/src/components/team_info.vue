<template>
    <div class="content" v-show="isShow">
        <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
        <div class="information">
            <form>
                <p><span class="text-primary">团队名称： </span><span>{{ this.team_name }}</span>
                    <span class="change" v-if="creator == username" @click="change_team_name">点击修改</span></p>
                <p><span class="text-primary">团队人数： </span><span>{{ this.members.length }} 人</span></p>
                <p><span class="text-primary">创建者： </span><span>{{ this.creator_nick }}</span></p>
                <p><span class="text-primary">团队简介： </span><span>{{ this.team_introduction }}</span>
                    <span class="change" v-if="creator == username" @click="change_team_introduction">点击修改</span></p>
                <p><span class="text-primary">已上传时间的人数： </span><span>{{ this.up_loaded }} 人</span>
                    <span class="change" @click="check_upload">点击查看</span></p>
                <p><span class="text-primary">活动： </span>
                    <span>已完成：{{ this.finished_activity.length }} 个；</span>
                    <span>进行中：{{ this.activity_on_process.length }} 个</span>
                    <span class="change" @click="check_activity_in_team">点击查看</span></p>
                <p class="choices">
                    <input type="button" value="离开团队" class="btn btn-info left_button" @click="leave_team_check">
                    <input type="button" value="修改昵称" class="btn btn-info left_button" @click="change_nickname">
                </p>
            </form>
        </div>
        <div class="information">
            <p class="label label-primary">操作</p>
            <form class="option_form">
                <input type="button" value="邀请成员" class="btn btn-info left_button" @click="add_member_check">
                <input type="button" value="移除成员" class="btn btn-info left_button" v-if="creator == username"
                       @click="delete_member_check">
                <input type="button" value="查看团队活动时间推荐" class="btn btn-info left_button" @click="show_results">
                <input type="button" value="发起活动" class="btn btn-info left_button" @click="launch_activity_in_team">
                <input type="button" value="解散团队" class="btn btn-info left_button" v-if="creator == username"
                       @click="dismiss_team_check">
            </form>
        </div>
        <div class="information">
            <p class="label label-primary">团队成员</p>
            <div class="members">
                <div class="member" v-for="item in nick_names">
                    <router-link :to="{path:'/home/users', query:{user_name: item, nickname: true}}">
                        <img src="../assets/活动图标.jpg" alt="">
                        <p>{{ item }}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="search_board" v-if="showResults_add">
            <div class="search_results">
                <h2>请选择：</h2>
                <div class="search_result member" v-for="item in search_results" v-show="search_results"
                     @click="select(item)" :class="{selected: selected_user == item}">
                    <img src="../assets/活动图标.jpg" alt="">
                    <p>{{ item }}</p>
                </div>
                <div>
                    <button type="button" @click="add_member" class="btn btn-success" v-show="search_results.length >= 1">确定</button>
                    <button type="button" @click="hide" class="btn btn-success">取消</button>
                </div>
                <div class="search_result no_result" v-show="show_no_match">
                    <p>抱歉，未找到好友！</p>
                </div>
            </div>
            <div class="mask" @click='hide'></div>
        </div>
        <div class="search_board" v-if="showResults_delete">
            <div class="search_results">
                <h2>请选择：</h2>
                <div class="search_result member" v-for="item in search_results" v-show="search_results"
                     @click="select(item)" :class="{selected: selected_user == item}">
                    <img src="../assets/活动图标.jpg" alt="">
                    <p>{{ item }}</p>
                </div>
                <div>
                    <button type="button" @click="delete_member" class="btn btn-success" v-show="search_results.length >= 1">确定</button>
                    <button type="button" @click="hide" class="btn btn-success">取消</button>
                </div>
                <div class="search_result no_result" v-show="show_no_match">
                    <p>抱歉，未找到好友！</p>
                </div>
            </div>
            <div class="mask" @click='hide'></div>
        </div>
<div class="search_board" v-if="showUpload">
            <div class="search_results load">
                <h2>已上传：</h2>
                <div class="search_result member" v-for="item in have_uploaded" v-show="have_uploaded">
                    <img src="../assets/活动图标.jpg" alt="">
                    <p>{{ item }}</p>
                </div>
                <h2>未上传：</h2>
                <div class="search_result member" v-for="item in not_uploaded" v-show="not_uploaded">
                    <img src="../assets/活动图标.jpg" alt="">
                    <p>{{ item }}</p>
                </div>
            </div>
            <div class="mask" @click='hide'></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  name: 'team_info',
  methods: {
    change_nickname(){
            var that = this;
            var new_nick_name = prompt("请输入在团队内的昵称：");
            if(new_nick_name!=null){
                axios.post('http://localhost:8000/home/change_nickname/',{
                    team_name: that.Name.team,
                    nick_name: new_nick_name,
                    user_name: that.Name.username
                })
                .then(function(response){
                    if(response.data==true){
                        alert('修改成功！')
                    }
                }).catch(function(err){
                    console.log(err);
                });
            }else if(new_nick_name && new_nick_name==null){
                alert('不能输入空值！')
            }
    },
    check_upload(){
                var that = this;
                axios.post('http://localhost:8000/home/check_team_upload/',{
                    team_name: that.Name.team
                })
                .then(function(response){
                    for(let key in response.data){
                        if(response.data[key]=='1'){
                            that.have_uploaded.push(key);
                        };
                        if(response.data[key]=='0'){
                            that.not_uploaded.push(key);
                        };
                    }
                }).catch(function(err){
                    console.log(err);
                });
                this.showUpload = true;
    },
    select(user){
        if(this.selected_user == user){
           this.selected_user ='';
        }else{
        this.selected_user = user;
        }
    },
    hide(){
      this.showResults_add = false;
      this.showResults_delete = false;
      this.show_no_match = false;
      this.selected_user = '';
      this.showUpload = false;
      this.have_uploaded = [];
      this.not_uploaded = [];
    },
    add_member_check(){
        var that = this;
        axios.post('http://localhost:8000/home/check_friends/',{
            user: that.username,
            members: that.members
          })
          .then(function(response){
              if(response.data!='No'){
                  that.search_results = response.data;
              that.showResults_add = true;
          };
          if(response.data=='No'){
              that.show_no_match = true;
          };
      }).catch(function(err){
          console.log(err);
      });
    },
    add_member(){
        var that = this;
        axios.post('http://localhost:8000/home/add_member/',{
            team: that.team_name,
            user: that.selected_user
          })
          .then(function(response){
              if(response.data==true){
                alert('已添加成员!')
                that.showResults_add = false;

                that.members.push(that.selected_user);
                that.selected_user = '';
               }else{
                alert('添加失败!')
               };
          }).catch(function(err){
              console.log(err);
          });
    },
    delete_member_check(){
        var that = this;
        axios.post('http://localhost:8000/home/check_team_members/',{
            team: that.team_name,
            username: that.username
          })
          .then(function(response){
              if(response.data!='No'){
                console.log(response)
                  that.search_results = response.data;
                  that.showResults_delete = true;
          };
          if(response.data=='No'){
              that.show_no_match = true;
          };
      }).catch(function(err){
          console.log(err);
      });
    },
    delete_member(){
        var that = this;
        axios.post('http://localhost:8000/home/delete_member/',{
            team: that.team_name,
            user: that.selected_user
          })
          .then(function(response){
              if(response.data==true){
                alert('已删除成员!');
                that.showResults_delete = false;
                var team = that.team_name;
                var members = that.members;
                that.$options.methods.reset_members(team, members)
               }else{
                alert('删除失败!')
               };
          }).catch(function(err){
              console.log(err);
          });
    },
    reset_members(team, members){
                axios.post('http://localhost:8000/home/team_info/',{
                    team_name: team
                })
                .then(function(response){
                    members = response.data.team_members;
                    console.log(members);
                }).catch(function(err){
                    console.log(err);
                });
    },
    dismiss_team_check(){
        if (confirm("确定解散该团队？（将注销团队的所有活动！）")){
            var that = this;
            this.$options.methods.dismiss_team(this.team_name, that);
        }
    },
    dismiss_team(team_name, that){
          axios.post('http://localhost:8000/home/dismiss_team/',{
            team_name: team_name,
          })
          .then(function(response){
              if(response.data==true){
                alert('团队已解散!')
                that.$router.push({path:'/home/team'})
               }else{
                alert('解散失败!')
               };
          }).catch(function(err){
              console.log(err);
          });
    },
    check_activity_in_team(){
        this.$router.push({path:'/home/check_activity_in_team'})
    },
    change_team_name(){
        var that = this;
        var new_name = prompt("请输入新的团队名称：");
        if(new_name!=null){
          axios.post('http://localhost:8000/home/change_team_name/',{
            team_name: that.team_name,
            new_team_name: new_name
          })
          .then(function(response){
              if(response.data==true){
                alert('修改成功!')
               }else{
                alert('修改失败!')
               };
               that.team_name = new_name;
          }).catch(function(err){
              console.log(err);
          });
        };
      },
      change_team_introduction(){
        var that = this;
        var new_introduction = prompt("请输入新的团队简介：");
        if(new_introduction!=null){
          axios.post('http://localhost:8000/home/change_team_introduction/',{
            team_name: that.team_name,
            new_team_introduction: new_introduction
          })
          .then(function(response){
              if(response.data==true){
                alert('修改成功!')
               }else{
                alert('修改失败!')
               };
               that.team_introduction = new_introduction;
          }).catch(function(err){
              console.log(err);
          });
        };
      },
    leave_team_check(){
        if (confirm("确定离开团队？")){
            var that = this;
            this.$options.methods.leave_team(this.team_name,this.username,that);
        }
    },
    leave_team(team_name,username,that){
          axios.post('http://localhost:8000/home/leave_team/',{
            team_name: team_name,
            username: username
        })
        .then(function(response){
            console.log(response)
            if(response.data==true){
                alert('已离开团队')
                that.$router.push({path: '/home/team'})
            }
        }).catch(function(err){
            console.log(err);
        });
    },
    launch_activity_in_team(){
        this.$router.push({path:'/home/activity_in_team'})
    },
    show_results(){
        this.$router.push({path:'/home/results'})
    },
    back(){
      this.$router.go(-1);
    },
    get_data(){
      var that = this;
      axios.post('http://localhost:8000/home/team_info/',{
        team_name: that.team_name
    })
    .then(function(response){
        that.members = response.data.team_members;
        that.creator = response.data.creator[0];
        that.creator_nick = response.data.creator[1];
        that.team_introduction = response.data.introduction;
        that.activity_on_process = response.data.activities;
        that.finished_activity = response.data.pre_activities;
        that.up_loaded = response.data.up_loaded;
        that.nick_names = response.data.nick_names;
        that.isShow = true;
    }).catch(function(err){
        console.log(err);
    });
    },
  },
  data(){
    return{
      username: this.Name.username,
      team_name: this.Name.team,
      members:[],
      team_introduction:'',
      creator:'',
      creator_nick:'',
      activity_on_process:[],
      finished_activity:[],
      up_loaded:'',
      nick_names: [],
      isShow: false,
      search_results: [],
      showResults_add: false,
      showResults_delete: false,
      show_no_match: false,
      selected_user: '',
      showUpload: false,
      have_uploaded: [],
      not_uploaded: []
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
.label{
font-size:22px;
}
.option_form{
margin-top: 20px;
}
.option_form input{
margin:10px;
}
.choices input{
margin:10px;
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
.change{
font-size: 10px;
float: right;
color: blue;
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
.btn-success{
margin: 10px 20px;
}
.selected{
border: 1px solid blue;
}
.load{
text-align: left;
}
</style>
