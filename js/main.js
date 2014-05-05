var map_operations = void function() {
    "use strict";
    window.mapNodes = d3.selectAll("#map svg polygon, #map svg path");

   $.getJSON("data/provinces.json", function (data) {
       debugger;
       window.provinceData = data;

       window.mapNodes.data(window.provinceData, function (datum, index) {
           if (this.getAttribute("id") === datum["name"]) {
               return datum;
           };
       });
   })
    

    
} ()
