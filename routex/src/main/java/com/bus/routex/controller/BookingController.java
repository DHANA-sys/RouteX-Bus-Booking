package com.bus.routex.controller;


import com.bus.routex.entity.Booking;
import com.bus.routex.service.bookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")


public class BookingController {

    @Autowired
    private bookingService service;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking){
        return service.saveBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings(){
        return service.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id){
        return service.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking>getBookingsByUserId(@PathVariable Long userId){
        return service.getByUserId(userId);
    }
}
