/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class BankTransfer implements PaymentMethod {
    private String bankName;

    public BankTransfer(String bankName) {
        this.bankName = bankName;
    }

    public boolean processPayment(double amount) {
        System.out.println("Transfer " + amount + " via " + bankName);
        return true;
    }
}