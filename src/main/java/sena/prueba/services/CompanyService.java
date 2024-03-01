package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.models.Company;
import sena.prueba.models.User;
import sena.prueba.repository.CompanyRepository;
import sena.prueba.repository.UserRepository;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
@Autowired
    CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

public ArrayList<Company>getCompanies(){
    return  (ArrayList<Company> )
            companyRepository.findAll();
}

public  Company saveCompany (Company company){
    return  companyRepository.save(company);
}


public  Company findCompanyById(int idCompany ){
    return  companyRepository.findCompanyByIdCompany(idCompany);
};


    public List<File> getFilesInDirectory(String directorio) {
        File folder = new File(directorio);
        File[] listaArchivos = folder.listFiles();
        return Arrays.asList(listaArchivos);


    }


    public Company updateCompany(int id, Company company) {
        Optional<Company> existCompany = companyRepository.findById(id);
        if (existCompany.isPresent()) {
            company.setIdCompany(id);
            return companyRepository.save(company);
        } else {
            throw new RuntimeException("Company not found");
        }
    }

    public Company getCompanyByUserEmail(String email) {
        return companyRepository.findByUserEmail(email);
    }

//public String[] documentsConsult  (String path ){
//
//
//File documents = new File(path);
//
//return  documents.list();
//}


}
