# Product Requirements Document (PRD)

## 1. App Overview / Purpose

A client-side web app that allows online shoppers to browse, select, and order fruit products. The app demonstrates the core concepts of an eCommerce experience using a static prototype.

## 2. Target Audience

- Online shoppers interested in purchasing fruit products.
- Users accessing the app from desktop or mobile devices.

## 3. Core Features

- View a list of fruit products.
- View detailed information for each product.
- Add products to a shopping cart with selectable quantities.
- Update or remove items in the shopping cart.
- View a checkout summary and process a mock order.
- Responsive navigation menu.

## 4. Page Descriptions

- **Products:** List all fruit products with name, price per unit, and emoji image. Allow quantity selection and add to cart.
- **ProductDetails:** Show detailed info (name, description, price, emoji) for a selected product. Option to return to Products.
- **ShoppingCart:** Display products in cart with name, quantity, and total price. Allow quantity updates and item removal.
- **Checkout:** Show purchase summary (product, quantity, price, total). Option to "Process Order".

## 5. Navigation

- Left-side navigation menu for all pages.
- Menu collapses to abbreviations when width < 600px.
- Navigation links to Products, ProductDetails, ShoppingCart, and Checkout.

## 6. Sample Data

- 10 fruit products.
- Each product: name, description, price per unit, emoji image.

## 7. Technical Requirements

- Client-side only: HTML, CSS, JavaScript (vanilla JS).
- No backend, authentication, payment, or database.
- Responsive layout for desktop and mobile.

## 8. Styling

- Basic, visually appealing styling.
- Dynamic scaling for different screen sizes.
- Navigation bar collapses on small screens.

## 9. Use Cases / User Flows

- Browse products.
- View product details.
- Add products to cart.
- Update/remove items in cart.
- Proceed to checkout and process order.

## 10. Out of Scope

- User authentication.
- Payment processing.
- Backend/database integration.
- Advanced responsive design or accessibility features.

---

# Low-Fidelity Wireframe Diagrams

## Products Page

```
+-------------------------------------------------------------+
| [PR] [PD] [SC] [CO]      <-- Collapsible Left Nav Menu      |
+-------------------------------------------------------------+
|                  Products                                   |
|-------------------------------------------------------------|
| 🍎 Apple        $1.00/unit   [Qty: - 1 +] [Add to Cart]     |
| 🍌 Banana       $0.50/unit   [Qty: - 1 +] [Add to Cart]     |
| 🍊 Orange       $0.80/unit   [Qty: - 1 +] [Add to Cart]     |
| ... (other fruits)                                          |
+-------------------------------------------------------------+
```

## ProductDetails Page

```
+-------------------------------------------------------------+
| [PR] [PD] [SC] [CO]      <-- Collapsible Left Nav Menu      |
+-------------------------------------------------------------+
|                  Product Details                            |
|-------------------------------------------------------------|
| 🍎 Apple                                                  |
| Description: Crisp, sweet apples.                          |
| Price: $1.00 per unit                                     |
| [Qty: - 1 +] [Add to Cart]                                |
|                                                           |
| [Back to Products]                                        |
+-------------------------------------------------------------+
```

## ShoppingCart Page

```
+-------------------------------------------------------------+
| [PR] [PD] [SC] [CO]      <-- Collapsible Left Nav Menu      |
+-------------------------------------------------------------+
|                  Shopping Cart                              |
|-------------------------------------------------------------|
| 🍎 Apple   Qty: [ - 2 + ]   $2.00   [Remove]                |
| 🍌 Banana  Qty: [ - 1 + ]   $0.50   [Remove]                |
|-------------------------------------------------------------|
| Total: $2.50                                               |
|                                                           |
| [Proceed to Checkout]                                     |
+-------------------------------------------------------------+
```

## Checkout Page

```
+-------------------------------------------------------------+
| [PR] [PD] [SC] [CO]      <-- Collapsible Left Nav Menu      |
+-------------------------------------------------------------+
|                  Checkout                                   |
|-------------------------------------------------------------|
| Product      Qty     Price                                  |
| 🍎 Apple     2       $2.00                                  |
| 🍌 Banana    1       $0.50                                  |
|-------------------------------------------------------------|
| Total: $2.50                                               |
|                                                           |
| [Process Order]                                           |
+-------------------------------------------------------------+
```

## Navigation Bar (Full and Collapsed)

```
+-------------------+      +-----+
| Products          |      | PR  |
| ProductDetails    |      | PD  |
| ShoppingCart      |      | SC  |
| Checkout          |      | CO  |
+-------------------+      +-----+
(Full width)             (Collapsed <600px)
```
