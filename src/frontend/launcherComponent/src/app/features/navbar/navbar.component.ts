import { Component, OnInit, EventEmitter, Output, isDevMode, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { TurnoService } from './navbar-service/turno-service/turno.service';
import { ClockService } from './navbar-service/clock-service/clock.service';
import { UserService } from '../../core/auth/_services';
import { Turno } from './turno/turno.model';
import { User } from '../../core/auth/_models';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    @Output() openedSidebar = new EventEmitter<any>();
    subscription = new Subscription();
    turno: Turno;
    time: Date;
    user: User[] = [];

    constructor(private _turno: TurnoService,
                private _clock: ClockService,
                private _user: UserService) {
        this.subscription.add(this._turno.getTurni().subscribe(res => this.turno = res));
        this.subscription.add(this._clock.getClock().subscribe(time => this.time = time));
        this.subscription.add(this._user.getAll().pipe(first()).subscribe(users => this.user = users));
    }

    ngOnInit() {
        isDevMode() && console.log('Componente Navbar creato');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        isDevMode() && console.log('Componente Navbar distrutto');
    }

    openSidebar() {
        this.openedSidebar.emit();
    }

}