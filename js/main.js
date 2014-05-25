 var map_operations = void function() {
    "use strict";
    var mapNodes = d3.selectAll("#map svg polygon, #map svg path")
    , bottomBoxMiddle = d3.select("#bottom_box_middle")
    , topBoxMiddle = d3.select("#top_box_middle")
    , topBoxRight = d3.select("#top_box_right")
    , middleBoxRight = d3.select("#middle_box_right")
    , bottomBoxRight = d3.select("#bottom_box_right");
    
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
    
      
    d3.json("data/provinces.json", function (err, data) {
        
       if(err) return console.error(err);
        
       window.provinceData = data;

       mapNodes.data(window.provinceData, function (datum) {
           return datum ? datum.name : this.getAttribute("id");
       });

       mapNodes.on("click", function (data){
           updateBox(bottomBoxMiddle,data.description,"Description");
           updateBox(topBoxMiddle,"",data.name,data.nation);
       });
    });
       
} ();