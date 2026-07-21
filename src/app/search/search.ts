import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RmApiService } from '../rick/rm-api.service';
import { OnInit, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import Keycloak from 'keycloak-js';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Army } from '../models/army';
import { Chaservice } from '../charservice/chaservice';
import { ActivatedRoute, Router, } from '@angular/router';
@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterLink, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule], templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  keycloak = inject(Keycloak);

  activeIndex = signal<number | null>(null);
  aktualisIndex = signal<number>(0);
  aktDobozCim = signal<number | null>(null);
  aktDoboz = signal<number | null>(null);
  selectedGender: string = '';
  selectedStatus: string = '';

  armyList = signal<Army[]>([]);


  boxCounter = 0;
  aktSolder = signal<number | null>(null);
  constructor(
    private chars: Chaservice,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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
      this.chars.newChars(newBox).subscribe()
      this.router.navigate(['/home'])
    }
  }




  nextItem(maxItems: number) {
    if (this.aktualisIndex()! < maxItems - 1) {
      this.aktualisIndex.update(index => index! + 1);
    } else {
      this.aktualisIndex.set(0);
    }
    console.log("AHa")
  }

  prevItem(maxItems: number) {
    if (this.aktualisIndex()! > 0) {
      this.aktualisIndex.update(index => index! - 1);
    } else {
      this.aktualisIndex.set(maxItems - 1);
    }
  }


  private apiService = inject(RmApiService);
  //characters = signal<Army[]>([]);

  characters: any[] = [];
  characters_alive: any[] = [];
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  currentPage: number = 10;

  ngOnInit(): void {
    this.loadPage(this.currentPage);
    this.chars.getchars().subscribe(data => {
      this.armyList.set(data)
    })
  }

  keresoSzo: string = '';
  keresoStatus: string = '';
  keresoSpecies: string = '';
  keresoGender: string = '';

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

  loadPage(page: number): void {
    this.apiService.getCharacters(page).subscribe({
      next: (data) => {
        // Frissítjük a Signal-t az új adatokkal
        this.characters = (data.results);
        console.log('Megérkezett az adat:', data.results);
      },
      error: (err) => console.error('Hiba az API hívásban:', err)
    });
  }

  nextPage() {
    this.currentPage++;
    console.log(`-> [Next gomb] Oldal növelve: ${this.currentPage}`);
    this.loadPage(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(`<- [Prev gomb] Oldal csökkentve: ${this.currentPage}`);
      this.loadPage(this.currentPage);
    }
  }

  All() {
    for (let i: number = 0; i < 43; i++) {
      this.loadPage(i);
      this.currentPage++;
    }

  }








}


