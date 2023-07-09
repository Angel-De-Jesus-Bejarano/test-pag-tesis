import apiClient from "./api";

export const loginUser = async (email, password) => {
    try {
        if(!email && !password){
            console.log('no se estan pasando los datos')
        }
        const response = await apiClient.post('/login', {
            email: email,
            password: password
        });
        
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const registerUser = async (name, email, password) => {
    try {
        const response = await apiClient.post("/register", {
            name: name,
            email: email,
            password: password,
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error);
        // Manejar el error del registro si se desea
    }
}