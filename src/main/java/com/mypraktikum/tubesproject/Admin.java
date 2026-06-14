/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class Admin extends User {

    public Admin(int id, String username, String password) {
        super(id, username, password);
    }

    public void kelolaData() {
        System.out.println("Admin mengelola data");
    }

    @Override
    public void displayMenu() {
        System.out.println("Menu Admin");
    }
}
