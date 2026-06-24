<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'brand' => $this->brand,
            'sku' => $this->sku,
            'price' => (float) $this->price,
            'discount_price' => $this->discount_price ? (float) $this->discount_price : null,
            'description' => $this->description,
            'image' => $this->image ? asset('uploads/' . $this->image) : null,
            'gender' => $this->gender,
            'movement_type' => $this->movement_type,
            'stock' => $this->stock,
            'category' =>$this->category?->name,
            'created_at' => $this->created_at,
        ];
    }
}