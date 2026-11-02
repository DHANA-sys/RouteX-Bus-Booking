package com.bus.routex.repository;

import com.bus.routex.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus,Long> {



        public List<Bus> findByFromCityIgnoreCaseAndToCityIgnoreCase(
          String fromCity,
          String toCity
        );


}
