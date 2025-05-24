---
title: ICD-10 Lookup Tool
layout: layout.html
description: Look up ICD-10 codes for common symptoms and diagnoses
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
