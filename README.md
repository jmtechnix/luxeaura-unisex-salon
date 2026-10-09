# LuxeAura Unisex Salon & Studio

A premium, responsive salon website concept created with HTML5, CSS3, and vanilla JavaScript for the JMTechnix portfolio. **LuxeAura is fictional.** All business details, prices, staff profiles, and location information are illustrative demo content.

## Project features

- Editorial luxury look using cream, warm beige, ink and champagne-gold tones
- Responsive layout for mobile, tablet and desktop
- Sticky navigation and accessible mobile menu
- Service cards with category filters
- Service-specific booking buttons that preselect the matching form option
- Appointment form validation, local-date minimum, and an in-page demo summary
- No backend, analytics, form transmission, or personal-data storage
- SEO metadata, semantic sections, accessible labels, focus states, reduced-motion support, and SVG data favicon

## Folder structure

```text
luxeaura-unisex-salon/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── README.txt
└── README.md
```

## Run in VS Code

1. Extract the project ZIP.
2. Open the `luxeaura-unisex-salon` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension for a local development server.
4. If using Live Server, right-click `index.html` and choose **Open with Live Server**.
5. Edit `css/style.css` for styling, `js/script.js` for interactions, and `index.html` for content.

The page uses remote Unsplash image URLs and Google Fonts. An internet connection is needed for those remote assets. If a remote image is unavailable, the CSS background colours and card backgrounds remain in place; use local licensed images for a production site.

## Update the fictional salon details

- **Brand, copy, navigation, services, dummy prices, team names, contact details:** edit `index.html`.
- **Colours, spacing, typography, layouts, responsive breakpoints:** edit CSS variables near the top of `css/style.css`, then adjust component styles below.
- **Mobile menu, filters, date restriction, booking preview and footer year:** edit `js/script.js`.
- **Contact data:** the phone, address and opening hours are clearly marked as sample information in the Contact and footer sections.

Do not publish the sample phone number or fictional address as real business details.

## Change service categories and prices

Service cards use `data-category` values of `men`, `women`, or `all-gender`. Keep those values consistent with the filter buttons in `index.html`. To add a service:

1. Duplicate a `.service-card` article.
2. Set the correct `data-category`.
3. Update the image, alt text, service title, duration, description and illustrative price.
4. Add a matching `<option>` in the booking form's `#service-select`.
5. Set the booking button's `data-service` to exactly match that option's visible text.

The filter and service preselection behaviour is implemented in `js/script.js`.

## Replace stock imagery with local images

The current site references Unsplash image URLs directly in HTML and CSS. These are illustrative stock images, not actual LuxeAura customer results. Before commercial use, confirm that each image's license and intended use are appropriate.

1. Download or export licensed images and optimise them as WebP where possible.
2. Put them in the `images/` directory with descriptive names, such as `salon-hero.webp`, `mens-haircut.webp`, `beard-grooming.webp`, `hair-colour.webp`, `facial-treatment.webp`, `bridal-makeup.webp`, `salon-interior.webp`, and `stylist-portrait.webp`.
3. In `index.html`, replace each relevant `src="https://..."` with a relative path such as `images/mens-haircut.webp`.
4. In `css/style.css`, replace the `.hero-image` background URL with `url("../images/salon-hero.webp")`.
5. Keep meaningful `alt` text, use appropriately cropped images, and retain `loading="lazy"` on below-the-fold images.

No local photo assets are included in this demo package, so the project does not pretend that local image files exist.

## Demo-only functionality and production requirements

- The appointment form validates input and displays a local preview only. It does **not** send, store, or transmit entered details, and a preview is not a confirmed appointment.
- The phone number, address, opening hours, service prices, team profiles and social links are fictional sample data.
- The location panel is a labelled placeholder, not a real map.
- The social links are placeholders and do not lead to actual brand accounts.
- There is no working WhatsApp integration or backend.

For real appointment submissions, connect the form to a secure backend or trusted booking service. Add server-side validation, privacy disclosures, appropriate data protection, spam prevention, and a real booking confirmation flow before collecting customer details. Replace all dummy data and placeholder links with information approved by the actual business.

## Publish with GitHub Pages

1. Create a new repository for this portfolio demo (for example, `luxeaura-unisex-salon-demo`).
2. Upload the contents of this folder to that repository's root. Ensure `index.html` is at the root.
3. Open **Settings → Pages** in the repository.
4. Under the build/deployment section, choose deployment from a branch, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish and open the URL shown in the Pages settings.
6. Test the site on mobile and desktop, and check that images and styles load.

## Keep it separate from the JMTechnix website

Keep this project in its own folder and GitHub repository. Do not replace your existing JMTechnix `index.html`, CSS, or JavaScript files. For example, keep your work organised like this:

```text
your-web-projects/
├── jmtechnix-main-website/
│   └── ...existing JMTechnix files...
└── luxeaura-unisex-salon/
    ├── index.html
    ├── css/
    ├── js/
    ├── images/
    └── README.md
```

This keeps the salon concept independent and easy to demonstrate to prospective salon clients.


## Service video previews

The service cards include 10-second, muted preview snippets sourced from Pexels video pages. They load only when the cards are in view; if a remote video rendition is unavailable or offline, the original service image remains visible. The pill links open the relevant Pexels source page. Text contrast, card wrapping, and mobile layouts have also been refined.
