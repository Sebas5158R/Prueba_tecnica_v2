package sena.prueba.controllers;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.ReqRes;
import sena.prueba.models.LoginSession;
import sena.prueba.models.User;
import sena.prueba.repository.LoginSessionRepository;
import sena.prueba.services.AuthService;
import sena.prueba.services.LoginSessionServiceImpl;
import sena.prueba.services.UserServiceImpl;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private LoginSessionServiceImpl loginSessionServiceImpl;

    @Autowired
    private LoginSessionRepository loginSessionRepository;

    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes signInRequest, HttpServletRequest httpServletRequest) {
        ReqRes response = authService.signIn(signInRequest);
        User userId = response.getUser();
        LoginSession loginSession = response.getLoginSession();
        System.out.println(authService.signIn(signInRequest).getUser());

        if (response.getStatusCode() == 200) {
            //String ip = "httpServletRequest.getRemoteAddr()";
            String ip = "190.25.33.5";
            String dbLocation = "src/main/resources/static/GeoLite2-City.mmdb";

            try {
                File database = new File(dbLocation);
                DatabaseReader dbReader = new DatabaseReader.Builder(database).build();
                InetAddress ipAddress = InetAddress.getByName(ip);
                CityResponse cityResponse = dbReader.city(ipAddress);
                String countryName = cityResponse.getCountry().getName();
                String cityName = cityResponse.getCity().getName();
                String postal = cityResponse.getPostal().getCode();
                String state = cityResponse.getLeastSpecificSubdivision().getName();
                System.out.println("Country "+countryName+" City "+cityName+" Postal "+postal+" State "+state);
                loginSessionServiceImpl.registerLoginSession(userId, ip, countryName, cityName, loginSession.getSessionId());
            } catch (IOException | GeoIp2Exception e) {
                System.err.println("Error al obtener la ubicación geográfica: " + e.getMessage());
            }
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
            User user = response.getUser();
            LoginSession loginSession = response.getLoginSession();
            if (response.getStatusCode() == 200) {
                String ip = "190.25.33.5";
                String dbLocation = "src/main/resources/static/GeoLite2-City.mmdb";

                try {
                    File database = new File(dbLocation);
                    DatabaseReader dbReader = new DatabaseReader.Builder(database).build();
                    InetAddress ipAddress = InetAddress.getByName(ip);
                    CityResponse cityResponse = dbReader.city(ipAddress);
                    String countryName = cityResponse.getCountry().getName();
                    String cityName = cityResponse.getCity().getName();
                    String postal = cityResponse.getPostal().getCode();
                    String state = cityResponse.getLeastSpecificSubdivision().getName();
                    System.out.println("Country "+countryName+" City "+cityName+" Postal "+postal+" State "+state);
                    loginSessionServiceImpl.registerLoginSession(user, ip, countryName, cityName, loginSession.getSessionId());
                } catch (IOException | GeoIp2Exception e) {
                    System.err.println("Error al obtener la ubicación geográfica: " + e.getMessage());
                }

                return ResponseEntity.status(response.getStatusCode()).body(response);
            } else {
                return ResponseEntity.status(response.getStatusCode()).body(response);
            }
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

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam Integer sessionId) {

        if (sessionId == null) {
            return ResponseEntity.badRequest().body("Session ID is required");
        }

        try {
            LoginSession loginSession = loginSessionRepository.findLoginSessionBySessionId(sessionId);

            if (loginSession != null) {
                loginSessionServiceImpl.deleteLoginSession(sessionId);
                return ResponseEntity.ok("Logout successful");
            } else {
                return ResponseEntity.badRequest().body("Session not found");
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid session ID format");
        }
    }

//    @Test
//    public void givenIP_whenFetchingCity_thenReturnsCityData()
//            throws IOException, GeoIp2Exception {
//        String ip = "40.76.4.15";
//        String dbLocation = "src/main/resources/static/GeoLite2-City.mmdb";
//
//        File database = new File(dbLocation);
//        DatabaseReader dbReader = new DatabaseReader.Builder(database)
//                .build();
//
//        InetAddress ipAddress = InetAddress.getByName(ip);
//        CityResponse response = dbReader.city(ipAddress);
//
//        String countryName = response.getCountry().getName();
//        String cityName = response.getCity().getName();
//        String postal = response.getPostal().getCode();
//        String state = response.getLeastSpecificSubdivision().getName();
//
//        System.out.println("Country "+countryName+" City "+cityName+" Postal "+postal+" State "+state);
//    }


}
