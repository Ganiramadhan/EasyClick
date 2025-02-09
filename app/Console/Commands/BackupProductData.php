<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BackupProductData extends Command
{
    protected $signature = 'backup:products';
    protected $description = 'Backup product data to JSON file';

    public function handle()
    {
        $products = DB::table('products')->get(); // Ambil semua data produk
        $backupFileName = 'backup/products_' . now()->format('Y-m-d_H-i-s') . '.json';

        // Simpan backup ke storage Laravel (storage/app/backup/)
        Storage::disk('local')->put($backupFileName, $products->toJson(JSON_PRETTY_PRINT));
        
        $this->info('Backup completed: ' . $backupFileName);
    }
}
