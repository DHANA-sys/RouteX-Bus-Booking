package com.bus.routex.repository;

import com.bus.routex.entity.Seats;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface seatsRepository extends JpaRepository<Seats,Long> {

    public List<Seats>findByBusId(Long busId);


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Seats s WHERE s.id = :seatId AND s.busId = :busId")
    Optional<Seats> findByIdAndBusIdForUpdate(
            @Param("seatId") Long seatId,
            @Param("busId") Long busId
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Seats s WHERE s.busId = :busId AND s.seatNumber = :seatNumber")
    Optional<Seats> findSeatForUpdate(
            @Param("busId") Long busId,
            @Param("seatNumber") String seatNumber
    );

}
