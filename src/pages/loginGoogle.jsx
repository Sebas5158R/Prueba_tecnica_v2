import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, loginWithGoogle } from "../Store/AuthSlice";
import { gapi } from "gapi-script";
import { addUser } from "../Store/UserSlice";

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
        setTimeout( function() { window.location.href = "http://localhost:3000/dashboard"; }, 3000 );
      };

    return(
        <GoogleLogin
        clientId = "523861067421-beqcrl6jkmdc4j8cib2tl46ga56ko2sc.apps.googleusercontent.com"
        buttonText = "Sign in with Google"
        onSuccess = {responseGoogle}
        onFailure = {responseGoogle}
        cookiePolicy = {'single_host_origin'}
        />
    );
}

const CompleteData = () => {

    const [names, setNames] = useState("");
    const [lastNames, setLastNames] = useState("");
    const [email, setEmail] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [idRole, setIdRole] = useState(4);

    const dispatch = useDispatch();

    const dataUser = useSelector((state) => state.user.userFromGoogle);

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
                    idRole
                }
            ]
        };

        console.log(newCustomer);
        dispatch(addUser(newCustomer));

        setNames("");
        setLastNames("");
        setEmail("");
        setDocumentType("");
        setDocumentNumber("");
        setPhoneNumber("");
        setPassword("");
        setIdRole("");
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="names">Names:</label>
                    <input type="text" value={dataUser.givenName} readOnly={true}/>
                </div>

                <div>
                    <label htmlFor="lastNames">Last Names:</label>
                    <input type="text" value={dataUser.familyName} readOnly={true}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" value={dataUser.email} readOnly={true} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="documentType">Document Type:</label>
                    <select required={true} value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                        <option value="#">Select documentType</option>
                        <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                        <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="documentNumber">Document Number</label>
                    <input type="number" placeholder="documentNumber" required={true} value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" placeholder="documentNumber" required={true} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>

                <div>
                    <input type="text" readOnly value={idRole} onChange={(e) => setIdRole(e.target.value)}/>
                </div>

                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default CompleteData;