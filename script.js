/* ==========================================================================
   UNDANGAN DIGITAL SPESIAL UNTUK BILA
   Three.js "Hyperspeed" Pink/Magenta Gradient Background & Invitation Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. REACT BITS "HYPERSPEED" THREE.JS BACKGROUND ENGINE (PINK/MAGENTA GRADIENT)
    // ==========================================================================
    const container = document.getElementById('hyperspeed-container');
    if (container && window.THREE) {
        initHyperspeedBackground(container);
    }

    function initHyperspeedBackground(containerElement) {
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x060208, 100, 1000);

        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 8, -5);
        camera.lookAt(0, 0, -100);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerElement.appendChild(renderer.domElement);

        // Colors palette (Pink, Magenta, Cyan, Purple Gradients)
        const leftCarColors = [0xd856bf, 0x6750a2, 0xc247ac, 0xff2a85];
        const rightCarColors = [0x03b3c3, 0x0e5ea5, 0x324555, 0xe040fb];
        const stickColors = [0xff2a85, 0xe040fb, 0x03b3c3];

        // Create light streaks particles & lines
        const streakCount = 120;
        const streaks = [];
        const streakGeometry = new THREE.BoxGeometry(0.18, 0.18, 45);

        for (let i = 0; i < streakCount; i++) {
            const isLeft = i % 2 === 0;
            const hexColor = isLeft 
                ? leftCarColors[Math.floor(Math.random() * leftCarColors.length)]
                : rightCarColors[Math.floor(Math.random() * rightCarColors.length)];

            const material = new THREE.MeshBasicMaterial({
                color: hexColor,
                transparent: true,
                opacity: 0.85
            });

            const mesh = new THREE.Mesh(streakGeometry, material);
            const laneX = isLeft ? (-6 - Math.random() * 8) : (6 + Math.random() * 8);
            const posY = Math.random() * 4 + 0.5;
            const posZ = -Math.random() * 800;

            mesh.position.set(laneX, posY, posZ);
            scene.add(mesh);

            streaks.push({
                mesh: mesh,
                speed: (isLeft ? (60 + Math.random() * 40) : (80 + Math.random() * 50)),
                baseX: laneX,
                baseY: posY,
                isLeft: isLeft
            });
        }

        // Side Light Sticks (Neon Cyan & Pink Vertical Pillars)
        const stickCount = 40;
        const stickGeometry = new THREE.CylinderGeometry(0.12, 0.12, 6, 8);
        for (let i = 0; i < stickCount; i++) {
            const hexColor = stickColors[Math.floor(Math.random() * stickColors.length)];
            const material = new THREE.MeshBasicMaterial({ color: hexColor, transparent: true, opacity: 0.6 });
            const mesh = new THREE.Mesh(stickGeometry, material);
            const sideX = (i % 2 === 0 ? -16 : 16);
            const posZ = -(i * 20);
            mesh.position.set(sideX, 3, posZ);
            scene.add(mesh);
        }

        // Road Surface Grid Plane
        const roadGeo = new THREE.PlaneGeometry(35, 1000, 10, 100);
        const roadMat = new THREE.MeshBasicMaterial({
            color: 0x080808,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const roadMesh = new THREE.Mesh(roadGeo, roadMat);
        roadMesh.rotation.x = -Math.PI / 2;
        roadMesh.position.set(0, 0, -500);
        scene.add(roadMesh);

        // Window Resize Handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation Loop with Smooth Distortion Wave
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // Animate streaks rushing forward
            for (let i = 0; i < streaks.length; i++) {
                const s = streaks[i];
                s.mesh.position.z += s.speed * delta * 2.5;

                // Turbulent distortion wave motion
                s.mesh.position.x = s.baseX + Math.sin(time * 2 + s.mesh.position.z * 0.01) * 1.5;
                s.mesh.position.y = s.baseY + Math.cos(time * 1.5 + s.mesh.position.z * 0.01) * 0.8;

                // Loop back when reaching camera
                if (s.mesh.position.z > 10) {
                    s.mesh.position.z = -800;
                }
            }

            // Subtle camera tilt
            camera.position.x = Math.sin(time * 0.5) * 1.2;
            camera.position.y = 8 + Math.cos(time * 0.8) * 0.5;

            renderer.render(scene, camera);
        }

        animate();
    }


    // ==========================================================================
    // 2. FAST & SMOOTH PURE RED LOVE SVG CURSOR TRAIL
    // ==========================================================================
    const cursorContainer = document.getElementById('love-cursor-container');
    const cursorConfig = {
        spacing: 20,
        followMouseDirection: true,
        randomFloat: true,
        exitDuration: 250,
        removalInterval: 15,
        maxPoints: 12
    };

    let trailPoints = [];
    let idCounter = 0;
    let lastMoveTime = Date.now();

    function handlePointerMove(clientX, clientY) {
        const createRandomData = () => cursorConfig.randomFloat ? {
            randomX: (Math.random() * 8 - 4),
            randomY: (Math.random() * 8 - 4),
            randomRotate: (Math.random() * 14 - 7)
        } : {};

        if (trailPoints.length === 0) {
            addTrailPoint(clientX, clientY, 0, createRandomData());
        } else {
            const last = trailPoints[trailPoints.length - 1];
            const dx = clientX - last.x;
            const dy = clientY - last.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance >= cursorConfig.spacing) {
                let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                const computedAngle = cursorConfig.followMouseDirection ? rawAngle : 0;
                const steps = Math.floor(distance / cursorConfig.spacing);

                for (let i = 1; i <= steps; i++) {
                    const t = (cursorConfig.spacing * i) / distance;
                    const newX = last.x + dx * t;
                    const newY = last.y + dy * t;
                    addTrailPoint(newX, newY, computedAngle, createRandomData());
                }
            }
        }

        lastMoveTime = Date.now();
    }

    function addTrailPoint(x, y, angle, randomData) {
        if (!cursorContainer) return;
        const id = idCounter++;

        const div = document.createElement('div');
        div.className = 'text-cursor-item';
        div.dataset.id = id;

        div.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path fill="#FF2A85" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;

        div.style.left = `${x - 10}px`;
        div.style.top = `${y - 10}px`;

        cursorContainer.appendChild(div);

        if (window.gsap) {
            gsap.fromTo(div, 
                { opacity: 0, scale: 0.4, rotation: angle },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotation: angle + (randomData.randomRotate || 0),
                    x: randomData.randomX || 0,
                    y: randomData.randomY || 0,
                    duration: 0.2, 
                    ease: "power2.out" 
                }
            );
        } else {
            div.style.transform = `rotate(${angle}deg) scale(1)`;
            div.style.opacity = '1';
        }

        trailPoints.push({ id, element: div, x, y });

        if (trailPoints.length > cursorConfig.maxPoints) {
            removeOldestPoint();
        }
    }

    function removeOldestPoint() {
        if (trailPoints.length === 0) return;
        const oldest = trailPoints.shift();
        if (oldest && oldest.element) {
            if (window.gsap) {
                gsap.to(oldest.element, {
                    opacity: 0,
                    scale: 0.2,
                    duration: 0.2,
                    ease: "power1.in",
                    onComplete: () => oldest.element.remove()
                });
            } else {
                oldest.element.style.opacity = '0';
                setTimeout(() => oldest.element.remove(), cursorConfig.exitDuration);
            }
        }
    }

    window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    setInterval(() => {
        if (Date.now() - lastMoveTime > 80 && trailPoints.length > 0) {
            removeOldestPoint();
        }
    }, cursorConfig.removalInterval);


    // ==========================================================================
    // 3. AUDIO PLAYER FOR "AWAL KISAH SELAMANYA"
    // ==========================================================================
    const bgMusic = document.getElementById('bg-music');
    const vinylDisc = document.getElementById('vinyl-disc');
    const songStatus = document.getElementById('song-status');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');

    const envelopeInteractive = document.getElementById('envelope-interactive');
    const waxSeal = document.getElementById('wax-seal');
    const heartStippleClick = document.getElementById('heart-stipple-click');
    const tornLetter = document.getElementById('torn-letter');
    const btnBackToP1 = document.getElementById('btn-back-to-p1');

    let isMusicPlaying = false;

    if (bgMusic) {
        bgMusic.volume = 0.7;
    }

    function playMusic() {
        if (!bgMusic) return;
        
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            if (vinylDisc) vinylDisc.classList.add('spinning');
            if (songStatus) songStatus.textContent = 'Playing • Awal Kisah Selamanya';
            if (playIcon) playIcon.classList.add('hidden');
            if (pauseIcon) pauseIcon.classList.remove('hidden');
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
        }).catch(err => {
            console.log('Autoplay waiting for tap:', err);
            if (songStatus) songStatus.textContent = 'Klik love pada surat untuk memutar lagu 🎵';
        });
    }

    function pauseMusic() {
        if (!bgMusic) return;
        bgMusic.pause();
        isMusicPlaying = false;
        if (vinylDisc) vinylDisc.classList.remove('spinning');
        if (songStatus) songStatus.textContent = 'Paused';
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }


    // ==========================================================================
    // 4. PAGE NAVIGATION & ANIMATIONS
    // ==========================================================================
    function openEnvelopeAndTransition() {
        if (waxSeal) {
            waxSeal.style.transform = 'translate(-50%, -45%) scale(1.3)';
            waxSeal.style.opacity = '0.7';
        }

        playMusic();

        const envFlap = document.querySelector('.env-flap-top');
        if (envFlap) {
            envFlap.style.transform = 'rotateX(180deg)';
        }

        setTimeout(() => {
            showPage(page2);
            setTimeout(() => {
                if (waxSeal) {
                    waxSeal.style.transform = 'translate(-50%, -45%) scale(1)';
                    waxSeal.style.opacity = '1';
                }
                if (envFlap) envFlap.style.transform = 'rotateX(0deg)';
            }, 600);
        }, 550);
    }

    function showPage(targetPage) {
        [page1, page2].forEach(p => {
            if (p) {
                p.classList.remove('active');
                p.classList.add('hidden');
            }
        });
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (envelopeInteractive) envelopeInteractive.addEventListener('click', openEnvelopeAndTransition);
    if (waxSeal) waxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelopeAndTransition();
    });
    if (heartStippleClick) heartStippleClick.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelopeAndTransition();
    });

    if (tornLetter) {
        tornLetter.addEventListener('click', () => {
            tornLetter.classList.toggle('expanded');
        });
    }

    if (btnBackToP1) btnBackToP1.addEventListener('click', () => showPage(page1));


    // ==========================================================================
    // 5. FLOATING PARTICLES & HEART BURST
    // ==========================================================================
    const particlesContainer = document.getElementById('particles-container');
    const particleSymbols = ['💖', '✨', '🌹', '🕊️', '⭐', '💌', '🌸'];

    function createParticle() {
        if (!particlesContainer) return;
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const symbol = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.textContent = symbol;
        
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const size = 14 + Math.random() * 16;
        
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.fontSize = `${size}px`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 1200);

    function createHeartBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'fixed';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.transition = 'all 1s ease-out';
            document.body.appendChild(heart);

            const angle = (i / 8) * Math.PI * 2;
            const velocity = 60 + Math.random() * 40;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;

            requestAnimationFrame(() => {
                heart.style.transform = `translate(${dx}px, ${dy}px) scale(1.5)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => heart.remove(), 1000);
        }
    }

});
