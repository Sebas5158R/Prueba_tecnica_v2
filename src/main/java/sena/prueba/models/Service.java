package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table (name ="services")
public class Service {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private  Integer idService ;

    @Column(name = "category", length = 60)
    private String category;

    @Column(name = "description_service")
    private  String descriptionService;

    @Column (name ="available")
    private  Boolean available;

}
