import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import 'dotenv/config.js'
const secretKey = process.env.KEY_SECRET;


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password, role: 'client' });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        /*if (user.role === 'admin') {
          return res.status(403).json({ error: 'Acceso denegado' });
        }*/

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales Contraseña inválidas' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role, userName: user.name}, secretKey, { expiresIn: '1h' });
        res.json({ token, secretKey });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const profile = async (req, res) => {
    // Obtener el token de la cabecera de autorización
    const token = req.headers.authorization.split(' ')[1];
    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, secretKey);
        // Consultar los datos del perfil del usuario en la base de datos
        const user = await User.findById(decodedToken.userId).exec();
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Aquí puedes acceder a los datos del perfil del usuario en la variable 'user'
        const profileData = {
            name: user.name,
            email: user.email,
            role: user.role
            // Otros campos del perfil del usuario que desees devolver
        };
        // Enviar la respuesta con los datos del perfil del usuario autenticado
        res.json(profileData);

        // Verificar el rol del usuario y redirigir a la ruta correspondiente
        if (user.role === 'admin') {
            // Redirigir al usuario con rol de administrador a la ruta /admin/dashboard
            return res.redirect('/admin/dashboard');
        } else {
            // Redirigir al usuario con rol de cliente a la ruta /dashboard
            return res.redirect('/redirect');
        }



    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

export const adminExists = async (req, res) => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        res.json({ adminExists });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar la existencia de usuario administrador' });
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'client' });
        res.json({ users })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}
export const updateUsers = async (req, res) => {
    try {
        const { name, email } = req.body;

        const authorizationHeader = req.headers.authorization;
        //verificar si el usuario tiene el rol admin
        const token = authorizationHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, secretKey)
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado ' })
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(201).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const deleteUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Uusario' });
    }
}