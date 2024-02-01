package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.models.Company;
import sena.prueba.repository.CompanyRepository;

import java.util.ArrayList;

@Service
public class CompanyService {
@Autowired
    CompanyRepository companyRepository;

public ArrayList<Company>getComanies(){
    return  (ArrayList<Company> )
            companyRepository.findAll();
}

public  Company saveCompany ( Company company){
    return  companyRepository.save(company);
}




}
