package sena.prueba.models;

import jakarta.persistence.*;
import lombok.*;


import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRole;

    @Column(name = "role_type", length = 25, nullable = false)
    private String roleType;
    @Override
    public String toString() {
        return this.getRoleType();
    }



}
