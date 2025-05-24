# nyberry.com - Personal Website & Clinical Tools

**Nyberry.com** is a personal website built with [Eleventy (11ty)](https://www.11ty.dev/), designed to share clinical calculators, small web tools, and blog posts. It's a lightweight, static site focused on clarity, utility, and performance.

## Features

- Clinical calculators: BMI, paediatric dosing, kidney function, etc.
- Growth chart tools: Plot child growth points against WHO charts
- Blog: Explorations of medicine, AI, and number puzzles
- Visuals: Diagrams, medical illustrations, and infographics
- Fast, fully static, and hosted with a custom domain

## Project Structure

    nyberry/
    ├── blog/               # Markdown posts with front matter
    ├── clini/              # Medical tools and calculators
    ├── assets/             # CSS, images, JavaScript
    ├── _includes/          # Reusable partials (layout, header, footer)
    ├── _data/              # Global data files
    ├── .eleventy.js        # Eleventy configuration
    └── index.md            # Homepage content

## Tech Stack

- Static site generator: Eleventy (11ty)
- Styling: Vanilla CSS (with utility classes)
- JavaScript: Dynamic forms, canvas overlays, fetch API
- Hosting: Cloudflare Pages
- Domain: [https://www.nyberry.com](https://www.nyberry.com)

## Cusdis + Zapier Webhook Integration Summary

This automatically notifies by email each time someone comments on the site via Cusdis.

Steps Taken:

1. Cusdis Setup:

- Add Cusdis embed code to blog post templates.
- Ensure the data-app-id, data-page-id, data-page-url, and data-page-title attributes are correctly set for each post.

2. Zapier Webhook Trigger:

- Create a Zap in Zapier with "Catch Hook" as the trigger (from the Webhooks by Zapier app).
- This generated a custom webhook URL.

3. Webhook Connection:

- via Cusdis dashboard/ application settings / pasted the Zapier-generated webhook URL in the "Webhook URL" field.

4. Email Notification Action:

- Action step in Zapier: "Send Email" (via Zapier's built-in email tool - allows up to 5 emails per day on free level).
- Configure the email to include the comment content, page URL, and commenter info.

## Live Demo

Visit the live site: [https://www.nyberry.com](https://www.nyberry.com)

## Sample Tools

- [BMI Calculator](https://www.nyberry.com/clini/bmi/)
- [Paediatric Dosing Tool](https://www.nyberry.com/clini/paeds-doses/)
- [Growth Chart Plotter](https://www.nyberry.com/clini/growth-charts/)
- [Lab Unit Converter](https://www.nyberry.com/clini/unit-converter/)

## Blog Topics

- Technology, general practice, and reflections on AI use in healthcare.

## Goals

- Provide simple, clinically relevant tools for everyday use
- Share useful insights from medicine and programming
- Keep the site lightweight, accessible, and informative

## Contributing

Ideas, feedback, and suggestions are welcome. You can open an issue or reach out via [LinkedIn](https://www.linkedin.com/in/nick-berry-767329232/).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

**Nick Berry**  
General Practitioner and developer exploring scalable clinical tools  
[https://www.nyberry.com](https://www.nyberry.com)
