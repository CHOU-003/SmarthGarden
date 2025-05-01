<style>
.custom-nav-item {
  font-weight: bold;
  color: white !important;
  text-decoration: none !important;
}

.custom-nav-item:hover {
  color: white !important;
  text-decoration: none !important;
}
</style>

<template>
    <b-navbar toggleable="lg" type="dark" style="background-color: #03C04A;">
       <b-navbar-brand href="#">NDC MathGardenX</b-navbar-brand>
   
       <b-navbar-toggle target="nav-collapse" v-show="keys.islogged"></b-navbar-toggle>
   
       <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav  v-show="keys.islogged">
            <b-nav-item class="custom-nav-item" href="#" to="/home">Trang Chủ</b-nav-item>
            <b-nav-item class="custom-nav-item" href="#" to="/form">Form</b-nav-item>
            <b-nav-item class="custom-nav-item" href="#" to="/table">Table</b-nav-item>
            <b-nav-item class="custom-nav-item" href="#" to="/chart">Chart</b-nav-item>
            <b-nav-item class="custom-nav-item" href="#" to="/iot">MQTT</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-show="keys.islogged">
            <b-nav-item-dropdown right v-show="keys.islogged">
              <template  #button-content >
                <em class="custom-nav-item">
                  <b-avatar  src="./images/cookie.png" size="1.8rem"></b-avatar>&nbsp;ĐÌNH CHÂU
                </em>
              </template>
              <b-dropdown-item class="custom-nav-item" href="#" @click="keys.performLogout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
     </b-navbar>
   </template>
   <style scoped>
   
   </style>
   <script>
   module.exports = {
       props: ['keys'],
       data() {
           return {};
       },
       mounted(){
       },
       methods: {
       }, 
   }
   </script>
   