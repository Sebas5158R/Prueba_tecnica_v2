package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.models.Company;
import sena.prueba.models.User;
import sena.prueba.repository.CompanyRepository;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
@Autowired
    CompanyRepository companyRepository;

public ArrayList<Company>getCompanies(){
    return  (ArrayList<Company> )
            companyRepository.findAll();
}

public  Company saveCompany (Company company){
    return  companyRepository.save(company);
}

public Optional<Company> findCompanyByid(int id){
    return  companyRepository.findById(id);
}

public  Company findCompany_id(int idCompany ){

    return  companyRepository.findCompanyByIdCompany(idCompany);
};


    public List<File> getFilesInDirectory(String directorio) {
        File folder = new File(directorio);
        File[] listaArchivos = folder.listFiles();
        return Arrays.asList(listaArchivos);


    }



    public Company updateCompany(int id, Company company) {
        Optional<Company> existingUser = companyRepository.findById(id);
        if (existingUser.isPresent()) {
            company.setIdCompany(id);
            return companyRepository.save(company);
        } else {
            throw new RuntimeException("User not found");
        }
    }


    //public String[] documentsConsult  (String path ){
//
//
//File documents = new File(path);
//
//return  documents.list();
//}


}
