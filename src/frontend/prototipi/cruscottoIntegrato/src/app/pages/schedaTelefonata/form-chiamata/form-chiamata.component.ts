import { Component, NgModule, NgZone, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { FormChiamataModel } from './form-chiamata.model';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { AutoCompleteModule } from 'primeng/primeng';

import { RicercaTipologieService } from ".././ricerca-tipologie/ricerca-tipologie.service";
import { TipologiaIntervento } from ".././ricerca-tipologie/tipologia-intervento.model";


@Component({
  selector: 'app-form-chiamata',
  templateUrl: './form-chiamata.component.html',
  styleUrls: ['./form-chiamata.component.css']
})
export class FormChiamataComponent implements OnInit {
  risultati: TipologiaIntervento[];

  //------- Maps ------//
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  //------- End Maps ------//

  @Input() formChiamataModel: FormChiamataModel;

  myForm: FormGroup;
  formRagSoc: FormGroup;

  model: number[] = [];
  /**
   * opzioni per la multiselect del tag
   */
  myOptions: IMultiSelectOption[] = [
    { id: 1, name: 'tag 1 lungo' },
    { id: 2, name: 'tag 2 lungo' },
    { id: 3, name: 'tag 3 lungo' },
    { id: 4, name: 'tag 4' },
    { id: 5, name: 'tag 5' },
    { id: 6, name: 'tag 6' },
  ];

  myTexts: IMultiSelectTexts = {
    checkAll: 'Seleziona tutti',
    uncheckAll: 'Deseleziona tutti',
    checked: 'Selezionato',
    checkedPlural: 'Selezionati',
    searchPlaceholder: 'Cerca...',
    defaultTitle: 'Seleziona tag',
    allSelected: 'Tutti selezionati',
  };

  mySettings: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-secondary btn-block',
    itemClasses: '',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: true,
    showUncheckAll: true,
    // fixedTitle: false,
    dynamicTitleMaxItems: 2,
    maxHeight: '300px',
  };
  //------- End multiselect ------//

  constructor( @Inject(FormBuilder) private fb: FormBuilder, private fb2: FormBuilder, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private _ricercaTipologieService: RicercaTipologieService, ) {
    this.formChiamataModel = new FormChiamataModel();
    this.formChiamataModel.numero_chiamata = "123.4567.890";
    this.formChiamataModel.operatore = "Mario Rossi";
    this.formChiamataModel.scheda_contatto = "123.456.789";
    // this.formChiamataModel.nome = "primo";

  }

  ngOnInit() {
    console.log("ngoninit!");
    this.myForm = this.fb.group({
      //'nome': [this.formChiamataModel.nome],
      //'cognome': [this.formChiamataModel.cognome, Validators.compose([Validators.required, this.validaCognome])],
      'tipo_interv': [this.formChiamataModel.tipo_interv],
      'indirizzo': [this.searchControl],
      'optionsModel': [this.model], // Default model
      'formRagSoc': this.formRagSoc,
      //'ragione_sociale': [this.formChiamataModel.ragione_sociale],
      'telefono': [this.formChiamataModel.telefono],
      'zona_emergenza': [this.formChiamataModel.zona_emergenza],
      'tag': [this.formChiamataModel.tag],
      'motivazione': [this.formChiamataModel.motivazione],
      'note_indirizzo': [this.formChiamataModel.note_indirizzo],
      'note_pubbliche': [this.formChiamataModel.note_pubbliche],
      'note_private': [this.formChiamataModel.note_private]

      //,
      //     'cognome': [this.formChiamataModel.cognome, Validators.required],
      //     'indirizzo': [this.formChiamataModel.indirizzo, Validators.compose([Validators.required])],
      //   'motivazione': [this.formChiamataModel.motivazione, Validators.required]
    });

    /**
     * multiselect per il campo tag
     */
    this.myForm.controls['optionsModel'].valueChanges
      .subscribe((selectedOptions) => {
        // changes
        console.log("valore multiselect cambiato ! " + this.myForm.controls['optionsModel'].value);
      });

    /**
     * il validatore multi campo agisce a livello di gruppo.
     */
    this.formRagSoc = this.fb2.group({
      'nome': [this.formChiamataModel.nome],
      'cognome': [this.formChiamataModel.cognome],
      'ragione_sociale': [this.formChiamataModel.ragione_sociale],
      //'telefono': [this.formChiamataModel.telefono]
    }, { validator: this.validaRichiedente.bind(this) });


    //  console.log("fine init nome vale "+this.formChiamataModel.nome);
    console.log('myForm status ' + this.myForm.status);
    console.log('formRagSoc status ' + this.formRagSoc.status);

    //-------------settaggi iniziali di maps onInit----------------------------//

    //set google maps defaults
    this.zoom = 18;
    this.latitude = 41.9005719;
    this.longitude = 12.499365500000067;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          console.log(this.latitude+" "+this.longitude);
        });
      });
    });
     //-------------end settaggi iniziali di maps onInit----------------------------//
  }
  /**
   * Valorizza l'array tipologie per il componente PrimeNG (Autocomplete) filtrato per chiave di ricerca.
   * @param event 
   */
  searchTipologia(event) {
    console.log("ricerca "+event.query);
    this.risultati = this._ricercaTipologieService.search(event.query);
    console.log("lunghezza "+this.risultati.length);

    this.risultati.forEach(a => {
      console.log(a.descrizione);
      
    })

  }

  /**
   * Setta la posizione geografica corrente e il livello di zoom iniziale nella mappa.
   */
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 18;
      });
    }
  }

  get formValido(): boolean {
    return this.formRagSoc.valid;
  }

  validaRichiedente(group: FormGroup): { [s: string]: boolean } {
    // var val_telefono = group.controls['telefono'].value;
    var val_nome = group.controls['nome'].value;
    var val_cognome = group.controls['cognome'].value;
    var val_ragione_sociale = group.controls['ragione_sociale'].value;
    /*
      console.log("telfono "+val_telefono);
      console.log("nome "+val_nome);
      console.log("cognome "+val_cognome);
      console.log("val_ragione_sociale "+val_ragione_sociale);
 
      if (val_telefono || val_nome) 
           console.log("eccomi !");
 */
    /*
         var valido = (val_nome !== "pippo");
         console.log("valida richiedetente è NON valido ?"+valido);
    */
    if (val_nome || val_cognome || val_ragione_sociale)
      return { campoVuoto: true };
  }

  /*
  validaCognome(control: FormGroup): { [s: string]: boolean } {
    //    console.log(control.status);
    if (control.value != "AAAA") {
      return { nonAAAA: true };
    }
  }
  */

  onClickCC() {
    this.formChiamataModel.ragione_sociale = "Carabinieri";
    console.log("onClickCC !!");
    this.formRagSoc.controls['ragione_sociale'].setValue("Carabinieri");
  }
  onClickPS() {
    this.formChiamataModel.ragione_sociale = "Polizia di Stato";
    this.formRagSoc.controls['ragione_sociale'].setValue("Polizia di Stato");
    console.log("onClickPS !!");

  }
  onClickSSU() {
    this.formChiamataModel.ragione_sociale = "Servizio Sanitario Urgenze";
    this.formRagSoc.controls['ragione_sociale'].setValue("Servizio Sanitario Urgenze");
    console.log("onClickSSU !!");
  }
  onClickPM() {
    this.formChiamataModel.ragione_sociale = "Polizia Municipale";
    this.formRagSoc.controls['ragione_sociale'].setValue("Polizia Municipale");
    console.log("onClickPM !!");
  }

  onClickAnnulla() {
    this.myForm.reset();
    this.formRagSoc.reset();
  }

  onSubmit(value: any): void {
    console.log("nome ", value.nome);
    console.log("cognome ", value.cognome);
    console.log("ragione_sociale ", value.ragione_sociale);
    console.log("tipo ", this.myForm.controls.tipo_interv.value);
    console.log("indirizzo value ", this.myForm.controls.indirizzo.value);
    console.log("telefono ", this.myForm.controls.telefono.value);
    console.log("zona_emergenza ", this.myForm.controls.zona_emergenza.value);
    console.log("ciao! " + this.myForm.controls['optionsModel'].value);
    console.log("motivazione ", this.myForm.controls.motivazione.value);
    console.log("note_indirizzo ", this.myForm.controls.note_indirizzo.value);
    console.log("note_pubbliche ", this.myForm.controls.note_pubbliche.value);
    console.log("note_private ", this.myForm.controls.note_private.value);

    // let formChiamataModel = new FormChiamataModel();

  }
}