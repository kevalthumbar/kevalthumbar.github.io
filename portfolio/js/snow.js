// Snowfall Effect - Add this script anywhere in your HTML, PHP, or Shopify theme
(function() {
    // Configuration
    const config = {
      snowflakeCount: 50,
      minSize: 10,
      maxSize: 20,
      minDuration: 8,
      maxDuration: 15,
      minOpacity: 0.4,
      maxOpacity: 0.9
    };
  
    // Create container for snowflakes
    const container = document.createElement('div');
    container.id = 'snowfall-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
  
    // SVG snowflake template
    const snowflakeSVG = `
      <svg fill="#ffb400" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.16,16.13l-2-1.15.89-.24a1,1,0,1,0-.52-1.93l-2.82.76L14,12l2.71-1.57,2.82.76.26,0a1,1,0,0,0,.26-2L19.16,9l2-1.15a1,1,0,0,0-1-1.74L18,7.37l.3-1.11a1,1,0,1,0-1.93-.52l-.82,3L13,10.27V7.14l2.07-2.07a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L13,4.31V2a1,1,0,0,0-2,0V4.47l-.81-.81a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L11,7.3v3L8.43,8.78l-.82-3a1,1,0,1,0-1.93.52L6,7.37,3.84,6.13a1,1,0,0,0-1,1.74L4.84,9,4,9.26a1,1,0,0,0,.26,2l.26,0,2.82-.76L10,12,7.29,13.57l-2.82-.76A1,1,0,1,0,4,14.74l.89.24-2,1.15a1,1,0,0,0,1,1.74L6,16.63l-.3,1.11A1,1,0,0,0,6.39,19a1.15,1.15,0,0,0,.26,0,1,1,0,0,0,1-.74l.82-3L11,13.73v3.13L8.93,18.93a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l.65-.65V22a1,1,0,0,0,2,0V19.53l.81.81a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41L13,16.7v-3l2.57,1.49.82,3a1,1,0,0,0,1,.74,1.15,1.15,0,0,0,.26,0,1,1,0,0,0,.71-1.23L18,16.63l2.14,1.24a1,1,0,1,0,1-1.74Z"/></svg>
    `;
  
    // Random number generator
    const random = (min, max) => Math.random() * (max - min) + min;
  
    // Create a single snowflake
    function createSnowflake() {
      const snowflake = document.createElement('div');
      const size = random(config.minSize, config.maxSize);
      const startX = random(0, window.innerWidth);
      const duration = random(config.minDuration, config.maxDuration);
      const opacity = random(config.minOpacity, config.maxOpacity);
      const drift = random(-50, 50);
      const delay = random(-duration, 0); // Negative delay to start mid-animation
  
      snowflake.innerHTML = snowflakeSVG;
      snowflake.style.cssText = `
        position: absolute;
        top: -${size * 2}px;
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation: snowfall ${duration}s linear infinite;
        animation-delay: ${delay}s;
      `;
  
      snowflake.style.setProperty('--drift', `${drift}px`);
      
      return snowflake;
    }
  
    // Initialize snowfall
    function init() {
      // Add CSS animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(${window.innerHeight + 50}px) translateX(var(--drift)) rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
  
      // Add container to page
      document.body.appendChild(container);
  
      // Create snowflakes
      for (let i = 0; i < config.snowflakeCount; i++) {
        container.appendChild(createSnowflake());
      }
    }
  
    // Start when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();