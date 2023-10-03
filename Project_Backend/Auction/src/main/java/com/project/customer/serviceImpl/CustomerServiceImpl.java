package com.project.customer.serviceImpl;

import com.project.customer.config.AppConstants;
import com.project.customer.custome_exception.NoSuchResourceFound;
import com.project.customer.dto.CartItemDto;
import com.project.customer.dto.CustomerByIdDto;
import com.project.customer.dto.CustomerDto;
import com.project.customer.entity.Customer;
import com.project.customer.entity.Roles;
import com.project.customer.repositories.AddressRepository;
import com.project.customer.repositories.CustomerRepository;
import com.project.customer.repositories.RoleRepository;
import com.project.customer.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<CustomerByIdDto> getAllCustomers() {
        //fetching all the customer from DB
        List<Customer> customerList = customerRepository.findAll();
        Iterator<Customer> itr = customerList.iterator();
        while(itr.hasNext()){
            System.out.println(itr.next());
        }
//        Set<CartItemDto> cartItemList = cart.getItems().stream().map(item -> mapper.map(item, CartItemDto.class)).collect(Collectors.toSet());

        List<CustomerByIdDto> customerByIdDtoList = customerList.stream().map(item->mapper.map(item,CustomerByIdDto.class)).collect(Collectors.toList());
        return customerByIdDtoList;
    }

    @Override
    public Customer addCustomer(Customer customer) {
        //TODO
        return customerRepository.save(customer);
    }

    @Override
    public CustomerByIdDto getByCustomerId(Integer id) {
        System.out.println("Id of customer "+id);
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new NoSuchResourceFound("no customer avilable"));
        System.out.println("Name"+customer.getFirstName());
        System.out.println(customer);
        CustomerByIdDto customerByIdDto = new CustomerByIdDto();
        customerByIdDto = mapper.map(customer,CustomerByIdDto.class);
        System.out.println(customerByIdDto);
        return mapper.map(customer,CustomerByIdDto.class);
    }

    @Override
    public void deleteCustomer(int id) {
        Customer customer=customerRepository.findById(id).orElseThrow(()->new NoSuchResourceFound("customer not found"));
        customerRepository.delete(customer);
    }


    @Override
    public CustomerByIdDto updateCustomer(Integer id,String firstName, String lastName, long phoneNumber, String email, short age) {
        // TODO: Implement the logic to update customer information

        Customer customer = customerRepository.findById(id).orElseThrow(()->new NoSuchResourceFound("Can't find the customer"));
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setPhoneNumber(phoneNumber);
        customer.setEmail(email);
        customer.setAge(age);

        // TODO: Call repository or update method to persist the changes

        return mapper.map(customer,CustomerByIdDto.class);
    }
    @Override
    public CustomerDto registerNewUser(CustomerDto customerDto) {
        Customer customer = this.mapper.map(customerDto, Customer.class);
        //encoded password
        customer.setPassword(this.passwordEncoder.encode(customer.getPassword()));
        //set roles
        Roles role = this.roleRepository.findById(AppConstants.NORMAL_USER).get();
        customer.getRoles().add(role);
        Customer NewUser = this.customerRepository.save(customer);
        return this.mapper.map(NewUser, CustomerDto.class);
    }
}
