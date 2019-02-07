import { Action, Selector, State, StateContext } from '@ngxs/store';

// Model
import { VoceFiltro } from '../../voce-filtro.model';

// Action
import { GetFiltriRichieste, SetFiltroSelezionato, ResetFiltriSelezionati } from '../actions/filtri-richieste.actions';

// Tipologie
import { APP_TIPOLOGIE } from 'src/app/core/settings/tipologie';


export interface FiltriRichiesteStateModel {
  filtriRichieste: VoceFiltro[];
}

export const filtriRichiesteStateDefaults: FiltriRichiesteStateModel = {
  filtriRichieste: []
};

@State<FiltriRichiesteStateModel>({
  name: 'filtriRichieste',
  defaults: filtriRichiesteStateDefaults
})
export class FiltriRichiesteState {

  constructor() { }

  // SELECTORS
  @Selector()
  static filtriTipologie(state: FiltriRichiesteStateModel) {
    return state.filtriRichieste;
  }

  @Selector()
  static filtriSelezionati(state: FiltriRichiesteStateModel) {
    return state.filtriRichieste.filter(f => f.selezionato === true);
  }

  // GET
  @Action(GetFiltriRichieste)
  getFiltriRichieste({ getState, patchState }: StateContext<FiltriRichiesteStateModel>) {
    const state = getState();

    const filtriTipologie: VoceFiltro[] = [];
    const filtriStatici: VoceFiltro[] = [
      new VoceFiltro('1', 'Presidiato', 'Presidiato', true),
      new VoceFiltro('2', 'Presidiato', 'Non Presidiato', true),
      new VoceFiltro('3', 'Rilevante', 'Rilevante', true),
      new VoceFiltro('4', 'Rilevante', 'Non Rilevante', true)
    ];
    filtriTipologie.push(...filtriStatici);
    APP_TIPOLOGIE.forEach(tipologie => {
      filtriTipologie.push(new VoceFiltro('' + tipologie.codice, tipologie.categoria, tipologie.descrizione, tipologie.star));
    });

    patchState({
      ...state,
      filtriRichieste: filtriTipologie
    });
  }

  // SET FILTRO SELEZIONATO (SELEZIONATO, NON-SELEZIONATO)
  @Action(SetFiltroSelezionato)
  setFiltroSelezionato({ getState, patchState }: StateContext<FiltriRichiesteStateModel>, action: SetFiltroSelezionato) {
    const state = getState();

    const filtriRichieste = copyObj(state.filtriRichieste);
    const filtro = copyObj(action.filtro);

    patchState({
      ...state,
      filtriRichieste: setFiltroSelezionato(filtriRichieste, filtro)
    });
  }

  // RESET FILTRI SELEZIONATI
  @Action(ResetFiltriSelezionati)
  resetFiltriSelezionati({ getState, patchState }: StateContext<FiltriRichiesteStateModel>) {
    const state = getState();

    const filtriRichieste = copyObj(state.filtriRichieste);

    patchState({
      ...state,
      filtriRichieste: resetFiltriSelezionati(filtriRichieste)
    });
  }
}

export function setFiltroSelezionato(filtriRichieste: VoceFiltro[], filtro: VoceFiltro) {
  filtriRichieste.forEach((fR: VoceFiltro, index: any) => {
    if (fR.codice === filtro.codice) {
      filtro = toggleFiltro(filtro);
      filtriRichieste[index] = filtro;
    }
  });

  return filtriRichieste;
}

export function addFiltroSelezionato(filtriSelezionati: VoceFiltro[], filtro: VoceFiltro) {
  toggleFiltro(filtro);
  filtriSelezionati.push(filtro);

  return filtriSelezionati;
}

export function removeFiltroSelezionato(filtriSelezionati: VoceFiltro[], filtro: VoceFiltro) {
  filtriSelezionati.forEach((fS: VoceFiltro, index: any) => {
    if (fS.codice === filtro.codice) {
      filtriSelezionati.splice(index, 1);
    }
  });

  return filtriSelezionati;
}

export function toggleFiltro(filtro: VoceFiltro) {
  filtro.selezionato = !filtro.selezionato;

  return filtro;
}

export function resetFiltriSelezionati(filtriRichieste: VoceFiltro[]) {
  filtriRichieste.forEach((fR: VoceFiltro) => {
    fR.selezionato = false;
  });
  const newFiltriRichieste = filtriRichieste;

  return newFiltriRichieste;
}

export function copyObj(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}