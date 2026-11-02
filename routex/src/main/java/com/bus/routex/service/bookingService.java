package com.bus.routex.service;


import com.bus.routex.entity.Booking;
import com.bus.routex.entity.Seats;
import com.bus.routex.repository.BookingRepository;
import com.bus.routex.repository.seatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class bookingService implements bookingServiceInterface{

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private seatsRepository seatsRepo;



    @Override
    @Transactional
    public Booking saveBooking(Booking booking) {

        Seats seat = seatsRepo
                .findByIdAndBusIdForUpdate(
                        booking.getSeatId(),
                        booking.getBusId()
                )
                .orElseThrow(() ->
                        new RuntimeException("Seat not found"));

        if ("BOOKED".equalsIgnoreCase(seat.getStatus())) {
            throw new RuntimeException("Seat already booked!");
        }

        seat.setStatus("BOOKED");
        seatsRepo.save(seat);

        booking.setStatus("CONFIRMED");
        booking.setBookingDate(LocalDateTime.now());

        return bookingRepo.save(booking);
    }



    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id).orElse(null);
    }

    @Override
    public List<Booking> getByUserId(Long userId) {
        return bookingRepo.findByUserId(userId);
    }
}
