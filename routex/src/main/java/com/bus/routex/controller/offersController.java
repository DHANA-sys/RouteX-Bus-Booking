package com.bus.routex.controller;


import com.bus.routex.dto.CouponValidationRequest;
import com.bus.routex.dto.CouponValidationResponse;
import com.bus.routex.entity.Offers;
import com.bus.routex.service.offersService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://route-x-bus-booking.vercel.app"
})

public class offersController {

    @Autowired
    private offersService Service;

    @PostMapping("/validate")
    public ResponseEntity<CouponValidationResponse> validateCoupon(
            @RequestBody CouponValidationRequest request) {

        CouponValidationResponse response =
                Service.validateCoupon(request);

        if (response.isValid()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping
    public ResponseEntity<List<Offers>>gerAllActiveOffers(){
        return ResponseEntity.ok(Service.getAllActiveOffers());
    }

    @GetMapping("/coupon/{couponCode}")
    public ResponseEntity<Offers>getOfferByCouponCode(@PathVariable String couponCode){

        Optional<Offers>offer=Service.getOfferByCouponCode(couponCode);

        if(offer.isPresent()){

            return ResponseEntity.ok(offer.get());
        }

        return ResponseEntity.notFound().build();
    }
}
