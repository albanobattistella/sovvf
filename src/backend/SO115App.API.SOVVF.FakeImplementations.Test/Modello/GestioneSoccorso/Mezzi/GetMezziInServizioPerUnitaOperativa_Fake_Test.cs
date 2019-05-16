//-----------------------------------------------------------------------
// <copyright file="GetMezziInServizioPerUnitaOperativa_Fake_Test.cs" company="CNVVF">
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
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using SO115App.API.SOVVF.FakeImplementations.Modello.GestioneSoccorso.Mezzi;

namespace SO115App.API.SOVVF.FakeImplementations.Test.Modello.GestioneSoccorso.Mezzi
{
    public class GetMezziInServizioPerUnitaOperativa_Fake_Test
    {
        [Test]
        public void TraIMezziCheNonSonoDelComandCiEUnaEdUnaSolaAps()
        {
            var generatore = new GetMezziInServizioPerUnitaOperativa_Fake();

            var mezzi = generatore.Get("RM.1001");

            var numeroAPS = mezzi.Count(m => m.Genere == "APS");

            Assert.That(numeroAPS, Is.EqualTo(1));
        }

        [Test]
        public void TraIMezziDelComandoCiEAlmenoUnaApsUnaEdUnaSolaAbEUnaEdUnaSolaAs()
        {
            var generatore = new GetMezziInServizioPerUnitaOperativa_Fake();

            var mezzi = generatore.Get("RM.1000");

            var numeroAPS = mezzi.Count(m => m.Genere == "APS");
            var numeroAB = mezzi.Count(m => m.Genere == "AB");
            var numeroAS = mezzi.Count(m => m.Genere == "AS");

            Assert.Multiple(() =>
            {
                Assert.That(numeroAPS, Is.GreaterThanOrEqualTo(1));
                Assert.That(numeroAB, Is.EqualTo(1));
                Assert.That(numeroAS, Is.EqualTo(1));
            });
        }
    }
}
