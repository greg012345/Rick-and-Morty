import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Army } from '../models/army';
import { Chaservice } from '../charservice/chaservice';
import { OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-teszt',
  imports: [RouterLink],
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
