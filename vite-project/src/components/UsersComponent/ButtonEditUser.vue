<template>
    <button @click="editUser(users)">Editar</button>
    <!-- Modal para editar usuarios -->
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <h2>Editar Uusarios</h2>
            <form @submit.prevent="updateUsers(editedUserData)">
                <input type="text" v-model="editedUserData.name" required>
                <input type="text" v-model="editedUserData.email" required>
                <button type="submit">Actualizar Usuario</button>
            </form>
            <button @click="closedModal">Cerrar</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import apiClient from '../../api';

const showModal = ref(false)
const userId = ref('')
const editedUserData = reactive({
    name: '',
    email: ''
})
const users = defineProps({
    user: {
        type: Object,
        required: true
    }
})
//codigo para editar usuarios
const editUser = (users) => {
    editedUserData.name = users.user.name;
    editedUserData.email = users.user.email
    userId.value = users.user._id;
    showModal.value = true
}
const closedModal = () => {
    showModal.value = false
}

const updateUsers = async (editedUserData) => {
    try {
        const accessToken = localStorage.getItem('token');
        console.log(accessToken)
        if (!accessToken) {
            console.error('No se encontró el token de autorización.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await apiClient.put(`/users/${userId.value}`, {
            name: editedUserData.name,
            email: editedUserData.email
        },config)
        console.log(response.data.message);
        closedModal()
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        console.log('Detalles de la solicitud:', error.config);
        console.log('Respuesta del servidor:', error.response.data);
        throw error;
    }
}
</script>


<style scoped>
.modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.8);
}

.modal-content {
    display: flex;
    width: 500px;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(63, 63, 63);
    font-family: system-ui;
    color: white;
    border: 2px solid white;
    border-radius: 20px;
}

.modal-content form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-content form input{
    width: 300px;
    height: 40px;
    font-size: 20px;
    padding-left: 10px;
    margin-bottom: 10px;
}

button{
    padding: 10px 20px;
    font-size: 15px;
}
</style>
