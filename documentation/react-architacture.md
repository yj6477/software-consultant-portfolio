# React Architecture (Project Walkthrough)
This section explains how the React application is structured and how the main files work together.

The application follows a typical **Vite + React + React Router structure**, where:
```main.tsx  →  App.tsx  →  routes.ts  →  pages (Home.tsx etc.)```

Think of it like pipeline:

```
Browser loads index.html
        ↓
main.tsx starts React
        ↓
App.tsx sets global layout
        ↓
routes.ts decides which page to show
        ↓
pages/Home.tsx renders the UI
```

## 1.main.tsx (Application Entry Point)
This is the first TypeScript file executed by the browser.

Its job is to:
- Start React
- Connect React to the HTML page
- Load the main App component

Typical structure:
```
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app/App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```
#### What happens here
1. ```index.html``` contains a root element:
```<div id="root"></div>```
2. ```createRoot()``` attaches React to that div.
3. ```<App />``` becomes the root component of the entire application.

Render tree look something like this:
```
index.html
  └── root div
        └── React App
              └── App.tsx
```
---
## 2. App.tsx (Application Layout)
```App.tsx``` is the main wrapper of the application.
Its job is usually to:
- Provide global layout
- Setup routing
- Provide context providers (if needed)

Example structure:
```
import { RouterProvider } from "react-router"
import { router } from "./routes"

export function App() {
  return <RouterProvider router={router} />
}
```
#### What this means
Instead of manually switching pages, React Router controls navigation
```
App.tsx
   ↓
RouterProvider
   ↓
routes.ts decides which page loads
```
---
## 3. routes.ts (Page Navigation)
The routes.ts file defines the navigation structure of the application using React Router.

Instead of loading separate HTML pages, React applications use a single-page application (SPA) model. This means the browser loads the app once, and React dynamically renders different components depending on the current URL.

This project uses createBrowserRouter to configure the routes.

Example structure:
```
import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'portfolio', Component: Portfolio },
      { path: 'contact', Component: Contact }
    ]
  }
],
{
  basename: '/software-consultant-portfolio'
}
);
```
### Understanding the Router configuration
This configuration defines which React component should render for each URL path
```
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
```
Each of these components represents a page of the website
| Component   | Page                    |
| ----------- | ----------------------- |
| `Home`      | Homepage                |
| `About`     | About page              |
| `Portfolio` | Portfolio/projects page |
| `Contact`   | Contact page            |

```
{
  path: '/',
  Component: Root,
```
The root route represents the base path of the application.

When the browser visits:
```
/
```
React Router loads the Root component.

The Root component typically acts as a layout wrapper that may contain:

- Navigation bar
- Footer
- Shared layout elements
- An ```<Outlet />``` where pages render
Example layout concept:
```
Root Layout
 ├── Navbar
 ├── Page Content (changes based on route)
 └── Footer
```
### Nested Routes (Children)
Inside the root route, the children property defines nested routes.
```
children: [
  { index: true, Component: Home },
  { path: 'about', Component: About },
  { path: 'portfolio', Component: Portfolio },
  { path: 'contact', Component: Contact }
]
```
These determine which page component appears in side the ```Root``` layout

The homepage ```{ index: true, Component: Home }``` determines when the URL is:
```
/
```
React renders:
```
Root Layout
   └── Home
```
#### About Page
```
{ path: 'about', Component: About }
```
URL:
```
/about
```
Same goes for Portfolio and Contact page with a url being ```/portfolio and /contact```
#### basename Configuration
```
{
  basename: '/software-consultant-portfolio'
}
```
The ``basename`` option tells React Router that the application is hosted inside a subdirectory.

This is commonly required when deploying to **Github Pages**

Example deployment URL
```
https://username.github.io/software-consultant-portfolio/
```

With ``basename`` set, the routes resolve correctly:
| URL                                        | Page      |
| ------------------------------------------ | --------- |
| `/software-consultant-portfolio/`          | Home      |
| `/software-consultant-portfolio/about`     | About     |
| `/software-consultant-portfolio/portfolio` | Portfolio |
| `/software-consultant-portfolio/contact`   | Contact   |

## How Routing Works with App.tsx
In
```
import { RouterProvider } from 'react-router'
import { router } from './routes'

export function App() {
  return <RouterProvider router={router} />
}
```
``RouterProvider`` reads the router configuration and renders the correct page component based on the current URL.

The routing flow would look like this:
```
Browser URL
     ↓
React Router
     ↓
routes.ts configuration
     ↓
Root layout
     ↓
Selected page component
```
Example:
```
URL: /portfolio

Router
  ↓
Root Layout
  ↓
Portfolio Page
```
# 4. Root.tsx (Application Layout and ``<Outlet />``)
The ``Root.tsx`` file defines the shared layout structure of the application.

Instead of each page repeating the same layout elements (such as navigation bars or footers), the ``Root`` component acts as a wrapper that all pages render inside.

This approach keeps the UI consistent and avoids duplicating layout code across multiple pages.

Example:
```
import { Outlet } from 'react-router';

export function Root() {
  return (
    <div>
      <header>
        <h1>Software Consultant Portfolio</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Portfolio</p>
      </footer>
    </div>
  );
}
```
### What ``<Outlet />`` Does

``<Outlet />`` is a placeholder where nested routes are rendered.

React Router replaces the ``<Outlet />`` with whichever page component matches the current URL.

For example, given this route configuration:
```
{
  path: '/',
  Component: Root,
  children: [
    { index: true, Component: Home },
    { path: 'about', Component: About },
    { path: 'portfolio', Component: Portfolio },
    { path: 'contact', Component: Contact }
  ]
}
```
The Root layout always renders first, and then React Router inserts the matching page into ``<Outlet />``.

#### How the Layout Renders
When Visiting home Page 

URL:
```
/
```
Redered component structure:
```
Root
 ├── Header
 ├── Home
 └── Footer
```
React replaces ``<Outlet />`` with the Home component.

#### Visual Flow of Page Rendering
```
main.tsx
   ↓
App.tsx
   ↓
RouterProvider
   ↓
routes.ts
   ↓
Root.tsx
   ↓
<Outlet />
   ↓
Home / About / Portfolio / Contact
```