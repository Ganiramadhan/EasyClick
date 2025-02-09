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
            ['name' => 'Kaos Anak Motif Kartun', 'description' => 'Kaos anak berbahan katun lembut dengan motif kartun yang lucu.', 'price' => 75000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Dress Anak Bunga', 'description' => 'Dress anak perempuan dengan motif bunga cantik dan bahan nyaman.', 'price' => 120000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Setelan Anak Casual', 'description' => 'Setelan anak dengan desain casual dan bahan yang nyaman dipakai.', 'price' => 135000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Baju Koko Anak', 'description' => 'Baju koko anak dengan bahan adem, cocok untuk acara formal dan ibadah.', 'price' => 95000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Baju Tidur Anak', 'description' => 'Baju tidur anak dengan bahan katun yang lembut dan nyaman.', 'price' => 80000, 'image' => 'https://via.placeholder.com/150'],

            // Jaket Anak
            ['name' => 'Jaket Hoodie Anak', 'description' => 'Jaket hoodie anak dengan bahan tebal dan nyaman untuk cuaca dingin.', 'price' => 150000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Jaket Bomber Anak', 'description' => 'Jaket bomber anak dengan desain trendy dan stylish.', 'price' => 175000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Jaket Jeans Anak', 'description' => 'Jaket jeans anak dengan bahan berkualitas dan tampilan keren.', 'price' => 200000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Jaket Winter Anak', 'description' => 'Jaket winter anak dengan bahan tebal dan desain stylish.', 'price' => 250000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Jaket Parasut Anak', 'description' => 'Jaket parasut anak yang ringan dan nyaman untuk aktivitas outdoor.', 'price' => 130000, 'image' => 'https://via.placeholder.com/150'],

            // Tas Anak
            ['name' => 'Tas Ransel Anak Kartun', 'description' => 'Tas ransel anak dengan motif kartun yang lucu dan bahan berkualitas.', 'price' => 100000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Tas Sekolah Anak', 'description' => 'Tas sekolah anak dengan banyak kompartemen dan bahan kuat.', 'price' => 125000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Tas Selempang Anak', 'description' => 'Tas selempang anak dengan desain simpel dan nyaman digunakan.', 'price' => 90000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Tas Trolley Anak', 'description' => 'Tas trolley anak yang praktis untuk membawa banyak barang.', 'price' => 175000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Tas Mini Anak', 'description' => 'Tas mini anak yang lucu dan cocok untuk membawa barang kecil.', 'price' => 80000, 'image' => 'https://via.placeholder.com/150'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
