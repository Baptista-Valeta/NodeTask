import { Injectable } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  credential_form = new FormGroup({
    name: new FormControl('', []),
    email: new FormControl('', []),
    password: new FormControl('', [])
  });

  constructor() { }
}
