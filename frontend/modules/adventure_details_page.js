import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  const advnId = searchParams.get("adventure");
  return advnId;



  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    const data = await res.json();
    return data; 
     }
     catch(error){
     return null;
     }
  


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
   let heading = document.getElementById("adventure-name");
   heading.textContent = adventure.name;
   let subTitle = document.getElementById("adventure-subtitle");
   subTitle.textContent = adventure.subtitle;
   let imgContainer = document.getElementById("photo-gallery");
   (adventure.images).forEach((element)=>
   {
     let imgChildDiv = document.createElement("div");
     let imgElement = document.createElement("img");
     imgElement.setAttribute("src", element);
     imgElement.setAttribute("alt",adventure.name);
     imgElement.className = "activity-card-image img-responsive";
     imgChildDiv.append(imgElement);
     imgContainer.append(imgChildDiv);
   });
   let content = document.getElementById("adventure-content");
   content.textContent = adventure.content;

   
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imgContainer = document.getElementById("photo-gallery");
  //let carouselIndicators = document.createElement("div");
  imgContainer.innerHTML = `<div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
 <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
 <span class="carousel-control-next-icon" aria-hidden="true"></span>
 <span class="visually-hidden">Next</span>
</button>`

let carouselElement = document.getElementById("carouselIndicators")
let carouselChild = document.createElement("div");
carouselChild.className = "carousel-indicators";
images.forEach((element,index) =>{
 let btnElement = document.createElement("button");
 if(index ==0)
 {
  btnElement.className = "active";
  btnElement.setAttribute("aria-current","true");
 }
 btnElement.setAttribute("type","button");
 btnElement.setAttribute("data-bs-target","#carouselIndicators");
 btnElement.setAttribute("data-bs-slide-to",index);
 btnElement.setAttribute("aria-label","Slide "+index);
 carouselChild.append(btnElement);
});
carouselElement.append(carouselChild);


 let carouselInnerDiv = document.createElement("div");
 carouselInnerDiv.className = "carousel-inner";
 images.forEach((element,index) =>{
 let carouselItemDiv = document.createElement("div");
 if (index == 0){
  carouselItemDiv.className = "carousel-item active";
 }
 else{
  carouselItemDiv.className = "carousel-item";
 }
 
 let imgElement = document.createElement("img");
 imgElement.className = "d-block activity-card-image";
 imgElement.setAttribute("alt","img"+"-"+index);
 imgElement.setAttribute("src",element);
 carouselItemDiv.append(imgElement);
 carouselInnerDiv.append(carouselItemDiv);
 carouselElement.append(carouselInnerDiv);
 });
 
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
      
     if (adventure.available)
     { 
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-person-cost") .textContent = adventure.costPerHead;
      document.getElementById("reservation-panel-available").style.display = "block";
     }
     else 
     {
      document.getElementById("reservation-panel-available").style.display = "none";
      document.getElementById("reservation-panel-sold-out").style.display = "block";
     }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
      let reservationCostDiv = document.getElementById("reservation-cost");
      let totalCost = adventure.costPerHead * persons;
      reservationCostDiv.textContent = totalCost;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let  adventureId = adventure["id"];
  let formData = document.getElementById("myForm");
  formData.addEventListener("submit", async (e)=>
  {
  try {
    
  let name = formData.elements["name"].value;
  let date = new Date(formData.elements["date"].value);
  let person = formData.elements["person"].value;


    e.preventDefault();
    const dataob = {
                  name:name,
                  date:date,
                  person:person,
                  adventure:adventureId };
     const res = await fetch(config.backendEndpoint+"/reservations/new", {
          method: "POST",
          body: JSON.stringify(dataob),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });
      const data = await res.json();
      alert("Success!");
      location.reload();
      }
      catch (error)
      {
        alert("Failed!");

      }
 });


}

  
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
       if (adventure.reserved )
       {
        document.getElementById("reserved-banner").style.display = "block";
       }
       else{
        document.getElementById("reserved-banner").style.display = "none";
       }
     
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
