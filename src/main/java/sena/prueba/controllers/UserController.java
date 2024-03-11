package sena.prueba.controllers;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;
import sena.prueba.services.EmialServiceImpl;
import sena.prueba.services.UserServiceImpl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("*"

)
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmialServiceImpl emailServiceImpl;

    @PostMapping(value = "/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userServiceImpl.isEmailRegistered(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        } else {
            System.out.println("estoy registrando");
            String addedUser = userServiceImpl.addUser(user);
            return ResponseEntity.ok(addedUser);
        }
    }




    @GetMapping (value = "/findByEmail/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email){
        System.out.println(email);
        Optional<User> user = userRepository.findByEmail(email);
        return  ResponseEntity.ok(user);
    }


    @GetMapping(value = "/listUsers")
    public ResponseEntity<List<User>> listUsers() {
        List<User> users = userServiceImpl.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Add customer role type users to database from Excel
    @PostMapping("/uploadUsersData")
    public ResponseEntity<?> uploadUsersData(@RequestParam("file")MultipartFile file) {
        this.userServiceImpl.saveUsersFromExcelToDatabase(file);
        return ResponseEntity.ok(Map.of("Message","Users data uploaded and saved to database successfully"));
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userServiceImpl.updateUser(id, user);
    }

    @GetMapping("/listUser/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        User user = userServiceImpl.findByid(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            String msg = "The user not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) throws MessagingException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            emailServiceImpl.sendSetPassword(email);
            return ResponseEntity.ok("An email has been sent with instructions to reset your password.");
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PutMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        userServiceImpl.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully");
    }

    @GetMapping("/getResetPassword")
    public ResponseEntity<String> getEmailFromToken(@RequestParam String token) {
        Optional<User> userOptional = userRepository.findByResetToken(token);
        if (userOptional.isPresent()) {
            String email = userOptional.get().getEmail();
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
