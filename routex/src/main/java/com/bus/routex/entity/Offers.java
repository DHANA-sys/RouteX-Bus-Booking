package com.bus.routex.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "offers")
public class Offers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String title;

    @Column(unique = true,nullable = false)
    private String couponCode;

    private String discountType;
    private double discountValue;
    private double minimumBookingAmount;
    private boolean active;
    private LocalDate expiryDate;

}
