package sena.prueba.controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.services.TokenService;
import sena.prueba.services.UserServiceImpl;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        List<String> roles = userServiceImpl.getRolesByEmail(email);

        if (userServiceImpl.authenticate(email, password)) {
            String token = generateToken(email, roles.isEmpty() ? null : roles.get(0));
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    private String generateToken(String email, String rol) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("email", email);
        extraClaims.put("rol", rol);

        Date issuedAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(issuedAt.getTime() + (TokenService.EXPIRATION_IN_MINUTES * 60 * 1000));

        SecretKey secretKey = Keys.hmacShaKeyFor(TokenService.SECRET_KEY.getBytes());

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expiration)
                .setIssuedAt(issuedAt)
                .addClaims(extraClaims)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

}
