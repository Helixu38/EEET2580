package rmitvn.SpringBootArchitecture.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	List<Customer> findByLastName(String lastName);
	List<Customer> findByFirstName(String firstName);
	Optional<Customer> findById(long id);
	Optional<Customer> findByFirstNameAndLastName(String firstName, String lastName);
	@Query("SELECT c FROM Customer c WHERE LOWER(c.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	Page<Customer> findByLastNameContaining(@Param("keyword") String keyword, Pageable pageable);
}
