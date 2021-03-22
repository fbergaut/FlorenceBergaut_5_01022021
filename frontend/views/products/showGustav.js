// On se connecte à l'API et récupère tous les teddies de la base

async function getTeddies() {
  let rep = await fetch("http://localhost:3000/api/teddies", {
    method: "GET",
  });
  let reponse = await rep.json();
  return reponse;
}

let oneTeddy = "";
let oneBearProduct = document.querySelector(".productImg");

// On stock dans la variable bears les datas récupérées de l'API

let bears = getTeddies().then((data) => {
  // On stock les datas du array[0] dans la variable norbert
  let gustav = data[3];

  oneTeddy += `<div class="row">
                        <div class="col-lg-6">
                          <div class="mainImg">
                            <img class="card-img-top" src="${
                              gustav.imageUrl
                            }" alt="${gustav.name}">
                          </div>
                        </div>
                        <div class="col-12 col-lg-6">
                          <div class="wrapperHeading">
                            <h1 class="heading">${gustav.name}</h1>
                              <a class="heartBtn">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                              </a>
                            </div>
                          <div class="text">${gustav.description}</div>
                          <div class="reviewWrapper">
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                            <i class="fas fa-star reviewBtn" aria-hidden="true"></i>
                          </div>
                          <p class="price">${gustav.price / 100} €</p>
                          <div class="colorWrapper">
                            <select class="productColor">
                              <option class="productColorOption" selected="true">Choisir la couleur</option>
                              <option class="productColorOption">${
                                gustav.colors[0]
                              }</option>
                              <option class="productColorOption">${
                                gustav.colors[1]
                              }</option>
                              <option class="productColorOption">${
                                gustav.colors[2]
                              }</option>
                            </select>
                          </div>
                          <div class="wrapper">
                            <div class="wrapperQuantity">
                              <label class="hidden" for="quantity">Quantité</label>
                                <input class="quantity" type="number" value="1" id="quantity" min="1" max="100">
                            </div>
                            <div>
                              <button class="btn btn-outline-pink btn-lg rounded-0 addCartBtn" type="submit">Ajouter au panier</button>
                            </div>
                          </div>
                        </div>
                      </div>`;

  // On affiche les options de couleurs
  // const selectColor = document.querySelector(".productColor");
  // let colorsOption = norbert.colors;

  // colorsOption.forEach((color) => {
  //   const optionProductColor = document.createElement("option");
  //   optionProductColor.setAttribute("class", "productColorOption");
  //   optionProductColor.innerHTML = color;
  //   console.log(optionProductColor);
  //   // selectColor.appendChild(optionProductColor);
  // });

  oneBearProduct.innerHTML = oneTeddy;
});
