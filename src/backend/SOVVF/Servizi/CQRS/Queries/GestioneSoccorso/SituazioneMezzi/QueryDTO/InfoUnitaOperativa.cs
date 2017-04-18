﻿//-----------------------------------------------------------------------
// <copyright file="InfoUnitaOperativa.cs" company="CNVVF">
// Copyright (C) 2017 - CNVVF
//
// This file is part of SOVVF.
// SOVVF is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// SOVVF is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
namespace Modello.Servizi.CQRS.Queries.GestioneSoccorso.SituazioneMezzi.QueryDTO
{
    /// <summary>
    ///   Indica un nodo dell'organigramma e la necessità o meno di considerare anche tutti i nodi figli
    /// </summary>
    public class InfoUnitaOperativa
    {
        /// <summary>
        ///   E' il codice dell'unità operativa
        /// </summary>
        public string Codice { get; set; }

        /// <summary>
        ///   Indica se va considerato l'intero sottoalbero del nodo
        /// </summary>
        public bool Ricorsivo { get; set; }

        /// <summary>
        ///   Per la classe, un Nodo è uguale ad un altro Nodo se hanno lo stesso codice unità operativa
        /// </summary>
        /// <param name="obj">Oggetto da confrontare</param>
        /// <returns>true se il nodo passato è uguale</returns>
        public override bool Equals(object obj)
        {
            if (!(obj is InfoUnitaOperativa))
            {
                return false;
            }

            var n = (InfoUnitaOperativa)obj;
            return n.Codice.Equals(this.Codice);
        }

        /// <summary>
        ///   Restituisce l'hascode del codice unità operativa
        /// </summary>
        /// <returns>Hashcode dell'istanza</returns>
        public override int GetHashCode()
        {
            return this.Codice.GetHashCode();
        }
    }
}
