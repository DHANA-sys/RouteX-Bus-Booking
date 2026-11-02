package com.bus.routex.service;

import com.bus.routex.entity.Passenger;

import java.util.List;

public interface passengerServiceInterface {

    public Passenger savePassenger(Passenger passenger);
    public List<Passenger>getAllPassenger();
    public Passenger getPassengerById(Long id);
    public List<Passenger>getPassengerByBookingId(Long bookingId);
    public Passenger updatePassenger(Long id,Passenger passenger);
    public void deletePassenger(Long id);
}
