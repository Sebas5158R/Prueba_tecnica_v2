package sena.prueba.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ValidateCodeDto {
private   String  email  ;
private  int code;
}
