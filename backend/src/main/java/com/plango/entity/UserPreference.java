package com.plango.entity;

public class UserPreference {

    private Long id;
    private User user;
    private String preferenceType;
    private String preferenceValue;

    public UserPreference() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getPreferenceType() {
        return preferenceType;
    }

    public String getPreferenceValue() {
        return preferenceValue;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPreferenceType(String preferenceType) {
        this.preferenceType = preferenceType;
    }

    public void setPreferenceValue(String preferenceValue) {
        this.preferenceValue = preferenceValue;
    }
}