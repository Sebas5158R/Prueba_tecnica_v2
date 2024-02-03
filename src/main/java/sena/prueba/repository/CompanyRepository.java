package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.Company;

public interface CompanyRepository extends JpaRepository <Company,Integer> {
}
