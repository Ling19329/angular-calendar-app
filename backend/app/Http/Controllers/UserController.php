<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showAllUsers()
    {
        return response()->json(User::all());
    }

    public function showAllStudents()
    {
        return response()->json(User::where('role', 3)->get());
    }

    public function showAllTeachers()
    {
        return response()->json(User::where('role', 2)->get());
    }

    public function showOneUser($id)
    {
        return response()->json(User::find($id));
    }

    public function update($id, Request $request)
    {
        $User = User::findOrFail($id);
        $User->update($request->all());

        return response()->json($User, 200);
    }

    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
