package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.repository.ServiceRepository;
import sena.prueba.repository.UserRepository;

import java.util.ArrayList;

@Service
public class ServiceService {

    @Autowired
    ServiceRepository serviceRepository;
    public ArrayList<sena.prueba.models.Service> getServices(){
        return  (ArrayList<sena.prueba.models.Service>)
                serviceRepository.findAll();
    }

    public sena.prueba.models.Service  saveService (sena.prueba.models.Service service1){
         return  serviceRepository.save(service1);
    }
    /*
    public sena.prueba.models.Service  editService (sena.prueba.models.Service service1 ){
        return  serviceRepository.save(service1);
    }
*/

}
