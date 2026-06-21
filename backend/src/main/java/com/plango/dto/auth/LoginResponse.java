package com.plango.dto.auth;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private Long id;
    private String username;
    private String email;
    private Double saldo;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(
            boolean success,
            String message,
            String token,
            Long id,
            String username,
            String email,
            Double saldo,
            String role
    ) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.saldo = saldo;
        this.role = role;
    }

    public static LoginResponse success(UserData userData) {
        return new LoginResponse(
                true,
                "Login berhasil",
                "TOKEN-USER-" + userData.id,
                userData.id,
                userData.username,
                userData.email,
                userData.saldo,
                userData.role
        );
    }

    public static LoginResponse failed(String message) {
        return new LoginResponse(false, message, null, null, null, null, null, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
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

    public Double getSaldo() {
        return saldo;
    }

    public String getRole() {
        return role;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
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

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static class UserData {
        private final Long id;
        private final String username;
        private final String email;
        private final Double saldo;
        private final String role;

        public UserData(Long id, String username, String email, Double saldo, String role) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.saldo = saldo;
            this.role = role;
        }
    }
}