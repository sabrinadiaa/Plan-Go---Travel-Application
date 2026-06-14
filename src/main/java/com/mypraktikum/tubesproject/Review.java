/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */

public class Review {
    private int rating;
    private String komentar;

    public Review(int rating, String komentar) {
        this.rating = rating;
        this.komentar = komentar;
    }

    public void tampil() {
        System.out.println("Rating: " + rating);
        System.out.println("Komentar: " + komentar);
    }
}