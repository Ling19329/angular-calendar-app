<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        function randomDateInRange(DateTime $start, DateTime $end) {
            $randomTimestamp = mt_rand($start->getTimestamp(), $end->getTimestamp());
            $randomDate = new DateTime();
            $randomDate->setTimestamp($randomTimestamp);
            return $randomDate;
        }

        // $this->call('UsersTableSeeder');
        DB::table('students')->delete();
        $data = array(
            array('firstname'=> 'John', 'lastname' => 'Test', 'email'=> 'mail'.rand(1,3).'@gmail.com', 'role' => '', 'dob'=> '1900-01-01', 'updated_at' => '2019-01-01', 'created_at' => '2019-01-01'),
            array('firstname'=> 'John', 'lastname' => 'Test', 'email'=> 'my_mail'.rand(1,3).'@gmail.com', 'role' => '', 'dob'=> '2018-01-01', 'updated_at' => '2019-01-01', 'created_at' => '2019-01-01')
        );
        DB::table('students')->insert($data);

        DB::table('events')->delete();
        $data = array(
            array('title'=>'Appointment #1', 'start' => '2019-08-04', 'end' => '2019-08-04', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")),
            array('title'=>'Appointment #2', 'start' => '2019-08-07', 'end' => '2019-08-08', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")),
            array('title'=>'Appointment #3', 'start' => '2019-08-014', 'end' => '2019-08-15', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s")),
            array('title'=>'Appointment #4', 'start' => '2019-08-22', 'end' => '2019-08-24', 'created_at' => date("Y-m-d H:i:s"), 'updated_at' => date("Y-m-d H:i:s"))
        );
        DB::table('events')->insert($data);
    }
}
