﻿
using System.Collections.Generic;
using System.Linq;
using System.Security;
using SO115App.API.Models.Servizi.CQRS.Queries;

namespace SO115App.API.Models.AOP.Validation
{
    public class SintesiRichiesteAssitenzaMarkerValidatingQueryHandlerDecorator<TQuery, TResult> : ISintesiRichiestaAssistenzaMarkerQueryHandler<TQuery, TResult> where TQuery : ISintesiRichiestaMarkerQuery<TResult>
    {
        private readonly ISintesiRichiestaAssistenzaMarkerQueryHandler<TQuery,TResult> decoratee;
        public SintesiRichiesteAssitenzaMarkerValidatingQueryHandlerDecorator(
            ISintesiRichiestaAssistenzaMarkerQueryHandler<TQuery,TResult> decoratee)
        {           
            this.decoratee = decoratee;
        }

        public TResult Handle(TQuery query)
        {
            this.Validate();

            return this.decoratee.Handle(query);
        }

        private void Validate()
        {
            //ESEMPIO - DA MODIFICARE CON LA LOGICA DI AUTORIZZAZIONE
            if (false)
            {
                //TODO AGGIUNGERE METODO PER VERIFICA AUTORIZZAZIONI SU DB

                throw new SecurityException();

            }else
            {

       
            }
        }


    }
}