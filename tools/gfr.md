---
layout: layout.html
title: kidney calculator
---

<h2>Kidney Function Calculator</h2>

<form id="kidney-form">
  <table style="margin: 0 auto; border-collapse: collapse;">
    <tr>
      <td style="text-align: right; padding: 0.5rem;"><label for="age">Age (years):</label></td>
      <td style="padding: 0.5rem;"><input type="number" id="age"></td>
    </tr>
    <tr>
      <td style="text-align: right; padding: 0.5rem;"><label for="weight">Weight (kg):</label></td>
      <td style="padding: 0.5rem;"><input type="number" id="weight"></td>
    </tr>
    <tr>
      <td style="text-align: right; padding: 0.5rem;"><label for="creatinine">Creatinine:</label></td>
      <td style="padding: 0.5rem;"><input type="number" id="creatinine"></td>
    </tr>
    <tr>
      <td><label><input type="radio" name="sex" value="male" checked>Male</label></td>
      <td><label><input type="radio" name="sex" value="female">Female</label></td>
    </tr>
  </table>
</form>

<div class="results" id="output" style="margin-top: 1.5rem; padding: 1rem; background: #f0f0f0; max-width: 500px; margin-left: auto; margin-right: auto; display:none"></div>


<!-- GFR info (initially hidden) -->
<div id="gfr-info" style="display: none; text-align: centre; margin-top: 2rem;">

<hr>

<h2>eGFR or CrCl ?</h2>


<p>The estimated glomerular filtration rate (eGFR) is the preferred method for assessing overall kidney function in most clinical situations. It is calculated using the CKD-EPI equation, which takes into account a person’s age, sex, and serum creatinine level. This estimate reflects the filtration capacity of the kidneys and is used for diagnosing, staging, and monitoring chronic kidney disease (CKD). eGFR is automatically reported by most laboratories and is standardised to a body surface area of 1.73 m², which allows for comparison across individuals.</p>

<p>Creatinine Clearance (CrCl), typically calculated using the Cockcroft-Gault formula, provides an estimate of the actual rate at which the kidneys are clearing creatinine from the blood. CrCl is important in situations where accurate drug dosing is critical, such as with aminoglycosides, anticoagulants, and chemotherapeutic agents. Unlike eGFR, it incorporates body weight, making it particularly relevant for medications dosed by kidney function in patients who are very underweight or overweight.</p>

  <img src="/assets/images/kidneyEquations.png" alt="equations" width=500px>
<hr>

<h2>CKD</h2>

<p>Chronic Kidney Disease (CKD) is a common, progressive condition where the kidneys gradually lose function over time. It is usually asymptomatic in its early stages and is often detected through routine blood tests showing a reduced eGFR (<90 mL/min/1.73m²) or evidence of kidney damage (e.g., proteinuria). CKD is staged from 1 to 5, with stage 3 or worse (eGFR <60) indicating moderate to severe impairment.</p>

<p>CKD is strongly associated with cardiovascular risk, diabetes, and hypertension. Early detection allows interventions like blood pressure control, glycaemic management, and ACE inhibitors which can slow progression. Monitoring eGFR over time helps guide treatment decisions, detect complications, and plan specialist referral when needed.</p>

  <img src="/assets/images/ckdStages.png" alt="CKD stages" width=500px>

[National Kidney Foundation. eGFR Calculators and Equation Overview](https://www.kidney.org/professionals/kdoqi/gfr_calculator)

[NICE. Chronic Kidney Disease: Assessment and Management (NG203)](https://www.nice.org.uk/guidance/ng203)

[KDIGO. Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease](https://kdigo.org/guidelines/ckd-evaluation-and-management/)

</div>

<script>
  const inputs = document.querySelectorAll("input");
  const output = document.getElementById("output");

  inputs.forEach(input => input.addEventListener("input", calculate));

  function calculate() {
    const age = parseFloat(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const creatinine = parseFloat(document.getElementById("creatinine").value);
    const sex = document.querySelector("input[name='sex']:checked")?.value;

    if (!sex || isNaN(age) || isNaN(creatinine)) {
      output.innerHTML = "Please enter age, sex, and creatinine to calculate eGFR.";
      document.getElementById('gfr-info').style.display = 'none';
      document.getElementById('output').style.display = 'block';
      return;
    }
// Determine creatinine units
const creat_mgdl = creatinine < 25 ? creatinine : creatinine / 88.4;

// CKD-EPI 2021 formula (race-free)
const k = sex === 'female' ? 0.7 : 0.9;
const a = sex === 'female' ? -0.241 : -0.302;
const s = sex === 'female' ? 1.012 : 1.000;

const ratio = creat_mgdl / k;
const minPart = Math.min(ratio, 1);
const maxPart = Math.max(ratio, 1);

const eGFR = 142 *
             Math.pow(minPart, a) *
             Math.pow(maxPart, -1.200) *
             Math.pow(0.9938, age) *
             s;

    let html = `<strong>eGFR (CKD-EPI):</strong> ${eGFR.toFixed(1)} mL/min/1.73m²`;

    if (!isNaN(weight)) {
      const sexFactor = sex === 'male' ? 1 : 0.85;
      const crcl = ((140 - age) * weight * sexFactor) / (72 * creat_mgdl);
      html += `<br><strong>CrCl (Cockcroft-Gault):</strong> ${crcl.toFixed(1)} mL/min`;
    }

    output.innerHTML = html;
    document.getElementById('gfr-info').style.display = 'block';
    document.getElementById('output').style.display = 'block';
  }
</script>
