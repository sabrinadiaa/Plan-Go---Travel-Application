/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */

public class Ekspedisi {
    private String barang;
    private String tujuan;

    public Ekspedisi(String barang, String tujuan) {
        this.barang = barang;
        this.tujuan = tujuan;
    }

    public void kirim() {
        System.out.println("Kirim " + barang + " ke " + tujuan);
    }
}