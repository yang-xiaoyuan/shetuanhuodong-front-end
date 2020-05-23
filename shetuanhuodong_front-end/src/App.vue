<template>
  <div id="app">
      <router-view/>
    </div>
</template>

<style>
html{
padding: 0;
}
body{
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0
}
#app {
margin: 0;
padding: 0;
height: 100vh;
width: 100vw;
}

@media screen and (min-width:1280px){
    .container{
        width: 1280px;
    }
}

</style>
