package sena.prueba.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompanyDTO {
    private  Integer idCompany;
    private String name_company;
    private String   description_company;
    private  String state_company;
    private   int codevalidation;
    private  Boolean active;
    private MultipartFile documents;
}


