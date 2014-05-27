 var map_operations = void function() {
    "use strict";
    var mapNodes = d3.selectAll("#map svg polygon, #map svg path")
    , bottomBoxMiddle = d3.select("#bottom_box_middle")
    , topBoxMiddle = d3.select("#top_box_middle")
    , topBoxRight = d3.select("#top_box_right")
    , middleBoxRight = d3.select("#middle_box_right")
    , bottomBoxRight = d3.select("#bottom_box_right"),
    , nations = ["Navarr", "Highguard", "Dawn", "The Brass Coast", "The Marches", "Urizen", "The League", "Imperial Orcs", "Varushka", "Wintermark"];
    
    function updateBox (box, data, title, subhead) {
        box.contents = box.selectAll("p, li, h2, h3");
        box.contents.remove();
            
        if (typeof title === "string" && box === topBoxMiddle) {
            box .append("h2")
                .html(title);
            
            if (typeof subhead === "string") {
                box  .append("p")
                     .classed("subhead",true)
                     .html(subhead)
            }
            
        }
        
        if (typeof title ==="string" && box !== topBoxMiddle) {
            box .append("h3")
                .html(title);
        }
        
        if (typeof data === "string" && data !== "") {
            box  .append("p")
                 .html(data);
        }
    }
    
    function toggleNationColours() { //could be slow, contains nested loops.

        nations.forEach(function (nation) {
            var nationClass = nation.replace(/ /g,"_");
            
            mapNodes.attr("class", function (datum) {
                if (datum.nation === nation){
                    if(this.classList.contains(nationClass)){ 
                        return this.classList.remove(nationClass).toString(); //we have the class already, remove it;
                    } else if (this.classList.length > 0) {
                        return this.classList.add(nationClass).toString();  //there are classes but not this one, so add it.
                    } else {
                        return nationClass; // there are no classes at all, so just return this class.
                    }
                }
                
                if (this.classList.length > 0) {
                    return this.classList.toString(); //we have classes already, so return the same class string.
                } 

                return ""; // we had no classes, and we have no match. Set the classes to an empty string.

            });

        });
    }
     
    function toggleNationColoursAlt() {
        mapnodes.each(function(datum,index){
          var nation = datum.nation.replace(/ /g,"_"); 
            
           d3.select(this).classed(nation,function(datum,index){
               //check if this map node already has a nation class.
               return d3.select(this).classed(nation)?
                   false : //if it does, clear the class
                   true;   //if it doesn't, add the class
            });
        });
        
        
    }

    d3.json("data/provinces.json", function (err, data) {

        if (err) return console.error(err);

        window.provinceData = data;

        mapNodes.data(window.provinceData, function (datum) {
            return datum ? datum.name : this.getAttribute("id");
        });

        toggleNationColours();
        window.toggleNationColours = toggleNationColours;
        window.toggleNationColoursAlt = toggleNationColoursAlt;

        mapNodes.on("click", function (data) {
            updateBox(bottomBoxMiddle, data.description, "Description");
            updateBox(topBoxMiddle, "", data.name, data.nation);
        });
    });
      
} ();
