import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDrawerContainer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-navbar',
  standalone: true, // Indica que é um componente standalone
  imports: [MatToolbarModule,MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle, MatButtonModule, MatSidenavModule, MatIconModule, MatNavList, RouterModule], // Inclua os módulos necessários
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild(MatDrawerContainer) drawerContainer!: MatDrawerContainer;
  showFiller = false;
  zIndexToggled = -1;

  changeZIndex() {
    this.zIndexToggled *= -1;
  }
}
