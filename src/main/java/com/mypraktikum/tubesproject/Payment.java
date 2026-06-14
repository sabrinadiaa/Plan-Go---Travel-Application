/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */

public class Payment {
    private double jumlah;

    public Payment(double jumlah) {
        this.jumlah = jumlah;
    }

    public void bayar(PaymentMethod method) {
        if (method.processPayment(jumlah)) {
            System.out.println("Pembayaran sukses");
        }
    }
}