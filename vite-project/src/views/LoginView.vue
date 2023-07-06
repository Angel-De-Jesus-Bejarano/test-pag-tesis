<template>
    <div class="section">
        <div class="registro-box">
            <h2>Login To Your Account</h2>
            <form @submit.prevent="loginUser">
                <div>
                    <input type="email" id="email" v-model="user.email" required placeholder="Email">
                </div>
                <div>
                    <input type="password" id="password" v-model="user.password" required placeholder="Contraseña">
                </div>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
        <div class="banner">
            <div class="circle"></div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '../api'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import jwt_decode from 'jwt-decode'


const router = useRouter();


const user = ref({
    email: ref(""),
    password: ref("")
})

const loginUser = async () => {
    try {
        const response = await apiClient.post('/login', {
            email: user.value.email,
            password: user.value.password
        });
        console.log(response.data)
        const token = response.data.token;
        localStorage.setItem("token", token)

        const decodedToken = jwt_decode(token);
        const role = decodedToken.role;
        console.log(role)

        // Redirigir según el rol
        if (role === 'admin') {
            router.push('/admin/dashboard'); // Redirigir a la ruta del panel de administración
        } else if (role === 'client') {
            router.push('/redirect'); // Redirigir a la ruta de redirección para clientes
        }

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
    flex-direction: row-reverse;
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
    background-color: #FF6868;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 5px 20px 10px rgb(255, 104, 104, 0.5);
}

.banner {
    width: 35%;
    height: auto;
    background-color: #FF6868;
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