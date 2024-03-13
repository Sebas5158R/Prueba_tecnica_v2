package sena.prueba.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.dto.CompanyDTO;
import sena.prueba.dto.FileDTO;
import sena.prueba.dto.ResponseCompanyDTO;
import sena.prueba.dto.ValidateCodeCompanyDTO;
import sena.prueba.models.Company;
import sena.prueba.models.User;
import sena.prueba.repository.UserRepository;
import sena.prueba.services.CompanyService;
import sena.prueba.services.IEmailService;
import sena.prueba.services.UserServiceImpl;
import java.io.File;
import java.io.FilenameFilter;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins="http://localhost:3000")


public class CompanyController {




    @Autowired
    CompanyService companyService ;



    @Autowired
    UserServiceImpl userService;
    SplittableRandom splittableRandom = new SplittableRandom();
    @Autowired
    IEmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Value("src/mail/resources/files")
    private String companyFilesDirectory;


@PostMapping(value ="/addCompany")
public Company addCompany (@ModelAttribute CompanyDTO companyDTO  ){
    try {
        String fileName = companyDTO.getDocuments().getOriginalFilename();
        Path path = Paths.get("src/mail/resources/files/"+companyDTO.getName_company()+"/"+fileName);
        String pathNormalized = String.valueOf(path);
        String pant2=pathNormalized.replace("\\", "/");
        Files.createDirectories(path.getParent());
        Files.copy(companyDTO.getDocuments().getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
        File file = path.toFile();
        int validation = splittableRandom.nextInt(1000, 9999);
        System.out.println(validation+"codigo de validacion generado");
        String message = "Hi here a new request  for create a new company "+companyDTO.getName_company().toUpperCase()+" in this message is the code of validation for the creation :"+validation+" and too the documentation about the company";
        Company company = new Company();
        User usu = userService.findByid(companyDTO.getUser());
        company.setIdCompany(companyDTO.getIdCompany());
        company.setNameCompany(companyDTO.getName_company());
        company.setDescriptionCompany(companyDTO.getDescription_company());
        company.setStateCompany("pending");
        company.setUser(usu);
        company.setCodeValidation(validation);
        company.setActive(false);
        company.setAddress(companyDTO.getAddres());
        company.setPhone(companyDTO.getPhone());
        System.out.println("________");
        System.out.println(company.getUserAuthorization());
        LocalDate  initialdate = LocalDate.now();
        company.setDateCreation(initialdate);
        company.setDateEndProcess(initialdate.plus(Period.ofDays(15)));
        System.out.println(file.getPath()+"esta es la direccion de el archivo");
        company.setPathDocumentation(pant2);
        emailService.sendEmailwhitFile("carlosgalindo8090l@gmail.com","request creation company ",message,file);
        String messageUsu = " Hi"+usu.getNames()+"the application for  cretion company in our sistem was send  in:"+company.getDateCreation()+"you will have an answer approximately in:"+company.getDateEndProcess()+"thank you";
        emailService.SendEmail(usu.getEmail(),"start company creation process",messageUsu);
        return    this.companyService.saveCompany(company);
    }catch (Exception e){
        throw  new RuntimeException("error en el envio de datos"+e.getMessage());
    }
}



@PutMapping ( value = "/updateCompany/{id}")
public  Company updateCompany (@PathVariable int id ,@RequestBody Company company) {
    return companyService.updateCompany(id, company);

}
@GetMapping (value = "/listCompany/{id}")
public ResponseEntity<?> getCompanyById(@PathVariable int id) {
    Company company = companyService.findCompanyById(id);
    if (company != null) {
        return ResponseEntity.ok(company);
    } else {
        String msg = "Company not found";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
}
@PostMapping( value = "/createCompany")
public Optional<Company> createCompany  (@RequestBody CompanyDTO companyDTO){
    Company company = companyService.findCompanyById(companyDTO.getIdCompany());
    try {
        if (companyDTO.getCodevalidation() == company.getCodeValidation()){
            company.setStateCompany("Created");
            companyService.saveCompany(company);
        }
    }
   catch (Exception e){
        System.out.println(e);
   }
    return null;
};
@GetMapping ( value = "/companies")
        public ArrayList <Company> getCompanies (){
        return companyService.getCompanies();
}






@PostMapping("/companiesDocument")
    public List<File> listarArchivos(@RequestBody FileDTO fileDTO) {
        return companyService.getFilesInDirectory(fileDTO.getDescripcion());
    }

    @GetMapping("/companyFrom")
    public ResponseEntity<Company> getCompanyByUserEmail(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Company company = companyService.getCompanyByUserEmail(user.getEmail());
            return ResponseEntity.ok().body(company);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/files/{nameCompany}")
    public List<String> getCompanyFiles(@PathVariable String nameCompany) {
        List<String> companyFiles = new ArrayList<>();
        File companyDirectory = new File(companyFilesDirectory + File.separator + nameCompany);
        if (companyDirectory.exists() && companyDirectory.isDirectory()) {
            File[] files = companyDirectory.listFiles(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    return name.toLowerCase().endsWith(".pdf");
                }
            });
            if (files != null) {
                for (File file : files) {
                    System.out.println(file);
                    companyFiles.add(file.getName());
                }
            }
        }
        System.out.println(companyFiles);
        return companyFiles;
    }

    @GetMapping("/files")
    public ResponseEntity<Resource> getCompanyFile(@RequestParam String pathPdf) {
        System.out.println("PATH "+pathPdf);
        try {
            Path filePath = Paths.get(pathPdf);
            File file = filePath.toFile();

            if (file.exists() && file.isFile()) {
                FileSystemResource resource = new FileSystemResource(file);
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("application/pdf"))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping(value = "/changeState/{idCompany}")
    public ResponseEntity <Resource>  changeStateCompany   (@PathVariable int idCompany){
    try {
       Company company = companyService.findCompanyById(idCompany);
       company.setStateCompany("Reviewed");
       companyService.saveCompany(company);
      return  ResponseEntity.ok().build();
   }catch (Exception e)
        {
         return  ResponseEntity.badRequest().build();
        }
    };



@PostMapping( value = "/response")
public  ResponseEntity <Resource> responseCompany (@RequestBody ResponseCompanyDTO  responseCompanyDTO){
    Company company = companyService.findCompanyById(responseCompanyDTO.getIdCompany());
    User user = userRepository.findUserByEmail(responseCompanyDTO.getEmail());
  try {
      if (responseCompanyDTO.getResponse()){
          System.out.println("request enable");
          company.setActive(true);
          company.setStateCompany("Finalized");
          company.setUserAuthorization(user);
          companyService.saveCompany(company);
          return ResponseEntity.ok().build();
      } else {
          company.setUserAuthorization(user);
          company.setStateCompany("Rejected");
          companyService.saveCompany(company);
          System.out.println("request disable");
          return ResponseEntity.status(201).build();
      }
  }catch (Exception e ){
      return  ResponseEntity.badRequest().build();
  }
};



    @PostMapping (value =  "/validateCodeCompany")
    public  ResponseEntity<Resource> validateCodeCompany  (@RequestBody ValidateCodeCompanyDTO validateCodeCompanyDTO){
    Boolean  response  = companyService.validationCode(validateCodeCompanyDTO.getCode(), validateCodeCompanyDTO.getIdCompany());
    if (response){
    Company company =  companyService.findCompanyById(validateCodeCompanyDTO.getIdCompany());
    User userAuthorization  = userRepository.findUserByEmail(validateCodeCompanyDTO.getUserAuthorization());
     company.setUserAuthorization(userAuthorization);
     company.setStateCompany("Finalized");
     company.setActive(true);
     companyService.saveCompany(company);
     return  ResponseEntity.ok().build();
    }else {
        System.out.println("mal");
        return ResponseEntity.badRequest().build();
    }
    }
}

