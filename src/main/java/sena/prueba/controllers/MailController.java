package sena.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.EmailDTO;
import sena.prueba.dto.EmailFileDTO;
import sena.prueba.services.IEmailService;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
public class MailController {
    @Autowired
    private IEmailService emailService;

    @PostMapping("/sendEmail")
  public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){


          System.out.println("mensaje recivido"+emailDTO);
          emailService.SendEmail(emailDTO.getToUser(),emailDTO.getSubject(),emailDTO.getMessage());
          Map<String ,String> response = new HashMap<>();
          response.put("estado","enviado");
          return ( ResponseEntity<?>) ResponseEntity.ok();

    }

  @PostMapping("/sendMessageFile")
public  ResponseEntity<?>  receiveRequestEmailwhitFile(@ModelAttribute EmailFileDTO emailFileDTO ){

try {
   String fileName = emailFileDTO.getFile().getName();
    Path path = Paths.get("src/mail/resources/files/"+fileName);
    Files.createDirectories(path.getParent());
    Files.copy(emailFileDTO.getFile().getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
    File file = path.toFile();
    emailService.sendEmailwhitFile(emailFileDTO.getToUser(), emailFileDTO.getSubject() ,emailFileDTO.getMessage(),file);

    Map<String ,String> response = new HashMap<>();
    response.put("estado","enviado");
    response.put("archivo","fileName");
    return ( ResponseEntity<?>) ResponseEntity.ok();



}catch (Exception e){
    throw  new RuntimeException("Error al enviar el email con el archivo"+ e.getMessage());
}




}

}
