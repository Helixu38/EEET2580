package rmitvn.SpringBootArchitecture.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/all")
    ResponseEntity<Page<Customer>> getAllCustomers(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
                                                   @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
                                                   @RequestParam("sortBy") String sortBy,
                                                   @RequestParam("order") String order) {
        Page<Customer> customers = customerService.getAllCustomers(pageSize, pageNo, sortBy , order);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    ResponseEntity<Optional<Customer>> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        // Check if the customer exists
        Optional<Customer> existingCustomer = customerService.getCustomerById(id);
        if (existingCustomer.isPresent()) {
            // Update the existing customer with new details
            Optional<Customer> updatedCustomer = customerService.updateCustomer(id, customer);
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/create")
    ResponseEntity<Optional<Customer>> addCustomer(@RequestBody Customer customer) {
        // Add new customer
        Optional<Customer> newCustomer = customerService.saveCustomer(customer.getFirstName(), customer.getLastName());
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED); // Return 201 Created
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteCustomerById(@PathVariable("id") long id) {
        customerService.remove(id);
        return new ResponseEntity<>("Delete succesfully!", HttpStatus.OK);
    }

}
