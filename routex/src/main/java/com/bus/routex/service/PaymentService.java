package com.bus.routex.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.beans.factory.annotation.value;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.razorpay.Utils;

@Service
public class PaymentService implements PaymentServiceInterface {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Override
    public JSONObject createOrder(double amount) {

        try {
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount", Math.round(amount * 100));

            orderRequest.put("currency", "INR");

            orderRequest.put("receipt", "routex_payment");

            Order order = razorpayClient.orders.create(orderRequest);
            return new JSONObject(order.toString());

        } catch (Exception e) {
            throw new RuntimeException("Unaable to create Razorpay order", e);
        }
    }

//    @Override
//    public boolean verifyPayment(String orderId, String paymentId, String signature) {
//
//        try {
//            JSONObject attributes = new JSONObject();
//
//            attributes.put("razorpay_order_id", orderId);
//            attributes.put("razorpay_payment_id", paymentId);
//            attributes.put("razorpay_signature", signature);
//
//            return Utils.verifyPaymentSignature(attributes, keySecret);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }
}