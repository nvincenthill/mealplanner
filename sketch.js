//meal planning and shopping list generator

let recipes;
let gbutton;
let ibutton;
let dbutton;
let hbutton;
let foodImages;
let rand_recipes = [];
let grocerylist;
let groceryListDisplay = false;
let arr_rows;

function setup() {
    noCanvas();
    loadJSON("recipes.json", gotData);
    
    gbutton = select("#generate");
        gbutton.mousePressed(randomize);
    
    dbutton = selectAll('.btn-warning');
        for (let i = 0; i < dbutton.length; i++) {
            dbutton[i].mousePressed(function() { removeRecipe(i);});
//            dbutton[i].mouseOver(function() { desaturateImage(i);});
//            dbutton[i].mouseOut (function() { saturateImage(i);});
        }
    ibutton = select("#ibutton");
        ibutton.mousePressed(createThenDisplay);
    hbutton = select("#hbutton");
            hbutton.mousePressed(hideGroceryList);
}

function draw() {
    background(0);
}

function createThenDisplay() {
    console.log("Creating then displaying grocery list...");
    refreshInventory();
    createGroceryList();
    displayGroceryList();
}

//function changeRowColor(i) {
//    let temp = select("row" + i);
//    temp.style("background-color", "green");   
//}

//function desaturateImage(i) {
//    let temp = select(arr[i]);
//    temp.style("-webkit-filter", "grayscale(100%)")       
//}
//
//function saturateImage(j) {
//    let temp = select(arr[j]);
//    temp.style("-webkit-filter", "none")      
//}

function gotData(data) {
    recipes = data;
}

function randomize() {
    rand_recipes = [];
    for (let i = 0; i < 6 ; i++) {
        let temp = random(recipes)
        if (!rand_recipes.includes(temp)) {
            rand_recipes.push(temp);
        } else {
            i --;
        }
    }
    console.table(rand_recipes);
    displayMenu()
}

function removeRecipe(k) {
    console.log("Removing Recipe...");
    for (let i = 0; i < 1 ; i++) { 
        let temp = random(recipes)
            if (!rand_recipes.includes(temp)) {
            rand_recipes[k] = temp;
            } else {
                i --;
            }
    }
    refreshInventory();
    console.log("I removed an item");
}

function displayMenu() {
    console.log("Displaying Menu...");
    let dinnerNameArr = ["dinnername1", "dinnername2", "dinnername3", "dinnername4", "dinnername5", "dinnername6"];
    let dinnerDefArr = ["dinnerdef1", "dinnerdef2", "dinnerdef3", "dinnerdef4", "dinnerdef5", "dinnerdef6"];
    let dinnerImgArr = ["dinnerimg1", "dinnerimg2", "dinnerimg3", "dinnerimg4", "dinnerimg5", "dinnerimg6"];
    let dinnerModalButnsArr = ["modal1", "modal2", "modal3", "modal4", "modal5", "modal6"];
    let directionsModalHeaderIdArr = ["directionsheader1"]
    let modalRecipeName = ["nameOfRecipe1", "nameOfRecipe2", "nameOfRecipe3", "nameOfRecipe4", "nameOfRecipe5", "nameOfRecipe6"]
    let modalRestName = ["nameOfRestaurant1", "nameOfRestaurant2", "nameOfRestaurant3", "nameOfRestaurant4", "nameOfRestaurant5", "nameOfRestaurant6"];
    let mapsArr = ["map1", "map2", "map3", "map4", "map5", "map6"];
    
        for (let i = 0; i < dinnerNameArr.length; i++) {
            let temp = document.getElementById(dinnerNameArr[i]);
            temp.innerHTML = rand_recipes[i].name;
            let temp2 = document.getElementById(dinnerDefArr[i]);
            temp2.innerHTML = rand_recipes[i].description;
            let temp3 = document.getElementById(dinnerImgArr[i]);
            temp3.src = `images/${rand_recipes[i].image}`;
                if (rand_recipes[i]['@type'] == "Restaurant") {
                    let temp4 = document.getElementById(dinnerModalButnsArr[i]);
                    temp4.innerHTML = "Directions";
                    temp4.setAttribute("data-target", `#restaurantModal${i + 1}`);
                    let temp7 = document.getElementById(modalRestName[i]);
                    temp7.innerHTML = rand_recipes[i].name;
                    
                        let mapOptions = {
                            center: new google.maps.LatLng(rand_recipes[i].lat, rand_recipes[i].lng),
                            zoom: 18,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            clickableIcons: true
                            }

                        let map = new google.maps.Map(document.getElementById(mapsArr[i]), mapOptions);
                    
                } else {
                    let temp5 = document.getElementById(dinnerModalButnsArr[i]);
                    temp5.innerHTML = "Instructions";
                    temp5.setAttribute("data-target", `#recipeModal${i + 1}`);
                    let temp6 = document.getElementById(modalRecipeName[i]);
                    temp6.innerHTML = rand_recipes[i].name;
                }
        }
    
    let mealweek = select("#mealweek");
    mealweek.style("display" , "inline");
    let ingfunctions = select("#ingfunctions");
    ingfunctions.style("display" , "inline");
    gbutton.style("display" , "none");
}

function createGroceryList() {
    console.log("Creating GroceryList...");
    inventory = [];
    for (let i = 0; i < rand_recipes.length; i++) {
        inventory.push(rand_recipes[i].recipeIngredient);
        }
    let merged = []
    for (let i = 0; i < inventory.length; i++) {
        merged = merged.concat(inventory[i]);
        }
    let helper = {};
    
    grocerylist = merged.reduce(function(r, o) {
        let key = o.name
            if(!helper[key]) {
                helper[key] = Object.assign({}, o); // create a copy of o
                r.push(helper[key]);
            } else {
                helper[key].quantity += o.quantity;
            }
                return r;
            }, []);
    
    grocerylist = grocerylist.sort(function(a,b){
        return a.type.toLowerCase().localeCompare(b.type.toLowerCase());
        });
    
    if (groceryListDisplay == true) {
        displayGroceryList()
        }
}

function displayGroceryList() {
    console.log("Showing GroceryList...");
    let row;
    let cell1;
    let cell2;
    let cell3;
    let cell4;
    
    ibutton.style("display" , "none")
    hbutton.style("display" , "inline")

    let inglistbody = document.getElementById("inglistbody");
    for (let i = 0; i < grocerylist.length; i++) {
        row = inglistbody.insertRow(-1);
        row.setAttribute("id", "row" + i);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        cell1.innerHTML = grocerylist[i].type;
        cell2.innerHTML = grocerylist[i].name;
        cell3.innerHTML = grocerylist[i].quantity;
        cell4.innerHTML = grocerylist[i].uom;
    }
    let ingtable  = select("#ingtable");
    ingtable.style("display" , "table");
    groceryListDisplay = true;
    console.log(groceryListDisplay);
}

function refreshInventory() {
    console.log("Refreshing...");
    let inglistbody = document.getElementById("inglistbody");
        while(inglistbody.hasChildNodes()) {
            inglistbody.removeChild(inglistbody.firstChild);
            }
    if (groceryListDisplay == true) {
        createGroceryList()
    }

    displayMenu()
}

function hideGroceryList() {
    console.log("Hiding GroceryList...");
    let ingtable  = select("#ingtable");
        ingtable.style("display" , "none");
        ibutton.style("display" , "inline");
        hbutton.style("display" , "none");
    
    groceryListDisplay = false;
    console.log(groceryListDisplay);
}




