<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CustomizeController extends Controller
{
    public function index()
    {
        return Inertia::render('Customize/Index', [
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function store(Request $request)
    {
        $config = $request->all();

        if (empty($config['width']) || empty($config['components'])) {
            return redirect()->back()->withErrors(['msg' => 'Data konfigurasi tidak lengkap.']);
        }

        session(['cart' => $config]);

        return redirect()->route('crafter.choose');
    }
}
