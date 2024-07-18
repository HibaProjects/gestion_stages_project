<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Document;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class EtudiantController extends Controller
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
    
            foreach ($request->allFiles() as $inputName => $file) {
                if ($file) {
                    $typeId = $typeIds[$inputName];
                    $filePath = $file->store('uploads');
    
                    $document = new Document();
                    $document->path = $filePath;
                    $document->type_id = $typeId;
                    $document->etudiant_id = $etd->id;  
                    $document->stage_id = $etd->stage_id;
                    $document->save();
                }
            
        }
       
        
    }
}
