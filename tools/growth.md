---
layout: layout.html
title: Growth Charts
---
<h2>Plot Growth on Chart</h3>

<form id="input-section">
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" oninput="checkFormCompletion()">
    <br><br>
    <label for="weight">Weight (kg):</label>
    <input type="number" id="weight" step="0.01" oninput="checkFormCompletion()">
    <br><br>
    <label for="height">Height (cm):</label>
    <input type="number" id="height" step="1" oninput="checkFormCompletion()">
    <br><br>
    <label><input type="radio" name="sex" value="girl" checked> Girl</label>
    <label><input type="radio" name="sex" value="boy"> Boy</label>
    <br><br>
    <button id="calc-btn" style="display: none;">Plot</button>
</form>

<div class="results" id="age-output" style="display: none"></div>

<img style="border-radius: 50%; width: 300px;" id ="cartoon" src="/assets/images/nurseandchild.png">

<div id="growth-chart" style="display: none; margin-top: 1em; position: relative; max-width: 100%; border: 1px solid #ccc;">
  <img id="growth-chart-img" src="" alt="Growth Chart" style="width: 100%; display: block;">
  <canvas id="growth-canvas" style="position: absolute; top: 0; left: 0;"></canvas>
</div>


<script>
function calculateAge(event) {
  if (event) event.preventDefault();
  const dob = new Date(document.getElementById("dob").value); 
  const refDate = new Date() 
  const weightKg = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  if (isNaN(dob) || isNaN(refDate)) {
    document.getElementById("age-output").textContent = "Please enter valid dates.";
    return;
  }

  // Calculate age in years, months, and days
  let ageYears = refDate.getFullYear() - dob.getFullYear();
  let ageMonths = refDate.getMonth() - dob.getMonth();
  let ageDays = refDate.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(refDate.getFullYear(), refDate.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

// Determine sex
const sex = document.querySelector('input[name="sex"]:checked').value;

// Compute decimal age
const decimalAge = ageYears + ageMonths / 12 + ageDays / 365.25;

if (decimalAge > 20 || decimalAge < 0) {
  const ageOutput = document.getElementById("age-output");
  ageOutput.textContent = "Age must be 0-20 years.";
  ageOutput.style.display = "block";

  // Hide chart and return early
  document.getElementById("growth-chart").style.display = "none";
  return;
}

const ageOutput = document.getElementById("age-output");
ageOutput.textContent = `Age: ${ageYears} years, ${ageMonths} months, ${ageDays} days`;
ageOutput.style.display = "block";


// Determine image path
let imgPath = "";

if (sex === "girl") {
  imgPath = decimalAge < 3 ? "/assets/images/growthF03.png" : "/assets/images/growthF220.png";
} else {
  imgPath = decimalAge < 3 ? "/assets/images/growthM03.png" : "/assets/images/growthM220.png";
}

// Display image
const chartDiv = document.getElementById("growth-chart");
const chartImg = document.getElementById("growth-chart-img");
chartImg.onload = () => {
  plotGrowthPoint(decimalAge, weightKg, heightCm, sex, chartImg);
};

chartImg.src = imgPath;
chartDiv.style.display = "block";
document.getElementById("cartoon").style.display = "none";

}

// Show or hide custom plot date input
document.querySelectorAll('input[name="plot-date-mode"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.getElementById("plot-date").style.display = 
      radio.value === "custom" ? "inline-block" : "none";
  });
});


function checkFormCompletion() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const dob = document.getElementById("dob").value;
  const button = document.getElementById("calc-btn");

  if ((height || weight) && dob) {
    button.style.display = "inline-block";
  } else {
    button.style.display = "none";
  }
}

function mapValueToPixels(value, fromMin, fromMax, toMin, toMax) {
  const ratio = (value - fromMin) / (fromMax - fromMin);
  return toMin + ratio * (toMax - toMin);
}

function mapAgeToX_under3(ageMonths) {
  return mapValueToPixels(ageMonths, 0, 36, 305, 1368);
}

function mapWeightToY_under3(weightKg) {
  return mapValueToPixels(weightKg, 1.4, 22, 2000, 286);
}

function mapHeightToY_under3(heightCm) {
  return mapValueToPixels(heightCm, 37, 106, 1418, 268);
}

function mapAgeToX_2to20(ageYears) {
  return mapValueToPixels(ageYears, 2, 20, 302, 1376);
}

function mapWeightToY_2to20(weightKg) {
  return mapValueToPixels(weightKg, 6, 110, 2000, 835);
}

function mapHeightToY_2to20(heightCm) {
  return mapValueToPixels(heightCm, 75, 195, 1618, 274);
}

function getMappingFunctions(sex, decimalAge) {
  const useUnder3 = decimalAge < 3;

  return {
    mapAgeToX: useUnder3 ? mapAgeToX_under3 : mapAgeToX_2to20,
    mapWeightToY: useUnder3 ? mapWeightToY_under3 : mapWeightToY_2to20,
    mapHeightToY: useUnder3 ? mapHeightToY_under3 : mapHeightToY_2to20,
    imagePath: `/assets/images/growth${sex === 'girl' ? 'F' : 'M'}${useUnder3 ? '03' : '220'}.png`,
    ageUnit: useUnder3 ? "months" : "years"
  };
}


function drawCross(ctx, x, y, size = 10, color = "black") {
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - size, y - size);
  ctx.lineTo(x + size, y + size);
  ctx.moveTo(x + size, y - size);
  ctx.lineTo(x - size, y + size);
  ctx.stroke();
}

function plotGrowthPoint(ageYearsDecimal, weightKg, heightCm, sex, img) {
  const { mapAgeToX, mapWeightToY, mapHeightToY, imagePath, ageUnit } =
    getMappingFunctions(sex, ageYearsDecimal);

  const ageX = mapAgeToX(ageUnit === "months" ? ageYearsDecimal * 12 : ageYearsDecimal);
  const weightY = !isNaN(weightKg) ? mapWeightToY(weightKg) : null;
  const heightY = !isNaN(heightCm) ? mapHeightToY(heightCm) : null;

  const canvas = document.getElementById("growth-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  canvas.style.width = img.width + "px";
  canvas.style.height = img.height + "px";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (weightY !== null) drawCross(ctx, ageX, weightY, 12, "black");
  if (heightY !== null) drawCross(ctx, ageX, heightY, 12, "black");
}

document.getElementById("calc-btn").addEventListener("click", calculateAge);

</script>

<style>

#dob {
  min-width: 180px;
  max-width: 180px;
}


#growth-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* prevent blocking clicks */
}

</style>


<hr>
<h3>Download CDC Growth Charts (pdf)</h3>

<div class="results">
<a href="/assets/pdf/growthM0-3.pdf">Boys 0-3 </a>|
<a href="/assets/pdf/growthM2-20.pdf">Boys 2-20 </a>|
<a href="/assets/pdf/growthF0-3.pdf">Girls 0-3 </a>|
<a href="/assets/pdf/growthF2-20.pdf">Girls 2-20 </a>
</div>