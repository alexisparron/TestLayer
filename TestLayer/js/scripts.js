let request = new XMLHttpRequest()
const container = document.getElementById('root');

request.open('GET', 'https://swapi.dev/api/planets/', true)
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

      const innerDiv4 = document.createElement('div')
      innerDiv4.setAttribute('class', 'btn-group')
      innerDiv3.appendChild(innerDiv4)

      const innerButton = document.createElement('button')
      innerButton.setAttribute('type', 'button')
      innerButton.setAttribute('class', 'btn btn-sm btn-outline-dark')
      innerButton.textContent = "Ver más"
      innerDiv4.appendChild(innerButton)

      const innerSmall = document.createElement('small')
      innerSmall.setAttribute('class', 'text-muted')
      innerSmall.textContent = planet.name
      innerDiv3.appendChild(innerSmall)

      container.appendChild(div)

    })
  } else {
    console.log('error')
  }
}

request.send()



