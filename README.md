# TP 2 - Checkout Tienda Online (Programación Móvil)

Aplicación móvil desarrollada con **React Native** y **Expo (SDK 57 + TypeScript)** que implementa el flujo de compra (Checkout) basándose en el diseño de Figma:
[Figma Checkout Flow](https://www.figma.com/design/09BgDgAWmuwuJD67K50Y3L/A-Checkout-Flow--Community-?node-id=35-60&t=mO7Q4fXez7aRo0wh-0)

---

## 📱 Cómo ejecutar el proyecto

### 1. Iniciar el servidor de desarrollo (Metro / Expo):
```bash
npm start
```
- **En tu celular con Expo Go**: Abrí la app Expo Go (Android o iOS) y escaneá el código QR que aparece en la terminal.
- **En la web (Navegador)**: Presioná la tecla `w` en la consola, o ejecutá directamente:
  ```bash
  npm run web
  ```
- **En emulador Android**: Presioná la tecla `a` en la consola o `npm run android`.
- **En emulador iOS (macOS)**: Presioná la tecla `i` en la consola o `npm run ios`.

---

## 🎯 Cumplimiento de Requerimientos de Negocio

### 1. Shopping Cart - Selección de Color, Size y Qty
- **Color**: Al presionar sobre el selector de color de cada producto se abre un modal interactivo con los colores disponibles (ej. Blue, White, Black). Al elegir uno, se actualiza el producto en tiempo real.
- **Size**: Al presionar sobre el talle se despliega un selector con los talles disponibles (ej. 36 al 42 en calzado o 2-1/4 en raquetas).
- **Qty**: Control numérico interactivo con botones decremento (`-`) e incremento (`+`). Al modificar la cantidad, se actualiza inmediatamente el subtotal y el total general.

### 2. Eliminar Productos del Carrito
- Cada tarjeta de producto cuenta con un botón **"Remove"** con ícono de papelera.
- Al presionarlo, solicita confirmación y retira el producto del carrito recalculando el total.
- Si se eliminan todos los productos, se muestra un estado vacío elegante con la opción de restaurar los productos demo ("Restore Demo Products").

### 3. Secure Payment - Tipos de Tarjeta (Visa, Mastercard, Amex y Otras)
- En la pantalla de **Secure Payment**, se incluye el componente `CardTypeSelector`:
  - Botones dedicados con badges e íconos para **Visa**, **Mastercard**, **Amex** y **Otras** (Cabal, Diners, Naranja, etc.).
  - **Detección automática**: Al escribir el número de tarjeta en el campo correspondiente, el sistema reconoce el prefijo (ej. empieza con 4 -> Visa; empieza con 51-55 o 22-27 -> Mastercard; empieza con 34 o 37 -> Amex) y formatea automáticamente los dígitos en bloques de 4.
  - Validación de campos antes de pagar.

### 4. Flujo Completo de Pantallas
1. **Shopping Cart (`ShoppingCartScreen`)**: Carrito de compras, banner de entrega estimada, totales y botón Checkout.
2. **Secure Payment (`SecurePaymentScreen`)**: Dirección de envío (resumen y botón Add/Edit), formulario de tarjeta con selector de franquicias, acordeón desplegable "Order Review" con desglose de costos y botón "Pay Now".
3. **Add Address (`AddAddressScreen`)**: Formulario por etapas: 1. Recipient Information, 2. Shipping Address, 3. Billing Information (Personal/Comercial, Same as delivery).
4. **Saved Addresses (`SavedAddressesScreen`)**: Selección y edición de direcciones guardadas con radio buttons.
5. **Order Confirmation (`OrderConfirmationScreen`)**: Pantalla de éxito con número de orden aleatorio, fecha/hora, resumen de envío, facturación, desglose de items y botón "Back to Shopping".

---

## 📂 Estructura del Código

```
├── App.tsx                  # Punto de entrada con SafeAreaProvider, Context y Navigation
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CardTypeSelector.tsx     # Selector de tipo de tarjeta (Visa, Master, Amex, Otras)
│   │   ├── DeliveryBanner.tsx       # Banner de tiempo de entrega estimado
│   │   ├── OptionSelectModal.tsx    # Modal de selección de Color y Talle
│   │   └── QuantityStepper.tsx      # Stepper (+ / -) de cantidades
│   ├── context/
│   │   └── CheckoutContext.tsx      # Manejo global de estado (Carrito, Direcciones, Pago, Orden)
│   ├── data/
│   │   └── mockData.ts              # Catálogo de productos y datos de prueba
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Configuración de React Navigation (Native Stack)
│   ├── screens/
│   │   ├── ShoppingCartScreen.tsx   # Pantalla 1: Carrito de compras
│   │   ├── SecurePaymentScreen.tsx  # Pantalla 2: Checkout y pago seguro
│   │   ├── AddAddressScreen.tsx     # Pantalla 3: Agregar/Editar dirección
│   │   ├── SavedAddressesScreen.tsx # Pantalla 4: Direcciones guardadas
│   │   └── OrderConfirmationScreen.tsx # Pantalla 5: Confirmación de compra
│   ├── styles/
│   │   └── theme.ts                 # Paleta de colores, tipografías y espaciados
│   └── types/
│       └── index.ts                 # Interfaces TypeScript
├── package.json
└── tsconfig.json
```
