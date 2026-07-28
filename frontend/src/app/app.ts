import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.authenticated;
  }

  protected readonly title = signal('Rick_srcrub');
  keycloak = inject(Keycloak);
  isLoggedIn = false;

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  get username(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

}
