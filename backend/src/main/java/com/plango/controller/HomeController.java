package com.plango.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/home")
    public String home(){

        return "Plan & Go API Running";
    }
}