package eeet2580.stress_test_5.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

//     ****** UNCOMMENT THE FOLLOWING ENDPOINTS WHEN YOUR JPA & MODEL ENTITY ARE READY ******

     @GetMapping("/{email}")
     List<Customer> getCustomerInfoByEmail(@PathVariable String email) {
         return customerService.getCustomerByEmail(email);
     }

     @PostMapping("")
     Customer createCustomer(@RequestBody Customer customerData) {
         return customerService.createCustomer(customerData);
     }

     @GetMapping("/balance/{email}")
     List<CustomerBalance> getCustomerBalanceByEmail(@PathVariable String email) {
         return customerService.getCustomerBalance(email);
     }

    

}