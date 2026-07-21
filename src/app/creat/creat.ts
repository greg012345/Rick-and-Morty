import { Component, signal, inject } from '@angular/core';
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

interface Army {
  id: number;
  egyedi: boolean;
  name: string;
  pic: string;
  Status: string;
  Species: string;
  Gender: string;
}

interface ShoppingItem {
  id: number;
  name: string;
}


interface Box {
  id: number;
  title: string;
  items: ShoppingItem[];
}

@Component({
  selector: 'app-creat',
  imports: [CommonModule, RouterLink, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule],
  templateUrl: './creat.html',
  styleUrl: './creat.css',
})
export class Creat {

  selectedGender: string = '';
  selectedStatus: string = '';
  armyList = signal<Army[]>([]);
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
        id: Date.now(),
        egyedi: egyedi,
        name: name,
        pic: pic,
        Status: Status,
        Species: Species,
        Gender: Gender
      };
      this.armyList.update(currentBoxes => [...currentBoxes, newBox]);
      this.router.navigate(['/home']);
    }
  }

  editSolder(id: number | null, name: string, pic: string, Status: string, Species: string, Gender: string) {
    console.log("az id értéke:" + id)
    if (id === null) {
      alert("Nincs semmi kijelölve")
    }
    if (this.armyList().find(k => k.id === id)?.egyedi === false) {
      alert("Nem modosítható")
      return
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





}
