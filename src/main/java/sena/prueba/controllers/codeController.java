package sena.prueba.controllers;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.ValidateCodeDto;
import sena.prueba.models.User;
import sena.prueba.models.Validation;
import sena.prueba.repository.UserRepository;
import sena.prueba.services.Auth_Service;
import sena.prueba.services.TwoFactorAuthenticationService;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Optional;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/code")
public class codeController {
    private final GoogleAuthenticator gAuth;
    @Autowired
    Auth_Service service;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TwoFactorAuthenticationService twoFactorAuthenticationService;

    @Autowired
    Auth_Service services;

    @PostMapping("/register")
    public void  register(
            @RequestBody User user , HttpServletResponse response) throws IOException {
    String email = user.getEmail();
        final GoogleAuthenticatorKey key = gAuth.createCredentials(email);
        System.out.println(key);
        System.out.println( key.getKey());
        user.setSecret(key.getKey());
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        userRepository.save(user);
        String otpAuthURL = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL("Buisness solutions SAS", email, key);
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(otpAuthURL, BarcodeFormat.QR_CODE, 200, 200);
            BufferedImage image = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 200; x++) {
                for (int y = 0; y < 200; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                }
            }
            OutputStream outputStream = response.getOutputStream();
            ImageIO.write(image, "png", outputStream);
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.close();
    }



//        user.setUsing2FA(true);
//        var response = service.addUser(user);
//        System.out.println(user.getIdUser());
//        System.out.println(user.isUsing2FA());
//
//        if (user.isUsing2FA()) {
//            System.out.println("estoy entro el if");
//            return ResponseEntity.ok(response);
//        }
//        return ResponseEntity.accepted().build();



    @SneakyThrows
    @GetMapping("/generate/{email}")
    public  void  generate(@PathVariable String email , HttpServletResponse response){
        final GoogleAuthenticatorKey key = gAuth.createCredentials(email);
        System.out.println(key);
        User user= userRepository.findUserByEmail(email);
        user.setSecret(key.getKey());
        userRepository.save(user);
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        String otpAuthURL = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL("my-demo", email, key);
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(otpAuthURL, BarcodeFormat.QR_CODE, 200, 200);
            BufferedImage image = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 200; x++) {
                for (int y = 0; y < 200; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                }
            }
            OutputStream outputStream = response.getOutputStream();
            ImageIO.write(image, "png", outputStream);
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.close();




//        public String generateQrCodeImageUri(String secret) {
//            QrData data = new QrData.Builder()
//                    .label("Alibou Coding 2FA example")
//                    .secret(secret)
//                    .issuer("Alibou-Coding")
//                    .algorithm(HashingAlgorithm.SHA1)
//                    .digits(6)
//                    .period(30)
//                    .build();
//
//            QrGenerator generator = new ZxingPngQrGenerator();
//            byte[] imageData = new byte[0];
//            try {
//                imageData = generator.generate(data);
//            } catch (QrGenerationException e) {
//                e.printStackTrace();
//                log.error("Error while generating QR-CODE");
//            }
//
//            return getDataUriForImage(imageData, generator.getImageMimeType());
//        }


//        public void generateQRCODE(String email, HttpServletResponse response) throws IOException {
//
//            final GoogleAuthenticatorKey key = gAuth.createCredentials(email);
//            System.out.println(key);
//            Optional<User> user= userRepository.findByEmail(email);
//            QRCodeWriter qrCodeWriter = new QRCodeWriter();
//            String otpAuthURL = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL("my-demo", email, key);
//            try {
//
//
//                BitMatrix bitMatrix = qrCodeWriter.encode(otpAuthURL, BarcodeFormat.QR_CODE, 200, 200);
//                BufferedImage image = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
//                for (int x = 0; x < 200; x++) {
//                    for (int y = 0; y < 200; y++) {
//                        image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
//                    }
//                }
//
//                OutputStream outputStream = response.getOutputStream();
//                ImageIO.write(image, "png", outputStream);
//                outputStream.close();
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            ServletOutputStream outputStream = response.getOutputStream();
//            outputStream.close();
//
//        }


    }

    @PostMapping("/validate/key")
    public Validation validateKey(@RequestBody ValidateCodeDto body) {
        System.out.println("estoy validando el codigo");
        System.out.println(body.getEmail());
        System.out.println(body.getCode());
        System.out.println(gAuth.authorizeUser(body.getEmail(), body.getCode()));

        return new Validation(gAuth.authorizeUser(body.getEmail(), body.getCode()));
    }

//    @PostMapping ("/verify")
//    public ResponseEntity<?> veryfyCode(@RequestBody VerificationRequest verificationRequest) {
//    System.out.println(verificationRequest.getEmail());
//    System.out.println("estoy aca");
//        return  ResponseEntity.ok(service.verifyCode(verificationRequest));
//
//    }



//        return new Validation(gAuth.authorizeUser(body.getUsername(), body.getCode()));





}
