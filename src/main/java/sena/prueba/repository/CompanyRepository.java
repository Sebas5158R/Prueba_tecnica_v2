package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sena.prueba.models.Company;

@Repository
public interface CompanyRepository extends JpaRepository <Company,Integer> {

    Company findCompanyByIdCompany(int idCompany);


}
