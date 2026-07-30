console.log("👑 KAYLA MODE pare!");


const bouton = document.querySelector("button");


bouton.addEventListener("click", function(){

alert("Byenveni nan KAYLA MODE 🛍️ Nouvo koleksyon yo ap vini!");

});
function searchProduct(){

let search = document.getElementById("searchBox").value.toLowerCase();

if(search.includes("rob")){
alert("👗 Rob Elegant disponib - 2500 Gdes");
}

else if(search.includes("soulye")){
alert("👟 Soulye Fashion disponib - 3000 Gdes");
}

else if(search.includes("sak")){
alert("👜 Sak Fashion disponib - 2000 Gdes");
}

else{
alert("❌ Nou pa jwenn pwodwi sa a");
}

}
