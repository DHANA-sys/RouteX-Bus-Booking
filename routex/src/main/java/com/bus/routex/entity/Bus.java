package com.bus.routex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalTime;

@Entity
@Table(name = "bus")
@Getter
@Setter
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String busName;
    private  String busNumber;
    private  String fromCity;
    private  String toCity;
    private  Double rating;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private BigDecimal price;
    private Integer totalSeats;
    private Integer availableSeats;
    private String busType;
}
