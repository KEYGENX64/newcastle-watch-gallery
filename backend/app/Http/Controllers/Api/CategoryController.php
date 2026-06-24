<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * GET /api/categories
     */
    public function index()
    {
        return CategoryResource::collection(Category::orderBy('name')->paginate($request->per_page ?? 12));
    }

    /**
     * GET /api/categories/{category}
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * POST /api/categories   (فقط ادمین)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
        ]);

        $category = Category::create($data);

        return new CategoryResource($category);
    }

    /**
     * PUT /api/categories/{category}   (فقط ادمین)
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories', 'name')->ignore($category->id)],
        ]);

        $category->update($data);

        return new CategoryResource($category);
    }

    /**
     * DELETE /api/categories/{category}   (فقط ادمین)
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->noContent();
    }
}