package com.project.customer.service;

import com.project.customer.dto.CustomerByIdDto;
import com.project.customer.dto.CustomerDto;
import com.project.customer.entity.Customer;
import java.util.List;


public interface CustomerService {

    CustomerDto registerNewUser(CustomerDto customer);
    List<CustomerByIdDto> getAllCustomers();

    Customer addCustomer(Customer customer);

    CustomerByIdDto getByCustomerId(Integer id);

    void deleteCustomer(int id);

    CustomerByIdDto updateCustomer(Integer id,String firstName, String lastName, long phoneNumber, String email, short age);
}
