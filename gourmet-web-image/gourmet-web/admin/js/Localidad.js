


    async function renderLocalidades (idCapa) {   
        document.querySelector(idCapa).innerHTML= `
            <div class="container my-5 text-center">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Lista de localidades  -->
                            <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th><button onclick="nuevoLocalidad()" class="btn btn-success btn-sm" ><i class="fas fa-plus" aria-hidden="true"></i></button></th>
                                </tr>
                            </thead>
                            <tbody id="contenido"></tbody>
                        </table>
                        
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
                                <form id="form-data-localidad">
                                    <input type="hidden" id="id" name="id" value="" />
                                    <div class="form-group">
                                        <label>Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" size="30" value="" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button id="btn-order-post"  onclick="guardarLocalidad()" type="button" class="btn btn-primary">Guardar</button>
                                <button id="btn-order-cancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fi del Modal -->
            `;
            getListaLocalidades();
    }
   
    function getListaLocalidades() {
        
        fetch(DOMINIO+"/api/localidades")
        .then(result => result.json())
        .then(data => {
            let content = document.querySelector('#contenido');
            content.innerHTML = "";
            
            for(let localidad of  data){
            content.innerHTML += `
            <tr>
                <th scope="row">${ localidad.id }</th>
                <td>${ localidad.nombre }</td>
                <td>
                    <span data-toggle="modal" data-target="#modal-edicion">
                        <button onclick="editarLocalidad(${localidad.id})" class="btn btn-success btn-sm" role="button" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    </span>
                    <button onclick="eliminarLocalidad(${localidad.id})" class="btn btn-success btn-sm" title="Eliminar"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
            `;
            }
            
        });
    }



    // inserta nuevo localidad
    function insertarLocalidad(){
        let localidadData = {
            "nombre":document.querySelector("#nombre").value
        };
        
        
        fetch(DOMINIO+"/api/localidades/",{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(localidadData)
        })
        .then(response => {
                response.json();
                getListaLocalidades();
            }
        
        ) 
        .then(response => console.log(response))
        .catch(error => error);

    } 



    // Edita los datos del localidad con el id indicado por parámetro
    function modificarLocalidad(){
        let localidadData = {
        "id":document.querySelector("#id").value,
        "nombre":document.querySelector("#nombre").value
        };
        
        fetch(DOMINIO+"/api/localidades/",{
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(localidadData)
        })
        .then(response =>{
            response.json();
            getListaLocalidades();
        }) 
        .then(response => console.log(response))
        .catch(error => error);
        
    }
    
    function editarLocalidad(id){
        
        // Recuperamos datos del localidad y configuramos los datos en el formulario
        fetch(DOMINIO+"/api/localidades/"+id, {method: 'GET'})
        .then(response => response.json()) 
        .then(data => {
            document.querySelector("#id").value = data.id;
            document.querySelector("#nombre").value = data.nombre;
        })
        .catch(error => error);

    }

    // Elimina el localidad según id
    function eliminarLocalidad(id){
        swal({
            title: '¿Está seguro que quiere borrar el registro?',
            text: "Una localidad eliminada no se puede recuperar",
            type: 'warning',
            icon: "warning",
            buttons: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result) {
              // eliminar en la rest api
              
              fetch(DOMINIO+"/api/localidades/"+id, {method: 'DELETE'})
              .then(response => {
                  //response.json();
                  getListaLocalidades();
                  swal("Localidad eliminado con éxito");  
              })
              .then(response => console.log(response))
              .catch(error => error);
            }
            else{
                swal("Localidad no eliminada");
            }
        });
        
    }

    function guardarLocalidad(){
        const id = document.querySelector("#id").value;
        console.log(id);
        if (id=="")
            insertarLocalidad();
        else
            modificarLocalidad(); 
        
        $('#modal-edicion').modal('hide');
    }

    function nuevoLocalidad(){
        document.querySelector("#id").value="";
        document.querySelector("#form-data-localidad").reset();
        $('#modal-edicion').modal('show');
    }

