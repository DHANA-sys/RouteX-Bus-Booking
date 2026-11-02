package com.bus.routex.repository;


import com.bus.routex.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger,Long> {

    public List<Passenger>findByBookingId(Long bookingId);

}
