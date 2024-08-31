package rmitvn.SpringBootArchitecture.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    Optional<Customer> getCustomerById(int id) {
        return customerRepository.findById(id);
    }

    List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    void remove(long id){
        customerRepository.deleteById(id);
    }

}
