import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Post {
	id: number;
	title: string;
}
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
		// this.getPostsByHttp().subscribe((data) => {
		// 	this.people = data.map((row: any) => {
		// 		return { value: row.id, name: row.title };
		// 	});
		// 	this.peopleLoading = false;
		// });
		this.getPostsWithRxjs().subscribe((posts) => {
			this.people = posts;
			this.peopleLoading = false;
		});
	}

	getPostsWithRxjs(): Observable<any[]> {
		return this.http
			.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
			.pipe(
				map((posts) => {
					return posts.map((post) => {
						return { value: post.id, name: post.title };
					});
				})
			);
	}

	getPostsByHttp = () => {
		return this.http.get<Post[]>(
			'https://jsonplaceholder.typicode.com/posts',
			{
				// headers: headers,
			}
		);
	};
	constructor(private http: HttpClient) {}
}
