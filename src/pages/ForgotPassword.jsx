import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearMessage, forgotPassword } from "../Store/UserSlice";

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const {loading, msg, error} = useSelector((state) => state.users_from_db);

    const handleClose = () => dispatch(clearMessage());

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        dispatch(forgotPassword({email: email, data: email}));
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
      </div>
    )}

  {msg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{msg}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
      )}
      
      <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Recuperación de contraseña</h1> 
      <p className="text-sm text-gray-600 text-center mt-8 mb-6">Introduce tu correo electrónico para restablecer tu contraseña</p> 
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        <button type="submit" className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4">{loading ? 'Loading...': 'Enviar'}</button>
      </form>
      <div className="text-center">
        <p className="text-sm">Volver a <Link to={"/"} className="text-blue-600 hover:underline">Iniciar sesión</Link></p>
      </div>
      <p className="text-xs text-gray-600 text-center mt-8">&copy; 2024 Business solutions</p>
    </div>
  </div>
    );
}
export default ForgotPassword;
