package sena.prueba.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseCompanyDTO {
    private  String email ;
    private  int idCompany;
    private  Boolean response;
}
