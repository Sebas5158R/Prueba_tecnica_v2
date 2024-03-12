package sena.prueba.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idNotification;
    @Column(name ="description_notification")
        private  String  description_notification;
    @Column(name = "estatus notification")
         private Boolean  status ;
    @OneToOne (fetch =FetchType.EAGER, cascade =  CascadeType.ALL)
    User user;
}
