package sena.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.ReqRes;
import sena.prueba.models.User;
import sena.prueba.services.AuthService;
import sena.prueba.services.UserServiceImpl;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes signInRequest) {
        ReqRes response = authService.signIn(signInRequest);

        if (response.getStatusCode() == 200) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/loginWithGoogle")
    public ResponseEntity<ReqRes> loginWithGoogle(@RequestParam("tokenId") String tokenId) {
        try {
            ReqRes response = authService.signInWithGoogle(tokenId);
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ReqRes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ReqRes());
        }
    }

    @PostMapping(value = "/completeData")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userServiceImpl.isEmailRegistered(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        } else {
            ReqRes addedUser = authService.completeData(user);
            return ResponseEntity.ok(addedUser);
        }
    }



}
