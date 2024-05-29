import { Component, inject } from '@angular/core';
import { DictionaryItemComponent } from '../dictionary-item/dictionary-item.component';
import { DictionaryService } from '../dictionary.service';
import { Dictionary } from '../dictionary';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

interface Type {
  value: string;
}

@Component({
  selector: 'app-dictionary-list',
  standalone: true,
  imports: [
    DictionaryItemComponent,
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './dictionary-list.component.html',
  styleUrl: './dictionary-list.component.scss',
})
export class DictionaryListComponent {
  dictionaryService = inject(DictionaryService);
  route: ActivatedRoute = inject(ActivatedRoute);
  dict: Dictionary[] | undefined;
  limit: number = 10;
  offset: number = 0;
  pageSize: number = 10;
  searched_word = '';
  selectedType = 'All';

  types: Type[] = [
    { value: 'All' },
    { value: 'Tagalog' },
    { value: 'Ilocano' },
    { value: 'Cebuano' },
    { value: 'Hiligaynon' },
  ];

  constructor() {
    this.route.params.subscribe((params) => {
      this.searched_word = params['id'];
      this.loadData();
    });
  }

  onPaginateChange(event: PageEvent, el: HTMLElement) {
    this.offset = event.pageIndex || 0;
    this.limit = event.pageSize;
    console.log(this.offset, this.limit);
    this.loadData();
    el.scrollIntoView();
  }

  loadData() {
    if (this.searched_word) {
      this.dictionaryService.getSearched(this.searched_word, this.selectedType, this.limit, this.offset).then((item) => {
        this.dict = item;
        console.log(this.dict);
      });
    } else {
      this.dictionaryService
        .getAll(this.selectedType, this.limit, this.offset)
        .then((item) => {
          this.dict = item;
          console.log(this.dict);
        });
    }
  }

  selectType(event: any) {
    this.selectedType = event.value;
    this.loadData();
    console.log(this.selectedType)
  }
}
