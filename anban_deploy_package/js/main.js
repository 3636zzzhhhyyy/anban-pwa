// 页面特定粒子配置
const pageConfigs = {
    'index': {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#00ffff", "#ff00ff", "#ffff00"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    },
    'product': {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 600 } },
            color: { value: ["#3a86ff", "#8338ec", "#ff006e"] },
            shape: { type: "triangle" },
            opacity: { value: 0.4, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 3, direction: "top", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "bubble" }
            }
        }
    },
    'solution': {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 1000 } },
            color: { value: ["#4ECDC4", "#FF6B6B", "#FFE66D"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 100, color: "#ffffff", opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "grab" }
            }
        }
    },
    'team': {
        particles: {
            number: { value: 70, density: { enable: true, value_area: 700 } },
            color: { value: ["#00ff00", "#ff0000", "#0000ff"] },
            shape: { type: "star" },
            opacity: { value: 0.6, random: true },
            size: { value: 3.5, random: true },
            line_linked: { enable: true, distance: 200, color: "#ffffff", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2.5, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" }
            }
        }
    },
    'contact': {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 500 } },
            color: { value: ["#ffffff", "#00ffff", "#ff00ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 2.5, random: true },
            line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "bounce" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "connect" }
            }
        }
    }
};

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面标识
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const config = pageConfigs[currentPage] || pageConfigs['index'];
    
    // 初始化粒子效果
    particlesJS('particles-js', {
        particles: config.particles,
        interactivity: config.interactivity
    });
    
    // 确保粒子容器不会遮挡内容
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.pointerEvents = 'none';
    }
});

// 备用CDN加载
if (typeof particlesJS === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.onload = function() {
        console.log('particles.js从备用CDN加载成功');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    };
    script.onerror = function() {
        console.error('particles.js从备用CDN加载失败');
    };
    document.head.appendChild(script);
}

// PWA安装提示
let deferredPrompt;
const installBtn = document.createElement('div');
installBtn.className = 'install-btn fade-in';
installBtn.innerHTML = '<i class="fas fa-download"></i> 安装应用';
installBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4b0082;
  color: white;
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 999;
`;
document.body.appendChild(installBtn);
installBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
  
  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受安装');
      } else {
        console.log('用户拒绝安装');
      }
      deferredPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', () => {
  console.log('应用已安装');
  installBtn.style.display = 'none';
});
