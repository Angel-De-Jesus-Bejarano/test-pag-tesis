<template>
    <div>
        <h2>ADMINISTRACION DE USUARIOS</h2>
        <div class="box-button">
            <button @click="allUsersView">Usuarios Registrados</button>
            
        </div>
        <div class="render-component">
            <AllUsersGet v-if="render.allUsers"/>
        </div>
    </div>
</template>

<script setup>
import AllUsersGet from './UsersComponent/AllUsersGet.vue';
import { ref } from 'vue';
const render = ref({
  allUsers: false
})

const allUsersView = () => {
    render.value.allUsers = !render.value.allUsers
}

</script>