<template>
    <div>
        <h1>Login</h1>
        <UserAuthForm buttonText="Login" :submitForm="loginUser"/>
    </div>
</template>

<script>
import UserAuthForm from '@@/components/UserAuthForm'
export default {
    components:{
        UserAuthForm
    },
    methods:{
        loginUser(logininfo){
            this.$auth.loginWith('local',{
                data:{
                    email: logininfo.email,
                    password: loginingo.password
                }
            })
            alert("User logged in!")
        }
    }
}
</script>