<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
// use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LanguageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('locale')->group(function() {
Route::get('/', [HomeController::class, 'index'])->name('index');



    Route::post('/validate-stage/{id}', [StageController::class,'validateStage'])->middleware(['auth', 'verified'])->name('validate.stage');;
    Route::post('/note-stage/{id}', [StageController::class, 'storeNote'])->name('store-note')->middleware(['auth', 'verified']);

    Route::post('/language', [LanguageController::class, 'store'])->name('language.store')->middleware(['auth', 'verified']);

    Route::get('/dashboardEtudiant',[HomeController::class,'indexStg'])->middleware(['auth', 'verified','etudiant'])->name('dashboardEtudiant');
    Route::get('/dashboardFormateur',[HomeController::class,'indexFormateur'])->middleware(['auth', 'verified','formateur'])->name('dashboardFormateur');
    Route::get('/dashboardAdmin',[HomeController::class,'indexAdmin'])->middleware(['auth', 'verified','admin'])->name('dashboardAdmin');




    Route::middleware('auth')->group(function () {
        Route::post('/upload-files', [FileController::class,'storeFile'])->name('file.store');
        Route::get('/dashboardEtudiant/form', [StageController::class,'create'])->name('stage.ajout');
        Route::post('/dashboardEtudiant/show', [StageController::class,'store'])->name('stage.store');
        Route::get('/form/edit/{id}', [StageController::class,'edit'])->name('stage.edit');
        Route::post('/dashboardEtudiant/index/{id}', [StageController::class,'update'])->name('stage.update');
        Route::delete('/dashboardEtudiant/deleteStg/{id}', [StageController::class, 'destroy'])->name('stage.destroy');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::delete('dashboardEtudiant/delete-file/{type}', [FileController::class, 'deleteFile'])->name('file.delete');
        Route::get('/get-uploaded-file-names', [FileController::class, 'show']);
});

require __DIR__.'/auth.php';
});
