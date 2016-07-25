window.onload = function() {
  var requestType = document.getElementById("reqType");
  var prettyBtn = document.getElementById("pretty");
  var bodyFormEl = document.getElementById("body");

  addFocusListeners();

  // when the select box changes
  requestType.onchange = function onSelectChange() {
    var selectedOpt = requestType.options[requestType.selectedIndex];

    if(selectedOpt.text === "GET") {
      bodyFormEl.setAttribute("disabled", "disabled");
      prettyBtn.classList.add("pure-button-disabled");
    } else {
      bodyFormEl.removeAttribute("disabled");
      prettyBtn.classList.remove("pure-button-disabled");
    }
  };

  // when the "Pretty Print Body" button is clicked
  prettyBtn.onclick = function onPrettyClick() {
    var input = bodyFormEl.value;
    if(input.length === 0) return;
    var output;
    try {
      var obj = JSON.parse(input);
      output = JSON.stringify(obj, undefined, 4);
    } catch (e) {
      alert("[ERROR] Make sure your body is of the form \n\n { \"attribute\" : \"string\", \"attribute\" : number, \"attribute\" : [array] }!");
      output = input;
    }
    bodyFormEl.value = output;
  };

  function addFocusListeners() {
    var headerInputs = document.querySelectorAll(".headers input.key");
    for(var i = 0; i < headerInputs.length; i++) {
      headerInputs[i].addEventListener("focus", addNewHeader);
    }
  }

  function addRemoveListeners() {
    var buttons = document.querySelectorAll(".remove-header");
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", removeHeader);
    }
  }

  function addNewHeader() {
    var alreadyAdded = this.getAttribute("dirty");
    if(alreadyAdded === "true") return;

    this.setAttribute("dirty", "true");

    var parent = document.getElementById("headers-list");
    var newHeader = '<li class="pure-u-1 headers-list-item"><input class="pure-u-3-8 key" type="text" placeholder="key" /> <input class="pure-u-3-8 value" type="text" placeholder="value" /> <button class="pure-button button-error pure-u-1-8 remove-header">X</button></li>'
    parent.innerHTML += newHeader;

    addFocusListeners();
    addRemoveListeners();
  };

  function removeHeader() {
    var list = document.getElementById("headers-list");
    var parent = this.parentElement;
    var prevHeaderKey = parent.previousElementSibling.children[0];

    prevHeaderKey.setAttribute("dirty", "false");
    list.removeChild(this.parentNode);
  }

  function saveRequest() {
    // use a prompt to get the name that the user wants to set for the request
    // build an object that holds all the data the user entered. for example:
    /*
      saveData: {
        type: "GET",
        url: "www.google.com",
        headers: [
          {
            key: headerKey1,
            value: headerValue1
          },
          {
            key: headerKey1,
            value: headerValue2
          }
        ],
        body: {
          ...
        }
      }
    */
    // maybe use a constructor to make it easier for yourself
    // store the object in browser local storage
    // call loadSavedData to update saved list or just build the html and add it
    // to the list
  }

  function loadSavedData() {
    // read browser local storage
    // loop through data and build html list item
    // store
    // for example:
    /*
      <div class="pure-u-1 saved-list-item">
        <span class="pure-u-1-10 delete">X</span>
        <div class="pure-u-22-24 label">the save name</div>
        <span class="pure-u-1 site">the URL</span>
        <hr>
      </div>
    */
    // add a click event listener to list item to load data
    /* htmlElement.addEventListener("click", loadRequest); */
  }

  function loadRequest() {
    // loads the data into the form when a saved list item is clicked on
    // maybe check with the user and see if they want it loaded in case the click was on accident
    /* use confirm() */
  }

  function deleteSavedRequest() {
    // removes the list item from the saved list
    // confrim with the user that they want it deleted
    /* use confirm() */
  }

  
};
