package com.bus.routex.service;

import com.bus.routex.entity.Booking;

import java.util.List;

public interface bookingServiceInterface {

    public Booking saveBooking(Booking booking);
    public List<Booking>getAllBookings();
    public Booking getBookingById(Long id);
    public List<Booking>getByUserId(Long userId);
}
