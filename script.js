$(function () {
  // Defaults

  var data = [
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
    21.176470,
  ];
  var ratings = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  
  /*
  var labels = [
    "Vision",
    "Concept development",
    "Value proposition",
    "Contextual research",
    "User research",
    "Market research",
    "Information architecture",
    "User flow",
    "Behaviour",
    "Graphic design",
    "Data visualisation",
    "Specifications",
    "Mock-up",
    "Interactive prototype",
    "Front-end development",
    "Hardware",
    "Testing",
  ];
  */

  var colors = [
    "#6A2B8B",
    "#864C9E",
    "#9C69AC",
    "#CB2026",
    "#EF4749",
    "#F37D80",
    "#CA6E28",
    "#F6881F",
    "#FDBA34",
    "#446630",
    "#659A41",
    "#98CA3C",
    "#0099CD",
    "#34B5E3",
    "#B21E5B",
    "#E50F73",
    "#EE3B95",
  ];
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var centerX = Math.floor(canvas.width / 2);
  var centerY = Math.floor(canvas.height / 2);
  var centerRadius = centerX / 3;

  // Function definitions

  /*
  function getQueryString() {
    var vars = {},
      hash;
    var hashes = location.href.slice(location.href.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  */

  /*
  function guid() {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }
  */

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
  }

  function drawSegmentOutline(canvas, context, i) {
    context.save();
    radius = centerX;
    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      radius - 1,
      startingAngle,
      endingAngle,
      false
    );
    context.closePath();
    context.fillStyle = "#e9e9e9";
    context.strokeStyle = "white";
    context.stroke();
    context.fill();
    context.restore();
  }

  function drawSegment(canvas, context, i) {
    context.save();
    radius = centerRadius + ratings[i] * ((centerX - centerRadius) / 10);
    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
    context.closePath();
    context.fillStyle = colors[i];
    context.strokeStyle = "white";
    context.stroke();
    context.fill();
    context.restore();
  }

  function refreshChart() {
    for (var i = 0; i < data.length; i++) {
      drawSegmentOutline(canvas, context, i);
      drawSegment(canvas, context, i);
    }
    var center = canvas.getContext("2d");
    center.beginPath();
    center.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    center.fillStyle = "white";
    center.fill();
    /*
    center.textAlign = "center";
    var fontSize = Math.floor(canvas.height / 40);
    center.font = fontSize + "pt Helvetica";
    center.fillStyle = "#FF6600";
    center.fillText("UX Competency Wheel", centerX, centerY);
    */
  }

  /*
  function checkValidity() {
    var count = $("form input").length;
    var retval = true;
    $(".rating input").each(function (e) {
      if (this.validity.valid == false) {
        // console.log("Invalid");
        retval = false;
      }
    });
    return retval;
  }
  */

  /*
  function enableEditMode() {
    $("#yourname").hide();
    $("#make-a-sundial").hide();
    $("#yourname_edit").show();
    $("#instructions").show();
    // $("#sharing").show();
    // $("#share").show();
    $(".rating input").removeAttr("disabled");
  }
  */

  // Event Handlers

  $(".rating input").change(function (e) {
    var index = parseInt($(this).attr("id").split("_")[1]);
    if (this.validity.valid) {
      ratings[index] = parseInt($(this).val());
      refreshChart();
      $(this).next().hide();
    } else {
      $(this).next().show();
      $(this).focus();
      $(this).select();
    }
  });

  /*
  $(document).on("click", "#share", function (e) {
    if (checkValidity() == true) {
      var obj = {};
      obj.yourname = $("#yourname_edit").val();
      obj.ratings = ratings;
      $.post(
        "/ux-self-assessment-sundial/save.php",
        { uuid: uuid, secret: secret, data: JSON.stringify(obj) },
        function (data) {
          location.hash = "?uuid=" + uuid + "&secret=" + secret;
          if (data.indexOf("success") != -1) {
            $("#sharelink input").val(location.href.split("&")[0]);
            $("#editlink input").val(location.href);
            $("#sharelink").show();
            $("#editlink").show();
          }
          alert(data);
        }
      );
    } else {
      alert("Invalid form data");
    }
  });

  $("#sharing input").click(function (e) {
    $(this).select();
  });

  var uuid = "";
  var secret = "";
  var params = getQueryString();

  if (params.uuid) {
    // View existing assessment
    if (params.uuid.length == 36) {
      uuid = params.uuid;
      $.getJSON(uuid + ".json", function (data) {
        ratings = data.ratings;
        $(".rating input").each(function (i, val) {
          $(this).val(ratings[i]);
        });
        $("#yourname").text(data.yourname);
        $("#yourname_edit").val(data.yourname);
        refreshChart(); // Draw the sundial chart
      });
    }
  } else {
    // Brand new assessment
    uuid = guid();
    secret = guid();
    enableEditMode();
    $("#yourname_edit").trigger("focus");
    refreshChart(); // Draw the sundial chart
  }
  // Edit existing assessment
  if (params.secret) {
    if (params.secret.length == 36) {
      secret = params.secret;
      $.getJSON(secret + ".json", function (data) {
        if (data.uuid == uuid) {
          enableEditMode();
        }
      });
    }
  }
  */
});
