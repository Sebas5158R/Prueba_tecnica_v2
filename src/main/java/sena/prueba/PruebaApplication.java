package sena.prueba;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.password.PasswordEncoder;
import sena.prueba.models.Role;
import sena.prueba.models.Service;
import sena.prueba.models.User;
import sena.prueba.repository.RoleRepository;
import sena.prueba.repository.ServiceRepository;
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
			PasswordEncoder passwordEncoder,
			ServiceRepository serviceRepository
	 ){
		 return args ->  {
			 Role role1 = roleRepository.save(new Role(1,"SUPER_ADMINISTRADOR"));
			 Role role2 = roleRepository.save(new Role(2,"ADMINISTRADOR"));
			 Role role3 = roleRepository.save(new Role(3,"EMPLEADO"));
			 Role role4 = roleRepository.save(new Role(4, "CLIENTE"));


			 User user1 = userRepository.save( new User(1,"Luis Carlos","Galindo","sdfsdfsdfsddf8090@gmail.com","Cedula de ciudadania",1212121,33424,"PASSWORD",false,null,null,false,null));
			 User user2 = userRepository.save( new User(2,"Sebastian","Rivera","sebastianriveraaviles4@gmail.com","Cedula de ciudadania",12121210,334245,passwordEncoder.encode("sebas1"),false,null,null,false,null));

//			 Service service1 = serviceRepository.save(new Service(1, "Suscripciones a platafomas de streaming", 150000, true));
//			 Service service2 = serviceRepository.save(new Service(2, "Suscripciones a juegos", 50000, true));

			 user1.setRoles(Set.of(role1));
			 user2.setRoles(Set.of(role1, role2));
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

