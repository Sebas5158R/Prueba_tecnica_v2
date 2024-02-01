package sena.prueba.services;

import java.io.File;

public interface IEmailService {


    void SendEmail(String toUser , String subjet , String message);

    void sendEmailwhitFile (String toUser , String subject , String message , File file);

}
