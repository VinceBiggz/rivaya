# RIVAYA UI Setup with TailwindCSS, shadcn/ui, and Framer Motion

## 🎨 **Theme Configuration**

### **Color Palette**
- **Primary**: `#1E4D2B` (Forest Green)
- **Secondary**: `#004AAD` (Navy Blue)
- **Accent**: `#FFB703` (Golden Yellow) & `#FF4D4D` (Red)
- **Neutral**: `#FAFAFA` (Light), `#F4F4F4` (Medium), `#2E2E2E` (Dark)

### **Typography**
- **Headings**: Poppins (300, 400, 500, 600, 700, 800)
- **Body**: Inter (300, 400, 500, 600, 700)
- **Font Variables**: `--font-poppins`, `--font-inter`

### **Dark Mode**
- **Primary**: Emerald (`#10b981`)
- **Secondary**: Navy (`#1e40af`)
- **Background**: Slate (`#0f172a`)
- **Foreground**: Slate (`#f8fafc`)

## 📦 **Installed Dependencies**

### **Core UI Libraries**
```bash
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge
pnpm add lucide-react framer-motion
pnpm add @next/font next-themes
```

### **Key Features**
- ✅ **TailwindCSS** with custom theme
- ✅ **shadcn/ui** components (Button, Input, Card)
- ✅ **Lucide React** icons
- ✅ **Framer Motion** animations
- ✅ **Dark mode** support with next-themes
- ✅ **Google Fonts** optimization with Next.js

## 🧩 **Components Created**

### **UI Components** (`/src/components/ui/`)
- `button.tsx` - Versatile button with multiple variants
- `input.tsx` - Styled input component
- `card.tsx` - Card layout components
- `theme-provider.tsx` - Dark mode provider
- `theme-toggle.tsx` - Theme switcher with icons

### **Utility Functions** (`/src/lib/utils.ts`)
- `cn()` - Class name utility with tailwind-merge

## 🎭 **Animation System**

### **Framer Motion Animations**
- **Fade In**: `fade-in` (0.5s ease-out)
- **Slide From Top**: `slide-in-from-top` (0.5s ease-out)
- **Slide From Bottom**: `slide-in-from-bottom` (0.5s ease-out)
- **Slide From Left**: `slide-in-from-left` (0.5s ease-out)
- **Slide From Right**: `slide-in-from-right` (0.5s ease-out)

### **Usage Examples**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 🎨 **Design System**

### **Button Variants**
- `default` - Primary green background
- `secondary` - Navy blue background
- `accent` - Golden yellow background
- `outline` - Bordered style
- `ghost` - Transparent background
- `link` - Text link style

### **Color Usage**
```tsx
// Primary elements
className="bg-primary text-white"

// Secondary elements
className="bg-secondary text-white"

// Accent elements
className="bg-accent text-accent-foreground"

// Gradients
className="bg-gradient-to-r from-primary via-secondary to-accent"
```

### **Typography Classes**
```tsx
// Headings
className="font-heading text-2xl font-bold"

// Body text
className="font-sans text-base"

// Gradient text
className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
```

## 🌙 **Dark Mode Implementation**

### **Theme Provider Setup**
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### **Theme Toggle Component**
- Sun/Moon icons with smooth transitions
- System theme detection
- Persistent theme storage

## 📱 **Responsive Design**

### **Breakpoints**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### **Container System**
```tsx
className="container mx-auto px-4"
```

## 🚀 **Demo Page**

### **Features Showcase**
- **Hero Section**: Animated gradient text and CTAs
- **Features Grid**: Interactive cards with icons
- **Stats Section**: Animated counters
- **Testimonials**: Customer reviews with ratings
- **CTA Section**: Email capture form
- **Footer**: Organized links and branding

### **Access URL**
- **Demo Page**: `http://localhost:3000/demo`
- **Main App**: `http://localhost:3000`

## 🔧 **Development Commands**

### **Start Development Server**
```bash
# From root directory
docker-compose up web -d

# Or from web directory
cd apps/web
pnpm dev
```

### **Build for Production**
```bash
cd apps/web
pnpm build
```

## 📋 **Next Steps**

### **Additional Components to Add**
- [ ] Modal/Dialog component
- [ ] Dropdown/Select component
- [ ] Form components (Checkbox, Radio, etc.)
- [ ] Navigation components
- [ ] Data table components
- [ ] Toast/Notification system

### **Advanced Features**
- [ ] Component storybook
- [ ] Design tokens system
- [ ] Advanced animations
- [ ] Accessibility improvements
- [ ] Performance optimizations

## 🎯 **Best Practices**

### **Component Usage**
1. Always use the `cn()` utility for class merging
2. Leverage Framer Motion for smooth animations
3. Use semantic color classes (primary, secondary, accent)
4. Implement proper dark mode support
5. Follow responsive design principles

### **Performance**
1. Use Next.js font optimization
2. Implement proper image optimization
3. Lazy load non-critical components
4. Use proper animation performance techniques

### **Accessibility**
1. Include proper ARIA labels
2. Ensure keyboard navigation
3. Maintain proper color contrast
4. Use semantic HTML elements



