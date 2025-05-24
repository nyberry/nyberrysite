---
title: ICD-10 Lookup Tool
layout: layout.html
description: Look up ICD-10 codes for common symptoms and diagnoses.
image: /assets/images/icd10.png
---

<h2>ICD-10 Code Lookup</h2>

<input type="text" id="search-box" placeholder="Enter condition or code..." style="min-width: 400px; max-width: 400px; padding: 0.5rem; font-size: 1rem;">
<ul id="results" style="list-style-type: none; padding-left: 0;"></ul>
<br>
<br>

<div>
    <img class="profile_img_square" src="/assets/images/icd10.png" alt="looking up the codes">
</div>
<hr>
<h3>About ICD-10</h3>
<strong>The World's Medical Filing Cabinet</strong>

The International Classification of Diseases, 10th Revision (ICD-10) is a global system for coding diseases, symptoms and injuries Managed by the World Health Organization (WHO), it’s used by clinicians, researchers, and health systems to standardize how medical conditions are recorded and tracked. Whether you have a sore throat or a shark attack, ICD-10 has a code for it.

ICD assigns each condition a unique alphanumeric code (like E11.9 for type 2 diabetes without complications), turning medical diagnoses into structured, comparable data.

ICD-10 was adopted globally in the 1990s, evolving from a much simpler classification that dates back to 1893. Over the years, it has grown in scope — now containing over 70,000 codes — reflecting advanced in medical knowledge, health tech, and the administrative demands of modern healthcare.

ICD-11 was released in 2022, but ICD-10 is still the standard in many countries (including the US, where a modified version is used).

ICD-10 contains some highly specific codes. Ever been struck by a macaw? That’s W61.12XA. Every code tells a story — sometimes of human health, sometimes of bureaucracy, and occasionally, of when parrots go bad.

<img class="profile_img_square" src="/assets/images/macaw.png" alt="macaw">

<script>
let debounceTimer;

document.getElementById('search-box').addEventListener('input', function () {
    const query = this.value.trim();
    clearTimeout(debounceTimer);

    if (query.length < 3) return;

    debounceTimer = setTimeout(() => {
        
        const resultsList = document.getElementById('results');
        resultsList.innerHTML = '';
        fetch(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const results = data[3]; // array of [code, description]

                if (results.length === 0) {
                    resultsList.innerHTML = '<li>No matches found.</li>';
                    return;
                }

                results.slice(0, 20).forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item[0]} — ${item[1]}`;
                    li.style.padding = '0.25rem 0';
                    resultsList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('ICD-10 lookup failed:', error);
                resultsList.innerHTML = '<li>Error retrieving results.</li>';
            });
    }, 600); // ms debounce
});
</script>

<style>
#results li {
  border-bottom: 1px solid #ccc;
  margin: 0.25rem 0;
}
</style>
