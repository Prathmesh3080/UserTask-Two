import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrl: './emp-edit.component.css'
})
export class EmpEditComponent implements OnInit{
  empForm: FormGroup;
  dataArray: any[]=[];

  constructor(
    private http:HttpClient,
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService) {
    
      this.empForm = this.fb.group({
      name: '',
      username: '',
      email: '',
      website: '',
      phone: ''
    });
  }


  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data : any) => {
      this.dataArray = data;
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({next: (val: any) => {
              this.coreService.openSnackBar('Employee detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Employee added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
