package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @OneToOne
        private User user;

}
