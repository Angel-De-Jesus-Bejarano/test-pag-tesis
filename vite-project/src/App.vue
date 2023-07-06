<script setup>
import { RouterLink } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div >
    <RouterLink to="/register">Registro</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <router-view/>
  </div>
</template>

<style>

  body{
    margin: 0;
    background-color: #F1EEEE;
  }
</style>
