import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm ! : FormGroup;
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value).subscribe(res=>{
    console.log(this.signUp)  
    alert("Signup Successfully");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Somthing went wrong")
    }
    )
  }
  
}
