


    async function renderCategorias (idCapa) {   
        document.querySelector(idCapa).innerHTML= `
            <div class="container my-5 text-center">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Lista de categorias  -->
                            <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th><button onclick="nuevoCategoria()" class="btn btn-success btn-sm" ><i class="fas fa-plus" aria-hidden="true"></i></button></th>
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
                                <form id="form-data-categoria">
                                    <input type="hidden" id="id" name="id" value="" />
                                    <div class="form-group">
                                        <label>Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" size="30" value="" />
                                    </div>
                                    <div class="form-group">
                                        <label>Descripción:</label>
                                        <input type="text" id="descripcion" name="descripcion" value="" />
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button id="btn-order-post"  onclick="guardarCategoria()" type="button" class="btn btn-primary">Guardar</button>
                                <button id="btn-order-cancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Fi del Modal -->
            `;
            getListaCategorias();
    }
   
    function getListaCategorias() {
        
        fetch(DOMINIO+"/api/categorias")
        .then(result => result.json())
        .then(data => {
            let content = document.querySelector('#contenido');
            content.innerHTML = "";
            
            for(let categoria of  data){
            content.innerHTML += `
            <tr>
                <th scope="row">${ categoria.id }</th>
                <td>${ categoria.nombre }</td>
                <td>
                    <span data-toggle="modal" data-target="#modal-edicion">
                        <button onclick="editarCategoria(${categoria.id})" class="btn btn-success btn-sm" role="button" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    </span>
                    <button onclick="eliminarCategoria(${categoria.id})" class="btn btn-success btn-sm" title="Eliminar"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
            `;
            }
            
        });
    }



    // inserta nuevo categoria
    function insertarCategoria(){
        let categoriaData = {
            "nombre":document.querySelector("#nombre").value,
            "descripcion":document.querySelector("#descripcion").value
        };
        
        
        fetch(DOMINIO+"/api/categorias/",{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(categoriaData)
        })
        .then(response => {
                response.json();
                getListaCategorias();
            }
        
        ) 
        .then(response => console.log(response))
        .catch(error => error);

    } 



    // Edita los datos del categoria con el id indicado por parámetro
    function modificarCategoria(){
        let categoriaData = {
        "id":document.querySelector("#id").value,
        "nombre":document.querySelector("#nombre").value,
        "descripcion":document.querySelector("#descripcion").value
        };
        
        fetch(DOMINIO+"/api/categorias/",{
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(categoriaData)
        })
        .then(response =>{
            response.json();
            getListaCategorias();
        }) 
        .then(response => console.log(response))
        .catch(error => error);
        
    }
    
    function editarCategoria(id){
        
        // Recuperamos datos del categoria y configuramos los datos en el formulario
        fetch(DOMINIO+"/api/categorias/"+id, {method: 'GET'})
        .then(response => response.json()) 
        .then(data => {
            document.querySelector("#id").value = data.id;
            document.querySelector("#nombre").value = data.nombre;
            document.querySelector("#descripcion").value = data.descripcion;
        })
        .catch(error => error);

    }

    // Elimina el categoriasegún id
    function eliminarCategoria(id){
        swal({
            title: '¿Está seguro que quiere borrar el registro?',
            text: "Una categoria eliminada no se puede recuperar",
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
              
              fetch(DOMINIO+"/api/categorias/"+id, {method: 'DELETE'})
              .then(response => {
                  //response.json();
                  getListaCategorias();
                  swal("Categoria eliminado con éxito");  
              })
              .then(response => console.log(response))
              .catch(error => error);
            }
            else{
                swal("Categoria no eliminada");
            }
        });
        
    }

    function guardarCategoria(){
        const id = document.querySelector("#id").value;
        console.log(id);
        if (id=="")
            insertarCategoria();
        else
            modificarCategoria(); 
        
        $('#modal-edicion').modal('hide');
    }

    function nuevoCategoria(){
        document.querySelector("#id").value="";
        document.querySelector("#form-data-categoria").reset();
        $('#modal-edicion').modal('show');
    }

