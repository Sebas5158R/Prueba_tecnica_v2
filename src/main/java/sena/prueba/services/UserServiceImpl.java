package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sena.prueba.models.Role;
import sena.prueba.models.User;
import sena.prueba.repository.RoleRepository;
import sena.prueba.repository.UserRepository;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Override
   public List<User> getAllUsers() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "idUser"));
    }

    @Override
    public String addUser(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);
        return "Registered user successfully";
    }

    @Override
    public void saveUsersFromExcelToDatabase(MultipartFile file) {
        if (ExcelUploadService.isValidExcelFile(file)) {
            try {
                List<User> users = ExcelUploadService.getUserDataFromExcel(file.getInputStream());

                Role defaultRole = roleRepository.findById(4).orElseThrow();
                for (User user : users) {
                    if (user.getRoles() == null || user.getRoles().isEmpty()) {
                        user.setRoles(new HashSet<>(Arrays.asList(defaultRole)));
                    }
                }
                this.userRepository.saveAll(users);
            } catch (IOException e) {
                throw new IllegalArgumentException("The file is not a valid Excel file");
            }
        }
    }

    @Override
    public User updateUser(int id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            user.setIdUser(id);
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }


    public User findByid (int id){
        return userRepository.findByIdUser(id);

    }

}
