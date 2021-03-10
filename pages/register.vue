<template>
    <div>
        <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true" />
    </div>
</template>

<script>
import UserAuthForm from '@@/components/UserAuthForm'
export default {
    components:{
        UserAuthForm
    },
    methods:{
        registerUser(registrationinfo){
            debugger;
            alert("User logged in!")
        }
    }
}
</script>