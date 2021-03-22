// On se connecte à l'API et récupère tous les teddies de la base

async function getTeddies() {
  let rep = await fetch("http://localhost:3000/api/teddies", {
    method: "GET",
  });
  let reponse = await rep.json();
  return reponse;
}

// On stock dans la variable bears les datas récupérées de l'API

let bears = getTeddies().then((data) => {
  let bears = document.getElementById("productPage");
  // On stock les datas du array[0] dans la variable norbert
  let garfunkel = data[4];
  // console.log(norbert);

  /*------------------------MainImg-------------------------*/

  // On crée les éléments html nécessaire afin d'acceuillir l'<img>

  const divProductImg = document.createElement("div");
  const divRowProductImg = document.createElement("div");
  const divColProductImg = document.createElement("div");
  const divMainImg = document.createElement("div");
  const mainImg = document.createElement("img");

  // On attribut des noms de class à tous les éléments créés afin de les stylisés

  divProductImg.setAttribute("class", "container productImg");
  divRowProductImg.setAttribute("class", "row");
  divColProductImg.setAttribute("class", "col-lg-6");
  divMainImg.setAttribute("class", "mainImg");
  mainImg.setAttribute("class", "card-img-top");

  // On définit la source de l'élément <img> à imageUrl et l'attribut alt est renseigné avec le nom du produit

  mainImg.src = garfunkel.imageUrl;
  mainImg.alt = garfunkel.name;

  // On ajoute les éléments au DOM

  bears.appendChild(divProductImg);
  divProductImg.appendChild(divRowProductImg);
  divRowProductImg.appendChild(divColProductImg);
  divColProductImg.appendChild(divMainImg);
  divMainImg.appendChild(mainImg);

  /*------------------------Infos Produit-------------------------*/

  // On crée les éléments html nécessaire afin d'acceuillir les infos produit

  const divColProductInfo = document.createElement("div");
  const divWrapperHeading = document.createElement("div");
  const h1Info = document.createElement("h1");
  const aHeartBtn = document.createElement("a");
  const iconHeart = document.createElement("i");
  const divDescriptionProduct = document.createElement("div");
  const divReviewWrapper = document.createElement("div");
  const divPriceProduct = document.createElement("p");
  const divColorWrapper = document.createElement("div");
  const selectColor = document.createElement("select");
  const optionChooseColor = document.createElement("option");
  const divQuantity = document.createElement("div");
  const divQuantityWrapper = document.createElement("div");
  const labelQuantity = document.createElement("label");
  const inputQuantity = document.createElement("input");
  const divBtnWrapper = document.createElement("div");
  const buttonUp = document.createElement("button");
  const iconUp = document.createElement("i");
  const buttonDown = document.createElement("button");
  const iconDown = document.createElement("i");
  const divSubmitBtnWrapper = document.createElement("div");
  const buttonSubmit = document.createElement("button");

  // On attribut des noms de class à tous les éléments créés afin de les stylisés

  divColProductInfo.setAttribute("class", "col-12 col-lg-6");
  divWrapperHeading.setAttribute("class", "wrapperHeading");
  h1Info.setAttribute("class", "heading");
  aHeartBtn.setAttribute("class", "heartBtn");
  iconHeart.setAttribute("class", "fas fa-heart");
  divDescriptionProduct.setAttribute("class", "text");
  divReviewWrapper.setAttribute("class", "reviewWrapper");
  divPriceProduct.setAttribute("class", "price");
  divColorWrapper.setAttribute("class", "colorWrapper");
  selectColor.setAttribute("class", "productColor");
  optionChooseColor.setAttribute("class", "productColorOption");
  divQuantity.setAttribute("class", "wrapper");
  divQuantityWrapper.setAttribute("class", "wrapperQuantity");
  labelQuantity.setAttribute("class", "hidden");
  inputQuantity.setAttribute("class", "quantity");
  divBtnWrapper.setAttribute("class", "wrapperBtn");
  buttonUp.setAttribute("class", "quantityBtn");
  iconUp.setAttribute("class", "fas fa-sort-up");
  buttonDown.setAttribute("class", "quantityBtn");
  iconDown.setAttribute("class", "fas fa-sort-down");
  buttonSubmit.setAttribute(
    "class",
    "btn btn-outline-pink btn-lg rounded-0 addCartBtn"
  );

  // On attribut "for" à l'élément <label>

  optionChooseColor.setAttribute("selected", true);

  // On attribut "for" à l'élément <label>

  labelQuantity.setAttribute("for", "quantity");

  // On attribut "type", "value", "id", "pattern" à l'élément <input>

  inputQuantity.setAttribute("type", "text");
  inputQuantity.setAttribute("value", "1");
  inputQuantity.setAttribute("id", "quantity");
  inputQuantity.setAttribute("pattern", "[0-9]*");

  // On attribut "type" aux éléments <button> de l'input

  buttonUp.setAttribute("type", "button");
  buttonDown.setAttribute("type", "button");

  // On attribut "type" à l'élément <button> du formulaire

  buttonSubmit.setAttribute("type", "submit");

  // On affiche les infos produit

  h1Info.innerHTML = garfunkel.name;
  divDescriptionProduct.innerHTML = garfunkel.description;
  divPriceProduct.innerHTML = garfunkel.price + " €";

  optionChooseColor.innerHTML = "Choisir la couleur";
  labelQuantity.innerHTML = "Quantité";
  buttonSubmit.innerHTML = "Ajouter au panier";

  // On ajoute les éléments au DOM pour créer la partie présentation de produit sur index.html

  divRowProductImg.appendChild(divColProductInfo);
  divColProductInfo.appendChild(divWrapperHeading);
  divWrapperHeading.appendChild(h1Info);
  divWrapperHeading.appendChild(aHeartBtn);
  aHeartBtn.appendChild(iconHeart);

  divColProductInfo.appendChild(divDescriptionProduct);
  divColProductInfo.appendChild(divReviewWrapper);
  divColProductInfo.appendChild(divPriceProduct);
  divColProductInfo.appendChild(divColorWrapper);
  divColorWrapper.appendChild(selectColor);
  selectColor.appendChild(optionChooseColor);

  divColProductInfo.appendChild(divQuantity);
  divQuantity.appendChild(divQuantityWrapper);
  divQuantityWrapper.appendChild(labelQuantity);
  divQuantityWrapper.appendChild(inputQuantity);
  divQuantityWrapper.appendChild(divBtnWrapper);
  divBtnWrapper.appendChild(buttonUp);
  buttonUp.appendChild(iconUp);
  divBtnWrapper.appendChild(buttonDown);
  buttonDown.appendChild(iconDown);

  divQuantity.appendChild(divSubmitBtnWrapper);
  divSubmitBtnWrapper.appendChild(buttonSubmit);

  // On crée une boucle pour créer les <i> (étoiles) de reviewWrapper

  for (let i = 0; i <= 4; i++) {
    const iconReviewBtn = document.createElement("i");
    iconReviewBtn.setAttribute("class", "fas fa-star reviewBtn");
    divReviewWrapper.appendChild(iconReviewBtn);
  }

  // On affiche les options de couleurs

  let colorsOption = garfunkel.colors;

  colorsOption.forEach((color) => {
    // console.log(color);
    const optionProductColor = document.createElement("option");
    optionProductColor.setAttribute("class", "productColorOption");
    optionProductColor.innerHTML = color;
    selectColor.appendChild(optionProductColor);
  });
});
