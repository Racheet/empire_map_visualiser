var map_operations = void function() {
    "use strict";
    
    var mapNodes = d3.selectAll("#map svg polygon, #map svg path"),
        bottomBox = d3.select("#bottom_box"),
        topBox = d3.select("#top_box");
    
    function updateBox (box, data, title) {
        box.contents = box.selectAll("p, li, h2");
        box.contents.remove();
            
        if (typeof title === "string") {
            box  .append("h2")
                 .html(title);
        }
        
        if (typeof data === "string") {
            box  .append("p")
                 .html(data);
        }
    }
    
      
    d3.json("data/provinces.json", function (err, data) {
        
       if (err) return console.error(err);
        
       window.provinceData = data;

       mapNodes.data(window.provinceData, function (datum) {
           var key;
           
           if (datum.name) {
               key = datum.name;
           } else {
               key = this.getAttribute("id");
           }
           
           return key;
       });

       mapNodes.on("click", function (data){
           updateBox(bottomBox,data.description,data.name);
           updateBox(topBox,"",data.name);
       });
    });
       
} ();