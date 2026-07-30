console.log("👑 KAYLA MODE pare!");


// RECHÈCH PWODWI

function searchProduct(){

let search = document
.getElementById("searchBox")
.value
.toLowerCase();


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
<script>
const photoProduit = document.getElementById("photoProduit");
const previewPhoto = document.getElementById("previewPhoto");

photoProduit.addEventListener("change", function(){

const file = this.files[0];

if(file){
const imageURL = URL.createObjectURL(file);
previewPhoto.src = imageURL;
}

});
</script>
