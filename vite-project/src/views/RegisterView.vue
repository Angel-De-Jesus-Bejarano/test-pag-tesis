<template>
    <div class="section">
        <div class="registro-box">
            <h2>Register To Create Account</h2>
            <form @submit.prevent="fetchRegisterUser">
                <div>
                    <input type="text" id="name" v-model="user.name" required placeholder="Nombre">

                </div>
                <div>
                    <input type="email" id="email" v-model="user.email" required placeholder="Email">
                </div>
                <div>
                    <input type="password" id="password" v-model="user.password" required placeholder="Contraseña">
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
        <div class="banner">
            <div class="circle"></div>
        </div>
    </div>
</template>


<script setup>
import apiClient from '../service/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../service/RegisterAndLogin';

const router = useRouter();
const user = ref({
    name: ref(""),
    email: ref(""),
    password: ref(""),
    role: 'client'
})

const chechAdminExists = async () => {
    try {
        const response = await apiClient.get('/admin-exists');
        return response.data.adminExists
    } catch (error) {
        console.error('Error al verificar la existencia de usuario administrador:', error);
        return false;
    }
}

const fetchRegisterUser = async () => {
        try {
            const response = await registerUser(user.value.name, user.value.email, user.value.password)
            console.log(response)
            // Manejar la respuesta exitosa del registro si se desea
            router.push('/login')
        } catch (error) {
            console.error(error);
        }
    }


</script>

<style scoped>
.section {
    width: 100%;
    height: 100vh;
    display: flex;
    font-family: system-ui;
}

.registro-box {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.registro-box h2 {
    font-size: 40px;
    font-weight: 500;
}

.registro-box form {
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.registro-box form input {
    width: 500px;
    height: 60px;
    margin-bottom: 50px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
    font-size: 20px;
}

form button {
    padding: 20px 30px;
    border: none;
    color: white;
    background-color: #DD85FC;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 5px 20px 10px rgb(216, 132, 247, 0.5);
}

.banner {
    width: 35%;
    height: auto;
    background-color: #DD85FC;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
}

.banner .circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    margin: 10px;
}
</style>