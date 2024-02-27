package sena.prueba.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sena.prueba.dto.ReqRes;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;

import java.util.*;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    private HttpTransport transport;
    private JsonFactory jsonFactory;

    public ReqRes signIn(ReqRes signinRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow();
            System.out.println("USER IS: "+user);
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationToken("24Hr");
            response.setMessage("Successfully Signed In");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes signInWithGoogle(String idTokenString) {
        transport = new com.google.api.client.http.javanet.NetHttpTransport();
        jsonFactory = new com.google.api.client.json.gson.GsonFactory();

        ReqRes response = new ReqRes();
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList("523861067421-beqcrl6jkmdc4j8cib2tl46ga56ko2sc.apps.googleusercontent.com")).build();
            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String userId = payload.getSubject();
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String names = (String) payload.get("given_name");
                String lastNames = (String) payload.get("family_name");

                System.out.println("userId: "+userId+"Email: "+email+" Names:"+names+" LastNames:"+lastNames+ "Email disponible:"+emailVerified);

                var user = userRepository.findByEmail(email).orElseThrow();
                var jwt = jwtUtils.generateToken(user);
                System.out.println("Token JWT "+jwt);
                var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationToken("24Hr");
                response.setMessage("Successfully Signed In with Google account");
            } else {
                throw new IllegalArgumentException("Invalid ID token.");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes completeData(User user) {
        ReqRes response = new ReqRes();

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);

        var jwt = jwtUtils.generateToken(user);
        System.out.println("TOKEN "+jwt);
        response.setStatusCode(200);
        response.setToken(jwt);
        response.setExpirationToken("24Hr");
        response.setMessage("Successfully Signed In with Google account");
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest) {
        ReqRes response = new ReqRes();

        String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
        User users = userRepository.findByEmail(ourEmail).orElseThrow();

        if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenReqiest.getToken());
            response.setExpirationToken("24Hr");
            response.setMessage("Successfully Refreshed token");
        }
        response.setStatusCode(500);
        return response;
    }

}
