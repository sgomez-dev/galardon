# 🎨 Sistema de Diseño - Galardon

## Tema de Graduación - Dorado y Blanco

### 🎨 Paleta de Colores

#### Colores Principales (Invitaciones)

- **Dorado Principal**: `#D4AF37` - Color principal para elementos destacados
- **Dorado Claro**: `#F4E5C2` - Fondos y elementos sutiles
- **Dorado Oscuro**: `#B8941E` - Textos y énfasis
- **Dorado Metálico**: `#CFB53B` - Detalles especiales

#### Colores Neutros

- **Blanco Puro**: `#FFFFFF`
- **Blanco Suave**: `#FEFEFE`
- **Crema**: `#FAF7F0` - Fondo principal
- **Marfil**: `#FFFFF0` - Acentos suaves

#### Colores de Texto

- **Texto Principal**: `#2C2C2C`
- **Texto Secundario**: `#5A5A5A`
- **Texto Claro**: `#8B8B8B`

#### Colores Admin (Backoffice)

- **Fondo Admin**: `#F8F9FA`
- **Sidebar Admin**: `#2C3E50`
- **Acento Admin**: `#3498DB`
- **Borde Admin**: `#E1E8ED`

### 📐 Componentes

#### Botones

- **Variant Gold** (default): Degradado dorado para invitaciones
- **Variant Primary**: Azul para acciones admin
- **Variant Secondary**: Gris para acciones secundarias
- **Variant Danger**: Rojo para acciones destructivas

#### Cards

- **Default**: Fondo blanco con borde sutil
- **Gold**: Degradado dorado para invitaciones
- **Admin**: Estilo minimalista para backoffice

#### Inputs

- Borde sutil con transición
- Focus: Borde azul admin
- Hover: Color ligeramente más oscuro

### 🎭 Experiencia de Usuario

#### Invitaciones (Público)

- Diseño elegante y ceremonial
- Animaciones suaves (float, slide, fade)
- Iconos de graduación (🎓, 📅, 🏛️)
- Sombras doradas para profundidad
- Transiciones fluidas entre estados

#### Backoffice (Admin)

- Diseño minimalista y funcional
- Sidebar oscuro con navegación clara
- Cards con hover effects sutiles
- Estadísticas con iconos descriptivos
- Paleta de colores profesional

### 🎬 Animaciones

#### Globales

- `float`: Movimiento flotante vertical
- `slideUp`: Aparición desde abajo
- `fadeIn`: Aparición con opacidad
- `sparkle`: Efecto de brillo/destello

#### Transiciones

- `--transition-fast`: 0.2s ease
- `--transition-normal`: 0.3s ease
- `--transition-slow`: 0.5s ease

### 📱 Responsive Design

- **Desktop**: > 768px - Layout completo
- **Tablet**: 640px - 768px - Adaptación de grids
- **Mobile**: < 640px - Layout vertical, componentes apilados

### 🔤 Tipografía

- **Títulos Elegantes**: Playfair Display (serif)
- **Texto General**: Inter (sans-serif)
- Jerarquía clara de tamaños
- Weights: 300, 400, 500, 600, 700

### 🎯 Variables CSS Disponibles

Todas las variables están definidas en `src/assets/styles/variables.css` y pueden ser usadas con `var(--nombre-variable)`.

Ejemplos:

```css
color: var(--gold-primary);
box-shadow: var(--shadow-gold);
transition: all var(--transition-normal);
```

### 🚀 Uso

#### Para nuevos componentes de invitación:

- Usar clase `.invitation-page` en el contenedor principal
- Aplicar sombras doradas con `var(--shadow-gold)`
- Usar fuente elegante para títulos: `font-family: var(--font-elegant)`

#### Para nuevos componentes admin:

- Usar clase `.admin-page` en el contenedor principal
- Aplicar estilo minimalista
- Usar `variant="primary"` en botones
