package com.project.customer.serviceImpl;

import com.project.customer.custome_exception.NoSuchResourceFound;
import com.project.customer.entity.Address;
import com.project.customer.entity.Customer;
import com.project.customer.repositories.AddressRepository;
import com.project.customer.repositories.CustomerRepository;
import com.project.customer.service.AddressService;
import com.project.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public List<Address> allAddress() {
        return addressRepository.findAll();
    }

    @Override
    public Address addAddress(Address address,Integer id) {
//       Customer customer=address.getCustomer();
//       customer.addAddress(address);
        Customer customer = customerRepository.findById(id).orElseThrow(()->new NoSuchResourceFound("Customer not found"));
        customer.addAddress(address);
        List<Address> addressList = customer.getAddresses();
        addressList.add(address);
        return address;
    }
}
