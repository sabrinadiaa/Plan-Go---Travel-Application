/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class ewallet implements PaymentMethod {
    private String provider;

    public ewallet(String provider) {
        this.provider = provider;
    }

    public boolean processPayment(double amount) {
        System.out.println("Bayar " + amount + " via " + provider);
        return true;
    }
}