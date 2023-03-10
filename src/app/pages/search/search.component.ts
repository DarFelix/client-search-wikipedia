import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  inputSearch = new FormControl('');

  @Output() submitted = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void{
    this.inputSearch.valueChanges
    .pipe(
      map(search => search!.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      filter((search:string)=> search !== ''),
      tap((search:string) => this.submitted.emit(search))
    )
    .subscribe();

    /*
      this.inputSearch.valueChanges
    .pipe(
      tap(res => this.submitted.emit(res!))
    )
    .subscribe();
    */
  }
}
