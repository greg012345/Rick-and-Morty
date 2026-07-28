import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RmApiService } from '../rick/rm-api.service';
import { OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import Keycloak from 'keycloak-js';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Army } from '../models/army';
import { Chaservice } from '../charservice/chaservice';
import { Router, } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,

    MatToolbarModule], templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  keycloak = inject(Keycloak);
  private apiService = inject(RmApiService);
  aktualisIndex = signal<number>(0);

  characters: any[] = [];

  keresoSzo: string = '';
  keresoStatus: string = '';
  keresoSpecies: string = '';
  keresoGender: string = '';
  constructor(
    private chars: Chaservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  addSolder(name: string, pic: string, Status: string, Species: string, Gender: string) {
    console.log(name == undefined)
    if (name == undefined) {
      alert("Hiba nincs kiválasztott elem!")
    }
    else {
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
          createdBy: this.keycloak.tokenParsed?.['preferred_username'] ?? ''

        };
        this.chars.newChars(newBox).subscribe()
        this.router.navigate(['/home'])
      }
    }
  }


  nextItem(Ms: number) {
    if (this.aktualisIndex()! < Ms - 1) {
      this.aktualisIndex.update(index => index! + 1);
      //console.log("aktindexix:" + this.aktualisIndex())
    } else {
      //console.log("aktindexix:" + this.aktualisIndex())
      this.aktualisIndex.set(0);
    }
  }

  prevItem() {
    if (this.aktualisIndex()! > 0) {
      this.aktualisIndex.update(index => index! - 1);
      //console.log("aktindexix:" + this.aktualisIndex())
    } else {
      //console.log("aktindexix:" + this.aktualisIndex())
    }
  }

  loadPage(): void {
    for (let i: number = 1; i < 43; i++) {
      this.apiService.getCharacters(i).subscribe({
        next: (data) => {
          this.characters = [...this.characters, ...data.results];
          //console.log('Megérkezett az adat:', data.results);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Hiba az API hívásban:', err)
      });
    }

  }


  get szurtKarakterek() {
    let eredmeny = this.characters;

    if (this.keresoSzo.trim()) {
      const szo = this.keresoSzo.toLowerCase();
      eredmeny = eredmeny.filter(char => char.name.toLowerCase().includes(szo));
    }

    if (this.keresoStatus.trim()) {
      eredmeny = eredmeny.filter(char => char.status.toLowerCase() == this.keresoStatus.toLocaleLowerCase())
    }

    if (this.keresoSpecies.trim()) {
      const faj = this.keresoSpecies.toLocaleLowerCase();
      eredmeny = eredmeny.filter(char => char.species.toLocaleLowerCase().includes(faj))
    }

    if (this.keresoGender.trim()) {
      eredmeny = eredmeny.filter(char => char.gender.toLowerCase() == this.keresoGender.toLocaleLowerCase())
    }
    return eredmeny;
  }

  reset() {

    this.keresoSzo = '';
    this.keresoStatus = '';
    this.keresoSpecies = '';
    this.keresoGender = '';
  }
}


