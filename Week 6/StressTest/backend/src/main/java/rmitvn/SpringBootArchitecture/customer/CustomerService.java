package rmitvn.SpringBootArchitecture.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.data.domain.PageRequest;

@Component
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    Optional<Customer> getCustomerById(int id) {
        return customerRepository.findById(id);
    }

    Page<Customer> getCustomerByKeyword(int pageSize, int pageNo , String sortBy , String order , String keyword)
    {
        if (sortBy != null)
        {
            if(sortBy.equals("firstName"))
            {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").ascending());
                    return customerRepository.findByLastNameContaining(keyword, firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").descending());
                    return customerRepository.findByLastNameContaining(keyword, firstPageWithTwoElements);
                }
                return Page.empty();
            } else if (sortBy.equals("lastName")) {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").ascending());
                    return customerRepository.findByLastNameContaining(keyword,firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").descending());
                    return customerRepository.findByLastNameContaining(keyword,firstPageWithTwoElements);
                }
                return Page.empty();

            } else if (sortBy.equals("id")) {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("id").ascending());
                    return customerRepository.findByLastNameContaining(keyword,firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
                    return customerRepository.findByLastNameContaining(keyword,firstPageWithTwoElements);
                }
                return Page.empty();
            }
        }
        Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize);
        return customerRepository.findAll(firstPageWithTwoElements);
    }

    Page<Customer> getAllCustomers(int pageSize, int pageNo , String sortBy , String order) {
        if (sortBy != null)
        {
            if(sortBy.equals("firstName"))
            {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").ascending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").descending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                }
                return Page.empty();
            } else if (sortBy.equals("lastName")) {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").ascending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").descending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                }
                return Page.empty();

            } else if (sortBy.equals("id")) {
                if(order.equals("Ascending")){
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("id").ascending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                } else if (order.equals("Descending"))
                {
                    Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
                    return customerRepository.findAll(firstPageWithTwoElements);
                }
                return Page.empty();
            }
        }
        Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize);
        return customerRepository.findAll(firstPageWithTwoElements);
    }
    Page<Customer> sortCustomerFirstName(int pageSize, int pageNo , String sortBy , String order) {
        if(order.equals("Ascending")){
            Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").ascending());
            return customerRepository.findAll(firstPageWithTwoElements);
        } else if (order.equals("Descending"))
        {
            Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("firstName").descending());
            return customerRepository.findAll(firstPageWithTwoElements);
        }
            return Page.empty();

    }
    Page<Customer> sortCustomerLastName(int pageSize, int pageNo ,String sortBy, String order) {
        if(order.equals("Ascending")){
            Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").ascending());
            return customerRepository.findAll(firstPageWithTwoElements);
        } else if (order.equals("Descending"))
        {
            Pageable firstPageWithTwoElements = PageRequest.of(pageNo, pageSize, Sort.by("lastName").descending());
            return customerRepository.findAll(firstPageWithTwoElements);
        }
        return Page.empty();

    }

    void remove(long id){
        customerRepository.deleteById(id);
    }

    Optional<Customer> updateCustomer(int id, Customer customerDetails) {
        // Fetch the existing customer
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);

        if (existingCustomerOptional.isPresent()) {
            // Update fields
            Customer existingCustomer = existingCustomerOptional.get();
            existingCustomer.setFirstName(customerDetails.getFirstName());
            existingCustomer.setLastName(customerDetails.getLastName());
            // Update other fields as necessary

            // Save the updated customer
            Customer updatedCustomer = customerRepository.save(existingCustomer);
            return Optional.of(updatedCustomer);
        } else {
            // Customer not found
            return Optional.empty();
        }
    }

    Optional<Customer> saveCustomer(String firstName , String lastName){
//        //Get all
//        Optional<Customer> customerList = customerRepository.findByFirstNameAndLastName(firstName,lastName);
//        //Check
//        if(customerList.isEmpty())
//        {
//            Customer newCustomer = new Customer();
//            newCustomer.setFirstName(firstName);
//            newCustomer.setLastName(lastName);
//            customerRepository.save(newCustomer);
//            return Optional.of(customerRepository.save(newCustomer));
//        } else {
//            String error = "Already exist";
//            return Optional.empty();
//        }
        Customer newCustomer = new Customer(firstName, lastName);
        return Optional.of(customerRepository.save(newCustomer));
    }

    public Page<Customer> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

}
