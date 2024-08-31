package eeet2580.stress_test_5.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    List<Customer> findByEmail(String email);
    List<CustomerBalance> getCustomerEntityByEmail(String email);
}
