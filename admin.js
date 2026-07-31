let imageProduit = "";

let editIndex = -1;



function loginAdmin(){

    const password = document.getElementById("adminPassword").value;


    if(password === "KAYLA2026"){

        localStorage.setItem("adminLogin","true");

        document.getElementById("loginBox").style.display="none";
        document.getElementById("adminPanel").style.display="block";

    }else{

        alert("Modpas la pa bon ❌");

    }

}




function checkLogin(){

    if(localStorage.getItem("adminLogin") === "true"){

        document.getElementById("loginBox").style.display="none";
        document.getElementById("adminPanel").style.display="block";

    }

}




function logoutAdmin(){

    localStorage.removeItem("adminLogin");

    document.getElementById("loginBox").style.display="block";
    document.getElementById("adminPanel").style.display="none";

}





const photoProduit = document.getElementById("photoProduit");
const previewPhoto = document.getElementById("previewPhoto");



photoProduit.addEventListener("change",function(){

    const file=this.files[0];


    if(file){

        imageProduit = URL.createObjectURL(file);

        previewPhoto.src=imageProduit;

    }

});







function ajouterProduit(){


    const nom = document.getElementById("nomProduit").value;

    const prix = document.getElementById("prixProduit").value;

    const ancienPrix = document.getElementById("ancienPrix").value;

    const categorie = document.getElementById("categorieProduit").value;

    const tag = document.getElementById("tagProduit").value;



    if(nom==="" || prix==="" || imageProduit===""){

        alert("Ranpli tout enfòmasyon yo");

        return;

    }




    let produit = {

        nom: nom,

        prix: prix + " Gdes",

        ancienPrix: ancienPrix ? ancienPrix + " Gdes" : "",

        categorie: categorie,

        tag: tag,

        image: imageProduit

    };





    let produits = JSON.parse(localStorage.getItem("produits")) || [];





    if(editIndex === -1){

        produits.push(produit);

    }else{

        produits[editIndex]=produit;

        editIndex=-1;

    }





    localStorage.setItem("produits",JSON.stringify(produits));



    afficherProduits();



    netwayeFom();

}





function netwayeFom(){


    document.getElementById("nomProduit").value="";

    document.getElementById("prixProduit").value="";

    document.getElementById("ancienPrix").value="";

    previewPhoto.src="";

    imageProduit="";

}





function afficherProduits(){


    const liste=document.getElementById("listeProduits");


    let produits=JSON.parse(localStorage.getItem("produits")) || [];



    if(document.getElementById("totalProduits")){

        document.getElementById("totalProduits").innerHTML=produits.length;

    }




    liste.innerHTML="<h2>🛍️ Pwodwi yo</h2>";





    produits.forEach(function(produit,index){



        liste.innerHTML += `


        <div class="product-admin">


        <img src="${produit.image}" width="120">


        <h3>${produit.tag} ${produit.nom}</h3>


        <p>
        ${produit.ancienPrix ? produit.ancienPrix+" ➜ " : ""}
        ${produit.prix}
        </p>


        <p>
        📂 ${produit.categorie}
        </p>




        <button onclick="modifierProduit(${index})">

        ✏️ Modifye

        </button>




        <button onclick="supprimerProduit(${index})">

        🗑️ Efase

        </button>



        </div>



        `;



    });


}







function modifierProduit(index){


    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    let produit = produits[index];



    document.getElementById("nomProduit").value=produit.nom;

    document.getElementById("prixProduit").value=produit.prix.replace(" Gdes","");

    document.getElementById("ancienPrix").value=produit.ancienPrix.replace(" Gdes","");


    document.getElementById("categorieProduit").value=produit.categorie;

    document.getElementById("tagProduit").value=produit.tag;


    imageProduit=produit.image;

    previewPhoto.src=produit.image;


    editIndex=index;


}







function supprimerProduit(index){


    let produits = JSON.parse(localStorage.getItem("produits")) || [];


    produits.splice(index,1);



    localStorage.setItem("produits",JSON.stringify(produits));



    afficherProduits();


}







function rechercherProduit(){


    const rech=document.getElementById("searchAdmin").value.toLowerCase();


    let produits=JSON.parse(localStorage.getItem("produits")) || [];



    let rezilta=produits.filter(function(produit){


        return produit.nom.toLowerCase().includes(rech);


    });




    const liste=document.getElementById("listeProduits");


    liste.innerHTML="<h2>🔍 Rezilta</h2>";



    rezilta.forEach(function(produit){


        liste.innerHTML+=`

        <div class="product-admin">

        <h3>${produit.nom}</h3>

        <p>${produit.prix}</p>

        </div>

        `;


    });


}






checkLogin();

afficherProduits();
