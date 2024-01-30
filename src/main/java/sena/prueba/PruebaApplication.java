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

			 Role role1  = roleRepository.save(new Role(1,"Administrador"));
			 User user1 = userRepository.save( new User(1,"Luis Carlos","Galindo","CarlosGalindo8090","cc",1212121,75757,"PASSWORD",null,null));
			 user1.setRoles(Set.of(role1));
			 User userEnd=userRepository.save(user1);
			  System.out.println("User name"+userEnd.getNames());
			  userEnd.getRoles().forEach(
					  a-> System.out.println("Roles"+a.getIdRole()+a.getIdRole())
			  );
			  String email = "CarlosGalindo8090";
			 Optional<User> user2 =userRepository.findByEmail(email);
		 };






	}
}

