/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */

public class Customer extends User {
    private double saldo;

    public Customer(int id, String username, String password, double saldo) {
        super(id, username, password);
        this.saldo = saldo;
    }

    public void topUpSaldo(double amount) {
        saldo += amount;
        System.out.println("Saldo: " + saldo);
    }

    @Override
    public void displayMenu() {
        System.out.println("Menu Customer");
    }
}