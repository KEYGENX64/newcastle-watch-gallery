<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductsResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * GET /api/products
     */
public function index(Request $request)
{
    $products = Product::query()
        ->with('category')
        ->latest()
        ->paginate($request->per_page ?? 12);

    return ProductsResource::collection($products);
}

    /**
     * GET /api/products/{product}
     */
    public function show(Product $product)
    {
        return new ProductResource($product->load('category'));
    }
    public function detail(Product $product)
    {
        return new ProductsResource($product->load('category'));
    }
    /**
     * POST /api/products   (فقط ادمین)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:100', 'unique:products,sku'],
            'price' => ['required', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'gender' => ['nullable', 'in:men,women,unisex'],
            'movement_type' => ['nullable', 'string', 'max:100'],
            'stock' => ['nullable', 'integer', 'min:0']
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'uploads');
        }

        $product = Product::create($data);

        return new ProductResource($product->load('category'));
    }

    /**
     * PUT /api/products/{product}   (فقط ادمین)
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'brand' => ['sometimes', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($product->id)],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'gender' => ['nullable', 'in:men,women,unisex'],
            'movement_type' => ['nullable', 'string', 'max:100'],
            'stock' => ['nullable', 'integer', 'min:0']
        ]);


        $product->update($data);

        return new ProductResource($product->load('category'));
    }

    /**
     * DELETE /api/products/{product}   (فقط ادمین)
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->noContent();
    }
}