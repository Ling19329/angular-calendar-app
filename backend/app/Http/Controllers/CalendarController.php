<?php

namespace App\Http\Controllers;

use App\Calendar;
use App\UserCalendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
class CalendarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
    //    $calendars = [];
    //    $data = Calendar::all();

    //    if($data->count()){
    //       foreach ($data as $key => $value) {
    //         $events[] = Calendar::event(
    //             $value->title,
    //             true,
    //             new \DateTime($value->start_date),
    //             new \DateTime($value->end_date.' +1 day')
    //         );
    //       }
    //    }

    //   $calendar = Calendar::addEvents($events);
    //   return view('mycalender', compact('calendar'));
    }

    public function showAllCalendars(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
        ]);

        $user = User::find($request['user_id']);
        if($user['role'] == 1)
            return response()->json(Calendar::all());
        else
            return response()->json($user->calendars);
    }

    public function showOneCalendar(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'user_id' => 'required',
        ]);
        $user = User::find($request['user_id']);
        return response()->json($user->calendars->where('id', $request['id']));
    }

    public function create(Request $request)
    {
        
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'teachers' => 'nullable'
        ]);
        $req_calendar = $request->only(['title', 'description']);
        $Calendar = Calendar::create($req_calendar);

        foreach($request['teachers'] as $teacher){
            $user_calendar['calendar_id'] = $Calendar['id'];
            $user_calendar['user_id'] = $teacher;
            $UserCalendar = UserCalendar::create($user_calendar);
        }

        return response()->json($Calendar, 201);
    }

    public function update($id, Request $request)
    {
        $Calendar = Calendar::findOrFail($id);

        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'teachers' => 'nullable'
        ]);
        $req_calendar = $request->only(['title', 'description']);
        $Calendar->update($req_calendar);
        //remove all users for specific calendar
        UserCalendar::where('calendar_id', $id)->delete();
        foreach($request['teachers'] as $teacher){
                $user_calendar['calendar_id'] = $id;
                $user_calendar['user_id'] = $teacher;
                $UserCalendar = UserCalendar::create($user_calendar);
            }
        return response()->json($Calendar, 200);
    }

    public function delete($id)
    {
        Calendar::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
