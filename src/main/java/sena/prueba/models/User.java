package sena.prueba.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
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

    @Column(name = "document_type", length = 25, nullable = false)
    private String documentType;

    @Column(name = "document_number", length = 12, nullable = false)
    private Integer documentNumber;

    @Column(name = "password", length = 120, nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "idUser"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "idRole")
    )
    private List<Role> roles;

    public User() {
    }

    public User(Integer idUser, String names, String lastNames, String email, String documentType, Integer documentNumber, String password, List<Role> roles) {
        this.idUser = idUser;
        this.names = names;
        this.lastNames = lastNames;
        this.email = email;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.password = password;
        this.roles = roles;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getLastNames() {
        return lastNames;
    }

    public void setLastNames(String lastNames) {
        this.lastNames = lastNames;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public Integer getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(Integer documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
