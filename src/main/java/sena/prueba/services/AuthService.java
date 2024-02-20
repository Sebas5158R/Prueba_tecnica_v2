package sena.prueba.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sena.prueba.dto.ReqRes;
import sena.prueba.dto.VerificationRequest;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;

import java.util.HashMap;

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

    @Autowired
    private  TwoFactorAuthenticationService tfaService ;


//    public ReqRes signUp(ReqRes registrationRequest) {
//        ReqRes resp = new ReqRes();
//        try {
//            User ourUsers = new User();
//            ourUsers.setEmail(registrationRequest.getEmail());
//            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
//            ourUsers.setRoles(registrationRequest.getUser().getRoles());
//            User ourUserResult = userRepository.save(ourUsers);
//            if (ourUserResult != null && ourUserResult.getIdUser() > 0) {
//                resp.setUser(ourUserResult);
//                resp.setMessage("User saved successfully");
//            }
//        } catch (Exception e) {
//            resp.setStatusCode(500);
//            resp.setError(e.getMessage());
//        }
//        return resp;
//    }







    public ReqRes signIn(ReqRes signinRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow();
            if (user.isUsing2FA()) {
                return ReqRes.builder()
                        .token("")
                        .refreshToken("")
                        .isUsing2FA(true)
                        .build();
            }
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


    public ReqRes verifyCode(VerificationRequest verificationRequest) {
        ReqRes response = new ReqRes() ;
        User user =
        userRepository.findByEmail(verificationRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("No user found with %S", verificationRequest.getEmail()))
                );

        System.out.println(user.getIdUser()+"estoy aca  en service");
        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {
            throw new BadCredentialsException("Code is not correct");
        }
        var jwtToken = jwtUtils.generateToken(user);
        System.out.println(jwtToken);
        return response.builder()
                .token(jwtToken)
                .isUsing2FA(user.isUsing2FA())
                .build();



}



}
