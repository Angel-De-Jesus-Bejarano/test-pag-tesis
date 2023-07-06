import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { Server } from 'socket.io'
import router from './src/routes/authRouter.js'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors';
import 'dotenv/config.js'

//import updateProductInDatabase from './src/utils/updateProductsInDatabase.js'
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Permitir solicitud
            callback(null, true);
        } else {
            // Rechazar solicitud
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const app = express()
app.use(cors(corsOptions));
const authRoutes = router
const URL_MONGO = process.env.MONGO_URL_SECRET;

//Limitar el numero de intestos de inicio de sesion desde una misma IP
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutos
    max: 8, //maximo de intentos permitidos
    message: 'Demasiados intentos de inicio de sesion. Por favor intentelo de nuevo mas tarde'
})

//Configura encabezados de seguridad
app.use(helmet())


//Conexion a la base de datos de mongoBD
mongoose.connect(URL_MONGO, {
    useNewUrlParser: true,

})
    .then(() => {
        console.log('conexion a mongo establecida')
    })
    .catch((error) => {
        console.error('Error al conectar a mongoBD', error)
    })

// Configurar middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
//ruta de auntenticacion
app.use('/auth', authRoutes)
// Rutas de autenticación para el administrador
app.use('/admin', authRoutes);
//Aplicar limitador de intento de incio de sesion
app.use('/auth/login', loginLimiter)
app.use('/admin/login', loginLimiter)

//crear servidor http
const server = http.createServer(app)

// Configurar el servidor WebSocket
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Evento para recibir actualizaciones del servidor
    socket.on('productUpdated', (updatedProduct) => {
        console.log('Producto actualizado:', updatedProduct);
        // Envía el mensaje a todos los clientes conectados (broadcast)
        io.emit('productUpdated', updatedProduct);
    });
});

//inciar servidor
const port = 3000
server.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})