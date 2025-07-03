# GitHub Copilot Instructions for "Temperature vs Ice Cream" Web Page

---

## 🏷️ WWL Brand Color Guidelines

### General Usage
- **Neutral Gray (`#e8e6df`)** — Preferred background color for video-style content.
- **Off White (`#f4f3f5`)** — Can be used for lighter background scenes.
- **Blueblack (`#091f2c`)** — Ideal for section dividers, titles, and closing segments.

### Chart and Table Guidance
- Use Microsoft Learn's **primary color palette** when designing graphics, charts, or tables.
- The palette ensures consistency and clarity across WWL-branded content.

### WWL Color Palette

| Name         | Light Hex   | Mid Hex    | Dark Hex   |
|--------------|-------------|------------|------------|
| **Orange**   | `#ffa38b`   | `#ff5c39`  | `#73391d`  |
| **Red**      | `#ffb3bb`   | `#f4364c`  | `#73262f`  |
| **Magenta**  | `#cd9bcf`   | `#c73ecc`  | `#702573`  |
| **Blue**     | `#8dc8e8`   | `#0078d4`  | `#2a446f`  |
| **Neutral Gray** | `#e8e6df` |            |            |
| **Blueblack** |            | `#091f2c`  |            |
| **Off White** |            | `#f4f3f5`  |            |
| **Black**     |            | `#000000`  |            |
| **White**     |            | `#ffffff`  |            |

---

## 🖌️ Stylistic Elements

### Fonts
- Use Google Font: `'Patrick Hand', cursive`.
- Apply the font site-wide via `body`.

### Layout
- Use **flexbox** for the main layout.
- Main content area (`.container`) is horizontally split into two:
  - Left: Table with temperature and ice cream data.
  - Right: SVG graph of the same data.
- A fixed, full-width control bar is anchored to the **bottom** of the screen.

---

## 📊 Content Specifications

### Table

- Headers:
  - Represented by **icons** only, not text.
    - Left column: `[🌡️]` for **Temperature**
    - Right column: `[🍦]` for **Ice Cream Sold**
- 7 data rows:
  | Temperature | Ice Cream Sold |
  |-------------|----------------|
  | 21°C        | 93             |
  | 17°C        | 87             |
  | 11°C        | 56             |
  | 26°C        | 102            |
  | 22°C        | 103            |
  | 19°C        | 101            |
  | 31°C        | 127            |

### Graph (SVG)

- ViewBox: `500x400` with white background.
- X and Y axes drawn with `<line>` elements.
- Labeled `"x"` and `"y"` in corner positions.
- Dots represent (temperature, ice cream) pairs, animated with `pop` effect.
- Dot animation should be synced with table row animation.

---

## ▶️ Progress Controls (Fixed Bottom Bar)

- Full-width, fixed container at the **bottom of the viewport**.
- Includes:
  - **Step Counter**: e.g. `Step 3 / 7`
  - **Buttons**:
    - `Previous`
    - `Play`
    - `Next`
    - `Reset`
  - **Progress Bar**:
    - Smooth animation fill
    - Uses gradient: **orange → red → magenta → blue**
    - Width reflects current step as a percentage of total

### Interactivity Behavior
- **Next**: Reveals next row and dot with animation.
- **Previous**: Steps back one position (resets and replays to that point).
- **Play**: Plays through all steps automatically.
- **Reset**: Resets all elements to their initial state (no animation shown).
- Progress bar and step label must update in sync with actions.

---

## 🎯 Copilot Notes
- Ensure **step-based animation control**, not time-based only.
- All buttons should be functional and clearly styled (no icons needed).
- Maintain WWL brand colors and a clean, minimal layout.
- Use semantic HTML and CSS, no external JS libraries.

---

# Low-Fidelity Wireframe Diagrams

+---------------------------------------------------------------+
|                         PAGE CONTAINER                        |
|                      (centered with padding)                  |
|                                                               |
|  +--------------------+       +----------------------------+  |
|  |   TABLE CONTAINER  |       |       GRAPH CONTAINER      |  |
|  |  +--------------+  |       |  +----------------------+  |  |
|  |  | [🌡️] | [🍦]   |  |       |  |                      |  |  |
|  |  +--------------+  |       |  |      SVG GRAPH       |  |  |
|  |  | 21°C | 93    |  |       |  |   (with axes, dots)   |  |  |
|  |  | 17°C | 87    |  |       |  |                      |  |  |
|  |  | ...   ...    |  |       |  +----------------------+  |  |
|  |  | 31°C | 127   |  |       +----------------------------+  |
|  +--------------------+                                       |
|                                                               |
+---------------------------------------------------------------+

                            ↓

+---------------------------------------------------------------+
|                        PROGRESS CONTROLS                      |
|---------------------------------------------------------------|
|  Step X / 7                                                   |
|                                                               |
|  [ Previous ]  [ Play ]  [ Next ]  [ Reset ]                  |
|                                                               |
|  [===========▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮------------------]       |
|   (Gradient progress bar: orange → red → magenta → blue)     |
+---------------------------------------------------------------+

Legend:
[🌡️] = Temperature icon   |   [🍦] = Ice Cream icon
Notes:
- Icons are used as table headers instead of text.
- Bottom bar is fixed, spans full width, and includes animation controls.
