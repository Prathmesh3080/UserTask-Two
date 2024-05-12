import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  dataArray: any[]=[];

item: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'website',
    'phone',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
    private coreService: CoreService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
    
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EmpEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // delete(id: number) {
  //   this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe((res) => {
  //       // Handle success (e.g., show a message)
  //       console.log(`Item with ID ${id} deleted successfully.`);
  //       // Remove the item from the array
  //       this.dataArray = this.dataArray.filter((item: { id: number; }) => item.id !== id);
  //     });
  // }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
