---
layout: layout.html
title: US-UK lab unit converter
---

<h2>Lab Unit Converter</h2>

<form id="unit-converter">
  <table>
    <thead>
      <tr>
        <th></th>
            <th>
                <img src="https://flagcdn.com/us.svg" alt="US flag" width="24"><br>mg/dl
            </th>
            <th>
                <img src="https://flagcdn.com/gb.svg" alt="UK flag" width="24"><br>mmol/L
            </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Glucose</td>
        <td><input type="number" step="any" id="glucose-us"></td>
        <td><input type="number" step="any" id="glucose-uk"></td>
        <td><span class="flag" id="flag-glucose"></span></td>
      </tr>
      <tr>
        <td>Total Cholesterol</td>
        <td><input type="number" step="any" id="chol-total-us"></td>
        <td><input type="number" step="any" id="chol-total-uk"></td>
        <td><span class="flag" id="flag-chol"></span></td>
      </tr>
      <tr>
        <td>LDL Cholesterol</td>
        <td><input type="number" step="any" id="ldl-us"></td>
        <td><input type="number" step="any" id="ldl-uk"></td>
        <td><span class="flag" id="flag-ldl"></span></td>
      </tr>
      <tr>
        <td>HDL Cholesterol</td>
        <td><input type="number" step="any" id="hdl-us"></td>
        <td><input type="number" step="any" id="hdl-uk"></td>
        <td><span class="flag" id="flag-hdl"></span></td>
      </tr>
      <!-- HbA1c heading -->
       <tr>
        <th></th>
            <th>
                <img src="https://flagcdn.com/us.svg" alt="US flag" width="24"><br>%
            </th>
            <th>
                <img src="https://flagcdn.com/gb.svg" alt="UK flag" width="24"><br>mmol/mol
            </th>
        <th></th>
      </tr>
    
  <!-- HbA1c row -->
  <tr>
    <td>HbA1c</td>
    <td><input type="number" step="any" id="hba1c-us"></td>
    <td><input type="number" step="any" id="hba1c-uk"></td>
    <td><span class="flag" id="flag-hba1c"></span></td>
  </tr>

    </tbody>
  </table>

  <br>
  <button type="submit">Convert</button>
  <button type="button" id="clear-btn">Clear</button>
</form>

<style>
  table {  margin: 0 auto; border-collapse: collapse; width: 100%; max-width: 600px;  table-layout: fixed; }
  th, td { padding: 0.5rem; border: 1px solid #ddd; width: 25%; text-align: center;}
  .flag { color: red; font-size: 1.2rem; }
</style>

<!-- lab converter info (initially hidden) -->
<div id="converter-info" style="display: none; text-align: centre; margin-top: 2rem;">

<hr>

### Americans Use Different Lab Units

The US prefers to measure things in milligrams per deciliter (mg/dL) - how heavy stuff floating in the blood is.

Meanwhile, the UK and most of the rest of the world use millimoles per liter (mmol/L) - how many molecules of stuff are in it.

And then there’s HbA1c. In the US, this is expressed as a percentage (of glycated hemoglobin), while in the UK it’s measured in millimoles per mole.

If you’ve ever looked at a lab report from across the Atlantic and thought “That number looks way off”, this converter can help you bridge The Pond.

<img src="/assets/images/USUKbridge.png" alt="cartoon">

</div>

<script>
document.getElementById('unit-converter').addEventListener('submit', function (e) {
  e.preventDefault();

  // Conversion factors
  const mgdl_to_mmolL_glucose = 0.0555;
  const mmolL_to_mgdl_glucose = 18.018;
  const hba1c_dcct_to_ifcc = x => (x - 2.15) * 10.929;
  const hba1c_ifcc_to_dcct = x => x / 10.929 + 2.15;
  const chol_conv = 0.0259;
  const chol_rev = 38.67;

  // Generic converter that handles individual row
function convertRow(usId, ukId, flagId, toUk, toUs, precisionUs = 0, precisionUk = 1) {
  const usEl = document.getElementById(usId);
  const ukEl = document.getElementById(ukId);
  const flag = document.getElementById(flagId);

  const usVal = parseFloat(usEl.value);
  const ukVal = parseFloat(ukEl.value);

  if (!isNaN(usVal) && !isNaN(ukVal)) {
    flag.textContent = '⚠️ just fill one';
    return;
  }

  flag.textContent = '';

  if (!isNaN(usVal) && isNaN(ukVal)) {
    ukEl.value = toUk(usVal).toFixed(precisionUk);
  } else if (!isNaN(ukVal) && isNaN(usVal)) {
    usEl.value = toUs(ukVal).toFixed(precisionUs);
  }
  document.getElementById('converter-info').style.display = 'block';
}

  // Apply converter to each row
 // Glucose: US = 0 dp, UK = 1 dp
convertRow('glucose-us', 'glucose-uk', 'flag-glucose',
  v => v * 0.0555,
  v => v * 18.018,
  0, 1);

// HbA1c: US = 1 dp, UK = 0 dp 
convertRow('hba1c-us', 'hba1c-uk', 'flag-hba1c',
  x => (x - 2.15) * 10.929,
  x => x / 10.929 + 2.15,
  1, 0);

// Total Cholesterol: US = 0 dp, UK = 1 dp
convertRow('chol-total-us', 'chol-total-uk', 'flag-chol',
  v => v * 0.0259,
  v => v * 38.67,
  0, 1);

// LDL: US = 0 dp, UK = 1 dp
convertRow('ldl-us', 'ldl-uk', 'flag-ldl',
  v => v * 0.0259,
  v => v * 38.67,
  0, 1);

// HDL: US = 0 dp, UK = 1 dp
convertRow('hdl-us', 'hdl-uk', 'flag-hdl',
  v => v * 0.0259,
  v => v * 38.67,
  0, 1);
});

// Clear button logic
document.getElementById('clear-btn').addEventListener('click', function () {
  const inputs = document.querySelectorAll('#unit-converter input');
  inputs.forEach(input => input.value = '');
  const flags = document.querySelectorAll('.flag');
  flags.forEach(flag => flag.textContent = '');
document.getElementById('converter-info').style.display = 'none';
});
</script>
