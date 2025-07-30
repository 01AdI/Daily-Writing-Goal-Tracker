  const canvas = document.getElementById('creativeCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();


  const COLORS = [
    "#590D22","#1466d8ff","#310055","#05937bff","#9e3e2dff","#00293D",
  ];

  class Orb {
    constructor(index) {
      this.index = index;
      this.label = `Day ${index + 1}`;
      this.reset();
    }

      reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 25 + Math.random() * 25;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(ctx) {
      // Glow circle
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 60;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Label (no shadow)
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffffcc"; // soft white
      ctx.font = `${this.radius * 0.6}px Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.label, this.x, this.y);
    }
  }

  const orbs = [];
  const TOTAL_ORBS = 30;
  for (let i = 0; i < TOTAL_ORBS; i++) {
    orbs.push(new Orb(i));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    orbs.forEach((orb) => {
      orb.update();
      orb.draw(ctx);
    });
    requestAnimationFrame(animate);
  }

  animate();
