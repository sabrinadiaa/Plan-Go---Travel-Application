package com.plango.controller;

import com.plango.dto.auth.RegisterRequest;
import com.plango.dto.auth.LoginRequest;
import com.plango.entity.User;
import com.plango.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/register")
    public String registerInfo() {
        return "Halo! Backend PlanGo aman kok. Tapi kalau mau register, harus pakai POST lewat Postman ya!";
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userRepository.save(user);

        return "Register berhasil!";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail());

        if(user == null){
            return "Email tidak ditemukan";
        }

        if(!user.getPassword().equals(request.getPassword())){
            return "Password salah";
        }

        return "Login berhasil";
    }
}