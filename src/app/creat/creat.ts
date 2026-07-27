import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Chaservice } from '../charservice/chaservice';
import { Army } from '../models/army';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-creat',
  imports: [CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './creat.html',
  styleUrl: './creat.css',
})
export class Creat implements OnInit {
  constructor(
    private chas: Chaservice,
    private route: ActivatedRoute) { }

  private keycloak = inject(Keycloak);
  private router = inject(Router);

  armyList = signal<Army>({
    id: 0,
    name: "",
    image: "",
    status: "",
    species: "",
    gender: "",
    creatBy: ""
  });

  title: string = "";
  btitle: string = "";

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.title = "Szerkesztés"
      this.btitle = "Módosítás"
      this.chas.getcharsById(id).subscribe({
        next: (data) => {
          this.armyList.set(data);
          console.log("Sikeres betöltés:", data);
        },
        error: (err) => console.error("Hiba a betöltéskor:", err)
      });
    }
    else {
      this.title = "Saját készítés"
      this.btitle = "Létrehozás"
    }
  }


  addSolder(name: string, pic: string, Status: string, Species: string, Gender: string) {
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
        gender: Gender,
        creatBy: this.keycloak.tokenParsed?.['preferred_username'] ?? ''
      };
      const idParam = Number(this.route.snapshot.paramMap.get('id'));
      if (idParam > 0) {
        newBox.id = idParam;
        this.chas.editChar(idParam, newBox).subscribe({
          next: () => { this.router.navigate(['/home']) }
        })
      }
      else {
        //console.log(newBox)
        this.chas.newChars(newBox).subscribe({
          next: () => { this.router.navigate(['/home']) }
        })
      }
    }
  }

}
