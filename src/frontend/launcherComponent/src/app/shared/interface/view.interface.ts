import { AppFeatures } from '../enum/app-features.enum';
import { Grid } from '../enum/layout.enum';

export interface ViewLayout {
    active: boolean;
    split?: boolean;
    options?: any[];
}

export interface ViewLayouts {
    richieste: ViewLayout;
    mappa: ViewLayout;
    chiamata: ViewLayout;
    composizione: ViewLayout;
    filterbar: ViewLayout;
}

export interface Grids {
    destra: Grid;
    sinistra: Grid;
}

export interface ViewComponentStateModel {
    view: ViewLayouts;
    column: Grids;
}

export interface ViewInterfaceMaps {
    active?: AppFeatures;
}

export interface ViewInterfaceButton {
    chiamata?: string;
    buttonView?: string[];
}
