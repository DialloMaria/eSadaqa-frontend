import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-propos',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './responsive.component.html',
  styleUrl: './responsive.component.css'
})
export class ResponsiveComponent {
  constructor( private router: Router)
  {

  }


  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
