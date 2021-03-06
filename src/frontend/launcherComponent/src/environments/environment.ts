export const environment = {
    production: false,
    fakeProvider: true,
    signalRHub: '/NotificationHub',
    signalR: false,
    apiUrl: {
        home: '/api/Welcome',
        appSettings: 'assets/json/app-settings.json',
        boxes: {
            personale: '/api/BoxPersonale',
            mezzi: '/api/BoxMezzi',
            richieste: '/api/BoxRichieste',
            meteo: {
                url: 'http://api.openweathermap.org/data/2.5/weather?',
                option: {
                    lang: 'it',
                    key: 'a23cc450dabf63fdb6729696aa29b3a6',
                    unit: 'metric'
                }
            }
        },
        maps: {
            markers: {
                richieste: '/api/SintesiRichiesteAssistenzaMarker',
                sedi: '/api/SintesiSediMarker',
                mezzi: '/api/SintesiMezziMarker',
                centro: '',
                chiamate: ''
            }
        },
        rigaElencoRichieste: '/api/SintesiRichiesteAssistenza',
        eventiRichieste: 'https://api.myjson.com/bins/kz0w0',
        turno: '',
        composizione: {
            preaccoppiati: '',
            mezzi: '',
            squadre: '',
            filtri: '/api/Filtri'
        },
        chiamata: {
            currentId: '',
            inserimento: '/api/InserimentoIntervento'
        },
        listaSedi: '',
        login: '/api/auth/Login',
        users: '/api/users',
        navbar: '/api/Navbar'
    }
};
