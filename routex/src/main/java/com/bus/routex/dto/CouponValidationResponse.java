package com.bus.routex.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CouponValidationResponse {

    private boolean valid;

    private String couponCode;

    private double discount;

    private double finalAmount;

    private String message;

}
