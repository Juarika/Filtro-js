import { loadDepartamentos } from "../modules/departamentos.js";
import { llenarTablaC, llenarTablaD } from "../modules/listar.js";

const url = 'http://localhost:3003';
const headers = new Headers ({'Content-Type': 'application/json'});


export async function getData(endPoint, func){
    let data = await (await fetch(`${url}/${endPoint}`)).json();
    func(data);
}

export async function postData(data, endPoint){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    await fetch(`${url}/${endPoint}`,config);
}

export async function deleteData(tr,id, endPoint){
    let data = Object.fromEntries(new FormData(tr.target));
    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    };

    let del = await(await fetch(`${url}/${endPoint}/${id}`,config)).json();
}

export async function actualizarData(data,id, endPoint) {
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let act = await (await fetch(`${url}/${endPoint}/${id}`,config)).json();
}