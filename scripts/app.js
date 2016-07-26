window.onload = function() {
  var requestType = document.getElementById("reqType");
  var standardHeader = document.getElementById("header-select");
  var bodyFormEl = document.getElementById("body");

  addFocusListeners();

  // when the select box changes
  requestType.onchange = function onTypeChange() {
    var selectedOpt = requestType.options[requestType.selectedIndex];

    if(selectedOpt.text === "GET") {
      bodyFormEl.setAttribute("disabled", "disabled");
    } else {
      bodyFormEl.removeAttribute("disabled");
    }
  };

  standardHeader.onchange = function onStandardHeaderChange() {
    var selectedOpt = standardHeader.options[standardHeader.selectedIndex];

    var list = document.getElementById("headers-list");
    var placeholder, newStandardHeader;

    switch(selectedOpt.value) {
      case "Accept-Language":
        placeholder = "en-US";
        break;
      case "Connection":
        placeholder = "Keep-Alive";
        break;
      case "Content-Type":
        placeholder = "text/html"
        break;
      case "User-Agent":
        placeholder = null;
        break;
    }

    if(placeholder === null) {
      var userAgent = window.navigator.userAgent;
      newStandardHeader = '<li class="pure-u-1 headers-list-item"><input class="pure-u-3-8" type="text" value="' + selectedOpt.value + '"/> <input class="pure-u-3-8" type="text" value="' + userAgent + '" /> <button class="pure-button button-error pure-u-1-8 remove-std-header">X</button></li>';
    } else {
      newStandardHeader = '<li class="pure-u-1 headers-list-item"><input class="pure-u-3-8" type="text" value="' + selectedOpt.value + '" /> <input class="pure-u-3-8" type="text" placeholder="' + placeholder + '" /> <button class="pure-button button-error pure-u-1-8 remove-std-header">X</button></li>';
    }

    list.innerHTML += newStandardHeader;

    selectedOpt.setAttribute("disabled", "disabled");
    standardHeader.selectedIndex = 0;

    addFocusListeners();
    addRemoveListeners();
  };

  bodyFormEl.onkeyup = function() {
    var selectedOpt = requestType.options[requestType.selectedIndex].text;
    if(selectedOpt === "GET") return;

    var payloadPreview = document.querySelectorAll("pre.payload")[0];
    var input = bodyFormEl.value;

    if(input.length === 0) {
      payloadPreview.innerHTML = "N/A";
      return;
    }

    var output;

    try {
      var obj = JSON.parse(input);
      output = JSON.stringify(obj, undefined, 4);
    } catch(e) {
      output = "[ERROR] Malformed JSON body! Please fix!\n\nMake sure your JSON follows these rules:\n{\n  \"attribute\" : \"string\",\n  \"attribute\" : number,\n  \"attribute\" : [array],\n  \"attribute\" : {object}\n}";
    }

    payloadPreview.innerHTML = output;
  }

  function addFocusListeners() {
    var headerInputs = document.querySelectorAll(".headers input.key");
    for(var i = 0; i < headerInputs.length; i++) {
      headerInputs[i].addEventListener("focus", addNewHeader);
    }
  }

  function addRemoveListeners() {
    var buttons = document.querySelectorAll(".remove-header");
    var stdButtons = document.querySelectorAll(".remove-std-header");

    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", removeHeader);
    }

    for(var j = 0; j < stdButtons.length; j++) {
      stdButtons[j].addEventListener("click", removeStandardHeader);
    }
  }

  function addNewHeader() {
    var alreadyAdded = this.getAttribute("dirty");
    if(alreadyAdded === "true") return;

    this.setAttribute("dirty", "true");

    var parent = document.getElementById("headers-list");
    var newHeader = '<li class="pure-u-1 headers-list-item"><input class="pure-u-3-8 key" type="text" placeholder="key" /> <input class="pure-u-3-8 value" type="text" placeholder="value" /> <button class="pure-button button-error pure-u-1-8 remove-header">X</button></li>';
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

  function removeStandardHeader() {
    var list = document.getElementById("headers-list");
    var header = this.previousElementSibling.previousElementSibling.value;
    var opt;

    for(var i = 0; i < standardHeader.options.length; i++) {
      if(standardHeader.options[i].value === header) {
        opt = i;
      }
    }

    standardHeader.options[opt].removeAttribute("disabled");
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

  function createXHR() {
    try { return new XMLHttpRequest(); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}

    return null;
  }

  function sendRequest() {
    var url = document.getElementById("url").value;
  }
};
