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
       $events = [];
       $data = Event::all();

       if($data->count()){
          foreach ($data as $key => $value) {
            $events[] = Calendar::event(
                $value->title,
                true,
                new \DateTime($value->start_date),
                new \DateTime($value->end_date.' +1 day')
            );
          }
       }

      $calendar = Calendar::addEvents($events);
      return view('mycalender', compact('calendar'));
    }

    public function showAllEvents()
    {
        return response()->json(Event::all());
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
            'end' => 'required'
        ]);
        $Event = Event::create($request->all());
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
        Event::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
