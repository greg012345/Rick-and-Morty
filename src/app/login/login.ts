import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private http: HttpClient) { }
  keycloak = inject(Keycloak);

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });

  }

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  get username(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

}