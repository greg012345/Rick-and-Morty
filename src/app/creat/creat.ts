import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Chaservice } from '../charservice/chaservice';
import { Army } from '../models/army';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creat',
  imports: [CommonModule, RouterLink, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
  ],
  templateUrl: './creat.html',
  styleUrl: './creat.css',
})
export class Creat implements OnInit {
  constructor(
    private chas: Chaservice,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,


  ) { }
  armyList = signal<Army>({
    id: 0,
    name: "",
    image: "",
    status: "",
    species: "",
    gender: "",

  });
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);

      this.chas.getcharsById(id).subscribe({
        next: (data) => {
          this.armyList.set(data);


          console.log("Sikeres betöltés:", data);
        },
        error: (err) => console.error("Hiba a betöltéskor:", err)
      });
    }
  }

  selectedGender: string = '';
  selectedStatus: string = '';


  aktSolder = signal<number | null>(null);
  private router = inject(Router);

  addSolder(egyedi: boolean, name: string, pic: string, Status: string, Species: string, Gender: string) {
    const hibak: string[] = [];

    if (name.trim() === "") {
      hibak.push("karakter nevet");
    }
    if (pic.trim() === "") {
      hibak.push("kép nevet");
    }
    if (Status.trim() === "") {
      hibak.push("státuszt");
    }
    if (Species.trim() === "") {
      hibak.push("Species");
    }
    if (Gender.trim() === "") {
      hibak.push("Gender");
    }
    if (hibak.length > 0) {
      alert(`Hiba! Kérlek, add meg a következőket: ${hibak.join(', ')}!`);
    } else {
      const newBox: Army = {
        id: 0,
        name: name,
        image: pic,
        status: Status,
        species: Species,
        gender: Gender
      };
      console.log(newBox)
      this.chas.newChars(newBox).subscribe({
        next: () => { this.router.navigate(['/home']) }

      })
    }
  }

}
