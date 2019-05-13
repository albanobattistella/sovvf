﻿//-----------------------------------------------------------------------
// <copyright file="MapperListaRichiesteSuListaSintesiRichieste.cs" company="CNVVF">
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
using SO115App.API.Models.Classi.Marker;
using SO115App.API.Models.Classi.Soccorso;
using SO115App.API.Models.Classi.Soccorso.StatiRichiesta;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Shared.SintesiRichiestaAssistenza;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SO115App.API.Models.Servizi.CQRS.Mappers.RichiestaSuSintesi
{
    internal class MapperListaRichieste
    {
        public List<SintesiRichiesta> MapRichiesteSuSintesi(List<RichiestaAssistenza> ListaRichieste)
        {
            List<SintesiRichiesta> ListaSintesi = new List<SintesiRichiesta>();
            List<SintesiRichiesta> AppoListaSintesiChiamate = new List<SintesiRichiesta>();
            List<SintesiRichiesta> AppoListaSintesiAltroStato = new List<SintesiRichiesta>();

            foreach (RichiestaAssistenza elemento in ListaRichieste)
            {
                SintesiRichiesta sintesi = new SintesiRichiesta();
                string statoRichiesta = DecodifcaStatoRichiesta(elemento.StatoRichiesta);

                sintesi.Codice = elemento.Codice;
                sintesi.CodiceSchedaNue = elemento.CodiceSchedaNue;
                sintesi.Competenze = elemento.Competenze;
                //sintesi.complessita = elemento.Richiesta.Complessita;
                sintesi.Descrizione = elemento.Descrizione;
                sintesi.Etichette = elemento.Tags.ToArray();
                sintesi.Eventi = elemento.Eventi.ToList();
                //sintesi.fonogramma = elemento.Richiesta.StatoInvioFonogramma;
                sintesi.Id = elemento.Id;
                sintesi.IstantePresaInCarico = elemento.IstantePresaInCarico;
                sintesi.IstantePrimaAssegnazione = elemento.IstantePrimaAssegnazione;

                sintesi.IstanteRicezioneRichiesta = sintesi.Eventi.Count > 0 ? elemento.IstanteRicezioneRichiesta : DateTime.MinValue;
                sintesi.Localita = elemento.Localita;
                sintesi.Operatore = elemento.Operatore;
                sintesi.Partenze = elemento.ListaPartenze;
                sintesi.Priorita = elemento.PrioritaRichiesta;
                sintesi.Richiedente = elemento.Richiedente;
                sintesi.Rilevanza = DateTime.Now;
                sintesi.Stato = Convert.ToInt16(statoRichiesta);
                sintesi.Tipologie = elemento.Tipologie;
                sintesi.ZoneEmergenza = elemento.ZoneEmergenza;

                if (statoRichiesta.Equals("Chiamata"))
                    AppoListaSintesiChiamate.Add(sintesi);
                else
                    AppoListaSintesiAltroStato.Add(sintesi);
            }

            //INIZIO - TUTTA QUESTA PARTE VA CANCELLATA DOPO IL FAKE
            foreach (SintesiRichiesta richiesta in AppoListaSintesiChiamate)
            {
                if (richiesta.Partenze.Count > 0)
                {
                    richiesta.Partenze.Clear();
                }
            }

            ListaSintesi.AddRange(AppoListaSintesiChiamate);
            ListaSintesi.AddRange(AppoListaSintesiAltroStato);
            //FINE

            return ListaSintesi;
        }

        public List<SintesiRichiestaMarker> MapRichiesteSuMarkerSintesi(List<RichiestaAssistenza> listaRichieste)
        {
            List<SintesiRichiestaMarker> ListaSintesi = new List<SintesiRichiestaMarker>();

            foreach (RichiestaAssistenza elemento in listaRichieste)
            {
                SintesiRichiestaMarker sintesi = new SintesiRichiestaMarker();
                string statoRichiesta = DecodifcaStatoRichiesta(elemento.StatoRichiesta);

                sintesi.Id = elemento.Id;
                sintesi.localita = elemento.Localita;
                sintesi.tipologia = elemento.Tipologie;
                sintesi.label = elemento.Descrizione;
                sintesi.priorita = elemento.PrioritaRichiesta;
                sintesi.stato = statoRichiesta;
                sintesi.rilevanza = DateTime.Now;

                ListaSintesi.Add(sintesi);
            }

            return ListaSintesi;
        }

        private string DecodifcaStatoRichiesta(IStatoRichiesta statoRichiesta)
        {
            switch (statoRichiesta.ToString())
            {
                case "Modello.Classi.Soccorso.StatiRichiesta.InAttesa":
                    return "Chiamata";

                case "Modello.Classi.Soccorso.StatiRichiesta.Assegnata":
                    return "Assegnata";

                case "Modello.Classi.Soccorso.StatiRichiesta.Chiusa":
                    return "Chiusa";

                case "Modello.Classi.Soccorso.StatiRichiesta.Sospesa":
                    return "Sospesa";

                default:
                    return "Chiusa";
            }
        }
    }
}