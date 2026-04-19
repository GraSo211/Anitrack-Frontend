# Anitrack Design System v2.0

## Filosofía de Diseño

**"Claridad Cinematográfica"**
- Interfaz que desaparece para dejar brillar el contenido (anime)
- Jerarquía visual clara con profundidad sutil
- Movimiento significativo, nunca distractible
- Accesibilidad como fundamento, no como afterthought

---

## 1. Sistema de Color

### 1.1 Paleta de Superficies (Dark Mode - Default)

| Token | Valor | Uso | WCAG Ratio |
|-------|-------|-----|------------|
| `--bg-primary` | `#0B0B10` | Fondo principal | - |
| `--bg-secondary` | `#12121A` | Superficies elevadas | - |
| `--bg-tertiary` | `#1A1A25` | Cards, modales | - |
| `--bg-quaternary` | `#252532` | Hover states | - |

**Principio:** Negros azulados, nunca negros puros (#000). Proporciona profundidad sin fatiga visual.

### 1.2 Paleta de Superficies (Light Mode)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-primary` | `#FAFBFC` | Fondo principal |
| `--bg-secondary` | `#FFFFFF` | Superficies elevadas |
| `--bg-tertiary` | `#F1F3F5` | Cards |
| `--bg-quaternary` | `#E8EBF0` | Hover states |

### 1.3 Paleta de Texto (Dark)

| Token | Valor | Ratio vs bg-primary | Uso |
|-------|-------|---------------------|-----|
| `--text-primary` | `#F8FAFC` | 16.8:1 | Títulos, textos importantes |
| `--text-secondary` | `#A1A1AA` | 8.2:1 | Body text, descripciones |
| `--text-tertiary` | `#71717A` | 4.8:1 | Metadatos, captions |
| `--text-muted` | `#52525B` | 3.2:1 | Placeholders, disabled |

### 1.4 Paleta de Texto (Light)

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-primary` | `#0F172A` | Títulos |
| `--text-secondary` | `#475569` | Body |
| `--text-tertiary` | `#64748B` | Metadatos |
| `--text-muted` | `#94A3B8` | Placeholders |

### 1.5 Colores de Énfasis (Accents)

| Token | Valor | Uso |
|-------|-------|-----|
| `--accent-primary` | `#6366F1` | Acciones principales, links |
| `--accent-primary-hover` | `#4F46E5` | Hover estado |
| `--accent-primary-subtle` | `rgba(99, 102, 241, 0.15)` | Fondos sutil |
| `--accent-secondary` | `#8B5CF6` | Énfasis secundario |
| `--accent-tertiary` | `#EC4899` | Destacados especiales |

### 1.6 Colores Semánticos (Estados)

| Estado | Color | Fondo Subtle |
|--------|-------|--------------|
| Éxito | `#22C55E` | `rgba(34, 197, 94, 0.15)` |
| Advertencia | `#F59E0B` | `rgba(245, 158, 11, 0.15)` |
| Error | `#EF4444` | `rgba(239, 68, 68, 0.15)` |
| Info | `#3B82F6` | `rgba(59, 130, 246, 0.15)` |

### 1.7 Colores de Estado de Anime

| Estado | Color | Uso |
|--------|-------|-----|
| En Emisión | `#6366F1` | Indigo vibrante |
| Finalizado | `#22C55E` | Verde calm |
| Próximamente | `#F59E0B` | Ámbar |
| Pausado | `#71717A` | Gris neutro |
| Cancelado | `#EF4444` | Rojo suave |

---

## 2. Sistema Tipográfico

### 2.1 Escala Tipográfica (Type Scale)

Base: `16px` (1rem)  
Line-height base: `1.5`  
Ratio: `1.25` (Major Third)

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `display-xl` | 48px | 1.1 | -0.02em | 700 | Hero titles |
| `display-lg` | 40px | 1.15 | -0.02em | 700 | Page titles |
| `display-md` | 32px | 1.2 | -0.01em | 600 | Section headers |
| `heading-xl` | 28px | 1.25 | -0.01em | 600 | Card titles |
| `heading-lg` | 24px | 1.3 | 0 | 600 | Subsection titles |
| `heading-md` | 20px | 1.35 | 0 | 600 | Widget titles |
| `heading-sm` | 18px | 1.4 | 0 | 500 | Small headers |
| `body-lg` | 18px | 1.6 | 0 | 400 | Featured text |
| `body-md` | 16px | 1.6 | 0 | 400 | Body text |
| `body-sm` | 14px | 1.5 | 0 | 400 | Secondary text |
| `caption` | 12px | 1.4 | 0.01em | 400 | Metadata, labels |
| `overline` | 11px | 1.2 | 0.05em | 500 | Uppercase labels |

### 2.2 Jerarquía Visual

```
Página Título (display-lg)
├── Sección Header (display-md)
│   ├── Card Título (heading-xl)
│   ├── Descripción (body-md)
│   └── Metadata (caption)
└── Widget Título (heading-md)
    └── Lista Items (body-sm)
```

### 2.3 Pesos de Fuente

| Weight | Usage |
|--------|-------|
| 400 | Body text, descripciones |
| 500 | Labels, botones secundarios |
| 600 | Títulos, botones primarios |
| 700 | Display text, énfasis máximo |

---

## 3. Sistema de Espaciado (8px Grid)

### 3.1 Escala de Espaciado

| Token | Valor | Usage |
|-------|-------|-------|
| `space-0` | 0 | - |
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Default gap |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Card padding |
| `space-5` | 20px | Section gaps |
| `space-6` | 24px | Container padding |
| `space-8` | 32px | Large gaps |
| `space-10` | 40px | Section padding |
| `space-12` | 48px | Large sections |
| `space-16` | 64px | Page sections |
| `space-20` | 80px | Major dividers |

### 3.2 Layout Constants

| Token | Valor | Usage |
|-------|-------|-------|
| `max-width-content` | 1400px | Main container |
| `max-width-narrow` | 720px | Reading content |
| `sidebar-width` | 280px | Fixed sidebar |
| `header-height` | 72px | Fixed header |
| `card-radius` | 12px | Default radius |
| `button-radius` | 8px | Button radius |
| `pill-radius` | 9999px | Pill shapes |

---

## 4. Sombras y Elevación

### 4.1 Sombras (Dark Mode)

| Token | Valor | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.4)` | Cards default |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.5)` | Elevated cards |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.6)` | Modals |
| `shadow-glow` | `0 0 20px rgba(99,102,241,0.3)` | Focus/active |

### 4.2 Sombras (Light Mode)

| Token | Valor |
|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` |

