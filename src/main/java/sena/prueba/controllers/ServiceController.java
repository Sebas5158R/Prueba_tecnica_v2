package sena.prueba.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sena.prueba.models.Service;
import sena.prueba.repository.ServiceRepository;
import sena.prueba.services.ServiceService;

import java.util.List;

@RestController
@RequestMapping( "/service")
@CrossOrigin( "*" )
public class ServiceController {

  @Autowired
    ServiceService serviceService;


    @PostMapping (value = "/addService")
    public Service addService (@RequestBody Service service ){
        return this.serviceService.saveService(service) ;
    }


    @PostMapping (value = "/editService/{id}")
    public Service addService (@RequestParam int id,@RequestBody Service service ){
        return this.serviceService.saveService(service) ;
    }



    @GetMapping ( value = "/listServices")
    public ResponseEntity<List<Service>> listServices(){
        List<Service> services = serviceService.getServices();
        return ResponseEntity.ok(services);
    }




}
