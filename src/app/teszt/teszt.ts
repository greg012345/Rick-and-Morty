import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Army } from '../models/army';
import { Chaservice } from '../charservice/chaservice';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-teszt',
  imports: [],
  templateUrl: './teszt.html',
  styleUrl: './teszt.css',
})
export class Teszt implements OnInit {
  characters = signal<Army[]>([]);
  constructor(private chars: Chaservice
  ) { }
  ngOnInit(): void {
    this.getall();
  }


  getall() {
    this.chars.getchars().subscribe(data => {
      this.characters.set(data);
    })
  }
}
