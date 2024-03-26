$(function () {
  const ratingsLabels = [
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

  const form = $("#content");
  let ratings = Array(ratingsLabels.length).fill(5);
  let data = Array(ratingsLabels.length).fill(21.17647);
  const colors = [
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
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  const centerRadius = centerX / 3;
  const labelRadius = centerX + 20; // Adjust this value to position the labels

  ratingsLabels.forEach((label, i) => {
    const div = $("<div>").addClass("rating").attr("id", `ctrl${i}`);
    const labelElement = $("<label>")
      .attr("for", `ctrl_${i}`)
      .text(label);
    const input = $("<input>").attr({
      id: `ctrl_${i}`,
      type: "number",
      required: true,
      min: "1",
      max: "10",
      step: "1",
      value: "5",
    });
    const invalid = $("<div>")
      .addClass("invalid")
      .text("Number between 1 and 10");
    div.append(labelElement, $("<br>"), input, invalid);
    form.append(div);
  });

  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
  const sumTo = (a, i) =>
    a.slice(0, i).reduce((acc, val) => acc + val, 0);

  const drawSegmentOutline = (canvas, context, i) => {
    context.save();
    const startingAngle = degreesToRadians(sumTo(data, i));
    const arcSize = degreesToRadians(data[i]);
    const endingAngle = startingAngle + arcSize;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      centerX - 1,
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
  };

  const drawSegment = (canvas, context, i) => {
    context.save();
    const radius =
      centerRadius + ratings[i] * ((centerX - centerRadius) / 10);
    const startingAngle = degreesToRadians(sumTo(data, i));
    const arcSize = degreesToRadians(data[i]);
    const endingAngle = startingAngle + arcSize;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      radius,
      startingAngle,
      endingAngle,
      false
    );
    context.closePath();
    context.fillStyle = colors[i];
    context.strokeStyle = "white";
    context.stroke();
    context.fill();

    // Draw the label
    context.translate(centerX, centerY);
    context.rotate(startingAngle + arcSize / 2);
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(ratingsLabels[i], 0, -labelRadius);
    context.restore();
  };

  const refreshChart = () => {
    data.forEach((_, i) => {
      drawSegmentOutline(canvas, context, i);
      drawSegment(canvas, context, i);
    });
    const center = canvas.getContext("2d");
    center.beginPath();
    center.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    center.fillStyle = "white";
    center.fill();
    center.textAlign = "center";
    const fontSize = Math.floor(canvas.height / 40);
    center.font = `${fontSize}pt Helvetica`;
    center.fillStyle = "#FF6600";
    center.fillText("UX Competency Wheel", centerX, centerY);
  };

  $(".rating input").change(function (e) {
    const index = parseInt($(this).attr("id").split("_")[1]);
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

  refreshChart();
});