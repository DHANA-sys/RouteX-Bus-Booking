package com.bus.routex.service;

import com.bus.routex.dto.CouponValidationRequest;
import com.bus.routex.dto.CouponValidationResponse;
import com.bus.routex.entity.Offers;
import com.bus.routex.repository.OffersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class offersService implements OffersServiceInterface{

    @Autowired
    private OffersRepository offersRepo;

    @Override
    public List<Offers> getAllActiveOffers() {
        return offersRepo.findByActiveTrue();
    }

    @Override
    public Optional<Offers> getOfferByCouponCode(String couponCode) {
        return offersRepo.findByCouponCodeIgnoreCase(couponCode);
    }

    @Override
    public CouponValidationResponse validateCoupon(CouponValidationRequest request) {

        String couponCode=request.getCouponCode();
        double bookingAmound=request.getBookingAmount();

        Optional<Offers>optionalOffers=offersRepo.findByCouponCodeIgnoreCase(couponCode.trim());

        if (optionalOffers.isEmpty()){
            return new CouponValidationResponse(false,couponCode,0,
                    bookingAmound,"Invalid Coupon Code");
        }

        Offers offers=optionalOffers.get();

        if (!offers.isActive()){
            return new CouponValidationResponse(false,couponCode,0,
                    bookingAmound,"Coupon is InActive");
        }

        if (offers.getExpiryDate()!=null && offers.getExpiryDate().isBefore(LocalDate.now())){
            return new CouponValidationResponse(false,couponCode,0,
                    bookingAmound,"Coupon has Expired");
        }

        if (bookingAmound<offers.getMinimumBookingAmount()){
            return new CouponValidationResponse(false,couponCode,0,
                    bookingAmound,"Minimum Booking Amount is ₹ "+offers.getMinimumBookingAmount());
        }

    double discount;

        if ("FLAT".equalsIgnoreCase(offers.getDiscountType())) {
            discount = offers.getDiscountValue();
        } else if ("PERCENTAGE".equalsIgnoreCase(offers.getDiscountType())) {
            discount = bookingAmound * offers.getDiscountValue() / 100;
        } else {
            return new CouponValidationResponse(
                    false, couponCode, 0,
                    bookingAmound, "Invalid discount type"
            );
        }

        discount = Math.min(discount,bookingAmound);

        double finalAmount = bookingAmound - discount;

        return new CouponValidationResponse(
                true,
                couponCode,
                discount,
                finalAmount,
                "Coupon applied successfully!"
        );

    }
}
