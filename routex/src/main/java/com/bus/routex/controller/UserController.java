package com.bus.routex.controller;
import com.bus.routex.dto.LoginRequest;
import com.bus.routex.dto.RegisterRequest;

import com.bus.routex.dto.UserResponse;
import com.bus.routex.entity.Users;
import com.bus.routex.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private userService service;


    @PostMapping("/register")
    public UserResponse registerUser(@Valid @RequestBody RegisterRequest request){
        Users user = new Users();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());

        Users savedUser = service.createUser(user);
        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());
        response.setPhone(savedUser.getPhone());
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request){
        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        Users loggedIn= service.loginUser(user);

        if (loggedIn == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(loggedIn);

    }



}
