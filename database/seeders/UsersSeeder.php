<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $users = array(
            [

                'name' =>  'Edcel',
                'email' => 'edcel@kestrelddm.com',
                'password' => Hash::make('admin123'),
                'is_invited' => 1,
                'success_no_of_referal' => 0,
                'failed_no_of_referal' => 0,
                'role_id' => '1'
            ],
            [
                'name' =>  'Edcel',
                'email' => 'cacayan.edcel26@gmail.com',
                'password' => Hash::make('user123'),
                'is_invited' => 1,
                'success_no_of_referal' => 0,
                'failed_no_of_referal' => 0,
                'role_id' => '2'
            ]
        );
        foreach($users as $user) {
            User::create($user);
        }
    }
}
