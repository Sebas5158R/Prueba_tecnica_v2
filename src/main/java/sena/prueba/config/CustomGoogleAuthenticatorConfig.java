package sena.prueba.config;


import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.ICredentialRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sena.prueba.services.CredentialRepository;

@Configuration
@AllArgsConstructor
public class CustomGoogleAuthenticatorConfig {


 CredentialRepository  credentialRepository;
 @Bean
    public GoogleAuthenticator gAuth (){
  GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();
   googleAuthenticator.setCredentialRepository(credentialRepository);
   return  googleAuthenticator;
 }

}
