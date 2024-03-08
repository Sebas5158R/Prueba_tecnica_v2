package sena.prueba.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "login_sessions")
public class LoginSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sessionId;

    @ManyToOne
    private User userId;

    private String ipAddress;

    private String country;

    private String city;

    private LocalDateTime loginTime;

}
