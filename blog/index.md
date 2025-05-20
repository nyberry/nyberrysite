---
title: "Blog"
layout: layout.html
comments: false
show-date: false
---

<div style="text-align: center;">
  {% for post in collections.blog reversed %}
    <div style="margin: 1em 0;">
      <a href="{{ post.url }}" style="font-size: 1.2em; text-decoration: none; color: inherit;">
        {{ post.data.title }}
      </a><br>
      <small style="color: #666;">{{ post.date | date: "%Y-%m-%d" }}</small>
    </div>
  {% endfor %}
</div>
