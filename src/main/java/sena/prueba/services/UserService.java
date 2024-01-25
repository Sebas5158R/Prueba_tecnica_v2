package sena.prueba.services;


import org.springframework.security.core.userdetails.UserDetails;
import sena.prueba.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService  {
    public List<User> getAllUsers();
    public String addUser(User user);
    public List<String> getRolesByEmail(String email);
    public boolean authenticate(String email, String password);
}
