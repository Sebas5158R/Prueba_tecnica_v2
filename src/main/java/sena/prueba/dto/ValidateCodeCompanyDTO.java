package sena.prueba.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ValidateCodeCompanyDTO {

    private  int idCompany ;
    private String userAuthorization;
    private int code;
}