---

## 5. Componentes

### 5.1 Anime Card (Optimal)

**Estructura:**
```
┌─────────────────────────────┐
│  ┌─────────────────────┐   │  ← Aspect Ratio 2:3
│  │                     │   │
│  │      POSTER         │   │
│  │   ┌──────────────┐  │   │
│  │   │ Progress Bar │  │   │
│  │   └──────────────┘  │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ Title               │   │
│  │ Status Badge        │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

**Specs:**
- Aspect ratio: 2:3 (poster estándar)
- Border radius: `card-radius` (12px)
- Shadow: `shadow-md` → `shadow-lg` on hover
- Border: 1px solid `border-subtle`
- Hover: Scale 1.03, border-color `accent-primary`

**Progreso Visual:**
- Altura: 3px
- Color: `accent-primary` para progreso
- Background: `bg-quaternary` para track
- Posición: Absolute bottom del poster

### 5.2 Status Badge

**Specs:**
- Padding: `space-1` vertical, `space-2` horizontal
- Border radius: `pill-radius`
- Font: `caption` weight 500
- Background: `color-subtle` (15% opacity)
- Text: Color semántico sólido
- Border: 1px sólido con 30% opacity

### 5.3 Botones

**Primario:**
- Background: `accent-primary`
- Text: White
- Padding: `space-2` `space-4`
- Radius: `button-radius`
- Hover: `accent-primary-hover`
- Active: Scale 0.98

**Secundario:**
- Background: `bg-tertiary`
- Border: 1px `border-default`
- Text: `text-primary`
- Hover: `bg-quaternary`

**Ghost:**
- Background: transparent
- Text: `text-secondary`
- Hover: `bg-tertiary`, `text-primary`

**Icon Button:**
- Size: 40px × 40px
- Radius: `button-radius`
- Icon: 20px

### 5.4 Inputs

**Text Input:**
- Height: 48px
- Padding: 0 `space-4`
- Background: `bg-tertiary`
- Border: 1px `border-default`
- Radius: `button-radius`
- Focus: Border `accent-primary`, ring 2px `accent-primary-subtle`
- Placeholder: `text-muted`

**Search Input:**
- Icon left: Search 20px
- Icon color: `text-tertiary`
- Clear button: X icon on right when has content

### 5.5 Navigation Header

**Specs:**
- Height: `header-height` (72px)
- Position: Sticky top
- Background: `bg-primary` with 80% opacity
- Backdrop: blur(20px) saturate(180%)
- Border bottom: 1px `border-subtle`

**Z-Index Layers:**
- Header: z-50
- Dropdowns: z-60
- Modals: z-100
- Toast notifications: z-110

### 5.6 Progress Ring (para dashboards)

**Specs:**
- Track: `bg-quaternary`, 4px
- Fill: Gradiente de `accent-primary` a `accent-secondary`
- Round caps: Sí
- Size variants: sm (40px), md (64px), lg (96px)

---

## 6. Patrones de Layout

### 6.1 Contenedor Principal

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px; /* space-6 */
}

@media (min-width: 640px) {
  .container { padding: 0 32px; } /* space-8 */
}

@media (min-width: 1024px) {
  .container { padding: 0 48px; } /* space-12 */
}
```

