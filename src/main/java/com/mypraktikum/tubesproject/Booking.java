/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */

public class Booking {
    private String status;

    public Booking() {
        status = "Pending";
    }

    public void konfirmasi() {
        status = "Confirmed";
        System.out.println("Booking berhasil");
    }
}