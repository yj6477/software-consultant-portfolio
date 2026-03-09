# [Link to Tailwind CSS style references](https://tailwindcss.com/)
# Styling System and Tailwind CSS Setup
This project uses Tailwind CSS v4 with Vite to generate utility-based styles automatically from the class names used in the React components.\
Unlike traditional CSS where styles are written manually in .css files, Tailwind works by scanning the project files for class names and generating the required CSS automatically.\
\
This document explains:
- How styling works in this project
- Where TailwindCSS is configured
- How class names like ```top-20``` or ```bg-blue-200``` become real CSS


# 1. How Styling Works in This Project
When the development server runs: ```npm run dev```
#### The following happens
1. Vite starts the development server
2. Tailwind scans the project files
3. It detects class names used in JSX (e.g.```top-20```, ```bg-blue-200```)
4. Tailwind generates the CSS rules automatically
5. Generated CSS is injected into the browers
#### Example React code
```<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full"></div>```\
Tailwind automatically generates CSS similar to:
```
.absolute { position: absolute; }
.top-20 { top: 5rem; }
.left-10 { left: 2.5rem; }
.w-72 { width: 18rem; }
.h-72 { height: 18rem; }
.bg-blue-200 { background-color: #bfdbfe; }
.rounded-full { border-radius: 9999px; }
```
# 2. Tailwind CSS File
In the ```src/styles/tailwind.css``` file with the contents of
```
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';

@import 'tw-animate-css';
```
```
@import 'tailwindcss'
```
Loads the Tailwind CSS framework in which give access to all utility classes such as:
- layout utilities
- spacing utilities
- typography utilities
- color utilities
- animation utilities
---
```@source '../**/*.{js,ts,jsx,tsx}'``` this tells Tailwind to "Scan all Javascript and Typescript files in teh project for classs names."\
It search names like
```
bg-blue-200
top-20
w-72
rounded-full
```
and generate only the CSS needed. It keeps the final CSS very small and optimized.

---
```@import 'tw-animate-css'```
Addes library of animation utilities for Tailwind. Such as
```
animate-in
animate-out
fade-in
slide-in
zoom-in
```
---
# 3. PostCSS Configuration
In the ```postcss.config.mjs``` file with the Contents of
```
export default {}
```
#### Explaination:
Tailwind v4 (when used with Vite) automatically configures the required PostCSS plugins.\
Because of this, the project does not need to manually include:
- tailwindcss
- autoprefixer
The file only exists in case additional PostCSS plugins are needed later.

---
# 4. Tailwind Utility Classes
So instead of writing traditional CSS like this:
```
.circle {
  position: absolute;
  top: 5rem;
  left: 2.5rem;
  width: 18rem;
  height: 18rem;
  background-color: #bfdbfe;
  border-radius: 9999px;
}
```
Tailwind allows writing styles directly in HTML/JSX:
```<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full"></div>```
Each class represents a single CSS Rule.

---
# 5. Tailwind Spacing Scale
Many Tailwind utilities use a predefined spacing scale. This scale is based on increments of ```0.25rem```
| Class | Value     |
| ----- | --------- |
| `1`   | `0.25rem` |
| `2`   | `0.5rem`  |
| `4`   | `1rem`    |
| `6`   | `1.5rem`  |
| `8`   | `2rem`    |
| `10`  | `2.5rem`  |
| `16`  | `4rem`    |
| `20`  | `5rem`    |
| `24`  | `6rem`    |
| `32`  | `8rem`    |
| `64`  | `16rem`   |
| `72`  | `18rem`   |
Example translations:
```
top-20 → top: 5rem
left-10 → left: 2.5rem
w-72 → width: 18rem
h-72 → height: 18rem
```
---
# 6. REact and ```className```
In React, CSS classes are applied using ```className``` instead of ```class```.
Example:
```
<div className="bg-blue-200 p-4 rounded-lg">
  Hello World
</div>
```
React converts this internally to standard HTML:
```
<div class="bg-blue-200 p-4 rounded-lg">
  Hello World
</div>
```
The browser then applies the generated Tailwind CSS styles.

---
# Summary
This project uses Tailwind CSS v4 with Vite to generate styles automatically.

Key points:
- Styling is applied using Tailwind utility classes
- Tailwind scans project files for class names
- CSS is generated automatically during development/build
- The tailwind.css file configures Tailwind scanning and utilities
- React uses className to apply these styles in components