function loginAdmin(){

    const password = document.getElementById("adminPassword").value;


    if(password === "KAYLA2026"){

        document.getElementById("loginBox").style.display = "none";

        document.getElementById("adminPanel").style.display = "block";

    }else{

        alert("Modpas la pa bon ❌");

    }

}
let imageProduit = "";

const photoProduit = document.getElementById("photoProduit");
const previewPhoto = document.getElementById("previewPhoto");


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


    let nouveauProduit = {

        nom: nom,
        prix: prix + " Gdes",
        image: imageProduit

    };


    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    produits.push(nouveauProduit);


    localStorage.setItem("produits", JSON.stringify(produits));


    afficherProduits();


    alert("Pwodwi ajoute avèk siksè ✅");


    document.getElementById("nomProduit").value = "";
    document.getElementById("prixProduit").value = "";
    previewPhoto.src = "";

}




function afficherProduits(){

    const liste = document.getElementById("listeProduits");

    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    liste.innerHTML = "<h2>🛍️ Pwodwi yo</h2>";


    produits.forEach(function(produit){


        liste.innerHTML += `

        <div class="product-admin">

            <img src="${produit.image}" width="120">

            <h3>${produit.nom}</h3>

            <p>${produit.prix}</p>

        </div>

        `;


    });


}



afficherProduits();
