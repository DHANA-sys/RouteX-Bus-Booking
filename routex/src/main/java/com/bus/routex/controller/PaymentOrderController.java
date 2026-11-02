package com.bus.routex.controller;

import com.bus.routex.service.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://route-x-bus-booking.vercel.app"
})

public class PaymentOrderController {

    @Autowired
    private PaymentService Service;

    @PostMapping("/create-order")
    public ResponseEntity<?>createOrder(@RequestBody Map<String,Double> request){
         Double amount=request.get("amount");

         if (amount==null||!Double.isFinite(amount)||amount<=0){
             return ResponseEntity.badRequest().body(Map.of("error","Invalid Payment amount"));
         }

         try {
             JSONObject order = Service.createOrder(amount);

             return ResponseEntity.ok(order.toMap());

                }catch (Exception e){
                    e.printStackTrace();
             return ResponseEntity.internalServerError()
                     .body(Map.of("error","Unable to create Payment order"));
         }
    }



//    @PostMapping("/verify")
//    public ResponseEntity<?> verifyPayment(
//            @RequestBody Map<String, String> request) {
//
//        String orderId = request.get("razorpay_order_id");
//        String paymentId = request.get("razorpay_payment_id");
//        String signature = request.get("razorpay_signature");
//
//        if (orderId == null || paymentId == null || signature == null) {
//            return ResponseEntity.badRequest()
//                    .body(Map.of("error", "Missing payment details"));
//        }
//
//        boolean verified = Service.verifyPayment(
//                orderId, paymentId, signature);
//
//        if (verified) {
//            return ResponseEntity.ok(
//                    Map.of("verified", true,
//                            "message", "Payment verified successfully"));
//        }
//
//        return ResponseEntity.badRequest()
//                .body(Map.of("verified", false,
//                        "message", "Payment verification failed"));
//    }
}
