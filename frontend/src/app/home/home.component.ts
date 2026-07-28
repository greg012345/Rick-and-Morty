import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Army } from '../models/army';
import { Chaservice } from '../charservice/chaservice';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.chars.getchars().subscribe(data => {
      this.armyList.set(data)
    })
  }

  constructor(
    private chars: Chaservice) { }

  armyList = signal<Army[]>([]);

  del(id: number) {
    this.chars.deleteChar(id).subscribe({
      next: (response) => {
        console.log('Sikeres mentés a szerverre!');
        this.chars.getchars().subscribe(data => {
          this.armyList.set(data)
        })
      }
    });
  }

}


