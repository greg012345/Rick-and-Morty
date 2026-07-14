import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
//import { RouterLink } from '@angular/router';
import { RmApiService } from '../rick/rm-api.service'; 
import {  OnInit, inject ,ChangeDetectorRef,NgZone} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

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
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,MatButtonModule,MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
    

  ], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {


  activeIndex = signal<number|null>(null);
  aktualisIndex = signal<number>(0); 
  aktDobozCim = signal<number|null>(null);
  aktDoboz = signal<number|null>(null);
  selectedGender: string = '';
  selectedStatus: string = '';
  
  
  boxesList = signal<Box[]>([]);
  armyList = signal<Army[]>([]);

  boxCounter = 0;
  aktSolder = signal<number|null>(null);

  /// uj függvények:
  addSolder( egyedi: boolean,  name: string ,pic: string,  Status: string, Species: string,Gender:string) {
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
}    }

   removeSolder(idToTöröl: number) {
    this.armyList.update(currentBoxes => 
      currentBoxes.filter(box => box.id !== idToTöröl)
    );
    console.log("akt doboz:" + this.aktDoboz + "a fokusz:")
    this.aktDoboz.set(null);

  }

editSolder(id: number| null, name: string, pic: string, Status: string, Species: string, Gender: string) {
  console.log("az id értéke:" + id)
  if(id === null){
    alert("Nincs semmi kijelölve")
  }
    if(this.armyList().find(k => k.id === id)?.egyedi === false){
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
  
  addBox(name: string) {
    if(name !== ""){
    this.boxCounter++;
    const newBox: Box = {
      id: Date.now(),
      title: `${name}`,
      items: []
    }

    this.boxesList.update(currentBoxes => [...currentBoxes, newBox]);
  }else{
    alert('Hiba: Kérlek, adj meg egy feladat nevet!'); // Felugró ablak
  }
  }

  addTodoToLastBox(name: string,poz: number) {
    if (!name.trim())alert('Hiba: üres feladat mező');

    if (this.boxesList().length === 0) {
      this.addBox(name);
    }

    this.addItemToBox(poz, name);
  }

  addItemToBox(boxId: number, name: string) {
    const newItem: ShoppingItem = {
      id: Date.now(),
      name: name,
    };

    this.boxesList.update(boxes => 
      boxes.map(box => {
        if (box.id === boxId) {
          return { ...box, items: [...box.items, newItem] };
        }
        return box;
      })
    );
  }

  deleteBox(idToTöröl: number) {
    this.boxesList.update(currentBoxes => 
      currentBoxes.filter(box => box.id !== idToTöröl)
    );
    console.log("akt doboz:" + this.aktDoboz + "a fokusz:")
    this.aktDoboz.set(null);

  }

deleteItemFromBox(boxId: number, itemIdToTöröl: number) {
  this.boxesList.update(currentBoxes => 
    currentBoxes.map(box => {
      if (box.id === boxId) {
        return {
          ...box,
          items: box.items.filter(item => item.id !== itemIdToTöröl)
        };
      }
      return box;
    })
  );
  this.activeIndex.set(null)
}

deleteItemFromBox2(boxId: number, itemid: number, name: string) {
  this.boxesList.update(currentBoxes => 
    currentBoxes.map(box => {
      if (box.id === boxId) {
        return {
          ...box,
          items: box.items.map(item => 
            item.id === itemid ? { ...item, name } : item
          )
        };      }
      return box;
    })
  );
}


EditBoxName(boxId: number, name: string) {
  if(boxId === this.boxesList()[this.aktDobozCim()!].id){
  this.boxesList.update(currentBoxes => 
    currentBoxes.map(box => {
      if (box.id === boxId) {
        return {
          ...box,
          title: name
        };      }
      return box;
    })
  );
}
}


  private apiService = inject(RmApiService);
  characters: any[] = [];
  characters_alive: any[] = [];

  private zone = inject(NgZone); 
  private cdr = inject(ChangeDetectorRef);
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadPage(this.currentPage);
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

    if(this.keresoStatus.trim()){
      eredmeny = eredmeny.filter(char => char.status.toLowerCase() == this.keresoStatus.toLocaleLowerCase())
    }

    if(this.keresoSpecies.trim()){
      const faj = this.keresoSpecies.toLocaleLowerCase();
      eredmeny = eredmeny.filter(char => char.species.toLocaleLowerCase().includes(faj))
    }
    
    if(this.keresoGender.trim()){
      eredmeny = eredmeny.filter(char => char.gender.toLowerCase() == this.keresoGender.toLocaleLowerCase())
    }
    return eredmeny;
  }

  loadPage(page: number) {    
    this.apiService.getCharacters(page).subscribe({
      next: (data) => {
      this.zone.run(() => {
      this.characters = [...this.characters, ...data.results];
          this.cdr.detectChanges(); 
        });      
      },
      error: (err) => {
        console.error(`[API Hiba] Valami elromlott az oldallekérésnél (${page}):`, err);
      }
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


