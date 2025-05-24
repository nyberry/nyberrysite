---
layout: layout.html
title: Visual Acuity Test
description: Snellen and Logmar charts plates for screening visual acuity. Suitable for use on a phone or computer.
image: /assets/images/snellen1.png
---

<img id="snellen-img" src="/assets/images/snellen1.png" alt="Snellen Chart" style=" max-width: 100%; height: auto; display: block; margin: 0 auto;">

<script>
  const snellenImg = document.getElementById('snellen-img');

  snellenImg.addEventListener('mouseover', () => {
    snellenImg.src = '/assets/images/snellen2.png';
  });

  snellenImg.addEventListener('mouseout', () => {
    snellenImg.src = '/assets/images/snellen1.png';
  });
</script>
