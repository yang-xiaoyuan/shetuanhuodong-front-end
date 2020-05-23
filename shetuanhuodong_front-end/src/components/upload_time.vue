<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
      <p class="label label-primary">上传时间表</p>
      <table class="table table-bordered" v-if="isShow==true">
        <tr>
          <td class="table-bordered">\</td>
          <td class="table-bordered">周一</td>
          <td class="table-bordered">周二</td>
          <td class="table-bordered">周三</td>
          <td class="table-bordered">周四</td>
          <td class="table-bordered">周五</td>
          <td class="table-bordered">周六</td>
          <td class="table-bordered">周日</td>
        </tr>
        <tr>
          <td class="table-bordered">8:30 ~ 9:15</td>
          <td class="table-bordered" :class="{red: time_data[0][0]==false,green: time_data[0][0]==true}" @click="change(0,0)"></td>
          <td class="table-bordered" :class="{red: time_data[0][1]==false,green: time_data[0][1]==true}" @click="change(0,1)"></td>
          <td class="table-bordered" :class="{red: time_data[0][2]==false,green: time_data[0][2]==true}" @click="change(0,2)"></td>
          <td class="table-bordered" :class="{red: time_data[0][3]==false,green: time_data[0][3]==true}" @click="change(0,3)"></td>
          <td class="table-bordered" :class="{red: time_data[0][4]==false,green: time_data[0][4]==true}" @click="change(0,4)"></td>
          <td class="table-bordered" :class="{red: time_data[0][5]==false,green: time_data[0][5]==true}" @click="change(0,5)"></td>
          <td class="table-bordered" :class="{red: time_data[0][6]==false,green: time_data[0][6]==true}" @click="change(0,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">9:25 ~ 10:10</td>
          <td class="table-bordered" :class="{red: time_data[1][0]==false,green: time_data[1][0]==true}" @click="change(1,0)"></td>
          <td class="table-bordered" :class="{red: time_data[1][1]==false,green: time_data[1][1]==true}" @click="change(1,1)"></td>
          <td class="table-bordered" :class="{red: time_data[1][2]==false,green: time_data[1][2]==true}" @click="change(1,2)"></td>
          <td class="table-bordered" :class="{red: time_data[1][3]==false,green: time_data[1][3]==true}" @click="change(1,3)"></td>
          <td class="table-bordered" :class="{red: time_data[1][4]==false,green: time_data[1][4]==true}" @click="change(1,4)"></td>
          <td class="table-bordered" :class="{red: time_data[1][5]==false,green: time_data[1][5]==true}" @click="change(1,5)"></td>
          <td class="table-bordered" :class="{red: time_data[1][6]==false,green: time_data[1][6]==true}" @click="change(1,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">10:30 ~ 11:15</td>
          <td class="table-bordered" :class="{red: time_data[2][0]==false,green: time_data[2][0]==true}" @click="change(2,0)"></td>
          <td class="table-bordered" :class="{red: time_data[2][1]==false,green: time_data[2][1]==true}" @click="change(2,1)"></td>
          <td class="table-bordered" :class="{red: time_data[2][2]==false,green: time_data[2][2]==true}" @click="change(2,2)"></td>
          <td class="table-bordered" :class="{red: time_data[2][3]==false,green: time_data[2][3]==true}" @click="change(2,3)"></td>
          <td class="table-bordered" :class="{red: time_data[2][4]==false,green: time_data[2][4]==true}" @click="change(2,4)"></td>
          <td class="table-bordered" :class="{red: time_data[2][5]==false,green: time_data[2][5]==true}" @click="change(2,5)"></td>
          <td class="table-bordered" :class="{red: time_data[2][6]==false,green: time_data[2][6]==true}" @click="change(2,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">11:25 ~ 12:10</td>
          <td class="table-bordered" :class="{red: time_data[3][0]==false,green: time_data[3][0]==true}" @click="change(3,0)"></td>
          <td class="table-bordered" :class="{red: time_data[3][1]==false,green: time_data[3][1]==true}" @click="change(3,1)"></td>
          <td class="table-bordered" :class="{red: time_data[3][2]==false,green: time_data[3][2]==true}" @click="change(3,2)"></td>
          <td class="table-bordered" :class="{red: time_data[3][3]==false,green: time_data[3][3]==true}" @click="change(3,3)"></td>
          <td class="table-bordered" :class="{red: time_data[3][4]==false,green: time_data[3][4]==true}" @click="change(3,4)"></td>
          <td class="table-bordered" :class="{red: time_data[3][5]==false,green: time_data[3][5]==true}" @click="change(3,5)"></td>
          <td class="table-bordered" :class="{red: time_data[3][6]==false,green: time_data[3][6]==true}" @click="change(3,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">14:30 ~ 15:15</td>
          <td class="table-bordered" :class="{red: time_data[4][0]==false,green: time_data[4][0]==true}" @click="change(4,0)"></td>
          <td class="table-bordered" :class="{red: time_data[4][1]==false,green: time_data[4][1]==true}" @click="change(4,1)"></td>
          <td class="table-bordered" :class="{red: time_data[4][2]==false,green: time_data[4][2]==true}" @click="change(4,2)"></td>
          <td class="table-bordered" :class="{red: time_data[4][3]==false,green: time_data[4][3]==true}" @click="change(4,3)"></td>
          <td class="table-bordered" :class="{red: time_data[4][4]==false,green: time_data[4][4]==true}" @click="change(4,4)"></td>
          <td class="table-bordered" :class="{red: time_data[4][5]==false,green: time_data[4][5]==true}" @click="change(4,5)"></td>
          <td class="table-bordered" :class="{red: time_data[4][6]==false,green: time_data[4][6]==true}" @click="change(4,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">15:25 ~ 16:10</td>
          <td class="table-bordered" :class="{red: time_data[5][0]==false,green: time_data[5][0]==true}" @click="change(5,0)"></td>
          <td class="table-bordered" :class="{red: time_data[5][1]==false,green: time_data[5][1]==true}" @click="change(5,1)"></td>
          <td class="table-bordered" :class="{red: time_data[5][2]==false,green: time_data[5][2]==true}" @click="change(5,2)"></td>
          <td class="table-bordered" :class="{red: time_data[5][3]==false,green: time_data[5][3]==true}" @click="change(5,3)"></td>
          <td class="table-bordered" :class="{red: time_data[5][4]==false,green: time_data[5][4]==true}" @click="change(5,4)"></td>
          <td class="table-bordered" :class="{red: time_data[5][5]==false,green: time_data[5][5]==true}" @click="change(5,5)"></td>
          <td class="table-bordered" :class="{red: time_data[5][6]==false,green: time_data[5][6]==true}" @click="change(5,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">16:30 ~ 17:15</td>
          <td class="table-bordered" :class="{red: time_data[6][0]==false,green: time_data[6][0]==true}" @click="change(6,0)"></td>
          <td class="table-bordered" :class="{red: time_data[6][1]==false,green: time_data[6][1]==true}" @click="change(6,1)"></td>
          <td class="table-bordered" :class="{red: time_data[6][2]==false,green: time_data[6][2]==true}" @click="change(6,2)"></td>
          <td class="table-bordered" :class="{red: time_data[6][3]==false,green: time_data[6][3]==true}" @click="change(6,3)"></td>
          <td class="table-bordered" :class="{red: time_data[6][4]==false,green: time_data[6][4]==true}" @click="change(6,4)"></td>
          <td class="table-bordered" :class="{red: time_data[6][5]==false,green: time_data[6][5]==true}" @click="change(6,5)"></td>
          <td class="table-bordered" :class="{red: time_data[6][6]==false,green: time_data[6][6]==true}" @click="change(6,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">17:25 ~ 18:10</td>
          <td class="table-bordered" :class="{red: time_data[7][0]==false,green: time_data[7][0]==true}" @click="change(7,0)"></td>
          <td class="table-bordered" :class="{red: time_data[7][1]==false,green: time_data[7][1]==true}" @click="change(7,1)"></td>
          <td class="table-bordered" :class="{red: time_data[7][2]==false,green: time_data[7][2]==true}" @click="change(7,2)"></td>
          <td class="table-bordered" :class="{red: time_data[7][3]==false,green: time_data[7][3]==true}" @click="change(7,3)"></td>
          <td class="table-bordered" :class="{red: time_data[7][4]==false,green: time_data[7][4]==true}" @click="change(7,4)"></td>
          <td class="table-bordered" :class="{red: time_data[7][5]==false,green: time_data[7][5]==true}" @click="change(7,5)"></td>
          <td class="table-bordered" :class="{red: time_data[7][6]==false,green: time_data[7][6]==true}" @click="change(7,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">19:00 ~ 19:45</td>
          <td class="table-bordered" :class="{red: time_data[8][0]==false,green: time_data[8][0]==true}" @click="change(8,0)"></td>
          <td class="table-bordered" :class="{red: time_data[8][1]==false,green: time_data[8][1]==true}" @click="change(8,1)"></td>
          <td class="table-bordered" :class="{red: time_data[8][2]==false,green: time_data[8][2]==true}" @click="change(8,2)"></td>
          <td class="table-bordered" :class="{red: time_data[8][3]==false,green: time_data[8][3]==true}" @click="change(8,3)"></td>
          <td class="table-bordered" :class="{red: time_data[8][4]==false,green: time_data[8][4]==true}" @click="change(8,4)"></td>
          <td class="table-bordered" :class="{red: time_data[8][5]==false,green: time_data[8][5]==true}" @click="change(8,5)"></td>
          <td class="table-bordered" :class="{red: time_data[8][6]==false,green: time_data[8][6]==true}" @click="change(8,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">19:55 ~ 20:40</td>
          <td class="table-bordered" :class="{red: time_data[9][0]==false,green: time_data[9][0]==true}" @click="change(9,0)"></td>
          <td class="table-bordered" :class="{red: time_data[9][1]==false,green: time_data[9][1]==true}" @click="change(9,1)"></td>
          <td class="table-bordered" :class="{red: time_data[9][2]==false,green: time_data[9][2]==true}" @click="change(9,2)"></td>
          <td class="table-bordered" :class="{red: time_data[9][3]==false,green: time_data[9][3]==true}" @click="change(9,3)"></td>
          <td class="table-bordered" :class="{red: time_data[9][4]==false,green: time_data[9][4]==true}" @click="change(9,4)"></td>
          <td class="table-bordered" :class="{red: time_data[9][5]==false,green: time_data[9][5]==true}" @click="change(9,5)"></td>
          <td class="table-bordered" :class="{red: time_data[9][6]==false,green: time_data[9][6]==true}" @click="change(9,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">20:50 ~ 21:35</td>
          <td class="table-bordered" :class="{red: time_data[10][0]==false,green: time_data[10][0]==true}" @click="change(10,0)"></td>
          <td class="table-bordered" :class="{red: time_data[10][1]==false,green: time_data[10][1]==true}" @click="change(10,1)"></td>
          <td class="table-bordered" :class="{red: time_data[10][2]==false,green: time_data[10][2]==true}" @click="change(10,2)"></td>
          <td class="table-bordered" :class="{red: time_data[10][3]==false,green: time_data[10][3]==true}" @click="change(10,3)"></td>
          <td class="table-bordered" :class="{red: time_data[10][4]==false,green: time_data[10][4]==true}" @click="change(10,4)"></td>
          <td class="table-bordered" :class="{red: time_data[10][5]==false,green: time_data[10][5]==true}" @click="change(10,5)"></td>
          <td class="table-bordered" :class="{red: time_data[10][6]==false,green: time_data[10][6]==true}" @click="change(10,6)"></td>
        </tr>
                <tr>
          <td class="table-bordered">21:45 ~ 22:30</td>
          <td class="table-bordered" :class="{red: time_data[11][0]==false,green: time_data[11][0]==true}" @click="change(11,0)"></td>
          <td class="table-bordered" :class="{red: time_data[11][1]==false,green: time_data[11][1]==true}" @click="change(11,1)"></td>
          <td class="table-bordered" :class="{red: time_data[11][2]==false,green: time_data[11][2]==true}" @click="change(11,2)"></td>
          <td class="table-bordered" :class="{red: time_data[11][3]==false,green: time_data[11][3]==true}" @click="change(11,3)"></td>
          <td class="table-bordered" :class="{red: time_data[11][4]==false,green: time_data[11][4]==true}" @click="change(11,4)"></td>
          <td class="table-bordered" :class="{red: time_data[11][5]==false,green: time_data[11][5]==true}" @click="change(11,5)"></td>
          <td class="table-bordered" :class="{red: time_data[11][6]==false,green: time_data[11][6]==true}" @click="change(11,6)"></td>

        </tr>
      </table>
          <div class="col-sm-offset-2 col-sm-10">
            <input type="button" value="上传" class="btn btn-info left_button" @click="upload">
            <input type="button" value="清空" class="btn btn-info" @click="clear">
          </div>
      <div class="notation">
        <p>提示：点击或触摸方格，变红则表示时间被占用。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'personal_info',
  methods: {
      change(i, j){
          var status = !this.time_data[i][j];
          Vue.set(this.time_data[i], j, status);
      },
      clear(){
          for(var i=0; i<12;i++){
              for(var j=0; j<7;j++){
                  Vue.set(this.time_data[i], j, true);
              }
          }
      },
      upload(){
          var that = this;
          var inverted_time_data = '';
          for (var i=0; i<12; i++){
              for (var j=0; j<7; j++){
                  if (that.time_data[i][j]){
                      inverted_time_data += '1'
                  }else{
                      inverted_time_data += '0'
                  }
              }
          };
          axios.post('http://localhost:8000/home/upload/',{
            username: that.Name.username,
            time_data: inverted_time_data
        })
        .then(function(response){
            if(response.data){
                alert('上传成功！');
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
        axios.post('http://localhost:8000/home/fetch_load/',{
          username: that.Name.username,
      })
      .then(function(response){
          if(response.data){
            var index = 0;
            for (var i=0; i<12; i++){
               for (var j=0; j<7; j++){
                    if (response.data[index]=='1'){
                        Vue.set(that.time_data[i], j, true);
                    }else{
                        Vue.set(that.time_data[i], j, false);
                    };
                    index++;
                }
            }
          }else{
            for(var i=0; i<12;i++){
              for(var j=0; j<7;j++){
                  Vue.set(that.time_data[i], j, true);
              }
          }
          }
          that.isShow = true;
      }).catch(function(err){
          console.log(err);
      });
      },
  },
  data(){
    return{
        isShow: false,
        time_data: [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],]
    }
  },
  mounted(){
    this.get_data();
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
.green{
background-color: #00ff00;
}
.red{
background-color: red!important;
}
.left_button{
margin:0 30px;
}
.notation{
margin: 15px;
}
.label{
font-size:22px;
}
table{
margin-top: 20px;
}

</style>
