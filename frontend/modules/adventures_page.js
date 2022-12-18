
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const searchParams = new URLSearchParams(search);
  const city = searchParams.get("city");
  return city;


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint+"/adventures?city="+city);
    const data = await res.json();
    return data; 
     }
     catch(error){
     return null;
     }

}



 
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentDiv = document.getElementById("data");
  adventures.forEach((key) => {
  let firstDiv = document.createElement("div");
  firstDiv.className = "col-6 col-lg-3 mb-3 position-relative";
  let anchorElement = document.createElement("a");
  anchorElement.setAttribute("id",key.id);
  anchorElement.setAttribute("href","detail/?adventure="+key.id);
  let secondDiv = document.createElement("div");
  secondDiv.className = "card activity-card";
  let imgElement = document.createElement("img");
  imgElement.setAttribute("src",key.image);
  imgElement.className = "activity-card-image card-img-top img-responsive";
  let pElement = document.createElement("p");
  pElement.className = "category-banner";
  pElement.textContent = key.category;
  let thirdDiv = document.createElement("div");
  thirdDiv.className = "d-md-flex justify-content-between pt-1 px-2 "; 
  thirdDiv.setAttribute("id","thirdDiv");
  let h6Element = document.createElement("h6");
  h6Element.className = "card-title";
  h6Element.textContent = key.name;
  let pElement1 = document.createElement("p");
  pElement1.className = "card-text";
  pElement1.textContent ="₹"+ key.costPerHead;
  let fourthDiv = document.createElement("div");
  fourthDiv.className = "d-md-flex justify-content-between px-2";
  fourthDiv.setAttribute("id","thirdDiv");
  let h6Element2 = document.createElement("h6");
  h6Element2.className = "card-title";
  h6Element2.textContent = "Duration";
  let pElement2 = document.createElement("p");
  pElement2.className = "card-text";
  pElement2.textContent = key.duration + " Hours";

    
  thirdDiv.append(h6Element);
  thirdDiv.append(pElement1);
  fourthDiv.append(h6Element2);
  fourthDiv.append(pElement2);
  secondDiv.append(imgElement);
  //secondDiv.append(pElement);
  secondDiv.append(thirdDiv);
  secondDiv.append(fourthDiv);
  anchorElement.append(secondDiv);
  firstDiv.append(anchorElement);
  firstDiv.append(pElement);
  parentDiv.append(firstDiv);

});

}



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  for(let i=0 ;i<list.length; i++)
  {
    if (low <= list[i].duration && list[i].duration <= high)
    {
      filteredList.push(list[i]);
    }
  }
return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];

  list.forEach((adventure) =>{
    categoryList.forEach((category) =>{
    if (adventure.category === category)
    filteredList.push(adventure);
    });
  });

    return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

   let finalList = [];
   let limit = "";
  if(filters["category"].length>0 && filters["duration"].length>0 )
  {

    limit = filters["duration"].split("-");
    let list1 = filterByDuration(list,limit[0],limit[1]);
    finalList = filterByCategory(list1,filters["category"]);

  
  }

  else if (filters["category"].length>0 && filters["duration"].length==0 )
  {
    finalList = filterByCategory(list,filters["category"]); 
    
  }
  else if (filters["duration"].length>0 && filters["category"].length==0 )
  {
    limit = filters["duration"].split("-");
    finalList = filterByDuration(list,limit[0],limit[1]);
  
  }

  else {
    finalList = list;
  
  }
  return finalList;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
    return JSON.parse(window.localStorage.getItem("filters"));
    //return null;

  // Place holder for functionality to work in the Stubs
  //return durationVal;
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 
  
  let categoryDiv = document.getElementById("category-list");
  for(let i =0; i<filters["category"].length;i++){
    let pillDiv = document.createElement("div");
    pillDiv.className = "category-filter";
    pillDiv.innerText = filters["category"][i];
    //let btnElement = document.createElement("button");
    //btnElement.className = "btn-close";
    //btnElement.setAttribute("id","pillBtn");
    //pillDiv.append(btnElement);
    categoryDiv.append(pillDiv);
   // btnElement.addEventListener("click",(e) =>{
    //pillDiv.style.display = "none";
    //clearSelectedCategory(filters["category"][i]);
    //});
    
  }
  document.getElementById("duration-select").value = filters["duration"];
  return categoryDiv;
}






 




export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM
};
