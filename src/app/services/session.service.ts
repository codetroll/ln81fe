import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SessionService extends BaseService {
    user: User;
    isAdmin: boolean = false;
    groups: string[];

    constructor(protected router: Router, protected httpClient: HttpClient) {
        super(router, httpClient);
    }

    setUser(user: User): void { this.user = user; }
    getUser(): User { return this.user; }
    getUserName(): string {
        console.log('Username : ', this.user.name);
        return (this.user.name) ? this.user.name : '';
    }

    setIsAdmin(isAdmin: boolean): void { this.isAdmin = isAdmin; }
    getIsAdmin(): boolean { 
        this.isAdmin = this.groups.includes('admin') || this.groups.includes('subadmin') || this.groups.includes('trold');
        return this.isAdmin; 
    }

    setGroups(groups: string[]): void { 
        this.groups = groups;
        this.isAdmin = this.groups.includes('admin') || this.groups.includes('subadmin') || this.groups.includes('trold');
    }
    getGroups(): string[] { return this.groups; }

    clearSession(): void {
        this.user = new User();
        this.isAdmin = false;
        this.groups = [];
    }
}
