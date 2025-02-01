<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Str;

trait HasBearerToken
{
    /**
     * Returns a sanctum bearer token from request header
     *
     * @return string bearer token
     */
    public function bearerToken(): string
    {
        try {
            $header = $this->header('Authorization', '');

            if (Str::startsWith($header, 'Bearer ')) {
                return Str::substr($header, 7);
            }

        } catch (Exception $e) {
            return $e;
        }

        return $header;
    }
}
