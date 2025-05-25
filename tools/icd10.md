---
title: ICD-10 Lookup Tool
layout: layout.html
description: Look up ICD-10 codes for common symptoms and diagnoses.
image: /assets/images/icd10.png
---

<h2>ICD-10 Code Lookup</h2>

<input type="text" id="search-box" placeholder="Enter condition or code..." style="min-width: 90%; max-width: 90%; padding: 0.5rem; font-size: 1rem;">
<ul id="results" style="list-style-type: none; padding-left: 0;"></ul>
<br>
<br>

<div>
    <img class="profile_img_square" src="/assets/images/icd10.png" alt="looking up the codes">
</div>
<hr>
<h3>About ICD-10</h3>
<strong>A big medical filing cabinet</strong>

The International Classification of Diseases, 10th Revision (ICD-10) is a system for coding diseases, symptoms and injuries. Managed by the World Health Organization, it’s used in many health systems to standardize how medical conditions are recorded and tracked. From sore throat to shark attack, ICD-10 has a code for it.

Each condition gets a unique alphanumeric code (like E11.9 for type 2 diabetes without complications), turning medical diagnoses into structured, comparable data.

The classifcation evolved from a much simpler system that dates back to 1893. Over the years, it has grown in scope, and now contains over 70,000 codes — reflecting advances in medical knowledge, health tech, and the administrative demands of modern healthcare.

ICD-11 was released in 2022, but ICD-10 is still the standard in many countries including the US.

It contains some highly specific codes. Ever been pecked by a macaw? That’s W61.12XA.

Every code tells a story — of human health, of bureaucracy, and occasionally, of mean parrots.

<img class="profile_img_square" src="/assets/images/macaw.png" alt="macaw">

<script>
let debounceTimer;

document.getElementById('search-box').addEventListener('input', function () {
    const query = this.value.trim();
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        
        const resultsList = document.getElementById('results');
        resultsList.innerHTML = '';

        if (query.length < 3) return;

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
