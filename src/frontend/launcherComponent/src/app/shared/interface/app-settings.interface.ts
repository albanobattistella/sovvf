import { TipologieInterface } from '../../core/settings/tipologie';
import { ListaSedi } from './lista-sedi';

export interface AppSettings {
    tipologie: TipologieInterface[];
    listaSedi: ListaSedi;
}
