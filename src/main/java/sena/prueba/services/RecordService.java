package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.models.Record;
import sena.prueba.repository.RecordRepository;

import java.util.ArrayList;

@Service
public class RecordService {
@Autowired
    RecordRepository recordRepository;

 public ArrayList<Record> getRecords(){
     return  (ArrayList<Record>)
             recordRepository.findAll();
 }

 public  Record saveRecord (Record record1){
     return  recordRepository.save(record1);
 }


}
