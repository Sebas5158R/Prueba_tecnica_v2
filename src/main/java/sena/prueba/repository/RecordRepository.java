package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.Record;

public interface RecordRepository extends JpaRepository<Record,Integer> {


}
