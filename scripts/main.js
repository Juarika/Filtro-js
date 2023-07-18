import { loadHome } from "../modules/home.js";
import { loadDepartamentos } from "../modules/departamentos.js";
import { loadTable } from "../modules/listar.js";

loadHome()

document.getElementById('home').addEventListener('click',e => {
    loadHome()
})

document.getElementById('departamentos').addEventListener('click',e => {
    loadDepartamentos()
})

document.getElementById('departamentos').addEventListener('click',e => {
    loadDepartamentos()
})

document.getElementById('listar').addEventListener('click',e => {
    loadTable()
})