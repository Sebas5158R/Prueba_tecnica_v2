package sena.prueba.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class TokenService {

    public static final int EXPIRATION_IN_MINUTES = 30;
    public static final String SECRET_KEY = "MI CLAVE ES SEGURA 123456789 ABC abc";

    public String generateToken() {
        Map<String, Object> extraClaims = buildExtractClaims();
        return buildJws(extraClaims);
    }

    private static Claims verifyJws(String jwt) {
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    private static String buildJws(Map<String, Object> extraClaims) {
        Date issuedAt =  new Date(System.currentTimeMillis());
        Date expiration =  new Date( issuedAt.getTime() + (EXPIRATION_IN_MINUTES * 60 * 1000) );

        String jwt = Jwts.builder()

                .header()
                .type("JWT")
                .and()

                .subject("springboot")
                .expiration(expiration)
                .issuedAt(issuedAt)
                .claims(extraClaims)

                .signWith(generateKey(), Jwts.SIG.HS256)

                .compact();
        return jwt;
    }

    private static Map<String, Object> buildExtractClaims() {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", "springboot");
        return extraClaims;
    }

    public static SecretKey generateKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String extractEmailFromToken(String token) {
        System.out.println("Token recibido: " + token);
        Claims claims = verifyJws(token);

        if (claims != null) {
            return Optional.ofNullable(claims.get("email", String.class)).orElse("");
        }

        return "";
    }

    public String extractRoleFromToken(String token) {
        Claims claims = verifyJws(token);

        if (claims != null) {
            return Optional.ofNullable(claims.get("rol", String.class)).orElse("");
        }

        return "";
    }

}
