import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tipologia } from '../../../../shared/model/tipologia.model';
import { Localita } from '../../../../shared/model/localita.model';
import { Coordinate } from '../../../../shared/model/coordinate.model';
import { RichiestaMarker } from '../../../../features/home/maps/maps-model/richiesta-marker.model';
import * as moment from 'moment';
import { StatoRichiesta } from '../../../../shared/enum/stato-richiesta.enum';
import { Store } from '@ngxs/store';
import { SetRichiesteMarkers } from '../../../../features/home/store/actions/maps/richieste-markers.actions';

@Injectable()
export class RichiesteMarkerServiceFake {

    private richiesteMarkers: RichiestaMarker[] = [];

    constructor(private store: Store) {
    }

    public getRichiesteMarkers(): Observable<RichiestaMarker[]> {
        this.richiesteMarkers = [
            new RichiestaMarker(
                '1',
                'RM-022',
                null,
                new Localita(
                    new Coordinate(41.8624992, 12.5532867),
                    'Via Scribonio Curione, 22', 'nei pressi dell\'uscita della metro'
                ),
                [
                    new Tipologia('2', 'Incendio ed esplosione', 'fa fa-fire')
                ],
                'Esplosione nei pressi di un centro abitato',
                5,
                StatoRichiesta.Chiamata,
                moment().subtract(0, 'minutes').toDate()
            ),
            new RichiestaMarker(
                '2',
                'RM-021',
                null,
                new Localita(
                    new Coordinate(41.9161894, 12.4554147), 'Viale Giuseppe Mazzini, 159', 'nelle vicinanze di un ristorante'),
                [
                    new Tipologia('360', 'Messa in sicurezza impianti tecnologici di servizio (acqua, energia elettrica, gas)', '')
                ],
                'Scintille da palo elettrico',
                1,
                StatoRichiesta.Chiamata
            ),
            new RichiestaMarker(
                '3',
                'RM-020',
                null,
                new Localita(new Coordinate(41.8654843, 12.5805044), 'Viale dei Romanisti, 40', 'vicino ai secchi dell\'immondizia'),
                [
                    new Tipologia('2', 'Incendio ed esplosione', 'fa fa-fire')
                ],
                'Incendio a bordo strada',
                1,
                StatoRichiesta.Chiamata
            ),
            new RichiestaMarker(
                '4',
                'RM-019',
                'RM-12842',
                new Localita(
                    new Coordinate(41.8311007, 12.4683518), 'Viale Europa, 184', 'dal palazzo delle Poste Italiane'),
                [
                    new Tipologia('360', 'Salvataggio persone', '')
                ],
                'Persona che minaccia di buttarsi da un tetto',
                4,
                StatoRichiesta.Assegnata,
                moment().subtract(35, 'minutes').toDate()
            ),
            new RichiestaMarker(
                '5',
                'RM-018',
                'RM-12841',
                new Localita(
                    new Coordinate(41.82699, 12.4874854), 'Via Simone Martini, 125', 'persone all\'interno del garage'),
                [
                    new Tipologia('2', 'Danni d\'acqua in genere', 'fa fa-tint')
                ],
                'Allagamento garage con personale da soccorrere',
                3,
                StatoRichiesta.Assegnata
            ),
            new RichiestaMarker(
                '6',
                'RM-017',
                'RM-12840',
                new Localita(
                    new Coordinate(41.8549993, 12.5688578), 'Via Tuscolana, 1500', 'automobile ribaltata, persona anziana'),
                [
                    new Tipologia('2', 'Incidente stradale generico', 'fa fa-car')
                ],
                'Incidente d\'auto persona anziana',
                3,
                StatoRichiesta.Assegnata
            ),

            new RichiestaMarker(
                '7',
                'RM-016',
                'RM-12839',
                new Localita(
                    new Coordinate(41.8932662, 12.5417044), 'Via di Portonaccio', 'incrocio con Via Prenestina'),
                [
                    new Tipologia('360', 'Cedimento sede stradale', '')
                ],
                'Cedimento sede stradale con rimozione veicolo',
                2,
                StatoRichiesta.Presidiata
            ),
            new RichiestaMarker(
                '8',
                'RM-015',
                'RM-12838',
                new Localita(
                    new Coordinate(41.9125723, 12.4952921), 'Via Isonzo, 21', 'beni alimentari di vario tipo'),
                [
                    new Tipologia('360', 'Recupero merci e beni', '')
                ],
                'Recupero merci e beni da camion ribaltato',
                2,
                StatoRichiesta.Sospesa
            ),
            new RichiestaMarker(
                '9',
                'RM-014',
                'RM-12837',
                new Localita(
                    new Coordinate(41.856683, 12.471484), 'Viale Guglielmo Marconi, 21', 'Presidio e aiuto alla popolazione'),
                [
                    new Tipologia('360', 'Terremoto', '')
                ],
                'Scossa di terremoto a Roma',
                3,
                StatoRichiesta.Sospesa
            ),
            new RichiestaMarker(
                '10',
                'RM-012',
                'RM-12836',
                new Localita(
                    new Coordinate(41.9113629, 12.4652858), 'Viale Giulio Cesare, 21', 'Intervento per spegnimento incendio e salvataggio inquilini'),
                [
                    new Tipologia('360', 'Incendio', 'fa fa-fire')
                ],
                'Incendio in appartamento',
                3,
                StatoRichiesta.Chiusa
            ),
            new RichiestaMarker(
                '11',
                'RM-010',
                'RM-12835',
                new Localita(
                    new Coordinate(41.870025, 12.4647536), 'Piazzale della radio, 21', 'Intervento per estrarre persone dalle lamiere di una automobile'),
                [
                    new Tipologia('360', 'Incidente', 'fa fa-car')
                ],
                'Incidente stradale',
                3,
                StatoRichiesta.Chiusa
            ),
        ];

        this.store.dispatch(new SetRichiesteMarkers(this.richiesteMarkers));

        return of();
    }
}
