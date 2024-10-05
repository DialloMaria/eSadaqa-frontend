import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-propos',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './propos.component.html',
  styleUrl: './propos.component.css'
})
export class ProposComponent {
  constructor( private router: Router)
  {

  }
}
