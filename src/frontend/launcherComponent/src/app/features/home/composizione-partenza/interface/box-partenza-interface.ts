import { MezzoComposizione } from './mezzo-composizione-interface';
import { SquadraComposizione } from './squadra-composizione-interface';

export interface BoxPartenza {
    id: string;
    mezzoComposizione?: MezzoComposizione;
    squadraComposizione: SquadraComposizione[];
    selezionato: boolean;
    hover: boolean;
}
