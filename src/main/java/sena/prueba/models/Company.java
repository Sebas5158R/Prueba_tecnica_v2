package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.nio.file.Files;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "company")
public class Company {
    @Id
    @Column  (name = "nit_company")
        private Integer idCompany ;
    @Column (name ="name_company" , length = 50 , nullable = false)
        private String name_company;
    @Column(name="description_company",length = 50 , nullable = false)
        private  String description_company;
    @Column(name ="state_company")
        private String  state_company;
    @Column(name="code_validation")
        private  int codevalidation;
    @OneToOne
        private User user;
    @Column (name = "active")
    private  Boolean active;
   @Column (name = "path_documentation")
    private  String path_documentation;

    /**/


    /**/

    /*
y la etapa de creacion
tambien tiene que ir el paht de la carpeta de los documentos
aqui va el codigo de creacion para la compañia preguntar como se va a hacer
 */
}
