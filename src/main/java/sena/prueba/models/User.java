package sena.prueba.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    @Column(name = "names", length = 35, nullable = false)
    private String names;

    @Column(name = "last_names", length = 40, nullable = false)
    private String lastNames;

    @Column(name = "email", length = 80, nullable = false, unique = true)
    private String email;

    @Column(name ="document_type", length = 25, nullable = false)
    private String documentType;

    @Column(name = "document_number", length = 12, nullable = false, unique = true)
    private long documentNumber;
    @Column(name="phone_number", unique = true)
    private  long phoneNumber;
    @Column(name = "password", length = 120)
    private String password;
    @Column (name ="legal_person")
    private  Boolean legal_person;

    @Column(name = "reset_token", unique = true)
    private String resetToken;

    @ManyToMany(fetch = FetchType.EAGER , cascade =  CascadeType.MERGE)
    @JoinTable (
             name="usu_rol",
            joinColumns =  {
                     @JoinColumn (name="fk_user")
            },
            inverseJoinColumns = {
                     @JoinColumn (name = "fk_rol")
            }
    )
    private Set<Role> roles;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(roles.toString()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
