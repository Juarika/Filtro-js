import { getData, postData, deleteData, actualizarData } from "../scripts/db.js";

const main = document.getElementById('main');

export function loadTable() {
  main.innerHTML = '';
  let div = document.createElement('div');
  div.className = 'container';
  div.id = 'form'
  div.innerHTML = `
    <form id="agregarDep" class="row g-3 needs-validation" novalidate>
      <div class="col-8">
        <label for="inputDep" class="form-label" id="labelDep">Departamento</label>
        <input type="text" class="form-control" id="inputDep" placeholder="Ingrese el nuevo departamento" required>
        <button class="btn btn-primary" type="submit">Agregar</button>
      </div>
    </form>

<!-- Modal -->
<div class="modal fade" id="modalCiudad" tabindex="-1" aria-labelledby="modalCiudadLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalCiudadLabel">Actualizar</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="col-12" id="formActualizar">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Nombre Ciudad</label>
        <input type="text" class="form-control" id="nombre" name="nomCiudad">
      </div>
      <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Departamento</label>
          <select class="form-select" id="depSel" name="departamentoId">
              
          </select>
        </div>
      <input type="submit" class="btn btn-primary" data-accion="Actualizar" value="Actualizar">
    </form></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="modalDep" tabindex="-1" aria-labelledby="modalDepLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalDepLabel">Actualizar</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="col-12" id="formActualizarD">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Nombre Departamento</label>
        <input type="text" class="form-control" id="nombre" name="nomDepartamento">
      </div>
      <input type="submit" class="btn btn-primary" data-accion="Actualizar" value="Actualizar">
    </form></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `
    main.appendChild(div)
    document.getElementById('agregarDep').addEventListener('submit', e=>{
      e.preventDefault();
      let name = document.getElementById('inputDep')
      let dep = {
        "nomDepartamento": name.value
      }
      postData(dep, 'Departamentos')
    })
    
  getData('Departamentos', llenarTablaD)
  getData('Departamentos', llenarTablaC)
}

export function llenarTablaC(data) {
  let tableC = document.createElement('table');
  tableC.classList = 'table'

 
  tableC.innerHTML = `<thead>
  <tr>
  <th scope="col">#</th>
    <th scope="col">Ciudad</th>
    <th scope="col">Departamento</th>
    <th scope="col">Opciones</th>
  </tr>
</thead>
`
const body = document.createElement('tbody')
data.forEach(element => {
      getData(`Ciudades/?departamentoId=${element.id}`, llenarCiudad)
      function llenarCiudad(dataC){
        dataC.forEach(e=>{
          const tr = document.createElement('tr')
          tr.setAttribute("id",`${e.id}`);
          tr.innerHTML = `
          <th>${e.id}</th>
          <td>${e.nomCiudad}</td>
          <td>${element.nomDepartamento}</td>
          <td>
          <input type="submit" data-accion="Eliminar" value="Eliminar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
          <input type="button" data-accion="Actualizar" value="Actualizar" class="btn-guardar bg-warning border-0 rounded bg-secondary px-2" data-mdb-toggle="modal" data-mdb-target="#modalCiudad">
          </td>
          `
          body.appendChild(tr)
      })
      }
    });
    tableC.appendChild(body)
    body.addEventListener('click', (e) => {
      e.preventDefault();
  
      let tr = e.target.closest("tr");
      let id = tr.id;
  
      let accion = e.target.dataset.accion;
      
      if(accion === "Eliminar"){
          deleteData(tr,id, 'Ciudades');
          tr.remove();
      }
      else if(accion === "Actualizar"){
        let formActualizar = document.getElementById('formActualizar') 
        formActualizar.addEventListener("submit", (e) => {
          e.preventDefault();
  
          let data = Object.fromEntries(new FormData(e.target));
  
          actualizarData(data,id, 'Ciudades');
        });
      }
  });
  main.appendChild(tableC)
}

export function llenarTablaD(data) {
  let tableD = document.createElement('table');
  tableD.classList = 'table'
  tableD.innerHTML = `<thead>
  <th scope="col">#</th>
  <th scope="col">Departamento</th>
  <th scope="col">Opciones</th>
  `

  const body = document.createElement('tbody')
  const select = document.getElementById('depSel')
  data.forEach(e=>{
    const option = document.createElement('option')
    option.value = e.id
    option.textContent = e.nomDepartamento
    select.appendChild(option)
    const tr = document.createElement('tr')
    tr.setAttribute("id",`${e.id}`);
    tr.innerHTML = `
    <th>${e.id}</th>
    <td>${e.nomDepartamento}</td>
    <td>

      <input type="submit" data-accion="Añadir" value="Añadir" class="btn-guardar bg-success border-0 rounded bg-secondary px-2" data-mdb-toggle="modal" data-mdb-target="#modalCiudad">
      <input type="submit" data-accion="Eliminar" value="Eliminar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
      <input type="button" data-accion="Actualizar" value="Actualizar" class="btn-guardar bg-warning border-0 rounded bg-secondary px-2" data-mdb-toggle="modal" data-mdb-target="#modalDep">
    </td>
  `
  body.appendChild(tr)
})
body.addEventListener('click', (e) => {
  e.preventDefault();

  let tr = e.target.closest("tr");
  let id = tr.id;

  let accion = e.target.dataset.accion;
  
  if(accion === "Eliminar"){
      deleteData(tr,id, 'Departamentos');
      tr.remove();
  }
  else if(accion === "Actualizar"){
    let formActualizar = document.getElementById('formActualizarD') 

    formActualizar.addEventListener("submit", (e) => {
      e.preventDefault();

      let data = Object.fromEntries(new FormData(e.target));

      actualizarData(data,id, 'Departamentos');
    });
  }
  else if(accion === "Añadir"){
    let formActualizar = document.getElementById('formActualizar') 

    formActualizar.addEventListener("submit", (e) => {
      e.preventDefault();

      let data = Object.fromEntries(new FormData(e.target));

      postData(data, 'Ciudades');
    });
  }
})
tableD.appendChild(body)
main.appendChild(tableD)
}