package rmitvn.SpringBootArchitecture.customer;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	List<Customer> findByLastName(String lastName);
	List<Customer> findByFirstName(String firstName);
	Optional<Customer> findById(long id);
	Optional<Customer> findByFirstNameAndLastName(String firstName, String lastName);
}