### 6.2 Grid de Anime Cards

**Desktop:**
- 6 columnas (grid-cols-6)
- Gap: 24px horizontal, 32px vertical

**Tablet:**
- 4 columnas
- Gap: 20px

**Mobile:**
- 2-3 columnas
- Gap: 16px

### 6.3 Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│                     HEADER                       │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│   SIDEBAR    │         MAIN CONTENT           │
│   (fixed)    │         (scrollable)           │
│   280px      │                                  │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

---

## 7. Animaciones y Transiciones

### 7.1 Durations

| Token | Valor | Usage |
|-------|-------|-------|
| `duration-instant` | 0ms | Sin animación |
| `duration-fast` | 150ms | Micro-interacciones |
| `duration-normal` | 250ms | Default transitions |
| `duration-slow` | 350ms | Page transitions |
| `duration-slower` | 500ms | Complex animations |

### 7.2 Easing

| Token | Valor | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bounce |

### 7.3 Hover States

**Cards:**
- Transform: translateY(-4px) scale(1.02)
- Shadow: Elevate to next level
- Border: Color transition to accent
- Duration: `duration-normal`

**Buttons:**
- Background: Color shift
- Transform: scale(1.02)
- Duration: `duration-fast`

**Links:**
- Color: Shift to accent
- Underline: Appear with slide animation
- Duration: `duration-fast`

### 7.4 Page Transitions

**Fade In:**
- Opacity: 0 → 1
- Transform: translateY(10px) → translateY(0)
- Duration: `duration-slow`
- Easing: `ease-out`

**Stagger Children:**
- Delay increment: 50ms
- Max delay: 300ms (para evitar esperas largas)

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### 8.1 Typography Responsive

**Display Titles:**
- Desktop: 48px
- Tablet: 40px
- Mobile: 32px

**Card Titles:**
- Desktop: 16px
- Mobile: 14px

---

## 9. Accesibilidad (WCAG 2.1)

### 9.1 Contrastes Requeridos

