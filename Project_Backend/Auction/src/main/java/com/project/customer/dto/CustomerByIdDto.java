package com.project.customer.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class CustomerByIdDto {
    private String firstName;
    private String lastName;
    private long phoneNumber;
    private String email;
    private int age;
}
