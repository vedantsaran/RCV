# Sophia's Voting Story - Interactive RCV Guide

A beautiful, engaging narrative website that explains Ranked Choice Voting (RCV) through the story of Sophia, a first-time voter discovering the problems with our current voting system. Built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### Story-Driven Learning
- **Character Narrative** - Follow Sophia's journey from confusion to understanding
- **Emotional Engagement** - Relatable voting dilemma that every voter faces
- **Visual Storytelling** - Color-coded candidates, animated vote bars, and emoji characters
- **Clear Progression** - Problem → Discovery → Solution → Benefits

### Interactive Elements
- **Animated Vote Bars** - Watch vote distributions come to life
- **RCV Simulator** - Create your own election scenarios
- **Real-time Visualization** - See how votes transfer between rounds
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Design & UX
- **Modern Design System** - Consistent color tokens, typography, and spacing
- **Dark/Light Mode Toggle** - Automatic theme detection with localStorage persistence
- **Smooth Animations** - Scroll-triggered reveals, hover effects, and micro-interactions
- **Accessibility First** - ARIA labels, keyboard navigation, and screen reader support

## 🚀 Quick Start

1. **Clone or Download** the files to your local machine
2. **Open `index.html`** in your browser
3. **That's it!** No build process, no dependencies, no setup required

## 📁 File Structure

```
RCV/
├── index.html          # Main story page with Sophia's journey
├── styles.css          # Complete design system and story styling
├── script.js           # Interactive features and RCV algorithm
├── 404.html           # Custom error page
└── README.md          # This file
```

## 🎨 Design System

### Color Tokens
```css
--clr-bg: #f7f9fc          /* Background */
--clr-accent: #0061ff      /* Primary accent */
--clr-accent-lite: #eaf1ff /* Accent tint */
--clr-text: #1d2738        /* Main text */
--clr-text-muted: #64748b  /* Muted text */
--clr-maria: #0061ff       /* Maria Chen (progressive) */
--clr-alex: #10b981        /* Alex Johnson (progressive) */
--clr-robert: #ff6b35      /* Robert Smith (conservative) */
```

### Typography
- **System Fonts** - Uses native system UI fonts for optimal performance
- **Responsive Sizing** - `clamp()` functions for fluid typography
- **Accessible Contrast** - WCAG AA compliant color ratios

## 📖 Story Structure

### Sophia's Journey
1. **Meet Sophia** - First-time voter excited about her mayoral election
2. **The Dilemma** - Friends tell her to vote for Alex instead of Maria to avoid "splitting the vote"
3. **What Actually Happens** - Conservative wins with 35% despite 65% progressive preference (spoiler effect)
4. **Sophia Discovers RCV** - Learns about ranking candidates by preference
5. **How RCV Counts Votes** - Step-by-step visualization of vote transfer
6. **Sophia's Happy Ending** - All the benefits RCV provides
7. **Try It Yourself** - Interactive simulator to experiment
8. **Real Stories** - Examples from Maine, NYC, and Australia

## 🔧 Customization

### Adding New Characters
Edit the candidate names in `index.html`:
```html
<span class="candidate-name">Maria Chen</span>
<span class="candidate-name">Alex Johnson</span>
<span class="candidate-name">Robert Smith</span>
```

### Changing Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
  --clr-maria: #your-color;
  --clr-alex: #your-color;
  --clr-robert: #your-color;
}
```

### Adjusting Story Elements
- **Character Emojis** - Change the emoji in each story card
- **Story Text** - Modify the narrative in each section
- **Vote Percentages** - Adjust the example vote distributions

## 🎯 RCV Algorithm

The simulator implements the standard RCV algorithm:

1. **Count First Choices** - Tally all first-choice votes
2. **Check for Winner** - If any candidate has >50%, they win
3. **Eliminate Last Place** - Remove candidate with fewest votes
4. **Redistribute Votes** - Move eliminated votes to next choices
5. **Repeat** - Continue until someone wins

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers** - iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement** - Core functionality works in older browsers

## 🤝 Contributing

This is a static site, so contributions are welcome! Some ideas:

- **Story Expansion** - Add more characters or scenarios
- **Visual Improvements** - Enhance animations or illustrations
- **Accessibility** - Improve screen reader support
- **Educational Content** - Add more real-world examples
- **Performance** - Optimize animations and interactions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with vanilla web technologies for maximum compatibility
- Inspired by the need for better electoral education
- Designed to make complex voting concepts accessible and engaging
- Story-based approach makes learning memorable and relatable

---

**Ready to follow Sophia's journey?** Open `index.html` and start the story! 🗳️✨ 