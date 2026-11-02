package com.bus.routex.service;


import com.bus.routex.entity.Seats;
import com.bus.routex.repository.seatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class seatsService implements seatsServiceInterface{

    @Autowired
    private seatsRepository seatsRepo;

    @Override
    public Seats saveSeats(Seats seats) {
        return seatsRepo.save(seats);
    }

    @Override
    public List<Seats> getAllSeats() {
        return seatsRepo.findAll();
    }

    @Override
    public List<Seats> getSeatsByBusId(Long busId) {
        return seatsRepo.findByBusId(busId);
    }

    @Override
    public Seats getSeatsById(Long id) {
        return seatsRepo.findById(id).orElse(null);
    }

    @Override
    public Seats updateSeatStatus(Long id, String status) {
        Seats seat=seatsRepo.findById(id).orElse(null);
        if (seat!=null){
            seat.setStatus(status);
            return seatsRepo.save(seat);
        }
        return null;
    }

    @Override
    public String deleteSeat(Long id) {
        return "SEAT DELETED SUCCESSFUL";
    }
}
