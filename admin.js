// =================================
// KAYLA MODE ADMIN
// LOCALSTORAGE VERSION
// PATI 1/3
// =================================


let imageProduit = "";

let editIndex = -1;




// ================================
// LOGIN ADMIN
// ================================


function loginAdmin(){

let password =
document.getElementById(
"adminPassword"
).value;


if(password === "KAYLA2026"){


localStorage.setItem(
"adminLogin",
"true"
);



document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"adminPanel"
).style.display="block";



afficherDashboard();



}else{


alert(
"Modpas la pa bon ❌"
);


}


}





function checkLogin(){


if(
localStorage.getItem(
"adminLogin"
)==="true"
){


document.getElementById(
"loginBox"
).style.display="none";


document.getElementById(
"adminPanel"
).style.display="block";


}


}





function logoutAdmin(){


localStorage.removeItem(
"adminLogin"
);


location.reload();


}






// ================================
// FOTO PWODWI
// ================================


document.addEventListener(
"DOMContentLoaded",
function(){



let photoInput =
document.getElementById(
"photoProduit"
);



let preview =
document.getElementById(
"previewPhoto"
);





if(photoInput){


photoInput.addEventListener(
"change",
function(){



let file =
this.files[0];



if(file){


let reader =
new FileReader();



reader.onload =
function(e){


imageProduit =
e.target.result;



if(preview){

preview.src =
imageProduit;

}


}



reader.readAsDataURL(
file
);



}



}

);


}



});

// =================================
// PATI 2/3
// AJOUTE + AFFICHE PWODWI
// =================================


// ================================
// AJOUTE PWODWI
// ================================


function ajouterProduit(){


let nom =
document.getElementById(
"nomProduit"
).value;



let pri =
document.getElementById(
"prixProduit"
).value;



let stock =
document.getElementById(
"stockProduit"
).value;



let ansyen =
document.getElementById(
"ancienPrix"
).value;



let kategori =
document.getElementById(
"categorieProduit"
).value;



let tag =
document.getElementById(
"tagProduit"
).value;




if(
nom === "" ||
pri === "" ||
imageProduit === ""
){


alert(
"Ranpli tout enfòmasyon yo ❌"
);


return;


}




let produit = {


nom: nom,


prix: pri + " Gdes",


stock: Number(stock) || 0,


ancienPrix:
ansyen ?
ansyen + " Gdes"
:
"",



categorie: kategori,


tag: tag,


image: imageProduit



};





let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];





if(editIndex === -1){


produits.push(
produit
);


}else{


produits[editIndex] =
produit;


editIndex = -1;


}






localStorage.setItem(

"produits",

JSON.stringify(produits)

);





alert(
"Pwodwi sove avèk siksè ✅"
);



netwayeForm();



afficherProduits();



}








// ================================
// NETWAYE FORM
// ================================


function netwayeForm(){



document.getElementById(
"nomProduit"
).value="";



document.getElementById(
"prixProduit"
).value="";



document.getElementById(
"stockProduit"
).value="";



document.getElementById(
"ancienPrix"
).value="";



imageProduit="";



let preview =
document.getElementById(
"previewPhoto"
);



if(preview){

preview.src="";

}



}








// ================================
// AFFICHE PWODWI
// ================================


function afficherProduits(){



let liste =
document.getElementById(
"listeProduits"
);



if(!liste){

return;

}





let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];





liste.innerHTML="";





if(
document.getElementById(
"totalProduits"
)
){


document.getElementById(
"totalProduits"
).innerHTML =
produits.length;


}







if(produits.length === 0){


liste.innerHTML =
"🛍️ Pa gen pwodwi";


return;


}






produits.forEach(
function(produit,index){



liste.innerHTML += `


<div class="product-admin">


<img 
src="${produit.image}"
width="120"
>


<h3>

${produit.tag || "Nouvo"}
${produit.nom}

</h3>


<p>
💰 ${produit.prix}
</p>



<p>
📂 ${produit.categorie}
</p>



<p>
📦 Stock: ${produit.stock}
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

// =================================
// PATI 3/3
// MODIFYE + EFASE + DASHBOARD + START
// =================================


// ================================
// MODIFYE PWODWI
// ================================


function modifierProduit(index){


let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];



let produit =
produits[index];



document.getElementById(
"nomProduit"
).value =
produit.nom;



document.getElementById(
"prixProduit"
).value =
produit.prix.replace(
" Gdes",
""
);



document.getElementById(
"stockProduit"
).value =
produit.stock;



document.getElementById(
"ancienPrix"
).value =
produit.ancienPrix.replace(
" Gdes",
""
);



document.getElementById(
"categorieProduit"
).value =
produit.categorie;



document.getElementById(
"tagProduit"
).value =
produit.tag;



imageProduit =
produit.image;



let preview =
document.getElementById(
"previewPhoto"
);



if(preview){

preview.src =
produit.image;

}



editIndex = index;


}







// ================================
// EFASE PWODWI
// ================================


function supprimerProduit(index){


let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];




if(
confirm(
"Efase pwodwi sa?"
)
){



produits.splice(
index,
1
);



localStorage.setItem(

"produits",

JSON.stringify(produits)

);



afficherProduits();



}



}







// ================================
// RECHÈCH PWODWI
// ================================


function rechercherProduit(){


let rech =
document.getElementById(
"searchAdmin"
).value.toLowerCase();




let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];




let rezilta =
produits.filter(
function(p){


return p.nom
.toLowerCase()
.includes(rech);


}

);





let liste =
document.getElementById(
"listeProduits"
);



liste.innerHTML="";





rezilta.forEach(
function(produit,index){



liste.innerHTML += `


<div class="product-admin">


<img src="${produit.image}" width="120">


<h3>
${produit.nom}
</h3>


<p>
${produit.prix}
</p>


</div>


`;



});



}








// ================================
// DASHBOARD
// ================================


function afficherDashboard(){



let produits =
JSON.parse(
localStorage.getItem(
"produits"
)
) || [];



let kommann =
JSON.parse(
localStorage.getItem(
"kommann"
)
) || [];





if(
document.getElementById(
"totalProduits"
)
){


document.getElementById(
"totalProduits"
).innerHTML =
produits.length;


}




if(
document.getElementById(
"totalKommann"
)
){


document.getElementById(
"totalKommann"
).innerHTML =
kommann.length;


}



}








// ================================
// DEMARAJ ADMIN
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){


checkLogin();


afficherProduits();


afficherDashboard();



});
