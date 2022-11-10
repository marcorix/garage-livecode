import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["list"]

  connect() {
    console.log("hello from the garage!");
    this.listTarget.innerHTML = "";
    // 1. Fetch all cars from the API with a GET AJAX request
    fetch("https://wagon-garage-api.herokuapp.com/usmancar/cars")
      .then(res => res.json())
      .then((data) => {
        // 2. Iterate over the cars you've just retrieved
        console.log(data)
        data.forEach((car) => {
          // 3. For each car, insert a new car card
          this.insertCarCard(car);
        });
      });
  }

  insertCarCard(car) {
    const carCard = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}%20${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`;
    this.listTarget.insertAdjacentHTML("beforeend", carCard);
  }

  createCar(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const newCar = Object.fromEntries(formData)
    // console.log(newCar)
    fetch("https://wagon-garage-api.herokuapp.com/usmancar/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar)
    });
    this.connect();
  }
}
