package sena.prueba.services;


import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.User;

import java.util.List;

public interface UserService  {
    public List<User> getAllUsers();
    public String addUser(User user);
    public void saveUsersFromExcelToDatabase(MultipartFile file);
    public User updateUser(int id, User user);
    public boolean isEmailRegistered(String email);

    String forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}
