require('colors');

const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        ListarTareasBorrar, 
        confirmar,
        MostrarListadoCheckList,
    } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


console.clear();

const main = async() => {
   
    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();

    if(tareasDb){
      tareas.cargarTareasFromArray(tareasDb);
    }
    do{
        //Imprimimos el menu
        opt = await inquirerMenu()
        switch(opt){
            case '1':
                //Creamos una nueva tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc); 
                 
            break;

            case '2':
                //Listamos las tareas 
                tareas.listadoCompleto(tareas);
            break;  

            case '3':
               //Listamos las tareas completadas
                tareas.listaCompletadas(true);                            
            break;

            case '4':
                //Listamos las tareas pendientes              
                tareas.listarPendientesCompletadas(false);  
                   
            break;

            case '5':
                //Completar / tarea pendiente
                const ids = await MostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                //Borramos una tarea
                const id = await ListarTareasBorrar(tareas.listadoArr);
                if(id !=='0'){
                    //to do: Estas seguro?
                    const ok = await confirmar('Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.red);
                    }
                }               
            break;
             
            
        }
        guardarDb(tareas.listadoArr); //Guardamos en el archivo
        await pausa();
     } while(opt !== '0');
        console.clear();
        
    }


main();