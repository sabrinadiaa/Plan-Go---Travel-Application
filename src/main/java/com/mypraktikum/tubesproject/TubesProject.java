/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mypraktikum.tubesproject;

/**
 *
 * @author ASUS
 */
public class TubesProject {

    public static void main(String[] args) {
        Customer user = new Customer(1, "nadia", "123", 100000);

        if (user.login("nadia", "123")) {

            user.displayMenu();

            Destination d1 = new Destination("Bali", "Indonesia");
            Destination d2 = new Destination("Lombok", "Indonesia");

            Itinerary it = new Itinerary();
            it.tambahDestinasi(d1);
            it.tambahDestinasi(d2);
            it.tampil();

            Hotel hotel = new Hotel("Hotel Indah", 500000);

            Booking booking = new Booking();
            booking.konfirmasi();

            Payment payment = new Payment(hotel.getHarga());
            PaymentMethod method = new ewallet("OVO");
            payment.bayar(method);

            Review review = new Review(5, "Bagus!");
            review.tampil();

            Ekspedisi ekspedisi = new Ekspedisi("Koper", "Bali");
            ekspedisi.kirim();

        } else {
            System.out.println("Login gagal");
        }
    }
}
