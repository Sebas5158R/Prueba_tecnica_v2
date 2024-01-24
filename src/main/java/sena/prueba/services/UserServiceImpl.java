package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sena.prueba.models.Role;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public List<String> getRolesByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.map(user -> {
            return user.getRoles().stream()
                    .map(role -> role.getRoleType())
                    .collect(Collectors.toList());
        }).orElse(Collections.emptyList());
    }

    @Override
    public boolean authenticate(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.map(user -> {
            Collection<? extends GrantedAuthority> authorities = getAuthorities(user.getRoles());
            authorities.forEach(authority -> {
                System.out.println("Role: " + authority.getAuthority());
            });
            return passwordEncoder.matches(password, user.getPassword());
        }).orElse(false);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleType()))
                .collect(Collectors.toList());
    }


}
