import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient) { }

    /**
     * 
     * @returns 
     */
    getAll(): Observable<User[]>{

        return this.http.get<User[]>(`${environment.apiUrl}/users`);

    }

     /**
     * 
     * @param id 
     * @returns 
     */
      getById(id: number) {

        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
        
    }
}