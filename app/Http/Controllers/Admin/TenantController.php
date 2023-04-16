<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    //
    public function createTenant($tenantName)
    {
        // This is only used during development
        // In production, you must have an admin panel
        $tenant = Tenant::create(['id' => $tenantName]);
        $tenant->domains()->create(['domain' => $tenantName . '.localhost']);
        echo $tenantName . " was successfully created!";
    }
}
