package sena.prueba.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.CompanyDTO;
import sena.prueba.models.Company;
import sena.prueba.services.CompanyService;
import sena.prueba.services.IEmailService;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.SplittableRandom;

@RestController
@RequestMapping("/company")
@CrossOrigin
public class CompanyController {

    @Autowired
    CompanyService companyService ;
    SplittableRandom splittableRandom = new SplittableRandom();
    @Autowired
    IEmailService emailService;

@PostMapping(value ="/addCompany")
public Company addCompany (@ModelAttribute CompanyDTO companyDTO  ){
    try {
        String fileName = companyDTO.getDocuments().getOriginalFilename();
        Path path = Paths.get("src/mail/resources/files/"+"/"+companyDTO.getName_company()+"/"+fileName);
        Files.createDirectories(path.getParent());
        Files.copy(companyDTO.getDocuments().getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
        File file = path.toFile();
        int validation = splittableRandom.nextInt(1000, 9999);
        System.out.println(validation+"codigo de validacion generado");
        String message = "Hi here a new request  for create a new company"+companyDTO.getName_company().toUpperCase()+"in this message is the code of validation for the creation :"+validation+"and too the documentation about the company";
        Company company = new Company();
        company.setIdCompany(companyDTO.getIdCompany());
        company.setName_company(companyDTO.getName_company());
        company.setDescription_company(companyDTO.getDescription_company());
        company.setState_company("pending");
        company.setCodevalidation(validation);
        company.setActive(false);
        System.out.println(file.getPath()+"esta es la direccion de el archivo");
        company.setPath_documentation(file.getPath());
        emailService.sendEmailwhitFile("carlosgalindo8090l@gmail.com","request creation company",message,file);
        return    this.companyService.saveCompany(company);


    }catch (Exception e){
        throw  new RuntimeException("error en el envio de datos"+e.getMessage());
    }

}





}
