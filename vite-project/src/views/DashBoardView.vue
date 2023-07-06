<template>
  <div class="box-dashboard">
    <h1>BIENVENIDO ADMINISTRADOR</h1>
    <button @click="cerrarSesion">Cerrar sesion</button>
  </div>
  <div class="box-dashboad-info">
    <div class="box-button">
      <button @click="renderGestionProduct">Gestion productos</button>
      <button @click="rederGestionUser">Gestion Usuarios</button>
      
    </div>
    <div class="render-Component">
      <GestionProducts v-if="showRenderProduct"/>
      <GestionUser v-if="showRenderUser"/>
    </div>
    
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

import GestionProducts from '../components/GestionProducts.vue';
import GestionUser from '../components/GestionUser.vue';
import { ref } from 'vue';

const router = useRouter()
const showRenderProduct = ref(true)
const showRenderUser = ref(false)
const cerrarSesion = () => {
  localStorage.removeItem("token");
  router.push('/login')
}
const renderGestionProduct = () => {
  showRenderUser.value = false
  showRenderProduct.value = true
}
const rederGestionUser = () => {
  showRenderProduct.value = false
  showRenderUser.value = true
}

</script>

<style scoped>
.box-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-dashboard button {
  width: 100px;
  height: 50px;
}

.box-dashboad-info {
  display: flex;
  height: 400px;
}

.box-dashboad-info .box-button {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.box-button button {
  width: 250px;
  height: 50px;
}
.render-Component{
  width: 1100px;
}
</style>