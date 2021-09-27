import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeModel } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData!: any;
  employeeId:number=0;
  
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName :['',Validators.required],
      lastName :['',Validators.required],
      email :['',Validators.required],
      mobile : ['',Validators.required],
      salary : ['',Validators.required]
    })
   
    this.getAllEmployee();
  }
  resetFields() {
    this.formValue.controls['firstName'].setValue("");
    this.formValue.controls['lastName'].setValue("");
    this.formValue.controls['email'].setValue("");
    this.formValue.controls['mobile'].setValue("");
    this.formValue.controls['salary'].setValue("");
  }
  addemployee(){
    this.resetFields();
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
  
    this.api.postEmploye(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Add Successfully")
      let can=document.getElementById("cancel")
      can?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },err=>{
      alert("Something went wrong")
    }
  
    )
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe((res:any[])=>{
      this.employeeData = res;
    })
  }
  delete(newrow:any){
    this.api.deleteEmployee(newrow.id).subscribe(res=>{
      alert("delete record!!!");
      this.getAllEmployee();
    });
  }
  edit(newrow:any){
    this.formValue.controls['firstName'].setValue(newrow.firstName);
    this.formValue.controls['lastName'].setValue(newrow.lastName);
    this.formValue.controls['email'].setValue(newrow.email);
    this.formValue.controls['mobile'].setValue(newrow.mobile);
    this.formValue.controls['salary'].setValue(newrow.salary);
    this.employeeId=newrow.id;
  }
  updateEmployee(){
    debugger;
    this.api.updateEmployee(this.formValue.value,this.employeeId).subscribe(res=>{
      this.getAllEmployee();
      alert("Update record!!!");
    });
  }
}
