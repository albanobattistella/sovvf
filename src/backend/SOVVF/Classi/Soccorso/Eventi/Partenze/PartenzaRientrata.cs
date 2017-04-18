﻿//-----------------------------------------------------------------------
// <copyright file="PartenzaRientrata.cs" company="CNVVF">
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
using System;
using Modello.Classi.Soccorso.Mezzi.StatiMezzo;

namespace Modello.Classi.Soccorso.Eventi.Partenze
{
    /// <summary>
    ///   Modella il rientro in sede di una <see cref="ComposizionePartenze" />.
    /// </summary>
    /// <remarks>
    ///   Il rientro in sede consiste per esempio nel varcare il cancello di entrata del Comando Provinciale
    /// </remarks>
    public class PartenzaRientrata : Evento, IPartenza
    {
        /// <summary>
        ///   E' l'identificativo del mezzo da cui è arrivato l'evento
        /// </summary>
        public string CodiceMezzo { get; set; }

        /// <summary>
        ///   Restituisce i codici dei mezzi coinvolti in questo evento
        /// </summary>
        string[] IPartenza.CodiciMezzo
        {
            get
            {
                return new string[] { this.CodiceMezzo };
            }
        }

        /// <summary>
        ///   Restituisce lo stato che il mezzo assume a seguito del verifiarsi dell'evento
        /// </summary>
        /// <returns>Lo stato del mezzo</returns>
        IStatoMezzo IPartenza.GetStatoMezzo()
        {
            return new InSede();
        }
    }
}
