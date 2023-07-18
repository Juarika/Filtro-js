import { getData } from '../scripts/db.js';
// import {displayData} from '../scripts/main.js'

const main = document.getElementById('main');
 
export function loadDepartamentos() {
    main.innerHTML = '';
    const accordion = document.createElement('div');
    accordion.classList = 'accordion accordion-flush'
    accordion.id = 'accordionFlushExample'
    main.appendChild(accordion)
    getData('Departamentos', loadDep)
    function loadDep(data) {
        data.forEach(e => {
            const div = document.createElement('div');
            div.classList = 'accordion-item';
            let id = e.id;
            div.innerHTML = ''
            div.innerHTML = `
            <h2 class="accordion-header" id="flush-h${id}">
              <button class="accordion-button collapsed load-route-btn" data-route="${id}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c${id}" aria-expanded="false" aria-controls="flush-c${id}">
              ${id}=> ${e.nomDepartamento}
              </button>
            </h2>
            <div id="flush-c${id}" class="accordion-collapse collapse" aria-labelledby="flush-h${id}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body row" id="cont${id}">                
              </div>
            </div>`;
            getData(`Ciudades/?departamentoId=${id}`, loadCity)

            accordion.appendChild(div);})
    }
        function loadCity(data) {
            data.forEach(element => {
                console.log(element)
                let depId = element.departamentoId
                const dep = document.querySelector(`#cont${depId}`)
                dep.innerHTML = ''
                displayData(element.nomCiudad, dep)
            });
        }        
    }

export async function displayData(ciudad, dep) {
        try {
            const data = await fetchData(ciudad);
            const card = document.createElement('div')
            card.classList = 'card'
            card.style = 'width: 18rem'
            card.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" id="imagen">
                <div class="card-body">
                <h5 class="card-title fs-3">${data.name}</h5>
                 <p class="card-text" id="temperature">${(data.main.temp - 273.15).toFixed(0) + ' °C'}</p>

                  <p class="card-text" id="humidity">${'Humidity: ' + data.main.humidity + '%'}</p>
                 <p class="card-text" id="wind">${'Wind: ' + data.wind.speed + ' Km/h'}</p>
                 <p class="card-text" id="feels_like">${'Pressure: ' + data.main.pressure + '  hPa'}</p>
                 <p class="card-text" id="pressure">${'Feels Like: ' + (data.main.feels_like-273.15).toFixed(0) + ' °C'}</p>
                </div>
              </div>`
            dep.appendChild(card)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchData(ciudad) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=edae82c48f295596a373a027a56f68f5`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw 'Error al obtener los datos';
        }
    }