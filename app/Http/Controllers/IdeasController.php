<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\IdeasService;
use Inertia\Inertia;

class IdeasController extends Controller
{
    protected $ideasService;

    public function __construct(IdeasService $ideasService)
    {
        $this->ideasService = $ideasService;
    }

    public function index()
    {
        return Inertia::render('Ideas/Index');
    }

    public function getIdeas(Request $request)
    {
        $page = $request->get('page', 1);
        $size = $request->get('size', 10);
        $sort = $request->get('sort', '-published_at');

        try {
            $ideas = $this->ideasService->getIdeas($page, $size, $sort);
            return response()->json($ideas);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch ideas'], 500);
        }
    }
}
