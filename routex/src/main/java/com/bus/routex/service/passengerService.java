package com.bus.routex.service;


import com.bus.routex.entity.Passenger;
import com.bus.routex.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class passengerService implements passengerServiceInterface{

    @Autowired
    private PassengerRepository passengerRepo;

    @Override
    public Passenger savePassenger(Passenger passenger) {
        return passengerRepo.save(passenger);
    }

    @Override
    public List<Passenger> getAllPassenger() {
        return passengerRepo.findAll();
    }

    @Override
    public Passenger getPassengerById(Long id) {
        return passengerRepo.findById(id).orElse(null);
    }

    @Override
    public List<Passenger> getPassengerByBookingId(Long bookingId) {
        return passengerRepo.findByBookingId(bookingId);
    }

    @Override
    public Passenger updatePassenger(Long id, Passenger passenger) {
        Passenger exist=passengerRepo.findById(id).orElse(null);

        if(exist==null){
            return null;
        }

        exist.setName(passenger.getName());
        exist.setAge(passenger.getAge());
        exist.setGender(passenger.getGender());

        return passengerRepo.save(exist);
    }

    @Override
    public void deletePassenger(Long id) {
        passengerRepo.deleteById(id);
    }
}
