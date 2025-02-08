<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name' => 'Udang Vannamei Segar 1kg', 'description' => 'Udang vannamei segar langsung dari tambak, cocok untuk berbagai hidangan.', 'price' => 120000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Ikan Salmon Fillet 500gr', 'description' => 'Fillet ikan salmon segar, kaya akan omega-3 dan baik untuk kesehatan.', 'price' => 250000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Cumi-Cumi Fresh 1kg', 'description' => 'Cumi-cumi segar yang siap diolah menjadi berbagai masakan lezat.', 'price' => 135000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Kepiting Jumbo 1kg', 'description' => 'Kepiting ukuran jumbo dengan daging yang tebal dan manis.', 'price' => 180000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Lobster Air Laut 1kg', 'description' => 'Lobster air laut segar dengan cita rasa premium.', 'price' => 450000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Kerang Hijau 1kg', 'description' => 'Kerang hijau segar dengan ukuran besar, cocok untuk berbagai hidangan laut.', 'price' => 75000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Ikan Kakap Merah 1kg', 'description' => 'Ikan kakap merah segar dengan daging yang lembut dan gurih.', 'price' => 160000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Ikan Tuna Steak 500gr', 'description' => 'Steak ikan tuna berkualitas tinggi, siap untuk dipanggang atau dibuat sashimi.', 'price' => 140000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Rajungan Segar 1kg', 'description' => 'Rajungan segar dengan rasa daging yang manis dan tekstur lembut.', 'price' => 130000, 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Teripang Kering 100gr', 'description' => 'Teripang kering berkualitas tinggi, cocok untuk kesehatan dan kuliner.', 'price' => 200000, 'image' => 'https://via.placeholder.com/150'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
