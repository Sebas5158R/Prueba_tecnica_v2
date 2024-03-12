package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.Notification;

public interface notificationRepository extends JpaRepository<Notification,Integer> {



}
