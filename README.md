# Primal Training - MTM6201 Final Project

This is the final website project for MTM6201. It is a responsive, multi-page website built for "Primal Training," a performance-focused gym. The design adheres to specific Figma mockups, utilizing a high-contrast aesthetic, a grid-based layout, and periwinkle blue accents.

## published Site
You can view the live site here: https://jacksonissacs.github.io/mtm6201_010_final_/

## Interview Questions & Process

### 1. Tell us about your process.
My process began with a "Mobile-First" approach. I analyzed the design requirements to identify common elements (Navigation, Footer, Typography) that could be reused across all three pages (`index.html`, `about.html`, `reserve.html`).

I utilized **Bootstrap 5** for the core layout structure but heavily customized it using a `style.css` file. I used CSS Variables to override the default Bootstrap colors (blue/primary) to match the specific "Primal" brand color (`#818cf8`).

### 2. Challenges you faced and how you overcame them.
The biggest challenge was the **Hero Section** on the home page. The design required a collage-style layout where text boxes overlap images, which is difficult to achieve with a standard grid.

* **Solution:** I used a combination of Bootstrap's grid for the main columns and custom CSS positioning (`position: relative` and `position: absolute`) to layer the "Guided By Experts" box over the main image. I also used the `<picture>` tag to ensure the images looked good on both mobile (portrait) and desktop (landscape).

### 3. What have you learned by creating this project?
I learned how to integrate external libraries (Animate.css) effectively and how to style interactive elements like Forms and Tables to look professional rather than using the browser defaults. I also reinforced my understanding of **accessibility**, ensuring the site uses semantic HTML tags (like `<nav>`, `<main>`, `<header>`) and includes a "Skip to Main Content" link for keyboard users.

## Assets & Resources Used

* **Framework:** [Bootstrap 5.3](https://getbootstrap.com/) (Layout and responsive grid)
* **CSS Library:** [Animate.css](https://animate.style/) (Used for entrance animations on headlines)
* **Fonts:** [Google Fonts](https://fonts.google.com/)
    * *Oswald* (Headings/Display text)
    * *Inter* (Body text)
* **Images:** Stock photography sourced from [Unsplash](https://unsplash.com/).
    * Photos by Victor Freitas, Alora Griffiths, and others.
* **Icons:** CSS-based shapes were created for the logo (the three dots) to keep the site lightweight.