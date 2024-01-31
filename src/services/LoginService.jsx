import axios from "axios";
import BASE_URL from "./URLService";

const LoginService = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const token = response.data.token;
      if (token != null) {
        alert("Inicio de sesión exitoso")
        return token;
      } else {
        alert("Error al autenticar: Credenciales incorrectas")
        return null;
      }
    } catch (error) {
      throw new Error('Error al autenticar');
    }
  };

export default LoginService;