package sena.prueba;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import sena.prueba.models.Role;
import sena.prueba.models.User;
import sena.prueba.repository.RoleRepository;
import sena.prueba.repository.UserRepository;
import sena.prueba.services.EmialServiceImpl;
import sena.prueba.services.IEmailService;
import sena.prueba.services.UserServiceImpl;

import java.util.Optional;
import java.util.Set;
@SpringBootApplication
public class PruebaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PruebaApplication.class, args);
	}

		 @Bean
	CommandLineRunner  commandLineRunner (
			UserRepository userRepository,
	        RoleRepository roleRepository
	 ){
		 return args ->  {
			 Role role1 = roleRepository.save(new Role(1,"SUPER_ADMINISTRADOR"));
			 Role role2 = roleRepository.save(new Role(2,"ADMINISTRADOR"));
			 Role role3 = roleRepository.save(new Role(3,"EMPLEADO"));






			 User user1 = userRepository.save( new User(1,"Luis Carlos","Galindo","CarlosGalindo8090@gmail.com","Cedula de ciudadania",1212121,33424,"PASSWORD",null,null));
			 user1.setRoles(Set.of(role1));
			 User userEnd=userRepository.save(user1);
			  System.out.println("User name "+userEnd.getNames());

			  userEnd.getRoles().forEach(
					  a-> System.out.println("Roles: "+a.getIdRole()+a.getIdRole())
			  );

			 
			 
		 };
	}
}

