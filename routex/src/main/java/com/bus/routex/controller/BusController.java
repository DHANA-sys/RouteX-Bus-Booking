package com.bus.routex.controller;


import com.bus.routex.entity.Bus;
import com.bus.routex.service.busService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "http://localhost:5173")

public class BusController {

    @Autowired
    private busService service;

    @PostMapping
    public Bus saveBus(@RequestBody Bus bus){
        return service.saveBus(bus);
    }


    @GetMapping
    public List<Bus>getAllBuses(){

        return service.getAllBus();
    }

    @GetMapping("/search")
    public List<Bus> searchBuses(
            @RequestParam String fromCity,
            @RequestParam String toCity){
        return service.searchBuses(fromCity, toCity);
    }
}
