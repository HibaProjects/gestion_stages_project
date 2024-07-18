<?php     
namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $userRech=User::where('email','=',$request->user()->email)->get()->first();
                
                if(($userRech ->role_id) ===1 ){     
                    
                    return redirect(RouteServiceProvider::HOMEAdmin);
                }elseif(($userRech ->role_id) ===2){
                    $request->session()->regenerate();
                    return redirect()->intended(RouteServiceProvider::HOMEFormateur);
        
                }
                elseif(($userRech ->role_id) ===3){
                    $request->session()->regenerate();
                    return redirect()->intended(RouteServiceProvider::HOMEEtudiant);
        
                }
                else{
                    $request->session()->regenerate();
                    abort(404,'Il Faut Se Connecter');
                }
            }
            
            return $next($request);
        }
    }
    
}

