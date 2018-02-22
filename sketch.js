//meal planning and shopping list generator

let recipes;

let dinnername1;
let dinnername2;
let dinnername3;
let dinnername4;
let dinnername5;
let dinnername6;

let dinnerdef1;
let dinnerdef2;
let dinnerdef3;
let dinnerdef4;
let dinnerdef5;
let dinnerdef6;

let img1;
let img2; 
let img3; 
let img4; 
let img5; 
let img6; 

let gbutton;
let ibutton;
let dbutton;
let rbutton;

let foodImages;

let rand_recipes = [];
let grocerylist;
let arr = ["#dinnerimg1", "#dinnerimg2", "#dinnerimg3", "#dinnerimg4", "#dinnerimg5", "#dinnerimg6"]
let arr_rows;

function setup() {
    noCanvas();
    loadJSON("recipes.json", gotData);
    
    gbutton = select("#generate");
        gbutton.mousePressed(randomize);
    
    dbutton = selectAll('.btn-warning');
        for (let i = 0; i < dbutton.length; i++) {
            dbutton[i].mousePressed(function() { remove_item(i);});
            dbutton[i].mouseOver(function() { desaturateImage(i);});
            dbutton[i].mouseOut (function() { saturateImage(i);});
        }

    ibutton = select("#ibutton");
            ibutton.mousePressed(writeInventory);
    rbutton = select("#rbutton");
            rbutton.mousePressed(refreshInventory);

}

//function changeRowColor(i) {
//    let temp = select("row" + i);
//    temp.style("background-color", "green");   
//}

function desaturateImage(i) {
    let temp = select(arr[i]);
    temp.style("-webkit-filter", "grayscale(100%)")       
}

function saturateImage(j) {
    let temp = select(arr[j]);
    temp.style("-webkit-filter", "none")      
}

function gotData(data) {
    recipes = data;
//    console.log(data);
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
    writeoutdata()
}

function remove_item(k) {
    for (let i = 0; i < 1 ; i++) { 
        let temp = random(recipes)
            if (!rand_recipes.includes(temp)) {
            rand_recipes[k] = temp;
            } else {
                i --;
            }
    }
    
    writeoutdata()
//    console.log(rand_recipes)
//    console.log("DONE")
}

function writeoutdata() {
    
    dinnername1 = document.getElementById("dinnername1");
        dinnername1.innerHTML = rand_recipes[0].name;
    dinnername2 = document.getElementById("dinnername2");
        dinnername2.innerHTML = rand_recipes[1].name;
    dinnername3 = document.getElementById("dinnername3");
        dinnername3.innerHTML = rand_recipes[2].name;
    dinnername4 = document.getElementById("dinnername4");
        dinnername4.innerHTML = rand_recipes[3].name;
    dinnername5 = document.getElementById("dinnername5");
        dinnername5.innerHTML = rand_recipes[4].name;
    dinnername6 = document.getElementById("dinnername6");
        dinnername6.innerHTML = rand_recipes[5].name;
    
    dinnerdef1 = document.getElementById("dinnerdef1");
        dinnerdef1.innerHTML = rand_recipes[0].description;
    dinnerdef2 = document.getElementById("dinnerdef2");
        dinnerdef2.innerHTML = rand_recipes[1].description;
    dinnerdef3 = document.getElementById("dinnerdef3");
        dinnerdef3.innerHTML = rand_recipes[2].description;
    dinnerdef4 = document.getElementById("dinnerdef4");
        dinnerdef4.innerHTML = rand_recipes[3].description;
    dinnerdef5 = document.getElementById("dinnerdef5");
        dinnerdef5.innerHTML = rand_recipes[4].description;
    dinnerdef6 = document.getElementById("dinnerdef6");
        dinnerdef6.innerHTML = rand_recipes[5].description;
    
    
//    foodimages = selectAll('.image');
//        for (let i = 0; i < foodimages.length; i++) {
//            let temp = select("dinnerimg${i}"); 
//            foodimages[i].src = `images/${rand_recipes[i].image}`;
//        }
    
    img1 = document.getElementById("dinnerimg1");
        img1.src = `images/${rand_recipes[0].image}`;
    img2 = document.getElementById("dinnerimg2");
        img2.src = `images/${rand_recipes[1].image}`;
    img3 = document.getElementById("dinnerimg3");
        img3.src = `images/${rand_recipes[2].image}`;
    img4 = document.getElementById("dinnerimg4");
        img4.src = `images/${rand_recipes[3].image}`;
    img5 = document.getElementById("dinnerimg5");
        img5.src = `images/${rand_recipes[4].image}`;
    img6 = document.getElementById("dinnerimg6");
        img6.src = `images/${rand_recipes[5].image}`;
    
    createInventory();
    let mealweek = select("#mealweek");
    mealweek.style("display" , "inline");
    let ingfunctions = select("#ingfunctions");
    ingfunctions.style("display" , "inline");
    gbutton.style("display" , "none");
}

function draw() {
    background(0);
}

function createInventory() {
    inventory = [];
    for (let i = 0; i < rand_recipes.length; i++) {
        inventory.push(rand_recipes[i].recipeIngredient);
    }
    
//    console.log(inventory);
    let merged = []
    for (let i = 0; i < inventory.length; i++) {
        merged = merged.concat(inventory[i]);
    }
    
//    console.log(merged);
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
//    console.log(grocerylist);
}

function writeInventory() {
    let row;
    let cell1;
    let cell2;
    let cell3;
    let cell4;
    
    ibutton.style("display" , "none")
    rbutton.style("display" , "inline")

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
    ingtable.style("display" , "table")
}

function refreshInventory() {
    console.log("refreshed")
    
    let inglistbody = document.getElementById("inglistbody");
        while(inglistbody.hasChildNodes()) {
            inglistbody.removeChild(inglistbody.firstChild);
            }
    
    
    writeInventory()
    console.log("done")
}
