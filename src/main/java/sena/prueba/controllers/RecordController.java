package sena.prueba.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sena.prueba.models.Record;
import sena.prueba.services.RecordService;

import java.util.ArrayList;

@RestController
@RequestMapping ("/record" )
@CrossOrigin("*")
public class RecordController {
 @Autowired
    RecordService recordService;


  @PostMapping (value =  "/addRecord")
 public Record addRecord(@RequestBody Record record ) {
      return  this.recordService.saveRecord(record);
  }

    @PostMapping (value =  "/editRecord")
    public Record editRecord(@RequestBody Record record ) {
        return  this.recordService.saveRecord(record);
    }



    @GetMapping(value = "/")
    public ArrayList<Record> getRecords() {
        return recordService.getRecords();
    }

  }
