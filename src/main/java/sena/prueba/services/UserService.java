package sena.prueba.services;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService  {
    public List<User> getAllUsers();
    public String addUser(User user);
    public void saveUsersFromExcelToDatabase(MultipartFile file);

    public User updateUser(int id, User user);

    public boolean isEmailRegistered(String email);

}
