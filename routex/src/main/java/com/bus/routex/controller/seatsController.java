package com.bus.routex.controller;


import com.bus.routex.entity.Seats;
import com.bus.routex.service.seatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://route-x-bus-booking.vercel.app"
})
public class seatsController {

    @Autowired
    private seatsService service;


    @PostMapping
    public Seats saveSeats(@RequestBody Seats seats){
        return service.saveSeats(seats);
    }

    @GetMapping("/{id}")
    public Seats getSeatsById(Long id){
        return service.getSeatsById(id);
    }

    @GetMapping("/bus/{busId}")
    public List<Seats> getSeatsByBusId(@PathVariable Long busId){
        return service.getSeatsByBusId(busId);
    }

    @GetMapping
    public List<Seats> getAllSeats(){
        return service.getAllSeats();
    }

    @PutMapping("/{id}/status")
    public Seats updateSeatStatus(@PathVariable Long id,@RequestParam String status){
        return service.updateSeatStatus(id,status);
    }

    @DeleteMapping("/{id}")
    public String deleteSeat(@PathVariable Long id){
        service.deleteSeat(id);
        return "SEAT DELETED SUCCESSFULLY";
    }
}
