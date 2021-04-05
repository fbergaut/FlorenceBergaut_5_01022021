class App{

    // obtenir l'id par l'url

    static getIdByUrl(){
    let urlId = new URLSearchParams(document.location.search).get("id");
    return urlId
    }

    
    static getAllProducts = async (url)=>{
        try {
            let response = await fetch(url);
            if (response.ok){
                let products = await response.json();
                return products
            } else {
                console.log("La requête n'a pas abouti : " + response.status);
            }
        } catch (e) {
            console.error(e);
        }
    }

    
    // On se connecte à l'API et on récupère tous les teddies de la base + l'_id de chaque teddy.

    static getProduct = async (url) => {
        let resp = await fetch(url, {
        method: "GET",
        });
        let response = await resp.json();
        return response;
    }


    static upDatePrice(e,htmlElt){
        let val =e.target.value;
        htmlElt.textContent  = parseInt(val)*price;
    }
}