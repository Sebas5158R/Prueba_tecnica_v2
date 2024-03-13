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




    public  boolean  findCode  ( int code){
        Company company = companyRepository.findCompanyByCodeValidation(code);
        if(company==null){
            return  false;
        }
        else {
            return true;
        }
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



    public Boolean validationCode (int code  , int idCompany ){
        Company  company  = companyRepository.findCompanyByIdCompany(idCompany);
        if (company.getCodeValidation()==code){
            System.out.println("codigo valido");
            return true ;
        }
        else {
            return false;
        }

    }



//    public Company getCompanyByUserId(User user, Integer userId) {
//        Optional<Company> companyOptionalom = companyRepository.findCompanyByUser(user, userId);
//        if (userOptional.isPresent()) {
//            Company company = userOptional.get();
//            return user.getLegal_person();
//        } else {
//            throw new EntityNotFoundException("User not found with id: " + userId);
//        }
//    }


//public String[] documentsConsult  (String path ){





    //public String[] documentsConsult  (String path ){

//
//
//File documents = new File(path);
//
//return  documents.list();
//}


}
