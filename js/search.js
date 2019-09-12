function initMap() {

    var melbourne = new google.maps.LatLng(-37.809954, 144.962886);

    var infowindow = new google.maps.InfoWindow({});

    var map = new google.maps.Map(document.getElementById('map'), {
        center: melbourne,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

// Data base Fetch
const url = 'https://raw.githubusercontent.com/balajimohan28/justnowastesample/master/csvjson.json';
var latitude;
var longitude;
fetch(url)
    .then(res => res.json())
    .then(function (data) {

        var currentLocation = window.location;

        var url = new URL(currentLocation);
        var mySuburb = url.searchParams.get("mySuburb");

        console.log(data);
        console.log(mySuburb);

        var melbourne = new google.maps.LatLng(-37.809954, 144.962886);
        var mapOptions = {
            zoom: 10,
            center: melbourne
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var data_filter = data.filter(element => element.suburb == mySuburb)
        console.log(data_filter)


        for (var p = 0; p < data_filter.length; p++) {
            
            var contents = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading" style="color:black;">'+data_filter[p].facility_id+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

            var infowindow = new google.maps.InfoWindow({
                
            });

            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(data_filter[p].latitude, data_filter[p].longitude),
                info: contents
            });

            var infowindow3 = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'mouseover', function () {
                infowindow3.setContent(this.info);
                infowindow3.open(map, this);
            });
        }
        marker.setMap(map);

    })
    .catch(function (e) {
        console.log("Error:", e);
    });
