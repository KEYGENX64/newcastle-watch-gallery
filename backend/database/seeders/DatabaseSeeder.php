<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
$this->call([
            CategorySeeder::class,
            ProductSeeder::class
            // اگر سیدرهای دیگری مثل ProductSeeder دارید اینجا اضافه کنید
        ]);
User::factory()->create([
    'name' => 'Admin User',
    'username' => 'admin',
    'password' => bcrypt('password1'),
    'role' => 'admin'
]);

User::factory()->create([
    'name' => 'Normal User',
    'username' => 'user',
    'password' => bcrypt('password1'),
    'role' => 'user'
]);
    }
}
