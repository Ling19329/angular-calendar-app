<?php

namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showAllStudents()
    {

        return response()->json(Student::all());
    }

    public function showOneStudent($id)
    {
        return response()->json(Student::find($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:students'
        ]);
        $Student = Student::create($request->all());
        return response()->json($Student, 201);
    }

    public function update($id, Request $request)
    {
        $Student = Student::findOrFail($id);
        $Student->update($request->all());

        return response()->json($Student, 200);
    }

    public function delete($id)
    {
        Student::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
