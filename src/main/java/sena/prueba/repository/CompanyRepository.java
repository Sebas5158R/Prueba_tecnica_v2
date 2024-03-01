package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sena.prueba.models.Company;
import sena.prueba.models.User;

@Repository
public interface CompanyRepository extends JpaRepository <Company,Integer> {

    Company findCompanyByIdCompany(int idCompany);

    Company findByUserEmail(String email);


}
