---
title: "Moser’s Circle Problem - and why we still need GPs"
layout: layout.html
date: 2025-05-20
tags: blog
---


Recently I was thinking about why GP training needs to take so long. Why can't we just replace GPs with reasonably smart people and computers? 

It's a tricky question, but I stumbled across something from the world of maths which might be relevant. 

In the picture below are 5 circles. Each circle has a different number of dots on its edge. When you join all those dots with straight lines, you divide the circle into a number of areas.

<img src="/blog/images/moser1.png" alt="Moser's circles" class="blog-img">

How many areas are in each of these circles?

Well, if you count them, you will see that:
- The circle with one dot has just one area.
- The circle with two dots has two areas.
- The circle with three dots has four areas...

And so on.

The relationship between dots and areas is like this:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Dots</th>
        <th>Areas</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>1</td></tr>
      <tr><td>2</td><td>2</td></tr>
      <tr><td>3</td><td>4</td></tr>
      <tr><td>4</td><td>8</td></tr>
      <tr><td>5...</td><td>16...</td></tr>
    </tbody>
  </table>
</div>

So let me ask you a question.

**Q. How many areas will there be if there are 6 dots on the circle?**

<hr>

But shelve that for a moment, and let me tell you about a few patients I dealt with recently.

A 76 year old grandmother, who had pain from a cracked rib. She felt it go when she leaned over a sofa arm 6 weeks earlier. It was painful to sneeze, and the pain was bothering her at night.

A fit 35 year old man whose family had a string of colds, but his cough seemed to have lingered far longer than anyone else’s and "gone to his chest" – he was keeping the whole house up with his coughing.

And a woman in her 40s who had a flu like illness with dry cough, headache and aching limbs for 10 days. Initially she took herself off to bed and it seemed to be getting better. But she phoned for advice as it seemed to be getting worse again.

These are all bread and butter primary care presentations, right?

The patient with rib pain got better with ibuprofen and tincture of time. The man's chest infection improved with a course of antibiotics. The patient with flu just needed to rest up and take paracetamol while she recovered.

Except actually, no. That's not what happened. 

The bony pain was in fact due to multiple myeloma, a rare form of bone cancer. It needed chemotherapy, not ibuprofen.

The persistent cough was a sign of sarcoidosis, a rare condition where clusters of inflammatory cells called granulomas form in the lungs. It needed steroids, not antibiotics.

And the patient with flu-like symptoms had contracted Weils disease, or leptospirosis, while working on her farm's water supply. It was entering the second, immune phase, which is a very bad thing. Her kidneys and liver were failing, as the little bugs wreaked havoc in her bloodstream. You can fix leptospirosis, but it is best recognised while the patient still has working kidneys.

Happily, all three were diagnosed and treated, and recovered.

Now, clearly bruised ribs and coughs and flu are common. Like horses in a field. 

But myeloma, sarcoidoisis and leptospirosis- these are not very common things. They may be in the same field as the horses, but they are in fact zebras.

Zebras seem easy to recognise in broad daylight. But dealing with patients on the phone takes away all those visual cues- it is more like night than day. And it's easy to miss a zebra at night.

And yet, there may still be a sense of something intangible in the air. Something about the murky silhouette that suggests shining an inquisitive torch on it.

The patient with painful ribs as losing weight, why would that be? The young guy with the cough, well, this was the first time he’d phoned the surgery in fifteen years, what's that about? The patient with "flu" said she had very dark urine- is that normal in flu? 

These subtle discords, these incongruencies, these anomalies- whatever they are, they somehow resonate. A faint but discernible bell sounding deep in the subconscious. Which leads to a particular line of enquiry or attention. And which in turn can lead to the zebra's form becoming clear, to accurate diagnosis, and to proper treatment.

<hr>

Let's go back to the circle question. Can you guess where this is going?

<img src="/blog/images/moser1.png" alt="Moser's circles" class="blog-img">
 
Remember, the relationship between dots and areas goes like this:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Dots</th>
        <th>Areas</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>1</td></tr>
      <tr><td>2</td><td>2</td></tr>
      <tr><td>3</td><td>4</td></tr>
      <tr><td>4</td><td>8</td></tr>
      <tr><td>5</td><td>16...</td></tr>
    </tbody>
  </table>
