package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "Actions")
public class Actions  {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private  Integer idAction;
    @Column (name= "operacion", length = 1 ,nullable = false)
    private  String operacion ;
    @Column (name = "fecha")
    private LocalDateTime fecha;

}

