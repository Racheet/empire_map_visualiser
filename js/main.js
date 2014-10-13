 var map_operations = void function() {
    "use strict";
    var mapNodes = d3.selectAll("#map svg polygon.province, #map svg path.province")
    , bottomBoxMiddle = d3.select("#bottom_box_middle")
    , topBoxMiddle = d3.select("#top_box_middle")
    , topBoxRight = d3.select("#top_box_right")
    , middleBoxRight = d3.select("#middle_box_right")
    , bottomBoxRight = d3.select("#bottom_box_right")
    , nations = ["Navarr", "Highguard", "Dawn", "The Brass Coast", "The Marches", "Urizen", "The League", "Imperial Orcs", "Varushka", "Wintermark"];
     
     
    
    
    function updateBox (box, data, title, subhead, resources) {
        var topDiv;
        
        function updateResources () {
            var resourcebox = box.append("span").classed("resourceBox",true);
            
            if (resources.whiteGranite) {
                resourcebox.append("span").classed("graniteNumber",true).text(resources.whiteGranite);
                resourcebox.append("img").attr("src","../img/whitegranite.svg").classed("resource_img",true);
            }
            if (resources.weirwood) {
                resourcebox.append("span").classed("weirwoodNumber",true).text(resources.weirwood);
                resourcebox.append("img").attr("src","../img/weirwood.svg").classed("resource_img",true);
            }
            if (resources.mithril) {
                resourcebox.append("span").classed("mithrilNumber",true).text(resources.mithril);
                resourcebox.append("img").attr("src","../img/mithril.svg").classed("resource_img",true);
                
            }
            if (resources.ilium) {
                resourcebox.append("img").attr("src","../img/ilium.svg");
            }
        
        }
        
        box.contents = box.selectAll("p, li, h2, h3, img, span");
        box.contents.remove();
            
        if (typeof title === "string" && box === topBoxMiddle) {
            topDiv = box   .append("div")
                           .classed("title_div",true);
            
            topDiv .append("h2")
                .html(title);
            
            if (typeof subhead === "string") {
                topDiv .append("p")
                       .classed("subhead",true)
                       .html(subhead);
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
        
        if (resources) {
           updateResources();
        }
    }
     
     
    function addRow(rowName,data) {
        
        function regionResources(data) {
            var output = [];
            if (data.whiteGranite) {
                output.push('<p class="resource"><img src="../img/whitegranite.svg" class="resource_img" /><strong>White Granite: </strong>' + data.whiteGranite + ' wains</p>');
            }
            if (data.weirwood) {
                output.push('<p class="resource"><img src="../img/weirwood.svg" class="resource_img" /><strong>Weirwood: </strong>'+ data.weirwood + ' wains</p>');
            }
            if (data.mithril) {
                output.push('<p class="resource"><img src="../img/mithril.svg" class="resource_img" /><strong>Mithril: </strong>'+ data.mithril + ' wains</p>');
            }
            if (data.illium) {
                output.push('<p class="resource"><img src="../img/ilium.svg" class="resource_img" />illium found</p>');
            }            
            return output.join(' ');
            
        } 
        
        //Find or Make a new Row
        var row =  d3.select("body").select('section#'+rowName);
        if(row.empty()) { 
            row = d3.select("body").append("section").attr("id",rowName.toString()).classed("row",true);
        }
        //Clear any old Contents
        row.selectAll("div,h2").remove();
        
        //Add a Title
        var titleBar = row.insert("div").classed("row",true);
        var sectionTitle = titleBar.append("div").classed({"column":true,"large-3":true}).append("h2").text(rowName.toString()).classed("section_title",true);
        
        //Add and Fill a Box for Each Datum
        var boxBar = row.insert("div").classed("row",true);
        var boxes = boxBar.selectAll("div").data(data);
        var updateSelection = boxes.enter().append("div").attr("class","column large-3").append("div").attr("class","box feature_box");
        var heading = updateSelection.append("h3").text(function(d){return d.name;});
        var resources = updateSelection.append("div").html(regionResources).classed("resources",true);
        var keywords = updateSelection.append("p").html(function (d){
            if (d.keywords) {
                return "<strong>Keywords</strong>: "+d.keywords.join(',');
            }
        });
        var bodies = updateSelection.append("p").text(function(d){return d.description;});
        
        row.selectAll("div.column:last-child").attr("class","column large-3 end");
        
        
    }
    
    function toggleNationColours() { 
     
        mapNodes.each(function(datum,index){
          var nation = datum.nation.replace(/ /g,"_"); 
            
           d3.select(this).classed(nation,function(datum,index){
               //check if this map node already has a nation class.
               return d3.select(this).classed(nation)?
                   false : //if it does, clear the class
                   true;   //if it doesn't, add the class
            });
        });
        
        
    }
     
     function territoryResources(territoryData) {
        return {
            "ilium" : territoryData.ilium || false,
            "weirwood" : territoryData.weirwood || 0,
            "whiteGranite" : territoryData.whiteGranite || 0,
            "mithril" : territoryData.mithril || 0,
                 
        };
        
    }
     
    function toggleSelectedNode(node) {
          d3.selectAll(".selected").classed("selected",false);
          d3.select(node).classed("selected",true);
        }

    d3.json("data/provinces.json", function (err, data) {

        if (err) return console.error(err);

        window.provinceData = data;

        mapNodes.data(window.provinceData, function (datum) {
            return datum ? datum.name : this.getAttribute("id");
        });

        toggleNationColours();
        window.toggleNationColours = toggleNationColours;
        window.mapNodes = mapNodes; //Temp, remove this when finished

        mapNodes.on("click", function (data) {
            toggleSelectedNode(this);
            updateBox(bottomBoxMiddle, data.overview, "Description");
            updateBox(topBoxMiddle, "", data.name, data.nation,territoryResources(data));
            updateBox(topBoxRight,data.history,"History");
            if (data.features.length) {
                addRow("Features",data.features);
            }
            if (data.regions.length) {
                addRow("Regions",data.regions);
            }
            
        });
    });
      
} ();

    
