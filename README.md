<h1 align="center">🌌 Interactive 3D Planetary Showcase</h1>

<p align="center">
  An <b>interactive 3D experience</b> built with <b>Three.js</b>, <b>GSAP</b>, and <b>HDRI lighting</b>.  
  This project displays a rotating planetary system inside a starry environment where users can <b>navigate between planets by scrolling</b>.
</p>

<hr/>
<h2>📸 Preview</h2>
<p align="center">
  <img src="./assets/demo.gif" alt="3D Planetary Demo" width="700"/>
</p>
<h2>✨ Features</h2>
<ul>
  <li>🪐 <b>Realistic 3D Planets</b> — Textured spheres representing different celestial bodies.</li>
  <li>🌌 <b>Immersive Background</b> — Large starry sphere enclosing the scene.</li>
  <li>💡 <b>HDRI Environment Lighting</b> — Enhances realism with reflections and ambient light.</li>
  <li>🎡 <b>Scroll-Based Navigation</b> — Smooth GSAP animations to switch focus between planets and rotate the system.</li>
  <li>📱 <b>Responsive Design</b> — Adapts to different screen sizes with window resize handling.</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><b>Three.js</b> — For rendering 3D objects and environment.</li>
  <li><b>GSAP</b> — For smooth animations and transitions.</li>
  <li><b>RGBELoader</b> — For loading HDRI maps.</li>
  <li><b>JavaScript (ES6 Modules)</b></li>
</ul>

<h2>🚀 How It Works</h2>
<ol>
  <li><b>Planets:</b> Four planets are arranged in a circular orbit around the center.</li>
  <li><b>Star Background:</b> A transparent, large sphere with a star texture creates an infinite sky.</li>
  <li><b>Scroll Control:</b>
    <ul>
      <li>Scroll <b>Up/Down</b> → Switch between planetary sections.</li>
      <li>GSAP animation shifts headings and rotates the planet group.</li>
      <li>Every 4th scroll resets the animation back to the start.</li>
    </ul>
  </li>
  <li><b>Continuous Rotation:</b> Each planet rotates slowly on its axis.</li>
</ol>

<h2>📂 Setup & Run</h2>
<pre>
git clone https://github.com/your-username/3d-planetary-showcase.git
cd 3d-planetary-showcase
npm install
npm run dev
</pre>

