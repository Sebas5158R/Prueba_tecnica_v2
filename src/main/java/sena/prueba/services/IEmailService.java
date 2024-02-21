package sena.prueba.services;

import jakarta.mail.MessagingException;

import java.io.File;

public interface IEmailService {


    void SendEmail(String toUser , String subjet , String message);

    void sendEmailwhitFile (String toUser , String subject , String message , File file);

    public void sendSetPassword(String email) throws MessagingException;

}
