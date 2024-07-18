<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            if(($request->user()->role_id)===1){
                return redirect()->intended(RouteServiceProvider::HOMEAdmin.'?verified=1');
            }
            elseif(($request->user()->role_id)===2){
                return redirect()->intended(RouteServiceProvider::HOMEFormateur.'?verified=1');
    
            }
            elseif(($request->user()->role_id)===3){
                return redirect()->intended(RouteServiceProvider::HOMEEtudiant.'?verified=1');
    
            }else{

                abort(404,'page introuvable');
            }
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }
        if($request->user()->hasVerifiedEmail()){
            if(($request->user()->role_id)===1){
                return redirect()->intended(RouteServiceProvider::HOMEAdmin.'?verified=1');
            }
            elseif(($request->user()->role_id)===2){
                return redirect()->intended(RouteServiceProvider::HOMEFormateur.'?verified=1');
    
            }
            elseif(($request->user()->role_id)===3){
                return redirect()->intended(RouteServiceProvider::HOMEEtudiant.'?verified=1');
    
            }else{

                abort(404,'page introuvable');
            }
    }
}
}