package com.bus.routex.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long busId;
    private Long seatId;
    private String seatNumber;
    private Double totalPrice;
    private String status;
    private LocalDateTime bookingDate;

}
