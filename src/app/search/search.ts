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
    private chars: Chaservice, private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }
  /// uj függvények:
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
        id: Date.now(),
        name: name,
        image: pic,
        status: Status,
        species: Species,
        gender: Gender
      };
      this.armyList.update(currentBoxes => [...currentBoxes, newBox]);
    }
  }

  removeSolder(idToTöröl: number) {
    this.armyList.update(currentBoxes =>
      currentBoxes.filter(box => box.id !== idToTöröl)
    );
    console.log("akt doboz:" + this.aktDoboz + "a fokusz:")
    this.aktDoboz.set(null);

  }

  editSolder(id: number | null, name: string, pic: string, Status: string, Species: string, Gender: string) {
    console.log("az id értéke:" + id)
    if (id === null) {
      alert("Nincs semmi kijelölve")
    }

    this.armyList.update(list =>
      list.map(arm => {
        if (arm.id === id) {
          return {
            ...arm,
            name: name,
            pic: pic,
            Status: Status,
            Species: Species,
            Gender: Gender
          };
        }
        return arm;
      })
    );
  }

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

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
  ///





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
  characters = signal<Army[]>([]);

  charactersssssss: any[] = [];
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
    let eredmeny = this.charactersssssss;

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
        this.characters.set(data.results);
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






  creatEm(firs: string, last: string, phone: string, email: string, pos: string) {

    const emp: Army = {
      id: 0,
      name: firs,
      image: last,
      status: email,
      species: phone,
      gender: pos
    }

    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(id)
    if (id) {
      emp.id = id;
      this.chars.editChar(id, emp).subscribe({
        next: (response) => {
          console.log('Sikeres mentés a szerverre!', response);
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Hiba történt a mentés során:', err);
        }
      });
    }
    else {
      this.chars.newChars(emp).subscribe({
        next: (response) => {
          console.log('Sikeres mentés a szerverre!', response);
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Hiba történt a mentés során:', err);
        }

      });
    }
  }



}


