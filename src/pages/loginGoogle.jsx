import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { completeData, loginUserAction, loginWithGoogle } from "../Store/AuthSlice";
import { gapi } from "gapi-script";

gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

export function GoogleLoginButton() {

    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        dispatch(loginUserAction(response.profileObj));
        dispatch(loginWithGoogle(response.tokenId));
      };

    return(
        <GoogleLogin
        clientId = "523861067421-beqcrl6jkmdc4j8cib2tl46ga56ko2sc.apps.googleusercontent.com"
        buttonText = "Sign in with Google"
        onSuccess = {responseGoogle}
        onFailure = {responseGoogle}
        cookiePolicy = {'single_host_origin'}
        className="justify-center"
        />
    );
}

const CompleteData = () => {

    const dataUser = useSelector((state) => state.user.userFromGoogle);

    const [names, setNames] = useState(dataUser.givenName);
    const [lastNames, setLastNames] = useState(dataUser.familyName);
    const [email, setEmail] = useState(dataUser.email);
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [idRole, setIdRole] = useState(4);
    const [roleType, setRoleType] = useState("CLIENTE");

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCustomer = {
            names,
            lastNames,
            email,
            documentType,
            documentNumber,
            phoneNumber,
            password,
            roles: [
                {
                    idRole,
                    roleType
                }
            ]
        };

        console.log(newCustomer);
        dispatch(completeData(newCustomer));

        setNames("");
        setLastNames("");
        setEmail("");
        setDocumentType("");
        setDocumentNumber("");
        setPhoneNumber("");
        setPassword("");
        setIdRole("");
        setRoleType("");
    };

    return(
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <img class="mx-auto h-10 w-auto" src="logo3.png" alt="BSolutions"/>
                <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Complete the data
                </h2>
                <p class="mt-2 text-center text-sm leading-5 max-w font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Fill in the details to continue
                </p>
            </div>
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="names" className="block text-sm font-medium leading-5  text-gray-700">Names:</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="text" name="names" value={names} onChange={(e) => setNames(e.target.value)} readOnly={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="lastNames" className="block text-sm font-medium leading-5  text-gray-700">Last Names:</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="text" value={lastNames} onChange={(e) => setLastNames(e.target.value)} readOnly={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Email:</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={true} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="documentType" className="block text-sm font-medium leading-5  text-gray-700">Document Type:</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <select required={true} value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <option value="">Select documentType</option>
                                <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="documentNumber" className="block text-sm font-medium leading-5  text-gray-700">Document Number</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="number" placeholder="documentNumber" required={true} value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-5  text-gray-700">Phone Number</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="number" placeholder="documentNumber" required={true} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-5  text-gray-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="password" placeholder="Password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="text" readOnly value={idRole} onChange={(e) => setIdRole(e.target.value)} className="hidden appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white font-lg, font-bold hover:bg-blue-600">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompleteData;