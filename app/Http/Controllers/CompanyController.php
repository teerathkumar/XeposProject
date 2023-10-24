<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
  
class CompanyController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
        $companies = Company::all();
        return Inertia::render('Companies/Index', ['companies' => $companies, 'public_path'=>public_path()]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Companies/Create');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required'],
            // 'logo' => ['dimensions:min_width=100,min_height=100'],
        ])->validate();
  
        // dd($request);
        // Company::create($request->all());
          $company = Company::create($request->except('logo'));
        $path = $this->storeLogoImage($company, $request);

        $this->updateLogoImage($company, $path);

        return redirect()->route('companies.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function edit(Company $company)
    {
        return Inertia::render('Companies/Edit', [
            'company' => $company,
            'public_path'=>public_path()
        ]);
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required'],
            // 'logo' => ['dimensions:min_width=100,min_height=100'],
        ])->validate();
  
        // unset($request->logo);
        // Company::find($id)->update($request->all());
        $company = Company::find($id);
        $company->update($request->except('logo'));
        $path = $this->storeLogoImage($company, $request);
        $this->updateLogoImage($company, $path);

        return redirect()->route('companies.index');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function destroy($id)
    {
        Company::find($id)->delete();
        return redirect()->route('companies.index');
    }

    
    public function storeLogoImage(Company $company, Request $request): string
    {
        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $this->removePreviousLogo($company);

            return Storage::disk('public')->putfile($company->id, $request->file('logo'));
        }

        return '';
    }

    public function updateLogoImage(Company $company, string $path): void
    {
        if ($path) {
            $company->update([
                'logo' => $path
            ]);
        }
    }

    public function removePreviousLogo(Company $company): void
    {
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }
    }
}