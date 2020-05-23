<template>
  <div class="content">
    <div class="back"><span class="glyphicon glyphicon-menu-left" @click="back">返回</span></div>
    <div class="information">
<p class="label label-primary">使用指南</p>
        <div>
            <p>这是内容</p>
        </div>
    </div>
      </div>
</template>

<script>
export default {
  name: 'personal_info',
    methods: {
    back(){
     this.$router.go(-1);
    }
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
min-height: 400px;
}
.back{
height: 30px;
}
.label{
font-size:22px;
}


</style>
