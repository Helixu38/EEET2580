package com.example.accessingdatajpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String code;
	private String name;
	private String credits;


	protected Course() {}

	public Course(String code, String name , String credits) {
		this.code = code;
		this.name = name;
		this.credits = credits;
	}

	@Override
	public String toString() {
		return String.format(
				"Course[id=%d, code='%s', name='%s' , credits='%s']",
				id, code, name , credits);
	}

	public Long getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	public String getCredits() {
		return credits;
	}
}
