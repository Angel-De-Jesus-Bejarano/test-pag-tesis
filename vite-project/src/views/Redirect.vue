<template>
  <div>
    <h2>TE HAS LOGUEADO BIENVENIDO {{ name }}</h2>
   
  </div>
  <button @click="cerrarSesion">Cerrar sesion</button>
</template>

<script setup>
import { ref} from 'vue';
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode'

const router = useRouter()
const name = ref('')
const expiration = ref(0)


  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token)
  name.value = decodedToken.userName;
  expiration.value = decodedToken.exp - Math.floor(Date.now() / 1000);
  if(expiration.value === 0){
    cerrarSesion()
  }
 
 


const cerrarSesion = () => {
  localStorage.removeItem("token");
  router.push('/login')
}
</script>