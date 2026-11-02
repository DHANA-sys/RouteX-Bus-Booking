package com.bus.routex.repository;

import com.bus.routex.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


    public List<Booking>findByUserId(Long userId);
}
