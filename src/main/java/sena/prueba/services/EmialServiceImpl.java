package sena.prueba.services;

import jakarta.activation.DataSource;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmialServiceImpl  implements  IEmailService{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;
    @Override
    public void SendEmail(String toUser, String subjet, String message) {
        SimpleMailMessage mailMessage =  new SimpleMailMessage();

        mailMessage.setFrom("norepli@gmail.com");
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

    @Override
    public void sendSetPassword(String email) throws MessagingException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = userOptional.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        userRepository.save(user);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Restablecer contraseña");
        ClassPathResource resource = new ClassPathResource("src/main/resources/static/img/logo.png");
        mimeMessageHelper.addInline("logo", resource);
        String resetLink = "http://localhost:3000/resetPassword?token=" + resetToken;
        String html = ("""
                <!DOCTYPE html>
                    <html>
                    <head>
                    </head>
                    <body style="font-family: Arial, sans-serif;">
                        <div style="margin: 0 auto; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                            <img style="display: block; margin: 0 auto;" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACGALkDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwIJ/8QANxAAAQMEAgEDAgQEBQQDAAAAAQIDBAAFBhEHEiEIEzEUIjJBUWEVFkJxIzM3doEJNlKxd5Gz/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQIGAf/EADURAAEDAwEEBwYHAQEAAAAAAAEAAhEDBCExEkFRYQUTIjJxgbEUUmKRocEGI0JjovDxJOH/2gAMAwEAAhEDEQA/AP1TpSlESlKURKUpREpSlESlKURKUrwnToVsiPXC5TGIkWOguOvvuBDbaR8qUo+AP3NEXvSsa3XK3XiEzc7TPjzYchPdmRHdS424n9UqSSCP7Vk0RKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKwb1fLNjlskXrILrEtsCKguPypTyWmm0j81KUQBVK+rr1B5B6fcLtt2xmyQZ9wvEtcNtcxSvbj6bKu5QnRWf27D/muMOM+esP5GzORP8AVJOn32WtOrG/OWpdkt7xPj34TPTaNkbUCfA0U/1CRlMuzuUT6oYY3rsO9+qablapdu9PmEv5WIo6yMluJMGwwj/UVvOdS51HkpTrY+Capmf9RyjfVRclu9750v7Kw6LLYlrt2KW5QOke6vx72jshRICgNE1cmJ+n13kO326/8t8hs5Tagn3YFix5YjWFpGz06BvqXQE60dJPyCVDyb2sWP2PGLazZ8dtES2wWB1bjxWUtoT/AMAfP7/JrS/4rP8AddykN+eHHy2fErOi9vP2m84Lvllo89rwC4kjxn+Lr8k2eVeuBcikue6uFMSq44ldXNAKCdFQZ387BISPAIOquOzeqG94YmJE9QODOWOJJPSPl1kUZ9hl7BKF90bWz3A8JUFH8z1G9X5d7NaL/b3rVfLZFuEKQkpdjyWUuNrH6FKgQaofMPT/ABeOoFxyjiXkJGFQ/bLk203hwSLHJ8+Q4h0n29/BUO3g6AFfR7HfGB+W8+JafVw/l5L4fbLESfzGDwDh6NPls+avOwZFYcqtbN8xq8wrrb5I7NSob6Xmlj9lJJFbGvzrwnO+PJ2U98Pvlw4hy+TJ+nE7GmlzMeuS1KABcgu/c2kq11AGgDs6rqr08cwZxn92zPBeRbTaGb9gk1m3y5tqcWY8xSgv70oWNo/B+vnfwNaqvfdG3PRz9i4bH38DvVix6StukWbdu6ft4jd/YV1UpSqCvpSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIuSv+oHjEvNrfxlhkCQ0xJv2VN2xl17fRtbyQ2lStedAqBOq4E5L4qzziPIV43nlgft0kbUy4R2ZkoB13acH2rT/byPzANfpB6tv+9+CP8A5Et//wCiKw+EcXsHLsPkvDuS7a1kdnt2WvGFGnkuCISpSj7Kt9mtnf4SPlX/AJHehb0S63fWnDI+phZtxVDbhlEjL5z4CVzh6Vs3zngvCp/LOYZVIgcfKK49vsDoC3b7O0rQipV/lJSRtbo0D8aVrx06163uPzh9oyJ7Fr8m531ouQbM2htyQ6kKUj3OyT1DZWhaUk/eepPTWiefvVvwfcnOU4jmS8nW6NY5MMMY3aYluccegtJ2ER0xWvCWQQNug7PnSFEdaqbkDK8k4zkR4aMZixLui0ptEG+Q7mmXB+nbSWVvQyhOgtQCwVFaikrX9qFa1ZtbakIuLxjtggxGNo7hPDiVWurmtm3s3N2wRM52RvMceAXWEr1/sWpTsa/cOXe3ywnuyy7PA7pP4Sru0kp3+wP/ADVJ+pfMMy5JTA5Bi5PKuuC3JQEKKhPtotUrrtUWQ2nx7ydq0s77p2UnXgVHieSZDMsysZzuJJvFvbSJUdlZULnAZc0r6qJ3GnWj5K2gSCNq+w/4ieovSh6e73fbdOyS75Hb5vHuQsKZMBsKcTd0JKkhZSSlUdTawdK/GFJIHg7Ppejb3oizYbymwMqN1aSXSD7pM5/w4yPOdJWfS948WdR5fTdo4ANgj3gIx/ozg8vYIw8rL7DJSystIu0NKlhJ6hRdToE/qdH/AOq7p9Mv+vXqB/3DG/8AT1Y/qWwjFOP+P8Dx3DrHGtcBrMYBDTKfKlaXtS1Halq/dRJrJ9Mv+vPqA/3DG/8AT1Z/4k6Sb0rSpXLGwO0BPItWh+G+jXdFVats90nskxzBXStKUryK9clKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoi5u9YyZVtmcU5s5bpz1mxXNIV0vEmNGW8IcVC0lTiwgEgeNfudD5IqK8XZ3cOLpuV5pjVmZ5EwXJ7ou6uXbGZQek20lR22/FUAsEJUCd6AGjvz466ICgUqAIPgg1Tea+l3Bb5eFZjgc+48e5X39z+LY4v2A8fzS+wP8N1JPlQ0Cojyr5Bv2l4Ldrqb2hzXagzuMjIyD/SCqF3Zm4c2oxxa5uhxvEHBwR/QQtn9Zwl6lcakxINzhXdPtey4tg+zPhpX5IHYBxvetHxpWiPNVa96TL7Ev8XHYtxtlxwh6QuStqYlQ/hraFJ9tuOyk+X1Aq7SFLUF+QtvQ05D8+wPP8Sm/wAW5bwCRd/YdUGOReO9xbsyASW3ZcJGgo9QApSfCQNBROiZZx7zxyPEtv8AFrNcrbzLiTKkLem2gCPf4LSvB+ohHRJTo6Ghv5K9fGpReXUjSsqnZP6Hxr8J7pPDunkVl1mAVRVvafaH62Tp8Q7wHHvDmFNME9HvE2JOQZ90hSb1Mt0tq4QUSH1JjW6SklSvpm0aKG1LJWW1FSN/lVj5fyDxxxNZ2nspvttsUNI6R44AC1gf0tMoBUrW/wClJ1VE57zxyVdLYu6vyLdw5iKlK6XbIiHLzNbSNq+mg6JKiCPt0fP4V/lUJwTDs1zW4i98ScfyluyCgvcj8k9npbhOtuwoKtj7R5QtWwfgkfNUvYqVDtXlTPutgnzPdH8jyVz22rX7NnTx7zpA8h3j/Ec1v+WuQbjzLb7DeZtjbwPALJd2burIcokiM5N9snSI8ZO1rKgSRrtvx+H85D6S3Hb/AMi8xciW6DO/lzKL2xJs9wfiOMNzW0+8FKb9xIKgCQCdfJqX4h6WcMt94RmPJt2n8kZUCFC5X/S2WCPgMRdlptIPkA9iD8EVdCEIbQENpCUpGgANACoLu8FdraVNuyxswMnXJknUnyHABWLSyNBzqtR2090ScDQQIAwAPM8SV9UpSqCvpSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiVVHIXpp41z26pymKxOxXKGlLW3fsdf+hmFStbLhSOruyB+IE/OiNmo7jvNXM+ey767gnFdhk22zXeTafdmX5TTi1Mr6lRT7Xjfg/tvXnW63tk5mzG25naMI5Z41GNPZApbNpuMO6InRJT6E9i0rSUqaOvjtvZ+K0XdGXNIkYkCSA5pOknEzos1nSltVAOYJgEtcBrAzEar4wD0v8cYdck5RkBn5vlRSn3L5kjxmvhQ87aSvaWhvetAqA8djVv1U+W8vZW9nM3jXibDI2QXmzstP3iTPm/SxIIcSFNo3oqcWpJB0nwNj5869sZ5A5dj5PBxzknihESNdOyY93sc0zYzLgG+khJSFNAjel+RvQ18kcGwr7G26NJguExrMTOmfDK7F/QD+rbOsSGmJ0iYjXB54VpUpSqKvpSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiLn70zM3R/EeRmLJMZiXBeX3dMZ95n3W2nSv7VKQCOwB142KjfIcHlLj/LcO5U5kyOz5ZYrNdExGoNuiqhmE9IHQSkp8+8pOvhR8f06J3U2g+nC/Y/Pu72Gc25PYYd3uL9ychsRoy0JddV2VoqTs/p/YVsYHp5RNvVuvPI/JOTZqm0vplQoFwW21CQ8nylxTTaR3Uk/Gzr9Qa9Qb21bcvuOsBa7UbJ2oIggOIx4g/NeXFldOtmW/VkObodobMgyCWgmfAhZeY8OTrhmEvkPjLPpOIZRMbaYuShGRNiTm0J0gPR1kaX1CQFgggD42d1pZHIPMXFV2s0fleJj2QWC+XBm1NXeypcjSIcl1RCA8wsqC0qPgFBGtHf5A77LeD2bvlErN8NzrIMOvdxQhFwdtzqXGJnVISlTjDgKSpKQAFDXjfzvdYtn4Eccv1uyDkbknIs1dsz31NviTvaYhsvj8LxaaSO7ifOiTobPiqlO4t3UwLh4e0CILe2MYAcNwOkuiN25W6lvcNqk27CxxMyHdg5yS07yNYbM796tmlKVhLdSlKURKUpREpSlESlKURKUpRFA+Xpt1j2ywQLVd5dtN2yKBb5D8RYQ8GHFHuEqIPUnQ86qv8AJMwzDCF5HbI90yaNHYsFwftr1/RHeXJmsKSfcjONhW0BvsopdIPlBSnwurkyfE7HmEFm3X5h9xqPJbmMqYlvRnGnmztC0uNKStJGz8GtfA42xGDMM9yLOuL/ALDsVK7rdJVw6NOABxKRJcWEhQACta2PB8VqW13QpUw2o2YncPLM/bRZdzaV6tQupuiYzJ88R566rw5Uvtzx/BpV3skssTEyYKGnEpSon3JTSCACCDtKiPj86h0heSWa+zb7nN2ze2oiSHFNz7ctiRaPpPc2gKjpStadIOlrcb2NKV3GgRMoHFWF252EtiLcnGbattyHEk3iY/Fjqb/yyhhx1TSemh10n7dDWtV9P8X4hIW8HWbp9NIcU49CTeZiYbhUSVAxw77RSokkp69Ts7BrmjXt6TdjJ1k7ImDGNeW+RnRfa1vc1XbeBpA2jEic6c90HGqrGy53yhdc4nM2O7M3KNa5d7cXanWW0/WxmJjTTbTbo10cSlw9VHYOtK+ew+c55UuN4uqmcSvF1EB6Jag7DhNoantPruK2X2tOgFt7qOhSojRH/NW/aMHxaw3V69Wm0ojzXzIU46lxZ2X3EuO+CSB2WhJ8DxrxoVg3fi3BL5c5t6m2PpcLimOmTLiyXozy/YX3aV3aWkhSVeQoEHwBvQqdt7adaHGngDGBxnI38jru00hNjd9UWipknOTwjB9Rpv11idmiZk5aL6rG/wCeYd4EJSYP81SIrjCnSfBR7al6WNfKh18jYI2KYw/c7cuXaWrvmMDILnEk/QQcqdZksOSEpCu7brQWnSfP2JWNp7Hp4BEua41xhEeVEkOXydHmNFl5mff58tBTsHYS88oJUCAQpOlDXgikfjXE2X1SJLFwuLhYdjJNzusqb7bbg0sID7iuhUPBKdEjxuojd0XBwI1+EcPE4n/wqRtpWbskHT4jxzuGY3/MKKYXJm2a8xP5ruWdW64XN0MrjXh2PKgypBQpRS04ylSGhvsUgFrtrXXxoSPkuPlcm2w0Y4LmuMZBFzatL7LE5bBQrXsreISCF9SfuSrQOj+uXA48xq3zY89P8VlOQ3PdjJn3iZLbYX1KQpDbzqkJUApQB1sAkDVbG/4xaMlbYRdESgqKsuMPRZj0V5tRGj1cZUlY2Dojej+dRPuKTq7aoHjj0E/eVNTt6raDqRPhn1MfZVo7mMux2eLjFjyC+i6z7xCta3ckjpU/aW30KUFk9AHwr2loQoqWn3VAFRCetbXJrdfOObW9l1tzi+XNSJbCpUG6ONPtS0rcSgoaAQktLPf7Q2Up3oFJHxJmOOsQat9wtki1rntXYITNVcJT0t18I/AFOPKUvSflIB+0+Ro15xONMUizotwcbuc92C4Hoqbjd5c1thwAgLQ2+6pIUATpWtjfgipfaqEyAY34Ha0+X1jXVRC1uIgkTuMns67t/wBJ00Xlx7e7reseucy5yi+/HvN2itr6JGm2ZbqG06A/JKUj9fHndau0ZRe3+B2cvkXAqu5xozlSShO/fEcq79ddfxDeta/ato1xbikaU9LiPZBFMiU7Ncaj5HcWmS84suLV7SHwgAqUSQE68/FfC+JcHcCmVQrj9EpZcVbheJggklXYgxQ77PXt569Ou/yqPrbUuJzBIPdGmca8/ouxSug0DEgEd464zpy+qhub2u+Kdwm6MZ7k8NeR3eJCmsx5iW2ktqhurV0R0+0lTSTv+/60yHKsqxHKJeG2vIXX2zb7NHizLmhL5jPSpkhpchwgJLhCUoABIBITv892ncrFabwu3uXGGl1VqlJmw/uKfaeShSAoaI3pK1jR2PPxWLccNxi8SbhLutmjy13WE3bpgeBWh6OhS1JQUk9fBcWdgb8/Pga7Ze04a2o2QBwHGfTC5fZVJc6m6CTxPCPXKheX2m/8e47dc7tnId5myre0JkiLeHGnYsxKPKmUtpQj2VrG0pLXX7ynYUPFajCuSMthS77eMydMzF1ZFPt7MpLCUuWUNulKEv8AX8bJ8D3NEoP4vt+5M4j8W4czIiSH2LlOTAdS9FYuF3lzGGXE/gWlp51SApPyk62nQ1rVbq3Y3Y7TFnQoNubQxcpL8yW2olaXnXlFTqiFE/iJOx8ftQ3dDqyxzdonfABjlE6bj5aa/BaV+sD2u2QN0kiecxrvHnrpTsafyFlkNqfKmZLOsH8Qu0ZSsalR40tt1q4vNtKcKyhS2gylKQG1b2CVJV9pFs4bcodzsaHId4nXIMOuR3HpzAZkBxCiFIcQEI0pPx+Eb8HzvZ1MPiLBLZDjwbJbptoZipW20LZdZcQhCnFOFBLTiSpPdxZAOwnsdaqRWOxWvHIAttojqaY7rdV3dW6tbijtS1rWSpaiTsqUSTXN3cUazYpiM4wBjnk500hd2lvXoumoZxnJOcaYGNdZWwpSlZy0UpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpRF//Z" alt="Logo de la empresa">
                            <h2 style="text-align: center;">¿Restablecer la contraseña?</h2>
                            <p style="color:#888888; display:contents">Estimado usuario,</p>
                            <br>
                            <p style="color: #888888;">
                                Solicitó restablecer la contraseña para restaurar el acceso a su cuenta <b><a href="#">%s</a></b>.
                            </p>
                            <p style="text-align: center; margin-bottom: 20px;">Haz clic en el siguiente enlace para cambiar tu contraseña:
                            </p>
                            <div style="justify-content: center; display: flex;">
                                <a style="color: #fff; background-color: #007BFF; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; text-decoration: none;"
                                    href="%s" target="_blank">
                                    Restablecer contraseña
                                </a>
                            </div>
                            <br>
                            <p style="color: #888888;">
                                Si no solicitó restablecer la contraseña para su cuenta, alguien puede haber ingresado la dirección de correo electrónico por error. Si ese es el caso, ignore este mensaje.
                            </p>
                            <div style="margin-top: 50px; color: #888888;">
                                <p>Atentamente,</p>
                                <p>El equipo de <span style="color: #007BFF;">Business Solutions</span>.</p>
                            </div>
                    
                            <hr style="background: #505050;">
                            <div style="color: #888888;">
                                <p>
                                    Nota: No responda a este mensaje de correo electrónico. El mensaje se envió desde una dirección solo para notificaciones que no puede aceptar correo electrónico entrante.
                                </p>
                            </div>
                            <div>
                                <td align="center" valign="top">
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" style="font:11px Tahoma,Geneva,sans-serif;text-align:center;vertical-align:middle;word-spacing:8px">
                                                </td><td>
                                                <td nowrap="">
                                                    <a href="#" title="Términos de uso" style="border-bottom-width:5px;border-color:#ffffff;border-left-width:10px;border-right-width:10px;border-style:solid;border-top-width:10px;color:#007BFF;font:10.5px Tahoma,Geneva,sans-serif;line-height:3;text-decoration:underline;white-space:nowrap;word-spacing:0" target="_blank">Términos de uso</a>
                                                </td>
                                                <td nowrap="" valign="bottom" align="center" style="width:9px">
                                                </td>
                                                <td nowrap=""><a href="#" title="Contactos" style="border-bottom-width:5px;border-color:#ffffff;border-left-width:10px;border-right-width:10px;border-style:solid;border-top-width:10px;color:#007BFF;font:10.5px Tahoma,Geneva,sans-serif;line-height:3;text-decoration:underline;white-space:nowrap;word-spacing:0" target="_blank">Contactos</a></td>
                                                <td nowrap="" valign="bottom" align="center" style="width:9px">
                                                </td>
                                                <td nowrap=""><a href="#" title="Soporte técnico" style="border-bottom-width:5px;border-color:#ffffff;border-left-width:10px;border-right-width:10px;border-style:solid;border-top-width:10px;color:#007BFF;font:10.5px Tahoma,Geneva,sans-serif;line-height:3;text-decoration:underline;white-space:nowrap;word-spacing:0" target="_blank">Soporte técnico</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </div>
                        </div>
                    </body>
                    </html>
            """);
        String formattedHtml = String.format(html, email, resetLink);
        mimeMessageHelper.setText(formattedHtml, true);
        mailSender.send(mimeMessage);
    }

}
