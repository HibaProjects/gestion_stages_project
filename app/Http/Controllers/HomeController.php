<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Stage;
use App\Models\Etudiant;
use App\Models\Role_User;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{


    public function index(Request $r) {

        $authenticated = $r->session()->get('authenticated', 0);
        $role_id = $r->session()->get('role_id', null);
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'authenticated'=>$authenticated,
            "role_id"=>$role_id
           ]

        );
    }

    public function  indexStg(Request $request) {

        if ($request->user()){

            $etds=Etudiant::where('user_id',$request->user()->id)->first();

            if(Stage::find($etds->stage_id) == null) {
                $stage=new Stage();
            }
            else{
                $stage=Stage::find($etds->stage_id);
            }

            $authenticated = $request->session()->get('authenticated', 0);
            $role_id = $request->session()->get('role_id', null);
            return Inertia::render('Dashboard',['stage'=>$stage,'etudiants'=>$etds,'authenticated'=>$authenticated,
            "role_id"=>$role_id]);

        }
        else{
        abort(403,'only connected user is allowed to access this route');
        }
        }
        public function  indexFormateur(Request $request) {
            $authenticated = $request->session()->get('authenticated', 0);
            $role_id = $request->session()->get('role_id', null);
            if ($request->user()){
                $usersdata = DB::select('CALL GetUserStageData()');

                $usersDataArray=[
                    'usersdata'=>$usersdata
                ];

                $jsonData = json_encode($usersDataArray, JSON_PRETTY_PRINT);
            $folderPath = 'json_data'; //MY Folder name

            $fileName = 'data.json';
            Storage::disk('local')->put($folderPath . '/' . $fileName, $jsonData);
            return Inertia::render('DashboardFormateur',['authenticated'=>$authenticated,"role_id"=>$role_id]);
            }
            else{
            abort(403,'only connected user is allowed to access this route');
            };
            }
        public function  indexAdmin(Request $request) {
            $authenticated = $request->session()->get('authenticated', 0);
            $role_id = $request->session()->get('role_id', null);
            if ($request->user()){
                $stage=Stage::all();

                $etudiantsdata =  DB::select('CALL GetEtudiantsData()');
                $formateursdata = DB::select('CALL GetFormateursData()');

                $usersDataArray=[
                    'etudiantsdata'=>$etudiantsdata,
                    'formateursdata'=>$formateursdata,

                ];

                $jsonData = json_encode($usersDataArray, JSON_PRETTY_PRINT);

            $folderPath = 'json_data';

            $fileName = 'dataadmin.json';
            Storage::disk('local')->put($folderPath . '/' . $fileName, $jsonData);
            return Inertia::render('DashboardAdmin',['authenticated'=>$authenticated,"role_id"=>$role_id]);
            }
            else{
            abort(403,'only connected user is allowed to access this route');
            };
        }

}
