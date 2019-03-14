import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Localita } from 'src/app/shared/model/localita.model';
import { Coordinate } from 'src/app/shared/model/coordinate.model';
import { FormChiamataModel } from '../model/form-scheda-telefonata.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { TipologieInterface } from '../../../../core/settings/tipologie';
import { SchedaTelefonataInterface } from '../model/scheda-telefonata.interface';
import { ChiamataMarker } from '../../maps/maps-model/chiamata-marker.model';
import { makeCopy } from '../../../../shared/helper/function';
import { AzioneChiamataEnum } from '../../../../shared/enum/azione-chiamata.enum';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { ShowToastr } from '../../../../shared/store/actions/toastr/toastr.actions';

@Component({
    selector: 'app-scheda-telefonata',
    templateUrl: './scheda-telefonata.component.html',
    styleUrls: ['./scheda-telefonata.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SchedaTelefonataComponent implements OnInit {

    options = {
        componentRestrictions: {country: ['IT', 'FR', 'AT', 'CH', 'SI']}
    };
    chiamataCorrente: FormChiamataModel;
    chiamataMarker: ChiamataMarker;
    chiamataForm: FormGroup;
    coordinate: Coordinate;
    submitted = false;

    AzioneChiamata = AzioneChiamataEnum;

    @Input() tipologie: TipologieInterface[];
    @Input() idChiamata: string;
    @Input() idOperatore: string;
    @Output() schedaTelefonata = new EventEmitter<SchedaTelefonataInterface>();

    constructor(private formBuilder: FormBuilder,
                private store: Store) {
    }

    ngOnInit() {
        this.chiamataForm = this.createForm();
        this.chiamataCorrente = new FormChiamataModel(this.idChiamata, this.idOperatore);
    }


    createForm(): FormGroup {
        return this.formBuilder.group({
            // dettaglioTipologia: ['', [Validators.required]],
            tipoIntervento: [],
            cognome: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            ragioneSociale: ['', [Validators.required]],
            telefono: ['', [Validators.required]],
            indirizzo: ['', [Validators.required]],
            zonaEmergenza: [],
            tags: [],
            motivazione: [''],
            noteIndirizzo: [''],
            notePubbliche: [''],
            notePrivate: ['']
        });
    }

    get f() {
        return this.chiamataForm.controls;
    }

    onAddTipologia(tipologia: TipologieInterface) {
        this.chiamataCorrente.idTipoIntervento.push(tipologia.codice);
    }

    onRemoveTipologia(tipologia: TipologieInterface) {
        this.chiamataCorrente.idTipoIntervento.splice(this.chiamataCorrente.idTipoIntervento.indexOf(tipologia.codice), 1);
    }

    insertRagioneSociale(RS) {
        this.f.ragioneSociale.setValue(RS);
    }

    onAnnullaChiamata(): void {
        this.chiamataCorrente = null;
        this.chiamataForm.reset();
        this._statoChiamata('annullata');
    }

    onResetChiamata(): void {
        this.submitted = false;
        this.chiamataForm.reset();
        this.chiamataCorrente.idTipoIntervento = [];
        this.chiamataForm.get('tipoIntervento').patchValue([]);
        this._statoChiamata('reset');
    }

    onCopiaIndirizzo(): void {
        this._statoChiamata('copiaIndirizzo');
    }

    onCercaIndirizzo(result: Address): void {
        this.coordinate = new Coordinate(result.geometry.location.lat(), result.geometry.location.lng());
        this.chiamataMarker = new ChiamataMarker(this.idChiamata,
            new Localita(this.coordinate, result.formatted_address)
        );
        this._statoChiamata('cerca');
    }

    getChiamataForm(f: FormGroup): void {
        this.chiamataCorrente.cognome = f.get('cognome').value;
        this.chiamataCorrente.nome = f.get('nome').value;
        this.chiamataCorrente.ragioneSociale = f.get('ragioneSociale').value;
        if (f.get('zonaEmergenza').value) {
            this.chiamataCorrente.zonaEmergenza = f.get('zonaEmergenza').value.toString().split(/\s*(?:;|$)\s*/);
        }
        if (f.get('tags').value) {
            this.chiamataCorrente.tags = f.get('tags').value.toString().split(/\s*(?:;|$)\s*/);
        }
        this.chiamataCorrente.nome = f.get('nome').value;
        this.chiamataCorrente.motivazione = f.get('motivazione').value;
        if (this.coordinate) {
            const marker: ChiamataMarker = makeCopy(this.chiamataMarker);
            if (marker.localita) {
                marker.localita.note = f.get('noteIndirizzo').value;
                this.chiamataCorrente.localita = marker.localita;
            }
        }
        this.chiamataCorrente.noteIndirizzo = f.get('noteIndirizzo').value;
        this.chiamataCorrente.notePubbliche = f.get('notePubbliche').value;
        this.chiamataCorrente.notePrivate = f.get('notePrivate').value;
    }

    onSubmit() {
        this.submitted = true;
        if (this.formIsValid() || !this.coordinate) {
            console.error('Il form non è valido');
            this.submitted = false;
            return;
        }
        this.getChiamataForm(this.chiamataForm);
        this._statoChiamata('inserita');
    }

    formIsValid(): boolean {
        let error = '';
        error += this.chiamataForm.get('cognome').errors ? 'Cognome;' : '';
        error += this.chiamataForm.get('nome').errors ? 'Nome;' : '';
        error += this.chiamataForm.get('ragioneSociale').errors ? 'Ragione Sociale;' : '';
        error += this.chiamataForm.get('telefono').errors ? 'Telefono;' : '';
        error += this.chiamataForm.get('indirizzo').errors ? 'Indirizzo;' : '';
        const messageArr: string[] = error.split(/\s*(?:;|$)\s*/);
        let message = messageArr.join(', ');
        const title = messageArr.length > 1 ? 'Campi obbligatori:' : 'Campo obbligatorio:';
        if (messageArr.length > 0) {
            message = message.substring(0, message.length - 2);
            const type = 'error';
            this.store.dispatch(new ShowToastr(type, title, message, 5000));
        }
        return !!this.chiamataForm.invalid;
    }

    impostaAzioneChiamata($event) {
        this.chiamataCorrente.azione = $event;
        this.onSubmit();
    }

    inviaPartenza() {
        this.chiamataCorrente.azione = AzioneChiamataEnum.MettiInCoda;
        this.onSubmit();
        console.log('Inizio composizione Partenza');
    }


    _statoChiamata(tipo: string) {
        this.schedaTelefonata.emit({
            tipo: tipo,
            formChiamata: this.chiamataCorrente,
            markerChiamata: this.chiamataMarker
        });
    }

}
