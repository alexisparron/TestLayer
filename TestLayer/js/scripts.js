let defaultEndpoint = 'https://swapi.dev/api/planets/';

let heartIconText = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';

let likes = {};
loadEndpoint(defaultEndpoint);


function loadEndpoint(endpoint){

  let request = new XMLHttpRequest(endpoint)
  const container = document.getElementById('root');



  request.open('GET', endpoint, true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      console.log(data)

      data.results.forEach((planet) => {
        console.log(planet.name)

        const div = document.createElement('div')
        div.setAttribute('class', 'col-md-4')

        const innerDiv = document.createElement('div')
        innerDiv.setAttribute('class', 'card mb-4 yellow-background')
        div.appendChild(innerDiv)

        const innerImg = document.createElement('img')
        innerImg.setAttribute('class', 'card-img-top')
        innerImg.setAttribute('src', 'assets\\planets\\' + planet.name + ".png")
        innerDiv.appendChild(innerImg)

        const innerDiv2 = document.createElement('div')
        innerDiv2.setAttribute('class', 'card-body')
        innerDiv.appendChild(innerDiv2)

        const innerP = document.createElement('p')
        innerP.setAttribute('class', 'card-text')
        innerP.textContent = "Periodo Rotación: " + planet.rotation_period + String.fromCharCode(13)
        innerDiv2.appendChild(innerP)

        const innerP2 = document.createElement('p')
        innerP2.setAttribute('class', 'card-text')
        innerP2.textContent = "Periodo de orbitación: " + planet.orbital_period + String.fromCharCode(13)
        innerDiv2.appendChild(innerP2)

        const innerP3 = document.createElement('p')
        innerP3.textContent = "Población: " + planet.population + String.fromCharCode(13)
        innerP3.setAttribute('class', 'card-text')
        innerDiv2.appendChild(innerP3)

        const innerDiv3 = document.createElement('div')
        innerDiv3.setAttribute('class', 'd-flex justify-content-between align-items-center')
        innerDiv2.appendChild(innerDiv3)

        //createModal('Residentes', planet.residents, planet.name, div);

        
        const innerDiv4 = document.createElement('div')
        innerDiv4.setAttribute('class', 'btn-group')
        innerDiv3.appendChild(innerDiv4)

        const innerButton = document.createElement('button')
        innerButton.setAttribute('type', 'button')
        innerButton.setAttribute('data-bs-toggle', 'modal')
        innerButton.setAttribute('data-bs-target', '#exampleModal');
        innerButton.setAttribute('class', 'btn btn-sm btn-outline-dark')
        innerButton.textContent = "Residentes"
        innerButton.onclick = function(event){
          setTimeout(
            function(){createModal('Residentes', planet.residents, planet.name)}
            , (Math.floor(Math.random()*5) + 1 * 1000));
        };
        innerDiv4.appendChild(innerButton);

        const innerSmall = document.createElement('small')
        innerSmall.setAttribute('class', 'text-muted')
        innerSmall.textContent = planet.name

        const heartDiv = document.createElement('div')

        let idName = planet.name.replace(' ','')
        heartDiv.setAttribute('id', idName);
        if(idName in likes && likes[idName] == true){
          heartDiv.setAttribute('class', 'activeHeart');
        }else{
          heartDiv.setAttribute('class', '');
        }

        heartDiv.onclick = function(){
          if(this.id in likes && likes[this.id] == true){
            likes[this.id]  = false;
            this.setAttribute('class', '');
          }else{
            likes[this.id]  = true;
            this.setAttribute('class', 'activeHeart');
          }
        }
        heartDiv.innerHTML = heartIconText;
        innerDiv3.appendChild(innerSmall)
        innerDiv3.appendChild(heartDiv);

        

        container.appendChild(div)


      })
    } else {
      console.log('error')
    }
  }

  request.send()
}
 

function createModal(name, elements, planet){
  const innerAccordion = document.createElement('div')
  innerAccordion.setAttribute('class', 'row');
  innerAccordion.setAttribute('id', 'residentesModal');
  const modalName = document.getElementById('exampleModalLabel');
  modalName.innerText = name;
  const modalBody = document.getElementById('modalBody');
  console.log('modal body:', modalBody);
  modalBody.innerHTML= '';
  modalBody.appendChild(innerAccordion);

  const modal = document.getElementById('exampleModal');
  modal.addEventListener('hide.bs.modal', function(){
    modalBody.innerHTML= '';
  });
  
  elements.forEach((people) => {
    createAccordionItem(people, planet, innerAccordion);
    
  });
  return innerAccordion;
}


