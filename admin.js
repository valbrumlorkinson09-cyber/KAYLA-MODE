const photoProduit = document.getElementById("photoProduit");
const previewPhoto = document.getElementById("previewPhoto");

let imageProduit = "";


photoProduit.addEventListener("change", function(){

const file = this.files[0];

if(file){

imageProduit = URL.createObjectURL(file);

previewPhoto.src = imageProduit;

}

});



function ajouterProduit(){

const nom = document.getElementById("nomProduit").value;
const prix = document.getElementById("prixProduit").value;


if(nom === "" || prix === "" || imageProduit === ""){

alert("Ranpli tout enfòmasyon yo");

return;

}


const produit = {

nom: nom,
prix: prix,
image: imageProduit

};


let produits = JSON.parse(localStorage.getItem("produits")) || [];


produits.push(produit);


localStorage.setItem("produits", JSON.stringify(produits));


alert("Pwodwi ajoute avèk siksè ✅");


document.getElementById("nomProduit").value="";
document.getElementById("prixProduit").value="";
previewPhoto.src="";


}
