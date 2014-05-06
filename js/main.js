var map_operations = void function() {
    "use strict";
    window.mapNodes = d3.selectAll("#map svg polygon, #map svg path");
    
    function updateBottomBox (title, data) {
        if (typeof title === "string" && typeof data === "string") {
            d3.select("#bottom_box").html("<h2>"+title+"</h2>").append("p").html(data);
        } else {
            throw new Error("Title or body is not a string!")
        }
        
    };
    
    
   d3.json("data/provinces.json", function (err, data) {
       if(err) {throw err}
       else {
           window.provinceData = data;
    
           window.mapNodes.data(window.provinceData, function (datum, index) {
                return datum ? datum.name : this.getAttribute("id");
                
           });
       }
    });
    

    
} ()
