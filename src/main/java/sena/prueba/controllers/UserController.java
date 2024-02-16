package sena.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.User;
import sena.prueba.services.UserServiceImpl;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping(value = "/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userServiceImpl.isEmailRegistered(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        } else {
            String addedUser = userServiceImpl.addUser(user);
            return ResponseEntity.ok(addedUser);
        }
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

}
