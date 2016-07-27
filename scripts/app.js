window.onload = function() {
  var savedList = JSON.parse(localStorage.getItem("savedList"));
  if (savedList == null || savedList == "") {
    savedList = new Array;
    localStorage.setItem("savedList", JSON.stringify(savedList));
  }

  var requestType = document.getElementById("reqType");
  var standardHeader = document.getElementById("header-select");
  var addCustomBtn = document.getElementById("addCustom");
  var bodyFormEl = document.getElementById("body");

  document.getElementById("save").addEventListener("click", saveRequest);
  document.getElementById("clear").addEventListener("click", clearForm);

  if (savedList != null) {
    //get the element we want to add children to
    var node = document.getElementById("need-children");
    var s;
    for (s = 0; s < savedList.length; s++) {
      var divNode = document.createElement("div");
      var spanNode1 = document.createElement("span");
      var text1 = document.createTextNode("X");
      var innerDivNode = document.createElement("div");
      var text2 = document.createTextNode(savedList[s].name);
      var spanNode2 = document.createElement("span");
      var text3 = document.createTextNode(savedList[s].url);

      //add style to the nodes
      divNode.className = "pure-u-1 saved-list-item"
      spanNode1.className = "pure-u-1-10 delete";
      innerDivNode.className = "pure-u-22-24 label";
      spanNode2.className = "pure-u-1 site";

      //append text nodes to nodes
      spanNode1.appendChild(text1);
      innerDivNode.appendChild(text2);
      spanNode2.appendChild(text3);

      //append inner nodes to divNode
      divNode.appendChild(spanNode1);
      divNode.appendChild(innerDivNode);
      divNode.appendChild(spanNode2);

      //append the main divNode to the parent node
      if (node != null)
        node.appendChild(divNode);

      //add action listener to the the added child
      innerDivNode.addEventListener("click", loadRequest);
      spanNode1.addEventListener("click", deleteSavedRequest);
    }
  }

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
        placeholder = "text/html";
        break;
      case "User-Agent":
        placeholder = null;
        break;
      case "Timeout":
        placeholder = "5000";
        break;
    }

    var listItem = document.createElement("LI");
    listItem.className = "pure-u-1 headers-list-item";

    var key = document.createElement("input");
    key.type = "text";
    key.className = "pure-u-3-8";
    key.value = selectedOpt.value;
    key.addEventListener("keydown", updateReqPreview);

    var val = document.createElement("input");
    val.type = "text";
    val.className = "pure-u-3-8";
    val.addEventListener("keydown", updateReqPreview);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "pure-button button-error pure-u-1-8 remove-std-header";
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", removeStandardHeader);

    if(placeholder === null) {
      var userAgent = window.navigator.userAgent;
      val.value = userAgent;
    } else {
      val.placeholder = placeholder;
    }

    listItem.appendChild(key);
    listItem.appendChild(document.createTextNode(" ")); //UI
    listItem.appendChild(val);
    listItem.appendChild(document.createTextNode(" ")); // UI
    listItem.appendChild(deleteBtn);

    list.appendChild(listItem);

    selectedOpt.setAttribute("disabled", "disabled");
    standardHeader.selectedIndex = 0;
  };

  addCustomBtn.onclick = function addCustomHeader() {
    var parent = document.getElementById("headers-list");
    var list = document.getElementById("headers-list");

    var listItem = document.createElement("LI");
    listItem.className = "pure-u-1 headers-list-item";

    var key = document.createElement("input");
    key.type = "text";
    key.className = "pure-u-3-8";
    key.placeholder = "key";
    key.addEventListener("keydown", updateReqPreview);

    var val = document.createElement("input");
    val.type = "text";
    val.className = "pure-u-3-8";
    val.placeholder = "value";
    val.addEventListener("keydown", updateReqPreview);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "pure-button button-error pure-u-1-8 remove-header";
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", removeHeader);

    listItem.appendChild(key);
    listItem.appendChild(document.createTextNode(" ")); //UI
    listItem.appendChild(val);
    listItem.appendChild(document.createTextNode(" ")); // UI
    listItem.appendChild(deleteBtn);

    list.appendChild(listItem);
  };

  bodyFormEl.onkeyup = function() {
    var selectedOpt = requestType.options[requestType.selectedIndex].text;
    if(selectedOpt === "GET") return;

    var payloadPreview = document.querySelectorAll("pre.payload")[0];
    var input = bodyFormEl.value;

    if(input.length === 0) return;

    var output;

    try {
      var obj = JSON.parse(input);
      output = JSON.stringify(obj, undefined, 4);
    } catch(e) {
      output = "[ERROR] Malformed JSON body! Please fix!\n\nMake sure your JSON follows these rules:\n{\n \"attribute\" : \"string\",\n  \"attribute\" : number,\n  \"attribute\" : [array],\n  \"attribute\" : {object}\n}";
    }

    payloadPreview.innerHTML = output;
  }

  function removeHeader() {
    var list = document.getElementById("headers-list");
    var headersPreview = document.querySelectorAll("pre.headers")[0];

    list.removeChild(this.parentNode);

    if(list.children.length === 0) {
      headersPreview.innerHTML = "N/A";
    }
  }

  function removeStandardHeader() {
    var list = document.getElementById("headers-list");
    var header = this.previousElementSibling.previousElementSibling.value;
    var headersPreview = document.querySelectorAll("pre.headers")[0];
    var opt;

    for(var i = 0; i < standardHeader.options.length; i++) {
      if(standardHeader.options[i].value === header) {
        opt = i;
      }
    }

    standardHeader.options[opt].removeAttribute("disabled");
    list.removeChild(this.parentNode);

    if(list.children.length === 0) {
      headersPreview.innerHTML = "N/A";
    }
  }

  function updateReqPreview() {

  }

  function saveRequest() {
    //var namePrompt = prompt("Please enter a name for your chosen values:");
    var flag = false;
    var a;
    var tempArr = new Array;
    for (a = 0; a < savedList.length; a++) {
      tempArr[a] = savedList[a].name;
    }
    var namePrompt = prompt("Please enter a unique name for your chosen values:");
    if (namePrompt == null)
      return;
    if (tempArr.indexOf(namePrompt) != -1) {
      alert ("Name is not unique!");
      return;
    }
    if (namePrompt == "") {
      alert ("Name cannot be an empty string!");
      return;
    }

    if (!namePrompt.match(/^[0-9a-zA-Z\s]+$/)) {
      alert ("Name is not alphanumeric!");
      return;
    }

    var key;
    var value;

    var heads = new Array;
    var headers = document.getElementById("headers-list");
    var h;
    alert("length = " + headers.children.length)
    for (h = 0; h < headers.children.length; h++) {
      key = headers.children[h].children[0].value;
      value = headers.children[h].children[1].value;
      heads.push({key:key,value:value});
    }



    var saveData = {
      name: namePrompt,
      type: document.getElementById("reqType") != null ? document.getElementById("reqType").value : null,
      url: document.getElementById("url") != null ? document.getElementById("url").value : null,
      headerList: heads,
      body: document.getElementById("body") != null ? document.getElementById("body").value : null
    };

    //get the element we want to add children to
    var node = document.getElementById("need-children");

    //add the new saveData to the list of saveData's
    savedList.push(saveData);

    //removing all the children
    while (node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }

    var i;
    for (i = 0; i < savedList.length; i++) {
      //creating elements and text nodes
      var divNode = document.createElement("div");
      var spanNode1 = document.createElement("span");
      var text1 = document.createTextNode("X");
      var innerDivNode = document.createElement("div");
      var text2 = document.createTextNode(savedList[i].name);
      var spanNode2 = document.createElement("span");
      var text3 = document.createTextNode(savedList[i].url);

      //add style to the nodes
      divNode.className = "pure-u-1 saved-list-item"
      spanNode1.className = "pure-u-1-10 delete";
      innerDivNode.className = "pure-u-22-24 label";
      spanNode2.className = "pure-u-1 site";

      //append text nodes to nodes
      spanNode1.appendChild(text1);
      innerDivNode.appendChild(text2);
      spanNode2.appendChild(text3);

      //append inner nodes to divNode
      divNode.appendChild(spanNode1);
      divNode.appendChild(innerDivNode);
      divNode.appendChild(spanNode2);

      //append the main divNode to the parent node
      if (node != null)
        node.appendChild(divNode);

      //add action listener to the the added child
      innerDivNode.addEventListener("click", loadRequest);
      spanNode1.addEventListener("click", deleteSavedRequest);
      //(divNode.firstChild.nextSibling.innerHTML)
    }
    localStorage.removeItem("savedList");
    localStorage.setItem("savedList", JSON.stringify(savedList));
  }

  function loadRequest() {
    // loads the data into the form when a saved list item is clicked on
    // maybe check with the user and see if they want it loaded in case the click was on accident
    /* use confirm() */
    if (confirm("Are you sure you want to auto-fill the form using this entry?")) {
      var n = this.innerHTML;
      var j;
      for (j = 0; j < savedList.length; j++) {
        if (savedList[j].name == n) {
          document.getElementById("reqType").value = savedList[j].type;
          document.getElementById("url").value = savedList[j].url;
          document.getElementById("body").value = savedList[j].body;

          
          var parentNode = document.getElementById("headers-list");
          var k;
          for (k = 0; k < parentNode.children.length; k++) {
            parentNode.removeChild(parentNode.firstChild);
          }
          //for (k = 0; k < savedList[j].headerList.length; k++) {
          //  if (parentNode.hasChildNodes()) {
          //    parentNode.removeChild(parentNode.firstChild);
          //  }
          //}
          for (k = 0; k < savedList[j].headerList.length; k++) {
            //if (savedList[j].headerList[k].child[0] != null && savedList[j].headerList[k].child[1] != null) {
              
            var liNode = document.createElement("li");
            var input1 = document.createElement("input");
            var input2 = document.createElement("input");
            var butt = document.createElement("button");
            var textNode = document.createTextNode("X");
            butt.addEventListener("click", removeHeader);

            liNode.className = "pure-u-1 headers-list-item";
            input1.className = "pure-u-3-8";
            input2.className = "pure-u-3-8";
            butt.className = "pure-button button-error pure-u-1-8 remove-header";

            butt.appendChild(textNode);

              //alert(savedList[j].headerList[k].firstChild.nodeValue);

            input1.value = savedList[j].headerList[k].key;
            input2.value = savedList[j].headerList[k].value;

            liNode.appendChild(input1);
            liNode.appendChild(document.createTextNode(" ")); // UI
            liNode.appendChild(input2);
            liNode.appendChild(document.createTextNode(" ")); // UI
            liNode.appendChild(butt);
            parentNode.appendChild(liNode);
          }
        }
      }
    }
  }

  function deleteSavedRequest() {
    if (confirm("Are you sure you want to delete this entry?")) {
      var l;
      for (l = 0; l < savedList.length; l++) {
        if (savedList[l].name == this.nextSibling.innerHTML) {
          savedList.splice(l, 1);
          break;
        }
      }
      localStorage.removeItem("savedList");
      localStorage.setItem("savedList", JSON.stringify(savedList));

      var child = this.parentNode.parentNode.firstChild;
      while(child != null) {
        if (this.nextSibling.innerHTML == child.firstChild.nextSibling.innerHTML) {
          this.parentNode.parentNode.removeChild(child);
          break;
        }
        child = child.nextSibling;
      }
    }
  }

  function clearForm() {
    if (confirm("Are you sure you want to clear this form?")) {
      document.getElementById("reqType").value = "";
      document.getElementById("url").value = "";
      document.getElementById("body").value = "";

      var parentNode = document.getElementById("headers-list");
      while(parentNode.hasChildNodes()) {
        parentNode.removeChild(parentNode.firstChild);
      }
    }
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
/*
  //WHY ARE WE NOT USING THIS sendRequest()?!!!!!!!!!!!!!!!!!
  function sendRequest() {
    var xhr = createXHR(); // cross browser XHR creation
    if (xhr) {
      //This is doing things ascynhronously
      xhr.open("GET","http://ajaxref.com/ch1/sayhello.php",true);
      xhr.onreadystatechange = function(){handleResponse(xhr);};
      xhr.send(null);
    }
  }
*/
};
