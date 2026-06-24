<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // گرفتن شناسه دسته‌بندی‌ها برای انتساب هوشمند
        $categories = Category::pluck('id', 'name')->toArray();
        $defaultCat = !empty($categories) ? reset($categories) : 1;

        $products = [
            // --- سری اول (۱۰ ساعت اول) ---

 [
    'name' => 'ساعت اسپرت قاب قرمز و بند رابر',
    'brand' => 'Breitling',
    'price' => 3100.00,
    'discount_price' => null,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-01-01.jpg',
],
[
    'name' => 'ساعت اسکلتون لوکس نقره‌ای و چرم تمساح',
    'brand' => 'Hublot',
    'price' => 12500.00,
    'discount_price' => 11800.00,
    'gender' => 'men',
    'movement_type' => 'مکانیکی کوکی',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-02-01.jpg',
],
[
    'name' => 'ساعت مدرن کرونوگراف قاب مربعی بافت‌دار',
    'brand' => 'Seiko',
    'price' => 380.00,
    'discount_price' => 340.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-03-01.jpg',
],
[
    'name' => 'ساعت زنانه قاب طلایی و بند لوزی',
    'brand' => 'Chanel',
    'price' => 6800.00,
    'discount_price' => null,
    'gender' => 'women',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت مچی زنانه'] ?? $defaultCat,
    'image' => 'products/watch-04-01.jpg',
],
[
    'name' => 'ساعت کرونوگراف صنعتی قاب پیچ‌دار',
    'brand' => 'Diesel',
    'price' => 450.00,
    'discount_price' => 390.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-05-01.jpg',
],
[
    'name' => 'ساعت کلاسیک کرونوگراف حلقه قرمز',
    'brand' => 'Tissot',
    'price' => 750.00,
    'discount_price' => 680.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-06-01.jpg',
],
[
    'name' => 'ساعت مکانیکال عقربه آبی و صفحه کرم',
    'brand' => 'Longines',
    'price' => 1850.00,
    'discount_price' => null,
    'gender' => 'unisex',
    'movement_type' => 'مکانیکی کوکی',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-07-01.jpg',
],
[
    'name' => 'ساعت زنانه قاب رزگلد دور نگین',
    'brand' => 'Cartier',
    'price' => 9500.00,
    'discount_price' => 8900.00,
    'gender' => 'women',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-08-01.jpg',
],
[
    'name' => 'ساعت غواصی نقره‌ای دکمه‌های بیرونی',
    'brand' => 'Omega',
    'price' => 5200.00,
    'discount_price' => null,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-09-01.jpg',
],
[
    'name' => 'ساعت کرونوگراف اسپرت تمام مشکی',
    'brand' => 'TAG Heuer',
    'price' => 2450.00,
    'discount_price' => 2200.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-10-01.jpg',
],
            // --- سری دوم (ساعت‌های ۱۱ تا ۲۰) ---
[
    'name' => 'ساعت کرونوگراف تمام استیل با قاب چندوجهی الماسی',
    'brand' => 'Hamilton',
    'price' => 950.00,
    'discount_price' => 890.00,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-11-01.jpg',
],
[
    'name' => 'ساعت مینیمال کرونوگراف نقره‌ای و بند لوزی',
    'brand' => 'Chopard',
    'price' => 4100.00,
    'discount_price' => null,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-12-01.jpg',
],
[
    'name' => 'ساعت کرونوگراف مشکی با بند ترک‌دار کرم',
    'brand' => 'Citizen',
    'price' => 320.00,
    'discount_price' => 290.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-13-01.jpg',
],
[
    'name' => 'ساعت کرونوگراف خلبانی تمام طلایی با حلقه اسلاید',
    'brand' => 'Hamilton',
    'price' => 950.00,
    'discount_price' => 890.00,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-14-01.jpg',
],
[
    'name' => 'ساعت تمام استیل کرونوگراف حلقه دندانه‌دار',
    'brand' => 'Audemars Piguet',
    'price' => 28000.00,
    'discount_price' => 26500.00,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-15-01.jpg',
],
[
    'name' => 'ساعت لوکس رزگلد با نمایشگر ساعت پرشی و چرم قهوه‌ای',
    'brand' => 'Patek Philippe',
    'price' => 35000.00,
    'discount_price' => null,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-16-01.jpg',
],
[
    'name' => 'ساعت تمام طلایی زنانه با دور نگین و بند فلزی',
    'brand' => 'Richard Mille',
    'price' => 850.00,
    'discount_price' => 790.00,
    'gender' => 'women',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-17-01.jpg',
],
[
    'name' => 'ساعت خلبانی کرونوگراف استیل با حلقه اسلاید',
    'brand' => 'Rolex',
    'price' => 9200.00,
    'discount_price' => 8900.00,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-18-01.jpg',
],
 [
    'name' => 'ساعت زنانه قاب طلایی با بند لوزی و صفحه سفید',
    'brand' => 'Hublot',
    'price' => 14200.00,
    'discount_price' => null,
    'gender' => 'women',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت‌های لوکس و لاکچری'] ?? $defaultCat,
    'image' => 'products/watch-19-01.jpg',
],
[
    'name' => 'ساعت خلبانی کرونوگراف استیل با بند رابر خط‌دار',
    'brand' => 'Garmin',
    'price' => 650.00,
    'discount_price' => 590.00,
    'gender' => 'men',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-20-01.jpg',
],

            // --- سری سوم (۳ ساعت آخر تازه ارسال شده) ---
     [
    'name' => 'ساعت مینیمال کرونوگراف نقره‌ای با بند حصیری',
    'brand' => 'Swarovski',
    'price' => 380.00,
    'discount_price' => null,
    'gender' => 'unisex',
    'movement_type' => 'کوارتز (باتری)',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-21-01.jpg',
],
[
    'name' => 'ساعت اسپرت مشکی با بند سوراخ‌دار و دکمه‌های قرمز',
    'brand' => 'Rado',
    'price' => 4800.00,
    'discount_price' => 4500.00,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت اسپرت و ورزشی'] ?? $defaultCat,
    'image' => 'products/watch-22-01.jpg',
],
[
    'name' => 'ساعت کلاسیک کرونوگراف نقره‌ای با عقربه آبی و بند چرم',
    'brand' => 'Montblanc',
    'price' => 2100.00,
    'discount_price' => null,
    'gender' => 'men',
    'movement_type' => 'اتوماتیک',
    'category_id' => $categories['ساعت کلاسیک و رسمی'] ?? $defaultCat,
    'image' => 'products/watch-23-01.jpg',
],
        ];

        foreach ($products as $data) {
            Product::create([
                'category_id'    => $data['category_id'],
                'name'           => $data['name'],
                'brand'          => $data['brand'],
                'sku'            => 'NC-' . strtoupper(Str::random(6)) . '-' . rand(10, 99),
                'price'          => $data['price'],
                'discount_price' => $data['discount_price'],
                'description'    => "این یک توضیحات مشخصات فنی برای ساعت فوق‌العاده برند {$data['brand']} مدل {$data['name']} موجود در گالری ساعت نیوکاسل است. این محصول با ضمانت اصالت کالا ارائه می‌شود.",
                'image'          => $data['image'],
                'gender'         => $data['gender'],
                'movement_type'  => $data['movement_type'],
                'stock'          => rand(2, 10),
            ]);
        }
    }
}