package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.LoginSession;

public interface LoginSessionRepository extends JpaRepository<LoginSession, Integer> {

    LoginSession findLoginSessionById(Integer id);

}
