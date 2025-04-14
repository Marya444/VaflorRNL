<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'suffix_name' => ['nullable'],
            'gender' => ['required'],
            'address' => ['required'],
            'contact_number' => ['required'],
            'email' => ['required', 'email', Rule::unique('tbl_users', 'email')],
            'password' => ['required', 'confirm', 'min:8', 'max:15'],
            'password_confirmation' => ['required', 'min:8', 'max:15'],
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'suffix_name' => $validated['suffix_name'],
            'gender_id' => $validated['gender'],
            'address' => $validated['address'],
            'contact_number' => $validated['contact_number'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);
        return response()->json([
            'message' => 'User Successfully Added.'
        ], 200);
    }
}
