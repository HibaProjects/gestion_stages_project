<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Spatie\FlareClient\Http\Response;

class FileController extends Controller
{
    public function storeFile(Request $request)
{
    $request->validate([
        'rapport' => 'nullable|file|mimes:doc,docx,pdf',
        'convention' => 'nullable|file|mimes:pdf',
        'presentation' => 'nullable|file|mimes:pdf,ppt,doc,docx',
        'fiche_appreciation' => 'nullable|file|mimes:pdf,xlsx,xls',
        'attestation' => 'nullable|file|mimes:pdf'
    ]);

    $typeIds = [
        'rapport' => 1,
        'convention' => 2,
        'presentation' => 3,
        'fiche_appreciation' => 4,
        'attestation' => 5,
    ];
    $etd = Auth::user()->etd;
    $uploadedFiles = [];
    foreach ($request->allFiles() as $inputName => $file) {
        if ($file) {
            $typeId = $typeIds[$inputName];
            $uploadedFiles[]=$file;
            $existingDocument = Document::where('type_id', $typeId)
                ->where('etudiant_id', $etd->id)
                ->first();

            if ($existingDocument) {
                Storage::delete($existingDocument->path);
                $existingDocument->delete();
            }

            $filePath = $file->store('uploads');

            $document = new Document();
            $document->path = $filePath;
            $document->type_id = $typeId;
            $document->etudiant_id = $etd->id;
            $document->stage_id = $etd->stage_id;
            $document->save();

        };
    };
    $typesIdexiting=Document::select('type_id')->where('etudiant_id', $etd->id)->get();
    $typeIdsArray = $typesIdexiting->pluck('type_id')->toArray();
    $typesArray=[]; 
    $typeforIds = [
        1=> 'rapport' ,
        2=>'convention' ,
        3=>'presentation',
        4=>'fiche_appreciation',
        5=>'attestation',
    ];
    foreach($typeIdsArray as $id){
        $typesArray[]=$typeforIds[$id];
    }
   session(['typesArray' => $typesArray]);



    return Redirect::back()->with('message','Files uploaded successfully!');
}
public function show () {
    $etd = Auth::user()->etd;
    $typesIdexiting=Document::select('type_id')->where('etudiant_id', $etd->id)->get();
    $typeIdsArray = $typesIdexiting->pluck('type_id')->toArray();
    $typesArray=[]; 
    $typeforIds = [
        1=> 'rapport' ,
        2=>'convention' ,
        3=>'presentation',
        4=>'fiche_appreciation',
        5=>'attestation',
    ];
    foreach($typeIdsArray as $id){
        $typesArray[]=$typeforIds[$id];
    }
   session(['typesArray' => $typesArray]);
    $typesArray = session('typesArray', []);
    return response()->json(['typesArray' => $typesArray]);
}
public function deleteFile($type)
{
    $typeIds = [
        'rapport' => 1,
        'convention' => 2,
        'presentation' => 3,
        'fiche_appreciation' => 4,
        'attestation' => 5,
    ];

    $document = Document::where('type_id', $typeIds[$type])->first();
    if ($document) {
        Storage::delete($document->path);
        $document->delete();
        $etd = Auth::user()->etd;
        $typesIdexiting=Document::select('type_id')->where('etudiant_id', $etd->id)->get();
        $typeIdsArray = $typesIdexiting->pluck('type_id')->toArray();
        $typesArray=[]; 
        $typeforIds = [
            1=> 'rapport' ,
            2=>'convention' ,
            3=>'presentation',
            4=>'fiche_appreciation',
            5=>'attestation',
        ];
        foreach($typeIdsArray as $id){
            $typesArray[]=$typeforIds[$id];
        }
       session(['typesArray' => $typesArray]);
        return response('Files deleted successfully', 200);

    } 
    
}

        
}
