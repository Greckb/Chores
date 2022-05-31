const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
    type: 'list',
    name: 'opcion',
    message: `¿Que desea hacer?, ${`\n`}`,
    choices: [
        {
            value: '1',
            name: `${'1.'.green} Crear Tareas`,
        },
        {
            value: '2',
            name: `${'2.'.green} Listar Tareas`,
        },
        {
            value: '3',
            name: `${'3.'.green} Listar Tareas Compleatadas`,
        },
        {
            value: '4',
            name: `${'4.'.green} Listar Tareas Pendientes`,
        },
        {
            value: '5',
            name: `${'5.'.green} Completar Tarea(s)`,
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar Tarea(s)`,
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`,
        }
    ]
    }
]




const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una Opcion'.white);
    console.log('=========================\n'.green);

  
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

};

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${`ENTER`.green} para continuar`
        }
    ]
    console.log(`\n`);
    await inquirer.prompt(question);
  

}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate: (value) => {
            if(value.length===0){return 'Ingrese una descripcion';}
            return true;
        }
    }]
    const {desc} = await inquirer.prompt(question);
    return desc;
};

const ListarTareasBorrar = async(tareas = [])=>{
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            name: `${idx} ${tarea.desc}`,
            value: tarea.id
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const {ok} = await inquirer.prompt(question);
    return ok;
}
  

const MostrarListadoCheckList = async(tareas=[])=>{
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            name: `${idx} ${tarea.desc}`,
            value: tarea.id,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    
    if(tareas.length===0){
        console.log();
        console.log('No hay tareas para mostrar'.red);
        return;
    }else{
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    }

}



module.exports = { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    ListarTareasBorrar,
    confirmar,
    MostrarListadoCheckList,
    };
