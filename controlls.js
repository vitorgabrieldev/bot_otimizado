
// ==================== Click Event =====================
let Send = document.querySelector('#Send').addEventListener('click', () =>
{
    this.controls.originMain();
});
window.addEventListener('keypress', (e) =>
{
    if(e.key === 'Enter')
    {
        this.controls.originMain();
    };
});

// ==================== Controlls Main ==================
var controls = {

    originMain: function()
    {
        let comands = document.querySelector('#comands').value;
        if(comands)
        {
            this.comandsGeral();
        };
    },

    comandsGeral: function()
    {
        let comands = document.querySelector('#comands').value.toLocaleLowerCase();
        this.searchComands(comands);
    },

    searchComands: function(comands)
    {
        // ==================== Switch Comands ==================
        switch (comands) {
            case 'clima':
                this.settingsComands.clima();
                break;
            case 'timer':
                this.settingsComands.timer();
                break;
            case 'cep':
                this.settingsComands.cep();
                break;
            case 'list':
                this.settingsComands.comandsList();
                break;

            default:
                alert("Comando não encontrado, caso deseje ver a lista de comando digite 'comandsList' !")
            };
    },

    settingsComands:
    {
        timer: function()
        {
                //===== Timer =======
                let hours = new Date().getHours();
                let minutes = new Date().getMinutes();

                hours = (hours < 10 ? '0' + hours : hours);
                minutes = (minutes < 10 ? '0' + minutes : minutes);

                document.querySelector('#msg').innerHTML = `${hours}:${minutes}`;
        },

        clima: function()
        {
            var reqCity = window.prompt("Digite o nome da cidade:");
            if(reqCity)
            {
                searchResults(reqCity);
            }else {
                alert('Digite algo válido.');
            };
        },
        cep: function()
        {
            var reqCep = window.prompt("Digite o CEP :");
            if(reqCep.length == 8 && /^[0-9]+$/.test(reqCep))
            {
                apiCep(reqCep);
            }else {
                alert(`"${reqCep}" não é um CEP válido`)
            };
        },

        comandsList: function()
        {
            let seeInformation = window.prompt('timer | cep | clima \n Caso queira mais informações digite o comando abaixo : ');
            switch (seeInformation)
            {
                case 'clima':
                    alert("Serve para ver a temperatura de um determinada cidade");
                    break;
                case 'timer':
                    alert("Mostra a hora atual de seu computador");
                    break;
                case 'cep':
                    alert("Mostra a cidade correspondente ao CEP digitado");
                    break;
                case 'list':
                    alert("Mostra a lista de todos os comandos");
                    break;
                default:
                    alert("Este comando não existe");
            };
        },
    },

};


// ===================== APIS ============================

// ====== Api de clima ======================
const apiClima = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
};

function searchResults(reqCity) {
    fetch(`${apiClima.base}weather?q=${reqCity}&lang=${apiClima.lang}&units=${apiClima.units}&APPID=${apiClima.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message);
        })
        .then(response => {
            displayResults(response, reqCity);
        });
};

function displayResults(weather, reqCity) {

    let temperature = `${Math.round(weather.main.temp)}`;

    document.querySelector('#msg').innerHTML = `${reqCity} - ${temperature}°C`;

    document.querySelector('#comands').value = "";

};



// ============== API cep (VIACEP) ===================
const apiCep = async(reqCep) => {
    const cep = reqCep;
    const urlCep = `http://viacep.com.br/ws/${cep}/json/`;

    const dataMain = await fetch(urlCep);
    const datasEnd = await dataMain.json();

    if(datasEnd.hasOwnProperty('erro'))
    {
        document.querySelector('#msg').innerHTML = `"${reqCep}" não foi encontrado!`;

    } else {
        // ============= Res End ===============
        document.querySelector('#msg').innerHTML = `"${reqCep}" - ${datasEnd.localidade}`

    };

    document.querySelector('#comands').value = "";

};