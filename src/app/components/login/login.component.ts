import { Router } from '@angular/router';
import { ErrorComponent } from './../error/error.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog, private router: Router) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  login() {
    const user = this.form.value.user;
    const pass = this.form.value.pass;

    if (user == 'marie' && pass == '5610') {
      try {
        this.router.navigate(['dashboard']);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.matDialog.open(ErrorComponent);
    }

  }
}
