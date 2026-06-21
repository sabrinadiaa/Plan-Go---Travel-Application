package com.plango.entity;

public class User {

    private Long id;
    private String username;
    private String email;
    private String password;
    private Double saldo;
    private String role;

    public User() {
    }

    public User(
            Long id,
            String username,
            String email,
            String password,
            Double saldo,
            String role
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.saldo = saldo;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Double getSaldo() {
        return saldo;
    }

    public String getRole() {
        return role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public void setRole(String role) {
        this.role = role;
    }
}