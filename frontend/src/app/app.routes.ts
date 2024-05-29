import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { HeroComponent } from './hero/hero.component';

export const routes: Routes = [
  { path: '', component: HeroComponent, title: 'Translate' },
  { path: 'Translate', component: HomeComponent, title: 'Translate' },
  {
    path: 'Dictionary',
    component: DictionaryListComponent,
    title: 'Dictionary',
  },
  {
    path: 'Dictionary/:id',
    component: DictionaryListComponent,
    title: 'Dictionary',
  },
  { path: 'About', component: AboutComponent, title: 'About' },
];
