import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Observable } from 'rxjs';

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