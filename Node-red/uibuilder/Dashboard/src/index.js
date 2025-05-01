'use strict'

import router from './router.js';


// eslint-disable-next-line no-unused-vars
const app1 = new Vue({
    el: '#app',
    components: {
        'mycomponent': httpVueLoader('./components/mycomponent.vue'),
        'myheader':httpVueLoader('./components/myheader.vue'),
        'mylogin':httpVueLoader('./components/Auth/Login.vue'),
    },
    data(){
        return { 
            freshlogin: undefined,
            user:{
                islogged:false,
                user_id: undefined,
                isActive: undefined,
                user_code: undefined,
                user_name: undefined,
                performLogin: this.checkLogin,
                loginSuccess: this.succesfulLogin,
                performLogout: this.logoutUser
            }
        };
    }, 
    computed:{
    },
    methods: {
        checkLogin(username,password){
            if(username=="dinhchau" && password =="123456")
                return true;
            else
                return false;
        },
        succesfulLogin(){ this.user.islogged = true; },
        logoutUser(){ this.user.islogged = false; }
    }, 
    mounted: function(){
        
      //navigates to home page at mount
      this.$router.push('/home'); 

        uibuilder.start()
        var vueApp = this
        uibuilder.onChange('msg', function(newVal) {
        });
    },
    router: new VueRouter(router),
})
