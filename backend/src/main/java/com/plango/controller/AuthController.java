package com.plango.controller;

import com.plango.dto.auth.LoginRequest;
import com.plango.dto.auth.LoginResponse;
import com.plango.dto.auth.RegisterRequest;
import com.plango.entity.User;
import com.plango.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (existingUser != null) {
            return LoginResponse.failed("Email sudah terdaftar");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setSaldo(0.0);
        user.setRole("CUSTOMER");

        User savedUser = userRepository.save(user);

        return LoginResponse.success(new LoginResponse.UserData(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getSaldo(),
                savedUser.getRole()
        ));
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return LoginResponse.failed("Email tidak ditemukan");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return LoginResponse.failed("Password salah");
        }

        return LoginResponse.success(new LoginResponse.UserData(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getSaldo(),
                user.getRole()
        ));
    }
}