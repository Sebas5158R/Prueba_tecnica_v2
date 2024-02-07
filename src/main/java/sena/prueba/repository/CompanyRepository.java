package sena.prueba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sena.prueba.models.Company;
import sena.prueba.models.User;

import java.io.File;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository <Company,Integer> {

    public Company findCompanyByIdCompany(int idCompany);


}
