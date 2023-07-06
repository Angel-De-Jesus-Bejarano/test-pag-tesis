<template>
    <button @click="confirmDeleteUser">Elminar</button>
    <!-- Modal para confirmar eliminacion productos -->
    <div v-if="showModal" class="modal">
        <div class="modal-box">
            <div class="title">
                <h2>Estas seguro de eliminar este producto?</h2>
            </div>
            <div class="buttons">
                <button @click="yesDelete">si</button>
                <button @click="noDelete">no</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import apiClient from '../../api';
const userId = ref('')
const showModal = ref(false)
const users = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const confirmDeleteUser = () => {
    showModal.value = true
}
const yesDelete = () => {
    userId.value = users.user._id
    deleteUser()
    showModal.value = false
}
const noDelete = () => {
    showModal.value = false
}


const deleteUser = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.error('No se encontró el token de autorización.');
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await apiClient.delete(`/users/${userId.value}`, config);
        // Manejar la respuesta exitosa y actualizar la lista de productos
        console.log(response.data.message);

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        // Manejar el error
        console.log('Respuesta del servidor:', error.response.data);
    }
}
</script>

<style scoped>

h2{
    color: black;
    text-align: center;
}
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.5);
}

.modal-box {
    width: 500px;
    height: 200px;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 20px;
}

.title p {
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: space-around;
    gap: 20px;
}

.buttons button {
    padding: 10px 20px;
    font-size: 15px;
}
</style>