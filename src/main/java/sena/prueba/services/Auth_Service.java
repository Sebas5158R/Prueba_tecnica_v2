package sena.prueba.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sena.prueba.dto.ReqRes;
import sena.prueba.dto.VerificationRequest;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class Auth_Service {
    private final UserServiceImpl repository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtService;
    private  final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TwoFactorAuthenticationService tfaService;

    public ReqRes addUser(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        if (user.isUsing2FA()) {
            user.setSecret(tfaService.generateNewSecret());
        }
        repository.addUser(user);
        ReqRes res = new ReqRes();
        System.out.println("estoy aca");

        // if MFA enabled --> Generate Secret
        var jwtToken = jwtService.generateToken(user);
        System.out.println(jwtToken);
       ReqRes  response = new  ReqRes();
       response.setSecretImageUri(tfaService.generateQrCodeImageUri(
               user.getSecret()
       ));
       System.out.println(response.getSecretImageUri());
       response.setToken(jwtToken);

        return response;
//
    }

    public ReqRes authenticate(ReqRes request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        if (user.isUsing2FA()) {
            return request.builder()
                    .token("")
                    .refreshToken("")
                    .isUsing2FA(true)
                    .build();
        }
        var jwtToken = jwtService.generateToken(user);
        return request.builder()
                .token(jwtToken)
                .isUsing2FA(false)
                .build();
    }

//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        final String refreshToken;
//        final String userEmail;
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        refreshToken = authHeader.substring(7);
//        userEmail = jwtService.extractUsername(refreshToken);
//        if (userEmail != null) {
//            var user = this.repository.findByEmail(userEmail)
//                    .orElseThrow();
//            if (jwtService.isTokenValid(refreshToken, user)) {
//                var accessToken = jwtService.generateToken(user);
//                var authResponse = AuthenticationResponse.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .mfaEnabled(false)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
//            }
//        }
//    }


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
        var jwtToken = jwtService.generateToken(user);
        System.out.println(jwtToken);
        return response.builder()
                .token(jwtToken)
                .isUsing2FA(user.isUsing2FA())
                .build();
    }


//    public AuthenticationResponse verifyCode(
//            VerificationRequest verificationRequest
//    ) {
//        User user = repository
//                .findByEmail(verificationRequest.getEmail())
//                .orElseThrow(() -> new EntityNotFoundException(
//                        String.format("No user found with %S", verificationRequest.getEmail()))
//                );
//        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {
//
//            throw new BadCredentialsException("Code is not correct");
//        }
//        var jwtToken = jwtService.generateToken(user);
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                .mfaEnabled(user.isMfaEnabled())
//                .build();
//    }
}