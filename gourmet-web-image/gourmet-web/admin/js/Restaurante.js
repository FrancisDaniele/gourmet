
    
    async function renderRestaurantes (idCapa) {
        let opcionesCategoria = await fetch(DOMINIO+"/api/categorias")
                                .then(result => result.json())
                                .then(data => {
                                    let options="";
                                    for(let cat of  data){
                                        options += `
                                        <option value="${cat.id}">${cat.nombre}</option>
                                        `;
                                        
                                    }
                                    return options;
                                });
        let opcionesLocalidades = await fetch(DOMINIO+"/api/localidades")
                                .then(result => result.json())
                                .then(data => {
                                    let options="";
                                    for(let loc of  data){
                                        options += `
                                        <option value="${loc.id}">${loc.nombre}</option>
                                        `;
                                        
                                    }
                                    return options;
                                }); 
                                
                                
        /*
        <!-- Lista de restaurantes  -->
                            <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Localidad</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Puntuación</th>
                                    <th scope="col">Votos</th>
                                    <th scope="col">Descripción</th>
                                    <th><button onclick="nuevoRestaurante()" class="btn btn-success btn-sm" ><i class="fas fa-plus" aria-hidden="true"></i></button></th>
                                </tr>
                            </thead>
                            <tbody id="contenido"></tbody>
                        </table>
        */
        document.querySelector(idCapa).innerHTML= `
            <div class="container my-5 text-center">
                    <div class="row">
                        <div class="col-md-12">
                        <!-- card table-->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Lista de retaurantes</h6>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                <table  id="dataTable" class="table table-bordered table-striped" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Localidad</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Puntuación</th>
                                        <th scope="col">Votos</th>
                                        <th scope="col">Descripción</th>
                                        <th><button onclick="nuevoRestaurante()" class="btn btn-success btn-sm" ><i class="fas fa-plus" aria-hidden="true"></i> Nuevo </button></th>
                                    </tr>
                                </thead>
                                <tbody id="contenido"></tbody>
                                </table>

                                </div>
                            </div>
                        </div>
                        <!-- end card table--> 
                        
                        </div>
                    </div>
                </div>


                <!-- Modal con los campos de edición-->
                <!--*****************************************************************-->
                <div id="modal-edicion" class="modal fade" tabindex="-1" role="dialog"
                    aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel">Formulario de edición</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="form-data-restaurante">
                                    <input type="hidden" id="id" name="id" value="" />
                                    <div class="form-group">
                                        <label>Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" size="30" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Dirección:</label>
                                        <input type="text" id="direccion" name="direccion" size="30" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Localidad:</label>
                                        <select id="localidad" name="localidad">
                                            ${opcionesLocalidades}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Categoria:</label>
                                        <select id="categoria" name="categoria">
                                            ${opcionesCategoria}
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Puntuación:</label>
                                        <input type="number" id="puntuacion" name="puntuacion" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Votos:</label>
                                        <input type="number" id="votos" name="votos" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Descripción:</label>
                                        <input type="text" id="descripcion" name="descripcion" value="" />
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button id="btn-order-post"  onclick="guardarRestaurante()" type="button" class="btn btn-primary">Guardar</button>
                                <button id="btn-order-cancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fi del Modal -->
            `;

        await getListaRestaurantes();

    }
   
    function getListaRestaurantes() {
        
        fetch(DOMINIO+"/api/restaurantes")
        .then(result => result.json())
        .then(data => {
            let content = document.querySelector('#contenido');
            content.innerHTML = "";
            
            for(let restaurante of  data){
                content.innerHTML += `
                <tr>
                    <th scope="row">${ restaurante.id }</th>
                    <td>${ restaurante.nombre }</td>
                    <td>${ restaurante.direccion }</td>
                    <td>${ restaurante.localidad.nombre }</td>
                    <td>${ restaurante.categoria.nombre }</td>
                    <td>${ restaurante.puntuacion }</td>
                    <td>${ restaurante.votaciones }</td>
                    <td>${ restaurante.descripcion }</td>
                    <td>
                        <span data-toggle="modal" data-target="#modal-edicion">
                            <button onclick="editarRestaurante(${restaurante.id})" class="btn btn-success btn-sm" role="button" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                        </span>
                        <button onclick="eliminarRestaurante(${restaurante.id})" class="btn btn-success btn-sm" title="Eliminar"><i class="fas fa-trash" aria-hidden="true"></i></button>
                    </td>
                </tr>
                `;
            }
            // Call the dataTables jQuery plugin
            $(document).ready(function() {
                $('#dataTable').DataTable({
                    "language": {
                        "lengthMenu": "Mostrar _MENU_ registros por página",
                        "search": "Buscar",
                        "zeroRecords": "No se encontraron registros - sorry",
                        "info": "Mostrando página _PAGE_ de _PAGES_",
                        "infoEmpty": "No registros disponibles",
                        "infoFiltered": "(filtered from _MAX_ total records)"
                    }
                } );
            });
            
        });
    }



    // inserta nuevo restaurante
    function insertarRestaurante(){
        let restauranteData = {
            "nombre":document.querySelector("#nombre").value,
            "direccion":document.querySelector("#direccion").value,
            "localidad": {
                "id": $("#localidad").val()
            },
            "categoria": {
                "id": $("#categoria").val()
            },
            "puntuacion":document.querySelector("#puntuacion").value,
            "votaciones":document.querySelector("#votos").value,
            "descripcion":document.querySelector("#descripcion").value
        };
        
        
        fetch(DOMINIO+"/api/restaurantes/",{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(restauranteData)
        })
        .then(response => {
                response.json();
                getListaRestaurantes();
            }
        
        ) 
        .then(response => console.log(response))
        .catch(error => error);

    } 



    // Edita los datos del restaurante con el id indicado por parámetro
    function modificarRestaurante(){
        let restauranteData = {
        "id":document.querySelector("#id").value,
        "nombre":document.querySelector("#nombre").value,
        "direccion":document.querySelector("#direccion").value,
        "localidad":{
            "id": $("#localidad").val()
        },
        "categoria": {
            "id": $("#categoria").val()
        },
        "puntuacion":document.querySelector("#puntuacion").value,
        "votaciones":document.querySelector("#votos").value,
        "descripcion":document.querySelector("#descripcion").value
        };
        
        fetch(DOMINIO+"/api/restaurantes/",{
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(restauranteData)
        })
        .then(response =>{
            response.json();
            getListaRestaurantes();
        }) 
        .then(response => console.log(response))
        .catch(error => error);
        
    }
    
    function editarRestaurante(id){
        
        // Recuperamos datos del restaurante y configuramos los datos en el formulario
        fetch(DOMINIO+"/api/restaurantes/"+id, {method: 'GET'})
        .then(response => response.json()) 
        .then(data => {
            document.querySelector("#id").value = data.id;
            document.querySelector("#nombre").value = data.nombre;
            document.querySelector("#direccion").value = data.direccion;
            $("#localidad").val(data.localidad.id);
            $("#categoria").val(data.categoria.id);
            document.querySelector("#puntuacion").value = data.puntuacion;
            document.querySelector("#votos").value = data.votaciones;
            document.querySelector("#descripcion").value = data.descripcion;
        })
        .catch(error => error);

    }

    // Elimina el restaurante según id
    function eliminarRestaurante(id){
        confirm();
        fetch(DOMINIO+"/api/restaurantes/"+id, {method: 'DELETE'})
            .then(response => {
                //response.json();
                getListaRestaurantes();
                alert("Restaurante eliminado con éxito");
                
                
            })
            .then(response => console.log(response))
            .catch(error => error);
    }

    function guardarRestaurante(){
        const id = document.querySelector("#id").value;
        console.log(id);
        if (id=="")
            insertarRestaurante();
        else
            modificarRestaurante(); 
        
        $('#modal-edicion').modal('hide');
    }

    function nuevoRestaurante(){
        document.querySelector("#id").value="";
        document.querySelector("#form-data-restaurante").reset();
        $('#modal-edicion').modal('show');
    }



