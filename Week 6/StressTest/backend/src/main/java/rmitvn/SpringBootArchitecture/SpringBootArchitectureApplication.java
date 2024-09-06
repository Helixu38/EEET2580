package rmitvn.SpringBootArchitecture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import rmitvn.SpringBootArchitecture.customer.Customer;
import rmitvn.SpringBootArchitecture.customer.CustomerRepository;

@SpringBootApplication
public class SpringBootArchitectureApplication implements CommandLineRunner {

	@Autowired
	private CustomerRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootArchitectureApplication.class, args);
	}
	
	@Override
	public void run(String... args) {
	
		//save a few customers
		repository.save(new Customer("Jack", "Bauer"));
		repository.save(new Customer("Chloe", "Brian"));
		repository.save(new Customer("Kim", "Bauer"));
		repository.save(new Customer("David", "Palmer"));
		repository.save(new Customer("Michelle", "Dessler"));
		repository.save(new Customer("Jack1", "Bauer1"));
		repository.save(new Customer("Chloe1", "O'Brian1"));
		repository.save(new Customer("Kim1", "Bauer1"));
		repository.save(new Customer("David1", "Palmer1"));
		repository.save(new Customer("Michelle1", "Dessler1"));
        repository.save(new Customer("Jack2", "Bauer2"));
        repository.save(new Customer("Chloe2", "O'Brian2"));

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		repository.findAll().forEach(customer -> {
			System.out.println(customer.toString());
		});
		System.out.println("");
	};
}
