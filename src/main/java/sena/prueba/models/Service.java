package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table (name ="service")
public class Service {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private  Integer idService ;
    @Column(name ="description_service")
    private  String description_service;
    @Column (name="value_service")
    private  int values_service;
    @Column (name ="pending_service")
    private  Boolean pending;
}
