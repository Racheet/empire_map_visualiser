var map_operations = void function() {
    "use strict";
    window.mapNodes = d3.selectAll("#map svg polygon, #map svg path");

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
