package com.bus.routex.service;

import com.bus.routex.entity.Bus;

import java.util.List;

public interface busServiceInterface {

    public Bus saveBus(Bus bus);
    public List<Bus>getAllBus();

    List<Bus> searchBuses(String fromCity, String toCity);
}
