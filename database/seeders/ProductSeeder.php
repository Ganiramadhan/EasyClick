<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            // Baju Anak Kecil
            ['name' => 'Kaos Anak Motif Kartun', 'description' => 'Kaos anak berbahan katun lembut dengan motif kartun yang lucu.', 'price' => 75000, 'image' => 'https://via.placeholder.com/150', 'stock' => 50, 'discount' => 10, 'rating' => 4.5, 'status' => 'available'],
            ['name' => 'Dress Anak Bunga', 'description' => 'Dress anak perempuan dengan motif bunga cantik dan bahan nyaman.', 'price' => 120000, 'image' => 'https://via.placeholder.com/150', 'stock' => 30, 'discount' => 15, 'rating' => 4.7, 'status' => 'available'],
            ['name' => 'Setelan Anak Casual', 'description' => 'Setelan anak dengan desain casual dan bahan yang nyaman dipakai.', 'price' => 135000, 'image' => 'https://via.placeholder.com/150', 'stock' => 20, 'discount' => 5, 'rating' => 4.2, 'status' => 'available'],
            ['name' => 'Baju Koko Anak', 'description' => 'Baju koko anak dengan bahan adem, cocok untuk acara formal dan ibadah.', 'price' => 95000, 'image' => 'https://via.placeholder.com/150', 'stock' => 40, 'discount' => 10, 'rating' => 4.6, 'status' => 'available'],
            ['name' => 'Baju Tidur Anak', 'description' => 'Baju tidur anak dengan bahan katun yang lembut dan nyaman.', 'price' => 80000, 'image' => 'https://via.placeholder.com/150', 'stock' => 15, 'discount' => 20, 'rating' => 4.3, 'status' => 'available'],

            // Jaket Anak
            ['name' => 'Jaket Hoodie Anak', 'description' => 'Jaket hoodie anak dengan bahan tebal dan nyaman untuk cuaca dingin.', 'price' => 150000, 'image' => 'https://via.placeholder.com/150', 'stock' => 35, 'discount' => 10, 'rating' => 4.8, 'status' => 'available'],
            ['name' => 'Jaket Bomber Anak', 'description' => 'Jaket bomber anak dengan desain trendy dan stylish.', 'price' => 175000, 'image' => 'https://via.placeholder.com/150', 'stock' => 25, 'discount' => 5, 'rating' => 4.5, 'status' => 'available'],
            ['name' => 'Jaket Jeans Anak', 'description' => 'Jaket jeans anak dengan bahan berkualitas dan tampilan keren.', 'price' => 200000, 'image' => 'https://via.placeholder.com/150', 'stock' => 10, 'discount' => 0, 'rating' => 4.6, 'status' => 'available'],
            ['name' => 'Jaket Winter Anak', 'description' => 'Jaket winter anak dengan bahan tebal dan desain stylish.', 'price' => 250000, 'image' => 'https://via.placeholder.com/150', 'stock' => 5, 'discount' => 25, 'rating' => 4.9, 'status' => 'out of stock'],
            ['name' => 'Jaket Parasut Anak', 'description' => 'Jaket parasut anak yang ringan dan nyaman untuk aktivitas outdoor.', 'price' => 130000, 'image' => 'https://via.placeholder.com/150', 'stock' => 12, 'discount' => 8, 'rating' => 4.4, 'status' => 'available'],

            // Tas Anak
            ['name' => 'Tas Ransel Anak Kartun', 'description' => 'Tas ransel anak dengan motif kartun yang lucu dan bahan berkualitas.', 'price' => 100000, 'image' => 'https://via.placeholder.com/150', 'stock' => 45, 'discount' => 12, 'rating' => 4.5, 'status' => 'available'],
            ['name' => 'Tas Sekolah Anak', 'description' => 'Tas sekolah anak dengan banyak kompartemen dan bahan kuat.', 'price' => 125000, 'image' => 'https://via.placeholder.com/150', 'stock' => 22, 'discount' => 5, 'rating' => 4.7, 'status' => 'available'],
            ['name' => 'Tas Selempang Anak', 'description' => 'Tas selempang anak dengan desain simpel dan nyaman digunakan.', 'price' => 90000, 'image' => 'https://via.placeholder.com/150', 'stock' => 30, 'discount' => 10, 'rating' => 4.3, 'status' => 'available'],
            ['name' => 'Tas Trolley Anak', 'description' => 'Tas trolley anak yang praktis untuk membawa banyak barang.', 'price' => 175000, 'image' => 'https://via.placeholder.com/150', 'stock' => 5, 'discount' => 18, 'rating' => 4.6, 'status' => 'available'],
            ['name' => 'Tas Mini Anak', 'description' => 'Tas mini anak yang lucu dan cocok untuk membawa barang kecil.', 'price' => 80000, 'image' => 'https://via.placeholder.com/150', 'stock' => 0, 'discount' => 15, 'rating' => 4.2, 'status' => 'out of stock'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
