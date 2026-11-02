package com.bus.routex.service;

import com.bus.routex.dto.CouponValidationRequest;
import com.bus.routex.dto.CouponValidationResponse;
import com.bus.routex.entity.Offers;

import java.util.List;
import java.util.Optional;

public interface OffersServiceInterface {

    public List<Offers>getAllActiveOffers();
    public Optional<Offers>getOfferByCouponCode(String couponCode);

   public CouponValidationResponse validateCoupon (CouponValidationRequest request);
}
