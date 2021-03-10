<template>
  <form >
    <div>Test</div>
    <input v-model="userInfo.name" 
                  label="Name" 
                  :rules="[required('name')]"
                  v-if="hasName" />

    <input v-model="userInfo.email" 
                  label="Email" 
                  :rules="[required('email'), emailFormat()]"/>

    <input v-model="userInfo.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  counter=true
                  :rules="[required('password'), minLength('password', 8)]"
                  />

    <button @click="submitForm(userInfo)" :disabled="!valid" class="bg-gray-300 p-3"> {{ buttonText }}</button>
  </form>
</template>

<script>
  import validations from "@@/utils/validations";
  export default {
    data() {
      return {
        valid: false,
        showPassword: false,
        hasName: false,
        userInfo: {
          email: '',
          password: ''
        },
        ...validations
      }
    },
    props: ["submitForm", "buttonText", "hasName"]
  }
</script>

<style scoped>
</style> 