<template>
    <div>
      <h2>TE HAS LOGUEADO BIENVENIDO</h2>
    </div>
    <button @click="cerrarSesion">Cerrar sesion</button>
  </template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const cerrarSesion = () => {
      localStorage.removeItem("token");
      router.push('/login')
    }
</script>