/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class Destination {
    private String nama;
    private String lokasi;

    public Destination(String nama, String lokasi) {
        this.nama = nama;
        this.lokasi = lokasi;
    }

    public String getDetail() {
        return nama + " - " + lokasi;
    }
}