| Element | Ratio Mínimo | Objetivo |
|---------|--------------|----------|
| Texto normal | 4.5:1 | 7:1 (AAA) |
| Texto grande (18px+) | 3:1 | 4.5:1 (AAA) |
| Componentes UI | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | - |

### 9.2 Focus States

- Outline: 2px solid `accent-primary`
- Outline offset: 2px
- Transition: `duration-fast`
- Todos los elementos interactivos deben tener focus visible

### 9.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 9.4 Screen Readers

- Usar `sr-only` para texto auxiliar
- ARIA labels en iconos
- Roles semánticos correctos
- Skip navigation links

---

## 10. Implementación en Código

### 10.1 Variables CSS (globals.css)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0B0B10;
  --bg-secondary: #12121A;
  --bg-tertiary: #1A1A25;
  --bg-quaternary: #252532;

  /* Text */
  --text-primary: #F8FAFC;
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;
  --text-muted: #52525B;

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.2);

  /* Accents */
  --accent-primary: #6366F1;
  --accent-primary-hover: #4F46E5;
  --accent-primary-subtle: rgba(99, 102, 241, 0.15);
  --accent-secondary: #8B5CF6;
  --accent-tertiary: #EC4899;

  /* Status */
  --status-releasing: #6366F1;
  --status-finished: #22C55E;
  --status-upcoming: #F59E0B;
  --status-paused: #71717A;
  --status-cancelled: #EF4444;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}

[data-theme="light"] {
  --bg-primary: #FAFBFC;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #F1F3F5;
  --bg-quaternary: #E8EBF0;

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-tertiary: #64748B;
  --text-muted: #94A3B8;

  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-default: rgba(0, 0, 0, 0.1);
  --border-strong: rgba(0, 0, 0, 0.15);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### 10.2 Tailwind Config (v4 CSS-first)

```css
@theme inline {
  /* Colors */
  --color-bg-primary: var(--bg-primary);
  --color-bg-secondary: var(--bg-secondary);
  --color-bg-tertiary: var(--bg-tertiary);
  --color-bg-quaternary: var(--bg-quaternary);

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-text-muted: var(--text-muted);

  --color-border-subtle: var(--border-subtle);
  --color-border-default: var(--border-default);
  --color-border-strong: var(--border-strong);

  --color-accent-primary: var(--accent-primary);
  --color-accent-primary-hover: var(--accent-primary-hover);
  --color-accent-secondary: var(--accent-secondary);

  /* Spacing */
  --spacing-18: 4.5rem;  /* 72px header */
  --spacing-70: 17.5rem; /* 280px sidebar */

  /* Typography */
  --font-sans: var(--font-montserrat), system-ui, sans-serif;
}
```

---

## 11. Checklist de Implementación

### Fase 1: Fundamentos
- [ ] Actualizar variables CSS en globals.css
- [ ] Configurar Tailwind theme v4
- [ ] Verificar contraste WCAG en ambos temas
- [ ] Implementar focus states consistentes

### Fase 2: Componentes Base
- [ ] Refactorizar Button.tsx
- [ ] Refactorizar AnimeCard.tsx
- [ ] Refactorizar Header.tsx
- [ ] Refactorizar Sidebar.tsx

### Fase 3: Layouts
- [ ] Implementar container responsive
- [ ] Definir grid system para cards
- [ ] Configurar espaciado de secciones

### Fase 4: Microinteracciones
- [ ] Hover states de cards
- [ ] Transiciones de página
- [ ] Loading states
- [ ] Toast notifications

### Fase 5: Polish
- [ ] Reduced motion support
- [ ] Screen reader testing
- [ ] Performance audit
- [ ] Cross-browser testing

---

## Referencias Visuales

- **Netflix**: Elegancia cinematográfica, foco en contenido
- **AniList**: Limpieza, información densa pero organizada
- **Crunchyroll**: Energía del anime, juvenil pero profesional
- **Linear**: Interfaces técnicas, refinamiento extremo
- **Vercel**: Minimalismo funcional, blancos espaciosos
