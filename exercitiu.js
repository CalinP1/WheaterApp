const file = "fetch_info.txt";

fetch(file)
    .then( x =>x.text())
    .then( y =>document.getElementById("demo").innerHTML = y);


    document.getElementById