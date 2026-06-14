/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class Itinerary {
    private Destination[] list = new Destination[5];
    private int index = 0;

    public void tambahDestinasi(Destination d) {
        if (index < list.length) {
            list[index++] = d;
        }
    }

    public void tampil() {
        for (int i = 0; i < index; i++) {
            System.out.println(list[i].getDetail());
        }
    }
}