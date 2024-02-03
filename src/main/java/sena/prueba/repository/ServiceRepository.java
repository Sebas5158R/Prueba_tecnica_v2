package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.Service;

public interface ServiceRepository extends JpaRepository<Service,Integer> {
}
