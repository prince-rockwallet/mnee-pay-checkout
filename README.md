# @mnee-pay/checkout

A powerful, customizable, and secure React checkout component for **MNEE Pay**.  
Easily integrate crypto payments (Stablecoins & BSV) into your application with support for **Paywalls**, **E-commerce**, and **Donations**.

## 🚀 Features

- **Drop-in Integration** — Start accepting payments in minutes with the pre-built `MneeCheckout` component.
- **Multi-Chain Support** — Accept USDC, USDT, DAI, and PYUSD on Ethereum, Base, Arbitrum, Optimism, and Polygon.
- **Direct MNEE** — Native support for MNEE stablecoin payments on BSV.
- **Shopping Cart** — Built-in cart system for e-commerce flows.
- **Customizable UI** — Themeable styles: colors, fonts, border radius, branding.
- **Responsive** — Mobile-optimized UI + wallet integrations (RainbowKit, Yours Wallet).
- **Secure** — Client-side wallet connection with server-side session validation.

## 📦 Installation

Install the package and required peer dependencies:

```bash
npm install @mnee-pay/checkout
# or
yarn add @mnee-pay/checkout
```

## ⚡ Quick Start

### 1. Import styles

```ts
import "@mnee-pay/checkout/styles.css";
```

### 2. Use the component

```tsx
import { MneeCheckout } from "@mnee-pay/checkout";

function App() {
  return (
    <div className="App">
      <h1>My Store</h1>

      <MneeCheckout
        buttonId="btn_123456789" // Your MNEE Pay Button ID
        apiBaseUrl="https://api.pay.mnee.io" // MNEE Pay API base URL
        onSuccess={(result) => console.log("Payment successful!", result)}
        onError={(err) => console.error("Payment failed", err)}
      />
    </div>
  );
}
```

## 🧩 Usage Modes

The checkout automatically adapts to the **Button Type** configured in your MNEE Pay dashboard.

### **1. Paywall**

Unlock digital content after a successful one-time payment.
Useful for:

- Premium articles
- Videos & workshops
- File downloads

### **2. Donations**

Accept contributions with:

- Fixed or custom amounts
- Optional donor messages

### **3. E-commerce**

Sell digital or physical products with:

- Quantity selection
- Product options (Size, Color, etc.)
- Shopping cart support
- Shipping address collection

## ⚙️ Props Reference

| Prop           | Type                          | Required | Description                                |
| -------------- | ----------------------------- | -------- | ------------------------------------------ |
| `buttonId`     | `string`                      | ✔️       | Unique identifier for your MNEE Pay button |
| `apiBaseUrl`   | `string`                      | ✔️       | API base URL from your MNEE Pay dashboard  |
| `theme`        | `'light' \| 'dark' \| 'auto'` | ✖️       | Color theme (default: `light`)             |
| `styling`      | `StyleConfig`                 | ✖️       | Customize branding, colors, fonts          |
| `showConfetti` | `boolean`                     | ✖️       | Show confetti animation on success         |
| `onSuccess`    | `(result) => void`            | ✖️       | Triggered when payment completes           |
| `onError`      | `(error) => void`             | ✖️       | Triggered on any error                     |
| `onCancel`     | `() => void`                  | ✖️       | Triggered when user closes modal           |

## 🎨 Styling

Customize UI using the `styling` prop:

```tsx
<MneeCheckout
  buttonId="..."
  apiBaseUrl="..."
  styling={{
    primaryColor: "#8b5cf6",
    buttonColor: "#10b981",
    buttonTextColor: "#ffffff",
    borderRadius: "rounded", // or 'square'
    fontFamily: "Inter, sans-serif",
  }}
/>
```

## 🌐 Supported Chains & Tokens

| Chain        | Tokens                 |
| ------------ | ---------------------- |
| **Ethereum** | USDC, USDT, DAI, PYUSD |
| **Base**     | USDC                   |
| **Arbitrum** | USDC, USDT, DAI        |
| **Optimism** | USDC, USDT, DAI        |
| **Polygon**  | USDC, USDT, DAI        |
| **BSV**      | MNEE                   |

## 🛠️ Development

This project uses **Vite** for development.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Lint files
npm run lint
```

## 📄 License

MIT License © MNEE Pay

---
