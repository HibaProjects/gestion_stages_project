<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'type' => ['required', 'string', 'max:10'],
        'apogee' => $request->type === 'etudiant' ? 'required|string|max:255' : '',
    ]);
    $role = Role::where('nom', $request->type)->first();
    // dd($role->id);
    $idRole=$role->id;
    $user=new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->role_id=$idRole;
    $user->save();
    // $user = User::create([
    //     'name' => $request->name,
    //     'email' => $request->email,
    //     'password' => Hash::make($request->password),
    //     'role_id'=>$idRole
    // ]);

    // DB::beginTransaction();

    // try {
    //     // Get the role ID based on the type provided from the request
    //     $role = Role::where('nom', $request->type)->first();

    //     if ($role) {
    //         $user->role_id =  $role->id;
    //     } else {
    //         // Role not found, handle this case (log an error, throw an exception, etc.)
    //         Log::error("Role not found for type: " . $request->type);
    //         // Alternatively, you can throw an exception to indicate the issue
    //         throw new \Exception("Role not found for type: " . $request->type);
    //     }

    //     // Commit the transaction
    //     DB::commit();

    // } catch (\Exception $e) {
    //     // Rollback the transaction if an exception occurred
    //     DB::rollBack();
    //     // Log the error or handle it appropriately
    //     dd($e);
    // }

    // Create the user

    // Handle etudiant data separately
    if ($request->type === 'etudiant') {
        $etudiantData = [
            'apogee' => $request->apogee,
            'user_id' => $user->id
        ];
        $etudiant = new Etudiant($etudiantData);
        $etudiant->save();
    }

    // Fire the Registered event
    event(new Registered($user));

    // Login the user
    Auth::login($user);
    $authenticated=(Auth::check());
        if($authenticated){
            $user = Auth::user();
            $role_id = $user->role_id;

        }
        $request->session()->put('authenticated', $authenticated);
        $request->session()->put('role_id',$role_id);
    // Redirect to the home page
    return redirect()->route('index');
}

}
