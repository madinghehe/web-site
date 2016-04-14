var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var manhattan = [40.7590403,-74.0];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.701464,-73.788300];
var statenisland = [40.576413,-74.104156];
 

var myZoom = 11;
var map3 = L.map('map3').setView( [40.729308,-73.871040], 11);
    map3.addLayer(layer)

var panOptions = {
    animate: true,
    duration: 2
  }

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        map3.panTo(manhattan, panOptions);
          map3.setZoom(12);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#fff');
        map3.panTo(brooklyn, panOptions, myZoom);
          map3.setZoom(12)
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#fff');
        map3.panTo(bronx, panOptions);
          map3.setZoom(12)
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#fff');
        map3.panTo(queens, panOptions);
          map3.setZoom(12)
      } 

      else {
        $(this).css('background-color','#fff');
        map3.panTo(statenisland, panOptions);
          map3.setZoom(12)
      }
    });


var geojson;

  //this function takes a value and returns a color based on which bucket the value falls between
  function getColor(risk) {
      return risk > 15 ? '#dc0023' :
             risk > 13 ? '#EA3C2A' :
             risk > 11 ? '#F97932' :
             risk > 10  ? '#DDB04B' :
             risk > 9   ? '#BFC75C' :
             risk > 7  ? '#a6d96a' :
             risk > 5  ? '#8CCC46' :
             // risk = 'No Data' ? '#dddddd' :
                        '#72BF21';
  }

  // var legend = L.control({position: 'bottomright'});
  // legend.onAdd = function (map) {
  //     var div = L.DomUtil.create('div', 'info legend'),
  //         grades = [0, 25, 35, 45, 50],
  //         labels = [];
  //     // loop through our density intervals and generate a label with a colored square for each interval
  //     for (var i = 0; i < grades.length; i++) {
  //         div.innerHTML +=
  //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%' + '<br>' : '+');
  //     }
  //     return div;
  // };
  // legend.addTo(map3);

  // function changeType(){
  //   var type = $('#dropDown :selected').val();
  //   // console.log("type" + type); 
  //   if(mapColorType != type) {
  //     mapColorType = type;
  //       $.getJSON('data/risk.geojson', function(state_data) {
  //         console.log(state_data);
  //         geojson = L.geoJson(state_data,{
  //           style: style, 
  //           onEachFeature: onEachFeature
  //         }).addTo(map3);
  //       });
  //   }
  // }

var bizType = "DOH_Mean Winter 2011-12";

  $("#1").click(function(){
  bizType = 'DOH_Mean Winter 2011-12';
  geojson.setStyle(style);
  });

  $("#2").click(function(){
  bizType = 'DOH_Mean 2012 summer';
  geojson.setStyle(style);
  });

  $("#3").click(function(){
  bizType = 'DOH_Mean Winter 2012-13';
  geojson.setStyle(style);
  });

  $("#4").click(function(){
  bizType = 'DOH_Mean 2013 summer';
  geojson.setStyle(style);
  });

  $("#5").click(function(){
  bizType = 'DOH_Mean Winter 2013-14';
  geojson.setStyle(style);
  });

  $("#6").click(function(){
  bizType = 'DOH_Mean 2014 summer';
  geojson.setStyle(style);
  });



  $(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });

//Number(feature.properties[bizType])
  function style(feature) {
    // console.log(feature.properties[bizType]);
    return {
        fillColor: getColor(Number(feature.properties[bizType])),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.8
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;
    var feature = layer.feature;

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: '#fff',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

  var round = Number(layer.feature.properties[bizType]);
  

    $('#side').html('<h3><span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span> PM2.5 in ' + '<b>' + layer.feature.properties.DOH_geography + '</b>' + ' is ' + '<b>'+ round + '</b>' + ' mcg per cubic meter.'); 
    }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    // var cattype = $('#dropDown :selected').val();
    //console.log(feature.properties[cattype])  
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }
  
  $.getJSON('data/DOH.geojson', function(state_data) {
    console.log(state_data);
    geojson = L.geoJson(state_data,{
      style: style, 
      onEachFeature: onEachFeature
    }).addTo(map3);
  });


