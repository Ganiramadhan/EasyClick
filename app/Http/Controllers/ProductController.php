<?php 


namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver as GdDriver; 

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'successMessage' => session('successMessage') 
        ]);
    }


    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg',
            'stock' => 'required|numeric|min:0',
            'rating' => 'required|string',
            'discount' => 'required|string|'
        ]);

        $data = $request->only(['name', 'price', 'description', 'stock', 'discount', 'rating']);

        if ($request->hasFile('image')) {
            $manager = new ImageManager(new GdDriver());

            $image = $manager->read($request->file('image')->getRealPath());

            $image = $image->scale(width: 500);

            // Generate nama unik untuk gambar
            $imageName = 'products/' . time() . '.' . $request->file('image')->getClientOriginalExtension();

            // Simpan gambar ke storage (public)
            Storage::disk('public')->put($imageName, (string) $image->encode());

            $data['image'] = $imageName;
        }

        // Simpan produk ke database
        $product = Product::create($data);

        return redirect()->route('product.index')->with('success', 'Produk berhasil ditambahkan!');
    }



    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg',
            'stock' => 'required|numeric|min:0',
            'rating' => 'required|string',
            'discount' => 'required|string|'
        ]);

        $data = $request->only(['name', 'price', 'description']);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            // Inisialisasi ImageManager dengan driver GD
            $manager = new ImageManager(new GdDriver());

            // Baca gambar dari request
            $image = $manager->read($request->file('image')->getRealPath());

            // Resize gambar (misalnya 500x500, aspect ratio dipertahankan)
            $image = $image->scale(width: 500);

            // Generate nama unik
            $imageName = 'products/' . time() . '.' . $request->file('image')->getClientOriginalExtension();

            // Simpan gambar ke storage (public)
            Storage::disk('public')->put($imageName, (string) $image->encode());

            $data['image'] = $imageName;
        }

        // Update produk dengan data baru
        $product->update($data);

        return redirect()->route('product.index')->with('success', 'Produk berhasil diperbarui!');
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('product.index')->with('success', 'Product deleted successfully!');
    }
    
    
}
