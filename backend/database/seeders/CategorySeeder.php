<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'ساعت مچی مردانه'],
            ['name' => 'ساعت مچی زنانه'],
            ['name' => 'ساعت هوشمند (Smart Watch)'],
            ['name' => 'ساعت کلاسیک و رسمی'],
            ['name' => 'ساعت اسپرت و ورزشی'],
            ['name' => 'ساعت‌های لوکس و لاکچری'],
            ['name' => 'ساعت دیواری و ایستاده'],
            ['name' => 'ساعت رومیزی و زنگ‌دار'],
            ['name' => 'اکسسوری و بند ساعت'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}