import jwt_decode from 'jwt-decode'


const secretKey = 'jjgtjsgfh34fn';
export default function validarToken(token) {
    try {
        jwt_decode(token, secretKey )
        return true //token valido
    } catch (error) {
        return false// token invalido
    }
}
//Funcion para validar token