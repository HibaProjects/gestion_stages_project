<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        if($request->user()->hasVerifiedEmail()){
            if(($request->user()->role_id)===1){
                return redirect()->intended(RouteServiceProvider::HOMEAdmin);
            }
            elseif(($request->user()->role_id)===2){
                return redirect()->intended(RouteServiceProvider::HOMEFormateur);
    
            }
            elseif(($request->user()->role_id)===3){
                return redirect()->intended(RouteServiceProvider::HOMEEtudiant);
    
            }else{

                abort(404,'page introuvable');
            }
         }else{
             Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
         }
    }
}
