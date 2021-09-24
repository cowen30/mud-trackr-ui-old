import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BrandService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getBrands() {
		return this.http.get<any>(`${this.baseUrl}/brands`);
	}

	getBrandById(id: string) {
		return this.http.get<any>(`${this.baseUrl}/brands/${id}`)
	}

}
