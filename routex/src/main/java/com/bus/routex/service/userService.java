package com.bus.routex.service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.bus.routex.entity.Users;
import com.bus.routex.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userService implements userServiceInterface{

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    @Override
    public Users createUser(Users user) {
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

      Users savedUser= userRepository.save(user);
        System.out.println("SAVED USER:"+ savedUser.getId());
        return savedUser;
    }

    @Override
    public List<Users> gelAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Users getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public Users updateUsers(Long id, Users user) {

    Users newUser= userRepository.findById(id).orElse(null);
        if (newUser != null) {
            newUser.setEmail(user.getEmail());
            newUser.setRole(user.getRole());
            newUser.setPhone(user.getPhone());
            newUser.setPassword(user.getPassword());
            newUser.setFullName(user.getFullName());
            return userRepository.save(newUser);
        }
        return null;
    }

    @Override
    public String deleteUsers(Long id) {
        userRepository.deleteAll();
        return "DELETED SUCESSFULLLY ";
    }

    @Override
    public Users loginUser(Users user) {
        Users existUser= userRepository.findByEmail(user.getEmail());
        if(existUser !=null && passwordEncoder.matches(user.getPassword(), existUser.getPassword())) {

            return existUser;
        }
        return null;
    }
}
