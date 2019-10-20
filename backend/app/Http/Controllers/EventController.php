<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
    //    $events = [];
    //    $data = Event::all();

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

    public function showAllEvents(Request $request)
    {
        $this->validate($request, [
            'calendar_id' => 'required'
        ]);
        if($request['calendar_id'] == 0)
            $event = Event::all();
        else
            $event = Event::where('calendar_id', $request['calendar_id'])->get();
        foreach($event as $eventItem){
            $eventItem->user;
         }
         return response()->json( $event);
    }

    public function showOneEvent($id)
    {
        return response()->json(Event::find($id));
    }

    public function create(Request $request)
    {
        
        $this->validate($request, [
            'title' => 'required',
            'start' => 'required',
            'end' => 'required',
            'user_id' => 'required',
            'calendar_id' => 'required'
        ]);
        $Event = Event::create($request->all());
        $Event->user;
        return response()->json($Event, 201);
    }

    public function update($id, Request $request)
    {
        $Event = Event::findOrFail($id);
        $Event->update($request->all());    
        return response()->json($Event, 200);
    }

    public function delete($id)
    {
        $Event = Event::findOrFail($id)->delete();
        return response()->json( $Event, 200);
    }
}
