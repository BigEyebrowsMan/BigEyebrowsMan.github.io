const queryString = location.search
let params = new URLSearchParams(queryString)
let id = parseInt(params.get("id")) //Variable que amagatzerma l'id
console.log(params, id) //Mostres a la consola de la terminal el id del anime o manga en la terminal de inspeccionar
var imagenes = document.querySelectorAll(".portades");

cargarInformacion(id);


function cargarInformacion(id){    
    // Carga del XML
    fetch('DATA/DATA-M.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser(); //Cursor per recorrer l'xml
        const xmlDoc = parser.parseFromString(data, 'text/xml'); //amagatzema en una variable
        console.log(data)
      //  const animeList = xmlDoc.querySelectorAll(`anime[id="${id}"]`); //Busca la entrada al xml que tingui id = x
      // lista animes
      const animeList = xmlDoc.querySelectorAll(`cataleg > mangas > manga[id="${id}"]`);
      console.log(animeList)
        const animeListDiv = document.getElementById('anime-list');

        const animeDivContainer = document.getElementById('target');


          // Obtención de datos del XML
          for (let i = 0; i < animeList.length; i++) {
            const anime = animeList[i];
            const Titol = anime.getElementsByTagName('titol')[0].textContent;
            const Description = anime.getElementsByTagName('descripcion')[0].textContent || 'Unknown';            
            const imatge = anime.getElementsByTagName('imatge')[0].textContent || 'Unknown';            
            const generes = anime.getElementsByTagName('generes')[0].textContent || 'Unknown';
            const capitols = anime.getElementsByTagName('capitols')[0].textContent || 'Unknown';


           
          // Creación de contenido HTML con los datos y clases
          const animeDiv = document.createElement('div');
          animeDiv.innerHTML = `
              <head>
              <link rel="stylesheet" href="../CSS/contingut.css">
              </head>
             
              <div class="content">
              <div id="leftMargin"></div><div id="rightMargin"></div>
              <h2 class="Titol">${Titol}</h2>
              
              <div class=description>
                <div class=backGenere>
                  <p id="Generes"> ${generes}</p>
                </div>
                <p id="Descripcio">Descripcio: ${Description}</p>
              </div>
              <img class="Portada" src="${imatge}" alt="Capcelera"><img> 
              <div class="Capitols">
                <ul class="EpList">
                ${createChapterLinks(capitols)}
                <ul>
                </div>
              </div>
              
          `;              
          animeDivContainer.appendChild(animeDiv);
    }
    animeListDiv.appendChild(animeDivContainer);
})
.catch(error => console.error('Error fetching XML:', error));
}

    
  
  
  // Llamada a la función para cargar información con un ID específico
imagenes.forEach(function(imagen) {
  imagen.addEventListener("click", function() {
    var id = imagen.getAttribute("data-id"); // Obtener el ID de la imagen
    ejecutarFuncion(id); // Llamar a la función con el ID como argumento
   });
});
function createChapterLinks(capitols) {
  // Convertir la lista de capítulos en elementos <a>
  const chapters = capitols.split(','); // Suponiendo que los capítulos están separados por comas
  let chapterLinks = '';
  for (let i = 0; i < chapters.length; i++) {
      const chapterNumber = i + 1;
      chapterLinks += `<li class="EpList"><a href="${chapters[i]}" class="CapLink">Episodi ${chapterNumber}</a></li>`;
  }
  return chapterLinks;
};