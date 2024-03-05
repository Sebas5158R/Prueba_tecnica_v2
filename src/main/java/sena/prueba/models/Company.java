package sena.prueba.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

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
        private String nameCompany;
    @Column(name="description_company",length = 50 , nullable = false)
        private  String descriptionCompany;
    @Column(name ="state_company")
        private String  stateCompany;
    @Column(name="code_validation")
        private  int codeValidation;
    @OneToOne
        private User user;
    @Column (name = "active")
        private  Boolean active;
    @Column( name ="phone")
        private  int phone;
    @Column ( name = "address")
        private  String address;
    @Column (name ="date_creation")
        private LocalDate dateCreation;
    @Column (name = "date_end_process")
        private  LocalDate dateEndProcess;
    @Column (name = "path_documentation")
        private  String pathDocumentation;



    /**/


    /**/

    /*
y la etapa de creacion
tambien tiene que ir el paht de la carpeta de los documentos
aqui va el codigo de creacion para la compañia preguntar como se va a hacer
 */
}
