const formReference = document.getElementById("form");
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invio i dati all'API");
  const brandInput = document.getElementById("brand");
  const modelInput = document.getElementById("model");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  const newEvent = {
    brand: brandInput.value,
    model: modelInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    image: imageInput.value,
  };
  console.log("Ecco l'oggetto che manderò alle API", newEvent);

  let methodToUse = "POST";
  if (eventId) {
    methodToUse = "PUT";
  }

  let urlToUse = "https://striveschool-api.herokuapp.com/api/bike";
  if (eventId) {
    urlToUse = "https://striveschool-api.herokuapp.com/api/bike/" + eventId;
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MGQwNTEzOWM0MzAwMTg4MTQ2MWMiLCJpYXQiOjE2OTcxODkxMjUsImV4cCI6MTY5ODM5ODcyNX0.FEFcqNX56lL_Uk_b11zLMrwXzD8r2IjV9iWVSqxk1YQ",
    },
  })
    .then((res) => {
      console.log("OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST", res);
      if (res.ok) {
        alert("EVENTO SALVATO CORRETTAMENTE!");
      } else {
        alert("ERRORE NEL SALVATAGGIO DELL'EVENTO");
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
});

const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");
console.log(eventId);

if (eventId) {
  fetch("https://striveschool-api.herokuapp.com/api/bike/" + eventId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MGQwNTEzOWM0MzAwMTg4MTQ2MWMiLCJpYXQiOjE2OTcxODkxMjUsImV4cCI6MTY5ODM5ODcyNX0.FEFcqNX56lL_Uk_b11zLMrwXzD8r2IjV9iWVSqxk1YQ",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })
    .then((eventDetails) => {
      const brandInput = document.getElementById("brand");
      const modelInput = document.getElementById("model");
      const descriptionInput = document.getElementById("description");
      const priceInput = document.getElementById("price");
      const imageInput = document.getElementById("image");

      brandInput.value = eventDetails.brand;
      modelInput.value = eventDetails.model;
      descriptionInput.value = eventDetails.description;
      priceInput.value = eventDetails.price;
      imageInput.value = eventDetails.image;
    })
    .catch((err) => {
      console.log("errore", err);
    });
}
