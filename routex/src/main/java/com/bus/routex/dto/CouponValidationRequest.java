package com.bus.routex.dto;

import lombok.Getter;
import lombok.Setter;

    @Getter
    @Setter
    public class CouponValidationRequest {

        private String couponCode;

        private double bookingAmount;
    }

