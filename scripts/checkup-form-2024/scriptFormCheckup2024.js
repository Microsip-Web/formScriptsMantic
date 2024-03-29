window.onload = function () {
  var N = navigator.appName,
    ua = navigator.userAgent,
    tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
  M = M ? [M[1], M[2]] : [N, navigator.appVersion, "-?"];
  var browserName = M[0];
  var form = document.getElementById("__vtigerWebForm"),
    inputs = form.elements;
  form.onsubmit = function () {
    var required = [],
      att,
      val;
    for (var i = 0; i < inputs.length; i++) {
      att = inputs[i].getAttribute("required");
      val = inputs[i].value;
      type = inputs[i].type;
      if (type == "email") {
        if (val != "") {
          var elemLabel = inputs[i].getAttribute("label");
          var emailFilter =
            /^[_/a-zA-Z0-9]+([!"#$%&()*+,./:;<=>?\^_`{|}~-]?[a-zA-Z0-9/_/-])*@[a-zA-Z0-9]+([\_\-\.]?[a-zA-Z0-9]+)*\.([\-\_]?[a-zA-Z0-9])+(\.?[a-zA-Z0-9]+)?$/;
          var illegalChars = /[\(\)\<\>\,\;\:\"\[\]]/;
          if (!emailFilter.test(val)) {
            alert(
              "For " + elemLabel + " field please enter valid email address"
            );
            return false;
          } else if (val.match(illegalChars)) {
            alert(elemLabel + " field contains illegal characters");
            return false;
          }
        }
      }
      if (att != null) {
        if (val.replace(/^\s+|\s+$/g, "") == "") {
          required.push(inputs[i].getAttribute("label"));
        }
      }
    }
    if (required.length > 0) {
      alert("The following fields are required: " + required.join());
      return false;
    }
    var numberTypeInputs = document.querySelectorAll("input[type=number]");
    for (var i = 0; i < numberTypeInputs.length; i++) {
      val = numberTypeInputs[i].value;
      var elemLabel = numberTypeInputs[i].getAttribute("label");
      if (val != "") {
        var intRegex = /^[+-]?\d+$/;
        if (!intRegex.test(val)) {
          alert("For " + elemLabel + " field please enter valid number");
          return false;
        }
      }
    }
    var dateTypeInputs = document.querySelectorAll("input[type=date]");
    for (var i = 0; i < dateTypeInputs.length; i++) {
      dateVal = dateTypeInputs[i].value;
      var elemLabel = dateTypeInputs[i].getAttribute("label");
      if (dateVal != "") {
        var dateRegex =
          /^[1-9][0-9]{3}-(0[1-9]|1[0-2]|[1-9]{1})-(0[1-9]|[1-2][0-9]|3[0-1]|[1-9]{1})$/;
        if (!dateRegex.test(dateVal)) {
          alert(
            "For " +
              elemLabel +
              " field please enter valid date in required format"
          );
          return false;
        }
      }
    }
    var inputElems = document.getElementsByTagName("input");
    var totalFileSize = 0;
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type.toLowerCase() === "file") {
        var file = inputElems[i].files[0];
        if (typeof file !== "undefined") {
          var totalFileSize = totalFileSize + file.size;
        }
      }
    }
    if (totalFileSize > 52428800) {
      alert("Maximum allowed file size including all files is 50MB.");
      return false;
    }
  };
};
