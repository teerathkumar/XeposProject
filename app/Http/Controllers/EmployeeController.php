<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;

  
class EmployeeController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
        $employees = Employee::with('company')->get()->toArray();
        return Inertia::render('Employees/Index', ['employees' => $employees]);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Employees/Create', ['companies'=>Company::all()]);
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'first_name' => ['required'],
            'last_name' => ['required'],
        ])->validate();
  
        Employee::create($request->all());
  
        return redirect()->route('employees.index');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'companies'=>Company::all()
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
            'first_name' => ['required'],
            'last_name' => ['required'],
        ])->validate();
  
        Employee::find($id)->update($request->all());
        return redirect()->route('employees.index');
    }
  
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function destroy($id)
    {
        Employee::find($id)->delete();
        return redirect()->route('employees.index');
    }

    public function storeLogoImage(Employee $employee, Request $request): string
    {
        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $this->removePreviousLogo($employee);

            return Storage::disk('public')->putfile('employees/' . $employee->id, $request->file('logo'));
        }

        return '';
    }

    public function updateLogoImage(Employee $employee, string $path): void
    {
        if ($path) {
            $employee->update([
                'logo' => $path
            ]);
        }
    }

    public function removePreviousLogo(Employee $employee): void
    {
        if ($employee->logo) {
            Storage::disk('public')->delete($employee->logo);
        }
    }
}