---
title: "Moser’s Circle Problem - and why we still need GPs"
layout: layout.html
date: 2024-03-24
tags: blog
---


Recently I was thinking about why GP training needs to take so long. Why can't we just replace GPs with reasonably smart people and computers? 

It's a tricky question, but I stumbled across something from the world of maths which might be relevant. 

Here's a picture:

<img src="/blog/images/moser1.png" alt="Moser's circles" class="blog-img">

How many regions are in each of these circles?
Well, if you count the regions, you will see that the circle with one point has just one region. The circle with two points has two regions. The circle with three points as four regions. And so on. The relationship between points and regions goes like this:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Points</th>
        <th>Regions</th>
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

So, a question:

**Q. How many regions will there be if there are 6 points on the circle?**

<hr>

Shelve that for a moment, and let me tell you about a few patients.

Patient A was a 70 year old grandmother, who had pain from a cracked rib. She felt it go when she leaned over a sofa arm 6 weeks earlier. It was painful to sneeze, and the pain was bothering her at night.

Patient B was a fit 30 year old man whose family had a string of colds, but his cough seemed to have lingered far longer than anyone else’s and "gone to his chest" – he was keeping the whole house up with his coughing.

Patient C was a policewoman in her 40s who had a flu like illness with dry cough, headache and aching limbs for 10 days. Initially she took herself off to bed and it seemed to be getting better. But she phoned for advice as it seemed to be getting worse again.

These are bread and butter primary care presentations, right? So you probably won’t be surprised to hear that Patient A's rib pain got better with ibuprofen and time. Patient B had a chest infection; he felt better after a course of antibiotics. Patient C just needed to rest up and to continue taking paracetamol, and perhaps a few more days off work, while she recovered.

Except actually, no. That's not what happened. 

These are all fake patients, but are based on very real presentations to me or my GP colleagues over the years.

Patient A had multiple myeloma. Patient B had sarcoidosis. And Patient C had leptospirosis entering the second, immune phase.
Happily, all were diagnosed and treated, and I'd like to think lived happily ever after (although not sure this is strictly true of patient A.)

Now, clearly bruised ribs and coughs and flu are common. Like horses in a field. 

Myeloma, leptospirosis and sarcoidosis, on the other hand - these are not very common things. They are zebras in the field of horses, at night.

But still, there was a fleeting sense that something was not quite right. 

In each case, there was something about the beast that did not quite sit comfortably with the GP's mental model of a horse, when they shone an inquisitive torch on it.

The Policewoman had very dark urine- is that normal in flu? The grandmother was losing weight, why would that be? The young guy with the cough, well, this was the first time he’d phoned the surgery in fifteen years, what's that about?

These patterns, these anomalies- whatever they were, they somehow resonated. A faint but discernible bell sounding somewhere deep in the subconscious. Which led to a particular line of enquiry or action. And which in turn led to accurate diagnosis, and timely treatment.

<hr>

Let's go back to the circle question. Can you guess where this is going?

<img src="/blog/images/moser1.png" alt="Moser's circles" class="blog-img">
 
Remember, the relationship between points and regions goes like this:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Points</th>
        <th>Regions</th>
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

**Q. How many regions will there be if there are 6 points on the circle?**

Well, as my colleagues point out, we are doctors not mathematicians. But we all did a bit of maths back at school, right?

And so it might be tempting to look at the pattern: 1,2,4,8,16… , doubling with each step, and conclude that the relationship between points and regions is:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>2^(n-1)</th>
      </tr>
    </thead>
  </table>
</div>

In which case, the six-point circle should have 32 regions.

But actually no, that's not what happens.

The sixth circle only has 31 regions.

You can count them here:

<img src="/blog/images/moser2.png" alt="Moser's circles" class="blog-img">

This is Moser's circle problem. It's a classic demonstration of the danger of "false induction": projecting something from a small sample, or limited knowledge.

For those who are interested, the relationship is actually [rather more complicated](https://en.wikipedia.org/wiki/Dividing_a_circle_into_areas), it is given as:

<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th><img src="/blog/images/moser4.png" alt="Moser's circles" class="blog-img"></th>
      </tr>
    </thead>
  </table>
</div>
 
and the sequence continues like this:


<div class="center-table">
  <table class="grid-table">
    <thead>
      <tr>
        <th>Points</th>
        <th>Regions</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>6</td><td>31</td></tr>
      <tr><td>7</td><td>57</td></tr>
      <tr><td>8</td><td>99</td></tr>
      <tr><td>9</td><td>163...</td></tr>
    </tbody>
  </table>
</div>

But how might a mathematician correctly "diagnose" the 6th circle as having 31 sides, not 32?

I suggest there are two main ways.

One way is by working from first principles. What causes a new region to be formed in Moser's circles? It can only be the division of an existing region by a line, which requires 2 points; or the division of a line by another line, which requires 4 points. And so it is possible to calculate the number of regions by mapping out all possible lines and intersections (take my word for it, the [inductive proof](https://en.wikipedia.org/wiki/Dividing_a_circle_into_areas#Inductive_method) is pretty hideous).

Another way is by experience. Having seen Moser's circle problem, if we encounter a rare 6th circle in the wild, we will be probably simply remember that it contains 31 regions, not 32.

<hr>

And maybe it’s like that when GPs encounter illnesses. Most of the time we deal with horses (to extend the metaphor; we are not vets).

But if we see enough undifferentiated equine presentations in primary care, sooner or later we'll see a zebra.

It takes a broad training to spot species we have not previously encountered, to question zebrahood when some aspect of a horse does not quite fit the horseshoes. To go back to the basics of physiology and pathology & run the various points, lines and regions through our own complex mental models. 

And even then, zebras can be really difficult to spot in a field of horses, at night.

We draw on these hard-earned intellectual tools in the same way that a mathematician might draw on their accumulated knowledge of geometry, algebra and combinatorics to solve Moser's circle problem. Or some other problem relevant in their field, at night.

But that’s not all.  Our decisions can be informed by a knowledge of the human: their background, their fears, their behaviour in the past. Subtle cues from their demeanour, voice, and body language.

This is one of the reasons why training a GP from medical school currently takes a minimum of 10 years. There are many so animals in the zoo- please let me know if I’m working this metaphor too hard- and learning about them all simply takes a long time.

And this is why currently, GPs represent the gold standard when dealing with undifferentiated medical presentations in the community.

And it's not just about new presentations either. It's about recognising and dealing with normal and abnormal illness progression, treatment failures, unexpected outcomes, marginal cases, diverse and ever-expanding management options, calibrating risk, weighing and judging when to sit back, and when to act. The list goes on.

This is the worth of a GP.

New technologies will change the way GPs work. Undoubtedly. And we should celebrate this. Every week wonderful new tools are emerging to help us recognise patterns, avoid pitfalls, and draw information together for the benefit of our patients.

They are getting better and better all the time, and they will allow us to be better and better too.

But can GPs be *replaced* by a reasonably smart person with a computer?

<img src="/blog/images/moser3.jpg" alt="chatGPT having a go" class="blog-img">

It seems we are not there yet. 