function createAccordionItem(people, planet, planetAccordion){
  let peopleRequest = new XMLHttpRequest()
  const modalDiv = document.createElement('div')
  
  let peopleId = people.substring(people.length - 4, people.length - 2).replace('/','');
  console.log('Request state:', peopleRequest.readyState);

  
  peopleRequest.open('GET', people.replace('http','https'), true);
  peopleRequest.onload = function () {
    
    var data = JSON.parse(this.response)

    if (peopleRequest.status >= 200 && peopleRequest.status < 400) {
      console.log(data)

      modalDiv.setAttribute('class', 'card mb-4 yellow-background');

      const innerImg = document.createElement('img')
      innerImg.setAttribute('class', 'card-img-top')
      innerImg.setAttribute('src', 'assets\\characters\\' + data.name.replace(' ','') + ".png")
      modalDiv.appendChild(innerImg)

      const innerDiv2 = document.createElement('div')
      innerDiv2.setAttribute('class', 'card-body')
      modalDiv.appendChild(innerDiv2)

      // const innerP = document.createElement('p')
      // innerP.setAttribute('class', 'card-text')
      // innerP.textContent = "Nombre: " + data.name + String.fromCharCode(13)
      // innerDiv2.appendChild(innerP)

      // const innerP2 = document.createElement('p')
      // innerP2.setAttribute('class', 'card-text')
      // innerP2.textContent = "Periodo de orbitación: " + data.orbital_period + String.fromCharCode(13)
      // innerDiv2.appendChild(innerP2)

      // const innerP3 = document.createElement('p')
      // innerP3.textContent = "Población: " + data.population + String.fromCharCode(13)
      // innerP3.setAttribute('class', 'card-text')
      // innerDiv2.appendChild(innerP3)

      const innerDiv3 = document.createElement('div')
      innerDiv3.setAttribute('class', 'd-flex justify-content-between align-items-center')
      innerDiv2.appendChild(innerDiv3)

      const innerSmall = document.createElement('small')
      innerSmall.setAttribute('class', 'text-muted')
      innerSmall.textContent = data.name
      innerDiv3.appendChild(innerSmall)

      const heartDiv = document.createElement('div')
      let idName = data.name.replace(' ','')
      heartDiv.setAttribute('id', idName);
      if(idName in likes && likes[idName] == true){
        heartDiv.setAttribute('class', 'activeHeart');
      }else{
        heartDiv.setAttribute('class', '');
      }

      heartDiv.onclick = function(){
        if(this.id in likes && likes[this.id] == true){
          likes[this.id]  = false;
          this.setAttribute('class', '');
        }else{
          likes[this.id]  = true;
          this.setAttribute('class', 'activeHeart');
        }
      }

      heartDiv.innerHTML = heartIconText;
      innerDiv3.appendChild(heartDiv);


      // const accordionH2 = document.createElement('h2');
      // accordionH2.setAttribute('class', 'accordion-header');
      // accordionH2.setAttribute('id', 'flush-heading'+peopleId);
      // innerAccordionItem.appendChild(accordionH2);

      // const accordionButton = document.createElement('button');
      // accordionButton.setAttribute('class', 'accordion-button collapsed');
      // accordionButton.setAttribute('tpye', 'button');
      // accordionButton.setAttribute('data-bs-toggle', 'collapse');
      // accordionButton.setAttribute('data-bs-target', '#flush-collapse'+peopleId);
      // accordionButton.setAttribute('aria-expanded', 'false');
      // accordionButton.setAttribute('aria-controls', 'flush-collapse'+peopleId);
      // accordionButton.textContent = data.name;
      // accordionH2.appendChild(accordionButton);

      planetAccordion.appendChild(modalDiv);
    }
    // <div class="accordion accordion-flush" id="accordionDiv">
  // <div class="accordion-item">
    // <h2 class="accordion-header" id="flush-headingOne">
      // <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      //   Accordion Item #1
      // </button>
   // </h2>
    // <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    //   <div class="accordion-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
    // </div>
  // </div>
  // </div>

  }
  console.log('People URL:', people.replace('http','https'));
  
  peopleRequest.send()
  console.log('Request state:', peopleRequest.readyState);

  return modalDiv;
}
