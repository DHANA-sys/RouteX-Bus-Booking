package com.bus.routex.service;

import com.bus.routex.entity.Seats;

import java.util.List;

public interface seatsServiceInterface {

    public Seats saveSeats(Seats seats);
    public List<Seats> getAllSeats();
    public List<Seats>getSeatsByBusId(Long busId);
    public Seats getSeatsById(Long id);
    public Seats updateSeatStatus(Long id,String status);

    public String deleteSeat(Long id);
}
