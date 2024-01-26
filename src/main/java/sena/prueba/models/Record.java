package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table (name ="record")
public class Record  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private  Integer idRecord;
    @Column (name ="date_service",nullable = true)
        private LocalDate date_service;


    @ManyToMany (fetch =  FetchType.EAGER , cascade = CascadeType.ALL )
    @JoinTable (
               name =  " record_company",joinColumns =  {
                       @JoinColumn (name = "fk_record")},
            inverseJoinColumns = {
                       @JoinColumn (name = "Fk_company ")
            }
    )
    private  Set<Company> companies;


    @ManyToMany (fetch = FetchType.EAGER , cascade = CascadeType.ALL)
        @JoinTable (
             name = "record_service" ,joinColumns = {
        @JoinColumn(name = "fk_record")},
                    inverseJoinColumns =  {
                     @JoinColumn (name = "fk_service")
                            }
)
    private Set<Service> services;

}
