import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import '@ng-select/ng-select/themes/default.theme.css';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  selectedCity: any;
  people: any;
  peopleLoading = false;
  selectedPeople = [{ name: 'optio molestias id quia eum' }];
  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys' },
  ];

  ngOnInit() {
    this.selectedCity = this.defaultBindingsList[0];
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts', {
        // headers: headers,
      })
      .subscribe((data) => {
        this.people = data.map((row: any) => {
          return { value: row.id, name: row.title };
        });
        this.peopleLoading = false;
      });
  }

  constructor(private http: HttpClient) {}
}
