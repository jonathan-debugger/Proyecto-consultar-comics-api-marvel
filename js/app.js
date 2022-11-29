
/*
Su clave pública
###################

Su clave privada
####################

Su hash 
privada+publica

*/



/*Variables*/
const form = document.querySelector('form');
const buscador = document.getElementById('search');

/*Event listeners*/
form.addEventListener('submit',formulario);
buscador.addEventListener('input',search);

/*Funciones*/
async function getData(año='', valueBuscador=''){

    const hash='##############';
    const keyPublic='##############';

    let parametros='';
    if(año!==''){
        parametros= `&dateRange=${año} `;
    }
    
    if(valueBuscador!=''){
        parametros+=`&titleStartsWith=${valueBuscador}`;
    }

    const  url =` https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic${parametros}&ts=1&apikey=${keyPublic}&hash=${hash}`;
    //console.log(url);
    try {
        const data= await fetch(url); 
        const response= await data.json();

        return response.data.results;
        
    } catch (error) {
        console.log(error);
    }

}

async function formulario(e){
    e.preventDefault();
    const año =document.getElementById('lista_comics').value;
    const search=document.getElementById('search').value;    
    showComics(año,search);
    
}

async function showComics(año,search){
        const dateSeparator='%2C%';
        const date =año+'-01-01'+dateSeparator+año+'-12-31';
        const comics = await getData(date,search);

        createElements(comics);

}

async function createElements(comics){
    //console.log('hola');
    const container=document.querySelector('.container_comics ul');
          container.innerHTML="";

    comics.forEach(comic => {
        const li=document.createElement('li');
        const img=document.createElement('img');
              img.src=comic.images[0]['path']+'.'+comic.images[0]['extension'];
        li.appendChild(img);

        const header=document.createElement('h2');
              header.innerHTML=comic.title;  
        li.appendChild(header);
        container.appendChild(li);
           
    });
    
}




async function search(e){
e.preventDefault();
const año =document.getElementById('lista_comics').value;
const search=document.getElementById('search').value;    
showComics(año,search);

}