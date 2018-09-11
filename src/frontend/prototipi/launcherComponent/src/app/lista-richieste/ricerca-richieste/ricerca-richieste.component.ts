import { Component, OnInit, Input } from '@angular/core';
import { FiltriService } from '../lista-richieste-service/filtri-service/filtri-service.service';
import { SintesiRichiesta } from '../../shared/model/sintesi-richiesta.model';
import { VoceFiltro } from '../filtri-richieste/voce-filtro.model';

@Component({
  selector: 'app-ricerca-richieste',
  templateUrl: './ricerca-richieste.component.html',
  styleUrls: ['./ricerca-richieste.component.scss']
})
export class RicercaRichiesteComponent implements OnInit {
  filtri: VoceFiltro[];
  text: string;

  constructor(private filtriS: FiltriService) { }

  ngOnInit() {
    this.getFiltri();
  }

  getFiltri() {
    this.filtriS.getFiltri().subscribe((filtri: VoceFiltro[]) => {
      this.filtri = filtri;
    });
  }

  search() {
    let count = 0;
    const arrText = this.text.split(' ');
    arrText.forEach(word => {
      this.filtri.forEach(filtro => {
        /* CONTROLLO SE LA PAROLA SI TROVA NEI FILTRI (DA FARE INDEXOF)*/
        if (word.toLowerCase() === filtro.descrizione.toLowerCase()) {
          this.filtriS.filtroRicercaRilevato(filtro);
          count++;
        }
      });
    });

    console.log('Stringa di ricerca: ' + arrText);
    // console.log(count);
    console.log('Filtri applicati alla ricerca:');
    console.log(this.filtriS.filtriSelezionati);
  }
}