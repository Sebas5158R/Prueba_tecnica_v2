package sena.prueba;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.password.PasswordEncoder;
import sena.prueba.models.Role;
import sena.prueba.models.User;
import sena.prueba.repository.RoleRepository;
import sena.prueba.repository.UserRepository;


import java.io.File;
import java.util.Set;
@SpringBootApplication
public class PruebaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PruebaApplication.class, args);
	}

		 @Bean
	CommandLineRunner  commandLineRunner (
			UserRepository userRepository,
	        RoleRepository roleRepository,
			PasswordEncoder passwordEncoder
	 ){
		 return args ->  {
			 Role role1 = roleRepository.save(new Role(1,"SUPER_ADMINISTRADOR"));
			 Role role2 = roleRepository.save(new Role(2,"ADMINISTRADOR"));
			 Role role3 = roleRepository.save(new Role(3,"EMPLEADO"));
			 Role role4 = roleRepository.save(new Role(4, "CLIENTE"));

			 User user1 = userRepository.save( new User(1,"Luis Carlos","Galindo","CarlosGalindo8090@gmail.com","Cedula de ciudadania",1212121,33424,"PASSWORD",null,null));
			 User user2 = userRepository.save(new User(2, "Sebastian", "Rivera Aviles", "sebas@gmail.com", "Cedula de ciudadania", 32432432, 301202020, passwordEncoder.encode("sebas1"), null, null));

			 user1.setRoles(Set.of(role1));
			 user2.setRoles(Set.of(role1));

			 User userEnd=userRepository.save(user1);
			 User userEnd2 = userRepository.save(user2);

			  userEnd.getRoles().forEach(
					  a-> System.out.println("Roles: "+a.getIdRole()+a.getIdRole())
			  );

			  userEnd2.getRoles().forEach(
					  a -> System.out.println("User 2 Roles: "+a.getIdRole()+a.getIdRole())
			  );

		 };
	}
}

