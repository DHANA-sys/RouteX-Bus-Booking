package com.bus.routex.service;

import org.json.JSONObject;

public interface PaymentServiceInterface {

    JSONObject createOrder(double amount);

//    boolean verifyPayment(
//            String orderId,
//            String paymentId,
//            String signature
//    );
}
