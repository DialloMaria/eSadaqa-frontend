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
    isModalActive: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  openModal(type: string) {
    this.isModalActive = true;

    switch (type) {
      case 'donateur':
        this.modalTitle = 'Donateur';
        this.modalContent = 'You selected the Donateur option.';
        break;
      case 'organisation':
        this.modalTitle = 'Organisation';
        this.modalContent = 'You selected the Organisation option.';
        break;
      case 'beneficiaire':
        this.modalTitle = 'Beneficiaire';
        this.modalContent = 'You selected the Beneficiaire option.';
        break;
    }
  }

  closeModal() {
    this.isModalActive = false;
  }
}
