const ul = document.querySelector(".people");
const getBtn = document.getElementById("getAll");
const getByIdBtn = document.getElementById("getById");
const postBtn = document.getElementById("post");
const deleteBtn = document.getElementById("delete");
const locationList = document.querySelector(".location-list");
const url = "/locations";

const event = new Event("click");

getBtn.addEventListener("click", async (e) => {
  const res = await fetch(url);
  const json = await res.json();
  locationList.innerHTML = json
    .map(
      (loc) =>
        `<li>id: ${loc.id} lat: ${loc.latitude} long: ${loc.longitude}</li>`
    )
    .join("");
});

getByIdBtn.addEventListener("click", async (e) => {
  const id = document.querySelector('[name="findById"]');
  const res = await fetch(`${url}/${parseInt(id.value)}`);
  const json = await res.json();
  locationList.innerHTML = json
    .map(
      (loc) =>
        `<li>id: ${loc.id} lat: ${loc.latitude} long: ${loc.longitude}</li>`
    )
    .join("");
});

postBtn.addEventListener("click", async (e) => {
  const lat = document.querySelector('[name="lat"]');
  const long = document.querySelector('[name="long"]');
  const obj = {
    longitude: parseFloat(long.value),
    latitude: parseFloat(lat.value),
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  getBtn.dispatchEvent(event);
});

deleteBtn.addEventListener("click", async (e) => {
  const del = document.querySelector('[name="deleteById"]');

  const res = await fetch(`${url}/${parseInt(del.value)}`, {
    method: "DELETE",
  });
  const json = await res.json();
  alert(json.msg);
  getBtn.dispatchEvent(event);
});
