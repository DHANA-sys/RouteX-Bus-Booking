package com.bus.routex.service;

import com.bus.routex.entity.Users;

import java.util.List;

public interface userServiceInterface {

        public Users createUser(Users user);
        public List <Users> gelAllUsers();
        public Users getUserById(Long id);
        public Users updateUsers(Long id,Users user);
        public String deleteUsers(Long id);

        public Users loginUser(Users user);

}