</div>

And The question is:

**Q. How many areas will there be if there are 6 dots on the circle?**

Well, we are not mathematicians. But we all did a bit of maths back at school, right?

And so it might be tempting to look at the pattern: 1,2,4,8,16… , doubling with each step, and conclude that the relationship between dots and areas is:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>2^(n-1)</th>
      </tr>
    </thead>
  </table>
</div>

In which case, the 6-dot circle should have 32 regions.

But actually no, that's not what happens.

The sixth circle only has 31 areas.

You can count them here:

<img src="/blog/images/moser2.png" alt="Moser's circles" class="blog-img">

This is Moser's circle problem. It's a classic demonstration of the danger of "false induction": projecting something from a small sample, or limited knowledge.

For those who are interested, the relationship is actually given as:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th><img src="/blog/images/moser4.png" alt="Moser's circles" class="blog-img"></th>
      </tr>
    </thead>
  </table>
</div>
 
And the sequence continues like this:


<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Dots</th>
        <th>Areas</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>6</td><td>31</td></tr>
      <tr><td>7</td><td>57</td></tr>
      <tr><td>8</td><td>99</td></tr>
      <tr><td>9...</td><td>163...</td></tr>
    </tbody>
  </table>
</div>

But how might a mathematician correctly "diagnose" the 6th circle as having 31 areas, not 32?

I suggest there are two main ways.

One way is by working from first principles. What causes a new area to be formed in Moser's circles? It can only be the division of an existing area by a line, by joining 2 dots; or the division of a line by another line, which requires the joining of 4 dots. And so it is possible to calculate the number of areas by considering out all possible lines and intersections (and take my word for it, the [inductive proof](https://en.wikipedia.org/wiki/Dividing_a_circle_into_areas#Inductive_method) is pretty hideous).

Another way is by experience. Having seen Moser's circle problem, if we encounter a rare 6-dot-circle in the wild, we will be probably simply remember that it contains 31 areas, not 32.

<hr>

And maybe it’s like that when GPs encounter illnesses. Most of the time we deal with horses (to extend the metaphor; we are not vets).

But if we see enough undifferentiated equine presentations in primary care, sooner or later we'll see a zebra.

It takes a broad training to spot species we have not previously encountered, to question zebrahood when some aspect does not quite fit the horseshoes. To go back to the basics of physiology and pathology & run the various dots, lines and areas through our own complex mental models. 

And even then, zebras can be really difficult to spot in a field of horses, at night.

<img src="/blog/images/zebra1.png" alt="Zebras at night" class="blog-img" style ="border-radius: 70%;">

This is one of the reasons why training a GP from medical school currently takes a minimum of 10 years. There are many animals in the zoo- please let me know if I’m working this metaphor too hard- and learning about them all takes a long time.

We draw on these hard-earned intellectual tools for illumination, in the same way that a mathematician might draw on their accumulated knowledge of geometry, algebra and combinatorics to solve Moser's circle problem. Or to shine light on some other problem in their field. At night.

<img src="/blog/images/zebra2.png" alt="Zebras lit up at night" class="blog-img" style="border-radius: 70%;">

It's not just about new presentations either. It's about recognising and dealing with normal and abnormal illness progression, treatment failures, unexpected outcomes, marginal cases, diverse and ever-expanding management options, calibrating risk, weighing and judging when to sit back, and when to act. The list goes on.

And crucially, a GP's decisions can be informed by a knowledge of the human in front of them, built up over time. Their background, their fears, their behaviour in the past. Subtle cues from their demeanour, voice, and body language.

This is why GPs represent the gold standard when dealing with undifferentiated medical presentations in the community.

New technologies will change the way we work, undoubtedly. And we should celebrate and embrace them. Every week wonderful new tools are emerging to help us recognise patterns, avoid pitfalls, and draw information together for the benefit of our patients.

They are getting better and better all the time, and they will allow us to be better and better too.

But will GPs eventually be *replaced* by reasonably smart people with computers?

<img src="/blog/images/moser3.png" alt="chatGPT having a go" class="blog-img">

It seems we are not there yet. 
