function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ['Campbellfield', 'Clayton South', 'Braeside', 'Merricks',
       'Dandenong', 'Fyansford', 'Batesford', 'Dandenong South',
       'Eaglehawk', 'Geelong North', 'Korumburra', 'Lake Bolac',
       'Portland', 'Seymour', 'Shepparton', 'Stawell', 'Thomastown',
       'Port Melbourne', 'Werribee', 'Altona ', 'Traralgon', 'Somerton',
       'Altona', 'Lara', 'Springvale', 'Goornong', 'Sunshine',
       'Yarraville', 'Moolap', 'Anglesea', 'Point Henry',
       'Laverton North', 'Prahran', 'Caulfield', 'Ararat', 'Bairnsdale',
       'Wangaratta', 'Myrtleford', 'Porepunkah', 'Footscray', 'Mulgrave',
       'Moorabbin', 'Mitcham', 'Oakleigh', 'Preston', 'Wendouree',
       'Box Hill South', 'Alphington', 'Cheltenham', 'Corio',
       'Berriwillock', 'Irymple', 'Dingley', 'Melbourne Airport',
       'Tullamarine', 'Brooklyn', 'Euroa ', 'Moe', 'Waarre ', 'Koroit',
       'Kyneton', 'Springhurst', 'Wollert', 'Lakes Entrance', 'Orbost',
       'Sale', 'Manangatang', 'Trentham', 'Burwood', 'Lyndhurst',
       'Laverton', 'Box Hill', 'Swan Hill', 'Colac', 'Yarram',
       'Heidelberg', 'Heidelberg West', 'Morwell', 'Simpson', 'Deer Park',
       'Newbridge', 'Pyramid Hill', 'Colignan', 'Merbein',
       'Geelong South', 'Ballarat', 'Williamstown', 'Devon Meadows',
       'Lethbridge', 'Strathmerton', 'Stewarton', 'Nagambie',
       'Wandin East', 'North Shore', 'Maiden Gully', 'Echuca',
       'Smythesdale', 'Mt Clear', 'Collingwood', 'Richmond', 'Burnley',
       'Wodonga', 'Donnybrook', 'Point Wilson', 'Wyndham Vale', 'Kealba',
       'Aireys Inlet', 'Apollo Bay', 'Bannockburn', 'Connewarre',
       'Elliminyt', 'Lorne', 'She Oaks', 'Portarlington', 'Wurdiboluc',
       'Grantville', 'Lardner', 'Trafalgar', 'Warrnambool',
       'Nirranda South', 'Lang Lang', 'Port Campbell', 'Coburg North',
       'Wemen', 'Bendigo', 'Yarra Glen', 'Great Western', 'Castlemaine',
       'Barnawartha', 'Avoca', 'Clayton', 'Hastings', 'Tyabb', 'Nirranda',
       'Altona North', 'Mansfield', 'Myrtleford  ', 'Hoddles Creek',
       'Camperdown', 'Drouin', 'Toora', 'Hamilton', 'Horsham',
       'Dennington', 'Waurn Ponds', 'Scoresby', 'Truganina', 'Montrose',
       'Bacchus Marsh', 'Lysterfield', 'Epping', 'Charlton', 'Lilydale',
       'Dunnstown', 'Cosgrove South', 'Langwarrin', 'Cosgrove',
       'Yallourn North', 'Harrietville', 'Fulham', 'Mangalore',
       'Moorabbin Airport', 'Portland Junction', 'Yarpturk',
       'Essendon Fields', 'Breakwater', 'Cranbourne South', 'Milawa',
       'Emu', 'Coburg', 'Hawthorn East', 'Malvern', 'Notting Hill',
       'Newport', 'Benalla', 'St Arnaud', 'Corryong', 'Kyabram',
       'Mildura', 'Yarrawonga', 'Warragul', 'Rowville', 'Wantirna South',
       'Lemnos', 'Rutherglen', 'Delacombe', 'Footscray West',
       'Hazelwood North', 'Glenrowan', 'Cranbourne', 'Craigieburn',
       'Rockbank', 'Hampton Park', 'Maffra', 'Dutson', 'Giffard',
       'Carisbrook', 'Bentleigh East', 'Altona Meadows',
       'North Melbourne', 'Wahgunyah', 'Bayswater', 'Heathcote', 'Epsom',
       'Rochester', 'Bayswater North ', 'Maidstone', 'Naroghid',
       'Murchison East', 'Geelong East', 'Belmont', 'Broadmeadows',
       'Parkville', 'Vermont', 'Abbotsford', 'Bridgewater On Loddon',
       'Kilsyth', 'Tongala', 'Nunawading', 'Dixons Creek', 'Croydon',
       'Queenscliff', 'Crib Point', 'East Sale', 'Yallambie', 'Southbank',
       'Leongatha', 'Shepparton North', 'Tatura', 'Coldstream',
       'West Melbourne', 'Glen Waverley', 'Mickleham', 'Newtown',
       'Newmerella', 'Forge Creek', 'Ferntree Gully', 'Ringwood East',
       'Narre Warren', 'Moorooduc', 'Hallam', 'Brunswick', 'Lucknow',
       'Echuca ', 'Lockwood', 'Warrnambool ', 'Wodonga  ', 'Woodend',
       'Albion', 'Northcote', 'Croydon South', 'Longford', 'Golden Beach',
       'Marong', 'Tottenham', 'Mount Helen', 'Braybrook',
       'Oakleigh South', 'Melton', 'Delcombe', 'Bayswater North',
       'Cobden', 'Cororooke', 'Darnum', 'Stanhope', 'Norlane',
       'Airport West', 'Fosterville', 'Avenel', 'Westall', 'Tylden',
       'Tynong', 'Pakenham', 'Blackburn', 'Kerang', 'Piangil',
       'North Geelong', 'Noble Park North', 'Healesville', 'Boronia',
       'St Arnaud North', 'Shepparton ', 'Alexandra', 'Broadford',
       'Cobram', 'Eildon', 'Kilmore', 'Mooroopna', 'Nathalia', 'Numurkah',
       'Tallarook', 'Wallan', 'Fawkner', 'Allansford', 'Drysdale',
       'Hoppers Crossing', 'Dartmoor', 'Leitchville', 'West Footscray ',
       'Heyfield', 'Girgarre', 'Mill Park', 'Noble Park', 'Harkaway',
       'Axedale', 'Breakaway Creek', 'Mambourin', 'Prairie', 'Mentone',
       'Daylesford', 'Ondit ', 'Leongatha South', 'Moriac',
       'Oaklands Junction', 'Tarrone', 'Sunbury', 'Maribyrnong',
       'Peechelba', 'Douglas', 'Ouyen', 'Linton', 'Yannathan', 'Clyde',
       'Somerville', 'Pakenham South', 'Nar Nar Goon', 'Yellingbo',
       'Donald', 'Cann River', 'Lake Gardens', 'Koo Wee Rup', 'Thornbury',
       'Bundoora', 'Loy Yang', 'Newborough', 'Yinnar', 'Mount Waverley',
       'Laverton North ', 'Geelong South ', 'Chelsea Heights',
       'Eaglehawk, Bendigo', 'Rye', 'Koorlong', 'Cullellerain',
       'Robinvale', 'Nhill', 'Lancefield', 'Bullengarook', 'Costerfield',
       'Bangholme', 'Kensington', 'Dromana', 'South Yarra', 'Emerald',
       'Greenvale', 'Reservoir', 'Silvan ', 'Drouin West',
       'Christmas Hills', 'Spotswood', 'Balmoral', 'Goroke', 'Berwick',
       'Caulfield East', 'Churchill', 'Ringwood', 'Katunga', 'Winton',
       'Maddingley', 'Ballan', 'Wunghnu', 'Maryborough',
       'Kangaroo Ground', 'Yarrambat', 'Waaia', 'Keon Park', 'Baranduda',
       'Wooragee', 'Mt Beauty', 'Wangaratta ', 'Broadmeadows ',
       'Traralgon East', 'Huntingdale', 'Seaford', 'Mortlake', 'Timboon',
       'Patho', 'Frankston', 'Lockington', 'Melbourne', 'Mount Evelyn',
       'Wantirna', 'Euroa', 'Heywood', 'Sunshine West', 'Seville',
       'Tullamarine Airport', 'Ballarat East', 'Barry Beach', 'Beverford',
       'Bamawm', 'Moonambel', 'Yarra Junction', 'Cohuna', 'Gunbower',
       'Terang', 'Gre Gre', 'Huntly', 'Casterton', 'Bandiana', 'Rosedale',
       'Pine Lodge', 'Leithbridge', 'Oxley', 'Tangambalanga',
       'Beechworth', 'Buchan', 'Knoxfield', 'Branxholme', 'Blind Bight',
       'Boneo', 'Longwarry', 'Mount Martha', 'Somers', 'Welshpool',
       'Tarwin', 'Foster', 'Wonthaggi', 'Koonwarra', 'Heytesbury Lower',
       'Bridgewater', 'Dandenong South ', 'Port Fairy', 'Clifton Hill',
       'Paradise', 'Lance Creek', 'Tabilk', 'Seaspray', 'Yeungroon',
       'Newham', 'East Melbourne', 'Carlton', 'Essendon',
       'North Melbourne ', 'Karadoc', 'Geelong', 'Fitzroy',
       'Kangaroo Flat', 'Geelong West', 'Murchison', 'Keysborough',
       'Ballarat North', 'Tourello', 'Kingston', 'Bungal', 'Glen Park',
       'Gapsted', 'Coolaroo', 'Carrum Downs', 'Bell Park', 'Bowser',
       'Kilmany', 'Boisdale', 'Flemington', 'Wandin North', 'St Albans',
       'Gisborne', 'Melton South', 'Parwan', 'Romsey', 'Cowes', 'Iraak',
       'Peterborough', 'Essendon Airport', 'Mildura South', 'Yan Yean',
       'Chirnside Park', 'Launching Place', 'Whittlesea'];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);