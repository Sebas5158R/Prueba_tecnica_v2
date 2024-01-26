package sena.prueba.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    @Column(name = "names", length = 35, nullable = false)
    private String names;

    @Column(name = "last_names", length = 40, nullable = false)
    private String lastNames;

    @Column(name = "email", length = 80, nullable = false)
    private String email;

    @Column(name ="document_type", length = 25, nullable = false)
    private String documentType;

    @Column(name = "document_number", length = 12, nullable = false)
    private int documentNumber;

    @Column(name = "password", length = 120, nullable = false)
    private String password;
    @Column (name ="legal_person")
    private  Boolean legal_person;
    @ManyToMany(fetch = FetchType.EAGER , cascade =  CascadeType.ALL)
    @JoinTable (
             name="usu_rol",
            joinColumns =  {
                     @JoinColumn (name="fk_user")
            },
            inverseJoinColumns = {
                     @JoinColumn (name = "fk_rol")
            }
    )
    private Set<Role> roles ;




}
