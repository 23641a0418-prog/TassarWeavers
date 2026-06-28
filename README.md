# 🧵 TassarWeavers – Handloom Artisan Marketplace

<p align="left">
  <img src="https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind-blue?style=flat-square" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Backend-Supabase%20%28PostgreSQL%29-green?style=flat-square" alt="Backend">
  <img src="https://img.shields.io/badge/Fulfillment-WhatsApp%20Routing-emerald?style=flat-square" alt="Fulfillment">
  <img src="https://img.shields.io/badge/Architecture-Modular-blueviolet?style=flat-square" alt="Architecture">
</p>

An elite, full-stack digital marketplace designed to bridge the gap between local handloom weaver cooperative clusters and modern global consumers. This platform embodies a high-end, minimalist visual language explicitly customized to reflect the texture, earthy tones, and premium heritage of authentic **Tassar Silk**. Driven by a modular frontend architecture, it features seamless real-time database management and instant mobile client conversational checkout routing.

---

## ✦ Key Architectural Modules

### 🛍️ Artisan Marketplace
An immersive storefront featuring fluid collection sorting (`Sarees`, `Plain Cloth`, `Shawls`, `Dhothi & Pancha`). It comes equipped with dynamic multi-image carousels and smooth micro-interactions that emphasize artisan textures.

### 🧾 Context-Aware WhatsApp Checkout
A highly optimized, serverless booking workflow that transforms stateful client cart data into itemized, high-fidelity message invoices. It securely commits data payloads to a cloud ledger before natively transitioning users to direct administrative chats (`wa.me`) with active live preview assets.

### 🔐 Administrative Control Suite
A protected, back-office command center enabling instant operations control:
* **Inventory Publishing:** Live multi-photo file processing using distributed content networks.
* **Telemetry Toggles:** Instant one-click warehouse stock updates that immediately reflect site-wide.
* **Layout Orchestration:** Custom control interfaces to dynamically map and refresh home page curated highlights and banner queues.

---

## 🛠️ The Core Technical Stack

| Domain | Technology | Operational Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | `React.js (Vite)` | High-performance component compilation and single-page interface rendering matrix. |
| **Styling Engine** | `Tailwind CSS` | Fully custom architectural layout system matching artisan design palettes. |
| **Motion Physics** | `Framer Motion` | Dynamic entry paths, canvas transformations, and accelerated UI layer sheet behaviors. |
| **Cloud Engine** | `Supabase (PostgreSQL)` | Real-time structured storage arrays, secure administrative auth keys, and direct relational queues. |
| **Asset Storage** | `Supabase Storage` | Distributed public buckets hosting multi-select binary product media links. |

---

## 💾 Cloud Schema Configurations

To ensure flawless application telemetry, configure your PostgreSQL database tables using these precise schema structures:

### 📦 `products` Table Structure
```sql
  id           : int8 / Serial (Primary Key)
  created_at   : timestamptz   (Generated Automatically)
  name         : text          (Product Title)
  price        : numeric       (Base Value)
  category     : text          (Sarees / Plain Cloth / Shawls / Dhoti & Pancha)
  description  : text          (Fabric Specifications)
  images       : text[]        (Array of Public CDN URLs)
  in_stock     : boolean       (Default: true)
```
### 📦 `orders` Table Structure
```sql
  id               : int8          (Primary Key)
  created_at       : timestamptz   (Generated Automatically)
  order_id         : text          (Generated Alphanumeric Token)
  customer_name    : text          (Full Shipping Identity)
  customer_phone   : text          (Contact Line Token)
  customer_address : text          (Physical Location Envelope)
  items            : jsonb         (Snapshot array of parsed product matrices)
  total_amount     : numeric       (Grand Financial Total)
```
