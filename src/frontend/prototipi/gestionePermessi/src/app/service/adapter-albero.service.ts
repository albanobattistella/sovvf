import { Injectable } from '@angular/core';
import { UnitaOperativa } from "../model/unita-operativa.model";
import { TreeNode } from "primeng/primeng";

/**
 * Questo servizio converte la rappresentazione di modello di un'unità operativa
 * in un'istanza di albero così come richiesta da primeng
 */
@Injectable()
export class AdapterAlberoService {

  constructor() { }

  public converti(uo: UnitaOperativa): TreeNode {
       
       let treeNode: TreeNode = {
            label: uo.tooltip,
            data: uo.descrizione,
            type: uo.id,
            // collapsedIcon: "fa-plus-square-o",
            // expandedIcon:"fa fa-minus-square-o",
            icon: "fa-fire-extinguisher",
            //leaf => boolean - Specifies if the node has children. Used in lazy loading.
            children: uo.figli.map(figlio => this.converti(figlio))
       };
        return treeNode;
  }

}
