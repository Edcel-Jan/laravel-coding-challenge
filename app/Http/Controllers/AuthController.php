<?php


namespace App\Http\Controllers;

use App\Models\EmailList;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use AuthenticatesUsers;



    
    public function login(Request $request) {  

        $validator = Validator::make($request->all(), [
                    'email' => 'required',
                    'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 200,
                'errors' => $validator->getMessageBag()->toArray()
            ]);
                       
        }
       
        $credential = ['email' => $request->email, 'password' => $request->password]; 

        if($user = auth()->attempt($credential)) {    
           return response()->json([
                    'status' => 200,
                    'message' => 'success',
                    'user' => auth()->user()
            ]);
        }
        return  response()->json([
            'status' => 200,
            'message' => 'error',
            'error' => 'Email and Password does not match'
        ]);

    }

    public function register(Request $request) {
       

        $validator = Validator::make($request->all(),[
            'name' => 'required|min:3|max:50',
            'email' => 'required|email|unique:users,email|max:50',
            'password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
        ]);
        
        if ($validator->fails()) {

            return response()->json([
                'status' => 200,
                'message' => 'error',
                'errors' => $validator->getMessageBag()->toArray()
           ]);          
        }
        try{
            DB::beginTransaction();

            if($request->with_token == 'yes') {

                $referer=  User::where('id', $request->user['user_id'])->first();
                $count_referer = $referer->success_no_of_referal;
    
                if($count_referer <= 9) {
                    $id = $request->user['user_id'];
                    User::where('id',$id)->update(['success_no_of_referal' => $count_referer + 1]);
                }

                EmailList::where('email',$request->email)->update(['is_registered' => 1]);
            }
        
            $new_user =  User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            DB::commit();
            
            $credential = ['email' => $request->email, 'password' => $request->password]; 
            if(auth()->attempt($credential)) {    
                return  response()->json([
                    'status' => 200,
                    'message' => 'success',
                    'user' => auth()->user()
                ]);
            }

           
        }catch(\Exception $e) {
            return $e;
            DB::rollBack();
        }
    }

  

    public function getRegistrationDetail(Request $request) {
        return EmailList::where('user_id',$request->user_id)->where('token',$request->token)->latest('created_at')->first();
    }


    public function logout() {

        Auth::logout();
        return redirect('/');
    }


}
