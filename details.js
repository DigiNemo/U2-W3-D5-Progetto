const addressBarContent = new URLSearchParams(location.search);

const eventId = addressBarContent.get("eventId");
console.log(eventId);

const generateEventDetails = function (details) {
  const row = document.getElementById("event-details");
  row.innerHTML = `
        <div class="col col-12 col-lg-6">
            <h2 class="text-center">DETTAGLI DELLA BICI</h2>
            <img
              src="https://ichef.bbci.co.uk/images/ic/1200x675/p0fq9cyz.jpg"
              class="w-100"
              alt="generic concert picture"
            />
            <h3 class="text-center mt-4">NOME CONCERTO</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
              exercitationem quisquam ut. Eos molestias officia a adipisci
              sapiente, impedit facere beatae corrupti iure dolore saepe, totam
              ut. Unde, labore delectus?
            </p>
            <p>Quando: -data-</p>
            <p>Prezzo: xxx€</p>
        </div>
    `;
};

const getSingleEventDetails = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/" +
      eventId,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MGQwNTEzOWM0MzAwMTg4MTQ2MWMiLCJpYXQiOjE2OTcxODkxMjUsImV4cCI6MTY5ODM5ODcyNX0.FEFcqNX56lL_Uk_b11zLMrwXzD8r2IjV9iWVSqxk1YQ",
      },
    }
  );
}
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel caricamento dei dettagli");
    }
  })
  .then((eventData) => {
    generateEventDetails(eventData);
  })
  .catch((err) => console.log("ERRORE", err));

getSingleEventDetails();

const addressBarContent = new URLSearchParams(location.search);

const eventId = addressBarContent.get("eventId");
console.log(eventId);

const deleteEvent = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/" +
      eventId,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MGQwNTEzOWM0MzAwMTg4MTQ2MWMiLCJpYXQiOjE2OTcxODkxMjUsImV4cCI6MTY5ODM5ODcyNX0.FEFcqNX56lL_Uk_b11zLMrwXzD8r2IjV9iWVSqxk1YQ",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        alert("EVENTO ELIMINATO");
        location.assign("./index.html");
      } else {
        alert("Problema con l'eliminazione dell'evento");
        throw new Error("Errore nella DELETE");
      }
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

const generateEventDetails = function (details) {
  const row = document.getElementById("event-details");
  row.innerHTML = `
        <div class="col col-12 col-lg-6">
            <h2 class="text-center">DETTAGLI DELL'EVENTO</h2>
            <img
              src="https://ichef.bbci.co.uk/images/ic/1200x675/p0fq9cyz.jpg"
              class="w-100"
              alt="generic concert picture"
            />
            <h3 class="text-center mt-4">NOME CONCERTO</h3>
            <h3 class="text-center mt-4">${details.name}</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
              exercitationem quisquam ut. Eos molestias officia a adipisci
              sapiente, impedit facere beatae corrupti iure dolore saepe, totam
              ut. Unde, labore delectus?
              ${details.description}
            </p>
            <p>Quando: -data-</p>
            <p>Prezzo: xxx€</p>
            <p>Quando:${new Date(details.time).toLocaleDateString("it-IT")}</p>
            <p>Prezzo: ${details.price}€</p>
            <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            <a class="btn btn-warning" href="./backoffice.html?eventId=${
              details._id
            }">MODIFICA</a>
        </div>
    `;
};
const getSingleEventDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/agenda/" + eventId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((eventData) => {
      generateEventDetails(eventData);
    })
    .catch((err) => console.log("ERRORE", err));
};
getSingleEventDetails();
