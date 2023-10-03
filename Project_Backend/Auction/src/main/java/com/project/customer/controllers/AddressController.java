package com.project.customer.controllers;

import com.project.customer.entity.Address;
import com.project.customer.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@CrossOrigin("*")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping
    public ResponseEntity<?> getAllAddress(){
        return  new ResponseEntity<>(addressService.allAddress(), HttpStatus.OK);
    }

    @PostMapping("/{customerId}")
    public  ResponseEntity<?> addAddress( @RequestBody  Address address,@PathVariable Integer customerId){
        return new ResponseEntity<>(addressService.addAddress(address,customerId), HttpStatus.OK);
    }
}
