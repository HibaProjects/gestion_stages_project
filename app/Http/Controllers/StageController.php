<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Stage;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class StageController extends Controller
{
    public function create(){
        return Inertia::render('StageForm');
    }
    public function store(Request $r)
    {
        $validator = Validator::make($r->all(), [
            'nom_entreprise' => 'required|max:30',
            'ville_entreprise' => 'required|max:30',
            'nom_employe' => 'required|max:20',
            'intitule' => 'required|max:60',
            'description' => 'required|max:500',
            'technologies' => 'required|max:255',
        ]);
        $errors=$validator->errors()->messages();
        if ($validator->fails()) {
            return back()->withErrors($errors);
        }
        try{

            $stage=new Stage();
            $stage->nom_entreprise=$r->input('nom_entreprise');
            $stage->ville_entreprise=$r->input('ville_entreprise');
            $stage->nom_employe=$r->input('nom_employe');
            $stage->intitule=$r->input('intitule');
            $stage->description=$r->input('description');
            $stage->technologies=$r->input('technologies');
            $stage->save();
            $stageId=$stage->id;
            $etd=User::find((Auth::user()->id))->etd;
            $etd->stage_id=$stageId;
            $etd->save();
            $documents=$etd->docs()->get();
            foreach ($documents as $document) {
                       $document->stage_id=$stage->id;
                       $document->save();
             }      
            return redirect()->route('dashboardEtudiant');
        }
        catch (Exception $e) {
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'enregistrement du stage.');
        }
        
        }
        public function edit($id){
            $stage=Stage::find($id);
                return Inertia::render('StageFormEdit',[
                    'stage'=>$stage,
                    
            ]);
        }
        public function update(Request $r ,$id){
            $validator = Validator::make($r->all(), [
                'nom_entreprise' => 'required|max:30',
                'ville_entreprise' => 'required|max:30',
                'nom_employe' => 'required|max:20',
                'intitule' => 'required|max:60',
                'description' => 'required|max:500',
                'technologies' => 'required|max:255',
            ]);
            $errors=$validator->errors()->messages();
            $stage=Stage::findOrFail($id);
            $stage->nom_entreprise= $r->input('nom_entreprise');
            $stage->ville_entreprise= $r->input('ville_entreprise');
            $stage->nom_employe= $r->input('nom_employe');
            $stage->intitule=$r->input('intitule');
            $stage->description=$r->input('description');
            $stage->technologies=$r->input('technologies');
            $stage->save();
            return redirect('/dashboardEtudiant');
        }
        public function destroy($id){
            $stage = Stage::findOrFail($id);
            $etd=User::find((Auth::user()->id))->etd;
            $etd->stage_id=NULL;
            $etd->save();
            $stage->delete();
            $documents=$etd->docs()->get();
            foreach ($documents as $document) {
                $document->stage_id=NULL;
      }  
            return response()->json(['message' => 'Stage deleted successfully'], 200);

        }
public function validateStage($id)
{
    $stage = Stage::findOrFail($id);
    $stage->update(['etat' => 'valide']);
    return response()->json([
        'message' => 'Stage validated successfully',
        'newEtat' => $stage->etat 
    ]);
}
public function storeNote($id,Request $request)
{
    $request->validate([
        'note'=>'numeric|max:20'
    ]);

    try{

        $note = $request->input('note');
        $stage = Stage::findOrFail($id);
        $stage->note=$note;
        $stage->save();
        return response()->json([
            'message' => 'Note created successfully',
            'note'=>$stage->note
    ], 201);
    }
    catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    
 }
 }

