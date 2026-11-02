package com.bus.routex.controller;


import com.bus.routex.entity.Passenger;
import com.bus.routex.service.passengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://route-x-bus-booking.vercel.app"
})

public class PassengerController {

    @Autowired
    private passengerService service;


    @PostMapping
    public Passenger savePassenger(@RequestBody Passenger passenger){
        return service.savePassenger(passenger);
    }

    @GetMapping
    public List<Passenger> getAllPassenger(){
        return service.getAllPassenger();
    }

    @GetMapping("/{id}")
    public Passenger getPassengerById(@PathVariable Long id){
        return service.getPassengerById(id);
    }

    @GetMapping("/booking/{bookingId}")
    public Passenger getPassengerByBookingId(@PathVariable Long bookingId){
        return service.getPassengerById(bookingId);
    }

    @PutMapping
    public Passenger updatePassenger(@PathVariable Long id,@RequestBody Passenger passenger){
        return service.updatePassenger(id,passenger);
    }

    @DeleteMapping("/{id}")
    public void deletePassenger(@PathVariable Long id){
        service.deletePassenger(id);
    }



}
