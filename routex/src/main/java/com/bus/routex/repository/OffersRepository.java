package com.bus.routex.repository;

import com.bus.routex.entity.Offers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OffersRepository extends JpaRepository<Offers, Long> {

    public List<Offers>findByActiveTrue();
    Optional<Offers>findByCouponCodeIgnoreCase(String couponCode);


}
