<?php

namespace App\Traits;

trait HasApiResponse
{
    /**
     * Returns a succesfull response
     *
     * @param array|string|null $data
     * @param string            $message . ?string typehint can be nullable
     */
    protected function success($data = [], ?string $message = null, int $code = 200): array
    {
        return [
            'status' => 'Success',
            'message' => $message,
            'data' => $data,
            'code' => $code,
        ];
    }

    /**
     * Return an error JSON response.
     *
     * @param array|string|null $data
     * @param string            $message . ?string typehint can be nullable
     */
    protected function error($data = null, ?string $message = null, int $code = 404): array
    {
        return [
            'status' => 'Error',
            'message' => $message,
            'data' => $data,
            'code' => $code,
        ];
    }
}
