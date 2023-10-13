const renderEvents = function (arrayOfEvents) {
  const row = document.getElementById("events-row");
  arrayOfEvents.forEach((event) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3");

    newCol.innerHTML = `
      <div class="card">
          <img src="${event.image}" class="card-img-top" alt="generic concert picture">
          <div class="card-body">
              <h5 class="card-title">${event.brand}</h5>
              <h6 class="card-title">${event.model}</h6>
              <p class="card-text">${event.description}</p>
              <p class="card-text">Prezzo: ${event.price}€</p>
              <a href="./detail.html?eventId=${event._id}" class="btn btn-primary">DETTAGLI</a>
          </div>
      </div>
      `;
    row.appendChild(newCol);
  });
};

const hideSpinner = function () {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getEvents = function () {
  fetch("https://striveschool-api.herokuapp.com/api/bike/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MGQwNTEzOWM0MzAwMTg4MTQ2MWMiLCJpYXQiOjE2OTcxODkxMjUsImV4cCI6MTY5ODM5ODcyNX0.FEFcqNX56lL_Uk_b11zLMrwXzD8r2IjV9iWVSqxk1YQ",
    },
  })
    .then((res) => {
      hideSpinner();

      console.log("Response ottenuta dalla GET", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel contattare il server");
      }
    })
    .then((events) => {
      console.log("EVENTS", events);
      renderEvents(events);
    })
    .catch((err) => {
      hideSpinner();
      console.log("Si è verificato un errore:", err);
    });
};
getEvents();
