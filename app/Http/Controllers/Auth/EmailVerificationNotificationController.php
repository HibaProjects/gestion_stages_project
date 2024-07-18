<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
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
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
