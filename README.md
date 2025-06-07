# 🎮 Games Portfolio Website

A modern, interactive portfolio website for showcasing games built with cutting-edge web technologies. Features beautiful animations, Apple-level design quality, and the ability to play games directly in the browser.

![Portfolio Preview](https://via.placeholder.com/1200x630/1e293b/64748b?text=Games+Portfolio+Website)

## ✨ Features

- **🎨 Apple-Level Design**: Modern glass morphism, smooth animations, and professional UI
- **🎮 Interactive Game Player**: Play games directly in browser with full-screen support
- **⚡ Lightning Fast**: Built with Next.js 15 and optimized for performance
- **📱 Fully Responsive**: Perfect experience on all devices
- **🔍 Advanced Filtering**: Search and filter games by genre, engine, and status
- **🎭 Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **🌙 Dark Theme**: Beautiful dark design optimized for gaming content
- **🚀 Modern Tech Stack**: Latest web technologies and best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Turbopack (Next.js 15)
- **Package Manager**: npm/pnpm

## 🎯 Perfect For

- **Godot 4 Games**: Optimized for HTML5 exports from Godot
- **Unity WebGL**: Support for Unity browser builds
- **Custom Web Games**: Any game that can run in a browser
- **Game Portfolios**: Showcase your interactive projects
- **Indie Developers**: Professional presentation platform

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/games-portfolio-website.git
   cd games-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # UI primitives
│   ├── Header.tsx     # Navigation header
│   ├── Hero.tsx       # Hero section
│   ├── GameCard.tsx   # Game card component
│   ├── GamePlayer.tsx # Game player modal
│   └── GamesSection.tsx # Games showcase
├── data/              # Static data
│   └── games.ts       # Game definitions
├── lib/               # Utility functions
│   └── utils.ts       # Helper functions
└── types/             # TypeScript types
    └── game.ts        # Game interfaces
```

## 🎮 Adding Your Games

1. **Export your game** for web (HTML5/WebGL)
2. **Host the game files** (can be in `/public/games/` or external)
3. **Add game data** to `src/data/games.ts`:

```typescript
{
  id: 'my-awesome-game',
  title: 'My Awesome Game',
  description: 'A brief description of your game',
  thumbnail: '/images/my-game-thumb.jpg',
  screenshots: ['/images/screenshot1.jpg'],
  gameUrl: '/games/my-awesome-game/index.html',
  sourceCodeUrl: 'https://github.com/you/my-game',
  technologies: ['Godot 4', 'GDScript'],
  engine: 'Godot 4',
  genre: ['Platformer', 'Adventure'],
  releaseDate: new Date('2024-01-15'),
  featured: true,
  playable: true,
  controls: {
    keyboard: true,
    instructions: 'WASD to move, Space to jump'
  }
}
```

## 🎨 Customization

### Colors & Theming
Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... more colors */
}
```

### Typography
Fonts are configured in `src/app/layout.tsx`. Update Google Fonts imports as needed.

### Animations
Customize animations in individual components or global CSS classes.

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder

### Self-hosted
1. Build: `npm run build`
2. Start: `npm start`

## 🔧 Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🎯 Game Engine Support

### Godot 4
- ✅ HTML5 Export
- ✅ WebGL Support
- ✅ Gamepad Support
- ✅ Audio Support

### Unity
- ✅ WebGL Build
- ✅ Responsive Canvas
- ✅ Performance Optimized

### Custom/Web Games
- ✅ HTML5/Canvas Games
- ✅ JavaScript Games
- ✅ WebAssembly Games

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide](https://lucide.dev/) - Beautiful icons

---

**Built with ❤️ for the indie game development community** 