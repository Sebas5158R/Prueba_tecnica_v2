package sena.prueba.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;

@Service
public class EmialServiceImpl  implements  IEmailService{

    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void SendEmail(String toUser, String subjet, String message) {
        SimpleMailMessage mailMessage =  new SimpleMailMessage();

        mailMessage.setFrom("carlosgalindo8090@gmail.com");
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subjet);
        mailMessage.setText(message);

        mailSender.send(mailMessage);

    }

    @Override
    public void sendEmailwhitFile(String toUser, String subject, String message, File file) {
      try{

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true, StandardCharsets.UTF_8.name());
       mimeMessageHelper.setFrom("carlosgalindo8090@gmail.com");
       mimeMessageHelper.setTo(toUser);
       mimeMessageHelper.setSubject(subject);
       mimeMessageHelper.setText(message);
       mimeMessageHelper.addAttachment(file.getName(),file);
      mailSender.send(mimeMessage);
      } catch (MessagingException e){
          throw new RuntimeException(e);
      }
    }
}
