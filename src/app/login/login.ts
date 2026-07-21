import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
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

  register() {
    this.keycloak.register();
  }
}