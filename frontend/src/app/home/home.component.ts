import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '../translate.service';
import { DictionaryService } from '../dictionary.service';
import { Dictionary } from '../dictionary';
import { DictionaryItemComponent } from '../dictionary-item/dictionary-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    DictionaryItemComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  translatorService = inject(TranslateService);
  dictionaryService = inject(DictionaryService);
  ConvLabel = 'English';
  selectedTabIndex = 0;
  translated = '';
  dict: Dictionary[] | undefined;

  applyForm = new FormGroup({
    src: new FormControl('fil'),
    dst: new FormControl('en'),
    texts: new FormControl(''),
  });

  constructor() {}

  tabChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    this.ConvLabel = tab === 'Tagalog' ? 'English' : 'Tagalog';
    if (tab == 'Tagalog') {
      this.applyForm.patchValue({
        src: 'fil',
        dst: 'en',
        texts: '',
      });
    } else {
      this.applyForm.patchValue({
        src: 'en',
        dst: 'fil',
        texts: '',
      });
    }
    this.translated = '';
  }

  swap() {
    this.selectedTabIndex = this.selectedTabIndex === 0 ? 1 : 0;
  }

  submitApplication() {
    this.translatorService
      .submitApplication(
        this.applyForm.value.src ?? '',
        this.applyForm.value.dst ?? '',
        this.applyForm.value.texts ?? ''
      )
      .then((data) => {
        this.translated = data.message || '';

        if (this.applyForm.value.src === 'en') {
          this.dictionaryService
            .getSearched(this.translated || '', undefined, 1)
            .then((data) => {
              this.dict = data;
            });
        } else {
          this.dictionaryService
            .getSearched(this.applyForm.value.texts || '', undefined, 1)
            .then((data) => {
              this.dict = data;
            });
        }
      });
  }
}
