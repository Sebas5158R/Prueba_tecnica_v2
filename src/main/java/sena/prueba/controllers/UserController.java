package sena.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sena.prueba.models.User;
import sena.prueba.services.TokenService;
import sena.prueba.services.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private TokenService tokenService;

    @PostMapping(value = "/addFirstUser")
    public String addFirstUSer(@RequestBody User user) {
        return userServiceImpl.addUser(user);
    }

    @GetMapping(value = "/listUsers")
    public ResponseEntity<List<User>> listUsers() {
        List<User> users = userServiceImpl.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
