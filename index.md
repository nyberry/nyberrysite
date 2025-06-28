---
layout: layout.html
title: nyberry
---

<img class="profile_img" src="/assets/images/headshot.jpg" alt="Centered Image">

### Hi, I'm Nick.

Welcome to my site - a grab-bag of medical calculators, quick-reference tools, and the occasional musing.
<br><br>
Whether you’re here to run some numbers, check a clinical concept, or just browse, I hope you find something useful and thought-provoking.
<br><br>

<div id="contents" class="grid">
  {% for page in collections.pages %}
  <a href="{{ page.url }}" class="card">
  <img src="{{ page.data.image }}" alt="{{ page.data.title }}">
    {% assign tags = page.data.tags | default: "" %}
    {% if tags contains 'blog' %}
        <h3>Blog: {{ page.data.title }}</h3>
      {% else %}
        <h3>{{ page.data.title }}</h3>
    {% endif %}
    {% if page.data.date %}
      <p style="font-size: 0.8rem; color: #666; margin-top: -0.5rem;">
        {{ page.date | date: "%Y-%m-%d" }}
      </p>
    {% endif %}
    {% if tags contains 'blog' %}
      <p>"{{ page.data.description }}"</p>
      {% else %}
      <p>{{ page.data.description }}</p>
    {% endif %}
  </a>
  {% endfor %}
</div>

<hr>

<div style="font-size: 0.8rem; color: #555; margin-top: 1rem;">
  <h3 style="margin-bottom: 0.5rem;">Disclaimer</h3>
  <p>
    This site is intended as a fun, quick reference tool and should not be relied upon as a sole source of information for clinical decision-making. While every effort is made to ensure accuracy, errors or omissions may occur. Users must verify all information against authoritative sources such as national guidelines or clinical protocols. The responsibility for safe clinical use remains entirely with the clinician.
  </p>
  <p style="margin-top: 1rem;">&copy; 2025 NYB Medical Limited</p>
</div>
