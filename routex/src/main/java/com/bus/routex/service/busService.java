package com.bus.routex.service;

import com.bus.routex.entity.Bus;
import com.bus.routex.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class busService implements busServiceInterface{

    @Autowired
    private BusRepository busRepository;

    @Override
    public Bus saveBus(Bus bus) {
        return busRepository.save(bus);
    }

    @Override
    public List<Bus> getAllBus() {
        return busRepository.findAll();
    }

    @Override
    public List<Bus> searchBuses(String fromCity, String toCity) {
        return busRepository. findByFromCityIgnoreCaseAndToCityIgnoreCase(fromCity,toCity);
    }
}
