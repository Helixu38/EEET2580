package eeet2580.stress_test_5.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class CustomerService {

//     ****** UNCOMMENT THE FOLLOWING ENDPOINTS WHEN YOUR JPA & MODEL ENTITY ARE READY ******

     @Autowired
     private CustomerRepository customerRepository;

     List<Customer> getCustomerByEmail(String email) {
         return customerRepository.findByEmail(email);
     }

     Customer createCustomer(Customer customerEntity) {
         return customerRepository.save(customerEntity);
     }

     List<CustomerBalance> getCustomerBalance(String email) {
         return customerRepository.getCustomerEntityByEmail(email);
     }

}
