package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table (name ="service")
public class Service {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private  Integer idService ;
    @ManyToMany(fetch = FetchType.EAGER , cascade =  CascadeType.MERGE)
    @JoinTable (
            name="service_company",
            joinColumns =  {
                    @JoinColumn (name="fk_service")
            },
            inverseJoinColumns = {
                    @JoinColumn (name = "fk_company")
            }
    )
    private Set<Service> services;

    private  String description_service;
    @Column (name="value_service")
    private  int values_service;
    @Column (name ="pending_service")
    private  Boolean pending;

}
