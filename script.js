// Dark Mode Toggle
const themeBtn = document.getElementById('theme');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
themeBtn.onclick = () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};

// Scroll-triggered Reveal Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Ripple Effect for Buttons
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.offsetX - size / 2 + 'px';
    ripple.style.top = e.offsetY - size / 2 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// RCV Simulator
const candidates = ['Alice', 'Bob', 'Cara', 'Dan'];
const votersRange = document.getElementById('votersRange');
const votersOut = document.getElementById('votersOut');
const randomizeBtn = document.getElementById('randomize');
const runBtn = document.getElementById('runBtn');

// Generate random ballot
function randomBallot() {
  return candidates.sort(() => Math.random() - 0.5);
}

// Create ballot display
function makeBallots(n) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const div = document.createElement('div');
    div.className = 'ballot';
    div.innerHTML = randomBallot().map(c => `<span>${c}</span>`).join('');
    frag.appendChild(div);
  }
  const container = document.getElementById('ballots');
  container.innerHTML = '';
  container.appendChild(frag);
}

// RCV Algorithm
function countRCV(ballots) {
  const history = [];
  let active = [...candidates];
  let b = [...ballots];
  
  while (true) {
    const tally = Object.fromEntries(active.map(c => [c, 0]));
    
    // Count first choices for active candidates
    b.forEach(arr => {
      const firstChoice = arr.find(c => active.includes(c));
      if (firstChoice) {
        tally[firstChoice]++;
      }
    });
    
    history.push({
      tally: structuredClone(tally),
      active: [...active]
    });
    
    const scores = Object.values(tally);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const total = scores.reduce((a, b) => a + b, 0);
    
    // Check for winner (more than 50%)
    if (max > total / 2) break;
    
    // Eliminate candidate with fewest votes
    const eliminated = Object.keys(tally).find(c => tally[c] === min);
    active = active.filter(c => c !== eliminated);
    
    // If only one candidate remains, they win
    if (active.length === 1) break;
  }
  
  return history;
}

// Render election rounds
function renderRounds(history) {
  const wrap = document.getElementById('rounds');
  wrap.innerHTML = '';
  
  history.forEach((round, i) => {
    const div = document.createElement('div');
    div.className = 'round';
    div.innerHTML = `<h3>Round ${i + 1}</h3>`;
    
    const total = Object.values(round.tally).reduce((a, b) => a + b, 0);
    
    Object.entries(round.tally).forEach(([name, count]) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.width = `${(count / total * 100).toFixed(2)}%`;
      bar.innerHTML = `<span>${name} – ${count}</span>`;
      div.appendChild(bar);
    });
    
    wrap.appendChild(div);
  });
}

// Event Listeners
randomizeBtn.onclick = () => makeBallots(+votersRange.value);

votersRange.oninput = e => {
  votersOut.textContent = e.target.value;
};

runBtn.onclick = () => {
  const ballots = [...document.querySelectorAll('.ballot')].map(b => 
    [...b.children].map(s => s.textContent)
  );
  
  if (ballots.length === 0) {
    alert('Please generate some ballots first!');
    return;
  }
  
  const history = countRCV(ballots);
  renderRounds(history);
  
  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.bar').forEach(bar => bar.classList.add('show'));
  }, 50);
};

// Initialize with default ballots
makeBallots(10);

// Parallax effect for hero illustration
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroIllustration = document.querySelector('.hero-illustration');
  if (heroIllustration) {
    heroIllustration.style.transform = `translateY(-50%) translateY(${scrolled * 0.25}px)`;
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading states
function addLoadingState(button, text = 'Loading...') {
  const originalText = button.textContent;
  button.textContent = text;
  button.disabled = true;
  return () => {
    button.textContent = originalText;
    button.disabled = false;
  };
}

// Enhanced run button with loading state
const originalRunClick = runBtn.onclick;
runBtn.onclick = () => {
  const removeLoading = addLoadingState(runBtn, 'Calculating...');
  
  // Simulate processing time for better UX
  setTimeout(() => {
    originalRunClick();
    removeLoading();
  }, 300);
};

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or reset simulator
    document.getElementById('rounds').innerHTML = '';
  }
});

// Accessibility: Announce results to screen readers
function announceResults(history) {
  const lastRound = history[history.length - 1];
  const winner = Object.entries(lastRound.tally).reduce((a, b) => 
    lastRound.tally[a[0]] > lastRound.tally[b[0]] ? a : b
  );
  
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-label', `Election complete. ${winner[0]} wins with ${winner[1]} votes.`);
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
}

// Enhanced run button with announcement
const enhancedRunClick = runBtn.onclick;
runBtn.onclick = () => {
  const removeLoading = addLoadingState(runBtn, 'Calculating...');
  
  setTimeout(() => {
    const ballots = [...document.querySelectorAll('.ballot')].map(b => 
      [...b.children].map(s => s.textContent)
    );
    
    if (ballots.length === 0) {
      alert('Please generate some ballots first!');
      removeLoading();
      return;
    }
    
    const history = countRCV(ballots);
    renderRounds(history);
    announceResults(history);
    
    setTimeout(() => {
      document.querySelectorAll('.bar').forEach(bar => bar.classList.add('show'));
    }, 50);
    
    removeLoading();
  }, 300);
};

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScroll = debounce(() => {
  const scrolled = window.pageYOffset;
  const heroIllustration = document.querySelector('.hero-illustration');
  if (heroIllustration) {
    heroIllustration.style.transform = `translateY(-50%) translateY(${scrolled * 0.25}px)`;
  }
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Initialize theme based on system preference if no saved preference
if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// Animate vote bars in story sections
function animateVoteBars() {
  const voteBars = document.querySelectorAll('.vote-bar');
  voteBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width; // Trigger reflow
    }, index * 200);
  });
}

// Initialize vote bar animation when story sections come into view
const storyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateVoteBars, 500);
      storyObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.story-section').forEach(el => storyObserver.observe(el)); 