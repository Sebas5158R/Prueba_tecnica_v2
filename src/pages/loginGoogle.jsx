import React from "react";
import GoogleLogin from "react-google-login";

export function GoogleLoginButton() {

    const responseGoogle = (response) => {
        console.log(response);
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