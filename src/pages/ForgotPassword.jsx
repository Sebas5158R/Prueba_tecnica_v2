import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../Store/UserSlice";

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        dispatch(forgotPassword({email: email, data: email}));
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      
      <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Recuperación de contraseña</h1> 
      <p className="text-sm text-gray-600 text-center mt-8 mb-6">Introduce tu correo electrónico para restablecer tu contraseña</p> 
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        <button type="submit" className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4">Enviar</button>
      </form>
      <div className="text-center">
        <p className="text-sm">Volver a <Link to={"/"} className="text-blue-600 hover:underline">Iniciar sesión</Link></p>
      </div>
      <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 WCS LAT</p>
    </div>
  </div>
    );
}

export default ForgotPassword;