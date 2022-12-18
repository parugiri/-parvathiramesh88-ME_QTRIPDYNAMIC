import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint+"/reservations/");
    const data = await res.json();
    return data; 
     }
     catch(error){
     return null;
     }
     



  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
        
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */debugger;
    if (reservations.length == [])
    {
      
      document.getElementById("reservation-table-parent").style.display = "none";
      document.getElementById("no-reservation-banner").style.display = "block";
   
    }
    else
    {
      document.getElementById("reservation-table-parent").style.display = "block";
      document.getElementById("no-reservation-banner").style.display = "none";
    let tableBody = document.getElementById("reservation-table");
    reservations.forEach((reserve) => {
      let date = new Date(reserve["date"]);
      let time = new Date(reserve["time"]);
      const options = {  year: 'numeric', month: 'long', day: 'numeric' };
      let rowElement = document.createElement("tr");
      rowElement.innerHTML = `
            <tr>
              <td>${reserve["id"]}</td>
              <td>${reserve["name"]}</td>
              <td>${reserve["adventureName"]}</td>
              <td>${reserve["person"]}</td>
              <td>${date.toLocaleDateString("en-IN")}</td>
              <td>${reserve["price"]}</td>
              <td>${time.toLocaleDateString('en-in', options)}, ${time.toLocaleTimeString('en-in')}</td>
              <td id =${reserve["id"]}><a href="../detail/?adventure=${reserve["adventure"]}" class="reservation-visit-button">View Adventure</a>
              </td>
            </tr>`;
      tableBody.appendChild(rowElement);
    });
}
}


export { fetchReservations, addReservationToTable };
