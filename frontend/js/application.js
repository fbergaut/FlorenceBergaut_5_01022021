// Afficher le nombre de commande dans le panier à côté du panier sur toutes les pages
let nombreArticle = localStorage.getItem("cartNumbers");
document.querySelector(
  ".showNumberOfProductInCart"
).textContent = nombreArticle;



///////////////////////////////////////////////////////////////////////////////////////
//// Création d'une Class App : gérer les récupérations et transmission de données ////
///////////////////////////////////////////////////////////////////////////////////////

class App {
  //---------------------Méthode :  faire passer l'id produit par l'url

  static getIdByUrl() {
    let urlId = new URLSearchParams(document.location.search).get("id");
    return urlId;
  }

  //---------------------Méthode :  faire passer le prix par l'url

  static getPriceByUrl() {
    let urlPrice = new URLSearchParams(document.location.search).get("price");
    return urlPrice;
  }

  //---------------------Méthode :  obtenir les datas de l'api de tous les produits

  static getAllProducts = async (url) => {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let products = await response.json();
        return products;
      } else {
        console.log("La requête n'a pas abouti : " + response.status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //---------------------Méthode :  obtenir les datas de l'api d'un produit

  static getProduct = async (url) => {
    let resp = await fetch(url, {
      method: "GET",
    });
    let response = await resp.json();
    return response;
  };

  //---------------------Méthode :  envoyer les datas de l'api d'un produit

  static postDatas = async (url, data) => {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (response.ok) {
        let responseData = response.json();
        return responseData;
      } else {
        console.error("Problème du serveur : " + response.status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //---------------------Méthode :  mettre à jour le prix

  static upDatePrice(e, htmlElt) {
    let val = e.target.value;
    htmlElt.textContent = parseInt(val) * price;
  }
}