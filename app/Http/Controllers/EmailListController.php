<?php

namespace App\Http\Controllers;

use App\Mail\EmailUser;
use App\Models\EmailList;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EmailListController extends Controller
{
    public function addEmail(Request $request) {

        
        if(count($request->email) > 0) {
            foreach($request->email as $email) {

                $validator = Validator::make($email,[
                    'email' => 'email|unique:email_lists,email|unique:users,email|required|max:50'
                ]);
        
                if ($validator->fails()) {
                    return response()->json([
                        'status' => 200,
                        'message'=> 'error',
                        'errors' => $validator->getMessageBag()->toArray(),
                        'email' => $email
                    ]);        
                }
            }            
        }
        // $code = Str::random(30);
        // $new_list = EmailList::create(['email' => $request->email,'user_id' => auth()->user()->id, 'token' => $code ]);

        return response()->json([
            'new_user' => '',
            'message' => 'success',
            'email' => []
        ]);    
    }

    public function inviteEmail(Request $request) {
        $values = $request->email;
        $id = auth()->user()->id;

            try{
                DB::beginTransaction();
                foreach($values as $value) {
                    $code = Str::random(30);
                    if($value['email'] != '') {
                        EmailList::create(['email' => $value['email'], 'is_invited' => $value['is_check'], 'user_id' => $id, 'token' => $code]);
                        if($value['is_check']) {
                            Mail::to($value['email'])->send(new EmailUser($id,$code));
                        }
                    } 
                }    
                DB::commit();
                return response()->json([
                    'status' => 200,
                    'message'=> 'success'
                ]);
                
            }catch(QueryException $e) {
                if($e->errorInfo[1] == 1062) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'error',
                        'error' =>  array(
                            '0' => array('Email Already Exist')
                        )
                    ]);
                }
                DB::rollBack();
                return $e;
            }
         
    }


    public function getDetails() {
        
        $users_referal = User::with('referal')->get()->toArray();
        $data = array();
        $i = 0;
        if(count($users_referal) > 0){
            foreach($users_referal as $key =>  $user_referal) {
                if(count($user_referal['referal']) > 0) {
                    foreach($user_referal['referal'] as $newKey => $referred) {
                        $data[$i]['name'] = $user_referal['name'];
                        $data[$i]['email_referred'] = $referred['email'];
                        $data[$i]['date'] = Carbon::parse( $referred['created_at'])->format('Y-m-d');
                        $data[$i]['status'] = $referred['is_registered'] == 1 ? 'Registered' : 'Not Yet Registered';
                        $i++;
                    }
                }

            }
        }

        return array_values($data);
    }
  
}
