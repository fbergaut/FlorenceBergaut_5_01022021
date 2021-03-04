// var bearsRequest = new XMLHttpRequest();
// bearsRequest.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     var response = JSON.parse(this.responseText);
//     console.log(response);
//   }
// };

// bearsRequest.open("GET", "http://localhost:3000/api/teddies");
// bearsRequest.send();



fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((response) => alert(JSON.stringify(response)))
  .catch((error) => alert("Erreur : " + error));
