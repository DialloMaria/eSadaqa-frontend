import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-propos',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent {
  constructor( private router: Router)
  {

  }
}
