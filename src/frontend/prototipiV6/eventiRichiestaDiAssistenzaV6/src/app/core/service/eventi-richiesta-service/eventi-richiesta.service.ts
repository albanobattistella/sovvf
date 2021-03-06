import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventoRichiesta } from '../../../eventi/eventi-model/evento-richiesta.model';
import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl.eventiRichieste;

@Injectable({
    providedIn: 'root'
})
export class EventiRichiestaService {

    constructor(private http: HttpClient) {
    }

    getEventiRichiesta(): Observable<EventoRichiesta[]> {
        return this.http.get<EventoRichiesta[]>(API_URL).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Si è verificato un errore:', error.error.message);
        } else {
            console.error(
                `Errore response: ${error.status}, ` +
                `Messaggio body: ${error.error.message}`);
        }
        return throwError(
            'Qualcosa è andato storto, per favore riprova più tardi.');
    }

}
