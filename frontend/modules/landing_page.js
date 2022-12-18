import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  try{
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}
catch(error)
{
  alert(error);
}
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    try {
   const res = await fetch(config.backendEndpoint+"/cities");
   const data = await res.json();
   return data; 
    }
    catch(error){
    return null;
    }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let divElement = document.getElementById("data");
    let childDiv = document.createElement("div");
    childDiv.className = "col-6 col-lg-3 mb-4";
    let anchorElement = document.createElement("a");
    anchorElement.setAttribute("id",id);
    anchorElement.setAttribute("href","pages/adventures/?city="+id);
    let childDiv1 = document.createElement("div");
    childDiv1.className = "tile";
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src",image);
    imgElement.className = "img-fluid";
    let childDiv2 = document.createElement("div");
    childDiv2.className = "tile-text text-center";
    let h5Element = document.createElement("h5");
    h5Element.textContent = city;
    let pElement = document.createElement("p");
    pElement.textContent = description;
    childDiv2.append(h5Element);
    childDiv2.append(pElement);
    childDiv1.append(imgElement);
    childDiv1.append(childDiv2);
    anchorElement.append(childDiv1);
    childDiv.append(anchorElement);
   divElement.append(childDiv);
   
}

export { init, fetchCities, addCityToDOM };
