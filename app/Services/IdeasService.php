<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class IdeasService
{
    protected $baseUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

    public function getIdeas($page = 1, $size = 10, $sort = '-published_at')
    {
        $params = [
            'page[number]' => $page,
            'page[size]' => $size,
            'append[]' => ['small_image', 'medium_image'],
            'sort' => $sort
        ];

        $response = Http::get($this->baseUrl, $params);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to fetch ideas from external API');
    }
}