// ========================================
// 3D Viewer with Three.js
// ========================================

class JewelryViewer3D {
    constructor() {
        this.modal = document.getElementById('viewer3d-modal');
        this.canvas = document.getElementById('canvas3d');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.jewelry = null;
        this.controls = {
            isDragging: false,
            previousMousePosition: { x: 0, y: 0 },
            rotationVelocity: { x: 0, y: 0 }
        };

        this.currentProduct = null;
        this.animationId = null;

        // Showcase Animation
        this.showcaseMode = false;
        this.showcaseTime = 0;
        this.cameraAnimation = {
            enabled: false,
            time: 0,
            radius: 5,
            height: 2,
            speed: 0.3
        };
    }

    init() {
        if (!this.canvas) return;

        // Setup Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // Setup Camera
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        // Setup Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Add Lights
        this.setupLights();

        // Add Environment
        this.setupEnvironment();

        // Add Event Listeners
        this.setupEventListeners();

        // Handle Resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLights() {
        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Main Spot Light (simulates jewelry showcase lighting)
        const spotLight = new THREE.SpotLight(0xffffff, 1.5);
        spotLight.position.set(5, 8, 5);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.3;
        spotLight.decay = 2;
        spotLight.distance = 30;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        this.scene.add(spotLight);

        // Rim Light (creates elegant highlights)
        const rimLight = new THREE.PointLight(0xd4af37, 0.8);
        rimLight.position.set(-3, 0, -3);
        this.scene.add(rimLight);

        // Fill Light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, 5);
        this.scene.add(fillLight);

        // Accent Lights (for sparkle effect)
        const accentLight1 = new THREE.PointLight(0xffffff, 0.5);
        accentLight1.position.set(2, 2, 2);
        this.scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0xd4af37, 0.3);
        accentLight2.position.set(-2, -2, 2);
        this.scene.add(accentLight2);
    }

    setupEnvironment() {
        // Add a subtle display platform
        const platformGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.5,
            roughness: 0.5
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -1.5;
        platform.receiveShadow = true;
        this.scene.add(platform);

        // Add subtle fog for depth
        this.scene.fog = new THREE.Fog(0x0a0a0a, 8, 15);
    }

    createJewelry(type = 'ring') {
        // Remove existing jewelry
        if (this.jewelry) {
            this.scene.remove(this.jewelry);
        }

        // Create jewelry based on type
        switch(type) {
            case 'ring':
                this.jewelry = this.createRing();
                break;
            case 'necklace':
            case 'kette':
                this.jewelry = this.createNecklace();
                break;
            case 'bracelet':
            case 'armband':
                this.jewelry = this.createBracelet();
                break;
            case 'earring':
            case 'ohrring':
                this.jewelry = this.createEarrings();
                break;
            default:
                this.jewelry = this.createRing();
        }

        this.scene.add(this.jewelry);
    }

    createRing() {
        const group = new THREE.Group();

        // Gold Band
        const bandGeometry = new THREE.TorusGeometry(1, 0.15, 16, 100);
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.1,
            envMapIntensity: 1.0
        });
        const band = new THREE.Mesh(bandGeometry, goldMaterial);
        band.rotation.x = Math.PI / 2;
        band.castShadow = true;
        group.add(band);

        // Diamond (center stone)
        const diamondGeometry = new THREE.OctahedronGeometry(0.25, 0);
        const diamondMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transparent: true,
            opacity: 0.9,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0
        });
        const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
        diamond.position.y = 0.4;
        diamond.castShadow = true;
        group.add(diamond);

        // Prongs holding the diamond
        for (let i = 0; i < 4; i++) {
            const prongGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
            const prong = new THREE.Mesh(prongGeometry, goldMaterial);
            const angle = (i / 4) * Math.PI * 2;
            prong.position.x = Math.cos(angle) * 0.15;
            prong.position.z = Math.sin(angle) * 0.15;
            prong.position.y = 0.15;
            group.add(prong);
        }

        return group;
    }

    createNecklace() {
        const group = new THREE.Group();

        // Chain
        const chainCurve = new THREE.EllipseCurve(
            0, 0,
            2, 1.5,
            0, Math.PI * 2,
            false,
            0
        );

        const chainPoints = chainCurve.getPoints(50);
        const chainGeometry = new THREE.BufferGeometry().setFromPoints(chainPoints);
        const chainMaterial = new THREE.LineBasicMaterial({
            color: 0xd4af37,
            linewidth: 3
        });

        // Create 3D chain
        for (let i = 0; i < chainPoints.length - 1; i++) {
            const linkGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
            const goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xd4af37,
                metalness: 0.9,
                roughness: 0.2
            });
            const link = new THREE.Mesh(linkGeometry, goldMaterial);
            link.position.set(chainPoints[i].x, chainPoints[i].y, 0);
            link.rotation.z = Math.atan2(
                chainPoints[i+1].y - chainPoints[i].y,
                chainPoints[i+1].x - chainPoints[i].x
            ) + Math.PI / 2;
            group.add(link);
        }

        // Pendant
        const pendantGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const diamondMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xaaddff,
            metalness: 0,
            roughness: 0,
            transparent: true,
            opacity: 0.8,
            reflectivity: 1
        });
        const pendant = new THREE.Mesh(pendantGeometry, diamondMaterial);
        pendant.position.y = -1.5;
        pendant.castShadow = true;
        group.add(pendant);

        group.rotation.x = Math.PI / 2;
        return group;
    }

    createBracelet() {
        const group = new THREE.Group();

        // Main bracelet band
        const bandGeometry = new THREE.TorusGeometry(1.2, 0.1, 12, 48);
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.1
        });
        const band = new THREE.Mesh(bandGeometry, goldMaterial);
        band.rotation.x = Math.PI / 2;
        band.castShadow = true;
        group.add(band);

        // Add diamonds around bracelet
        const diamondCount = 24;
        for (let i = 0; i < diamondCount; i++) {
            const angle = (i / diamondCount) * Math.PI * 2;
            const diamondGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const diamondMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0,
                roughness: 0,
                transparent: true,
                opacity: 0.9,
                reflectivity: 1
            });
            const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
            diamond.position.x = Math.cos(angle) * 1.2;
            diamond.position.z = Math.sin(angle) * 1.2;
            diamond.castShadow = true;
            group.add(diamond);
        }

        return group;
    }

    createEarrings() {
        const group = new THREE.Group();

        // Create two earrings
        for (let side = -1; side <= 1; side += 2) {
            const earringGroup = new THREE.Group();

            // Hook
            const hookCurve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(0, 0.5, 0),
                new THREE.Vector3(0, 0.7, 0),
                new THREE.Vector3(0.2, 0.7, 0)
            );
            const hookGeometry = new THREE.TubeGeometry(hookCurve, 20, 0.02, 8, false);
            const goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xd4af37,
                metalness: 0.9,
                roughness: 0.1
            });
            const hook = new THREE.Mesh(hookGeometry, goldMaterial);
            earringGroup.add(hook);

            // Gemstone
            const gemGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            const gemMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x4444ff,
                metalness: 0,
                roughness: 0,
                transparent: true,
                opacity: 0.8,
                reflectivity: 1
            });
            const gem = new THREE.Mesh(gemGeometry, gemMaterial);
            gem.position.y = 0.2;
            gem.castShadow = true;
            earringGroup.add(gem);

            earringGroup.position.x = side * 0.8;
            group.add(earringGroup);
        }

        return group;
    }

    setupEventListeners() {
        // Mouse drag to rotate
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.onMouseUp());

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.onTouchEnd());
    }

    onMouseDown(event) {
        this.controls.isDragging = true;
        this.controls.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    onMouseMove(event) {
        if (!this.controls.isDragging) return;

        const deltaX = event.clientX - this.controls.previousMousePosition.x;
        const deltaY = event.clientY - this.controls.previousMousePosition.y;

        if (this.jewelry) {
            this.jewelry.rotation.y += deltaX * 0.01;
            this.jewelry.rotation.x += deltaY * 0.01;

            // Store velocity for inertia
            this.controls.rotationVelocity = {
                x: deltaY * 0.01,
                y: deltaX * 0.01
            };
        }

        this.controls.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    onMouseUp() {
        this.controls.isDragging = false;
    }

    onTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        this.controls.isDragging = true;
        this.controls.previousMousePosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    onTouchMove(event) {
        event.preventDefault();
        if (!this.controls.isDragging) return;

        const touch = event.touches[0];
        const deltaX = touch.clientX - this.controls.previousMousePosition.x;
        const deltaY = touch.clientY - this.controls.previousMousePosition.y;

        if (this.jewelry) {
            this.jewelry.rotation.y += deltaX * 0.01;
            this.jewelry.rotation.x += deltaY * 0.01;
        }

        this.controls.previousMousePosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    onTouchEnd() {
        this.controls.isDragging = false;
    }

    onWindowResize() {
        if (!this.canvas || !this.camera || !this.renderer) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Showcase Mode - Cinematic Camera Animation
        if (this.showcaseMode && this.jewelry && !this.controls.isDragging) {
            this.showcaseTime += 0.01;

            // Orbiting camera animation
            const angle = this.showcaseTime * this.cameraAnimation.speed;
            const radius = this.cameraAnimation.radius;
            const height = this.cameraAnimation.height;

            // Smooth camera path with varying height
            this.camera.position.x = Math.cos(angle) * radius;
            this.camera.position.z = Math.sin(angle) * radius;
            this.camera.position.y = height + Math.sin(this.showcaseTime * 0.5) * 0.5;

            // Always look at jewelry
            this.camera.lookAt(0, 0, 0);

            // Smooth jewelry rotation
            this.jewelry.rotation.y += 0.008;
            this.jewelry.rotation.x = Math.sin(this.showcaseTime * 0.3) * 0.1;

            // Pulsing zoom effect
            const zoomFactor = 1 + Math.sin(this.showcaseTime * 0.4) * 0.05;
            this.jewelry.scale.set(zoomFactor, zoomFactor, zoomFactor);

        } else if (!this.showcaseMode) {
            // Reset scale when exiting showcase mode
            if (this.jewelry) {
                this.jewelry.scale.set(1, 1, 1);
            }

            // Apply inertia when not dragging
            if (!this.controls.isDragging && this.jewelry) {
                this.jewelry.rotation.y += this.controls.rotationVelocity.y * 0.95;
                this.jewelry.rotation.x += this.controls.rotationVelocity.x * 0.95;

                // Dampen velocity
                this.controls.rotationVelocity.x *= 0.95;
                this.controls.rotationVelocity.y *= 0.95;
            }

            // Gentle auto-rotation when idle
            if (!this.controls.isDragging && this.jewelry &&
                Math.abs(this.controls.rotationVelocity.y) < 0.001) {
                this.jewelry.rotation.y += 0.003;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    toggleShowcase() {
        this.showcaseMode = !this.showcaseMode;
        const button = document.getElementById('showcaseToggle');
        const hintText = document.getElementById('control-hint-text');

        if (this.showcaseMode) {
            button?.classList.add('active');
            if (hintText) hintText.textContent = 'Automatische Präsentation läuft';
            this.showcaseTime = 0; // Reset animation time
        } else {
            button?.classList.remove('active');
            if (hintText) hintText.textContent = 'Ziehen für 360° Ansicht';
            // Reset camera position
            if (this.camera) {
                this.camera.position.set(0, 0, 5);
                this.camera.lookAt(0, 0, 0);
            }
        }
    }

    show(productData) {
        this.currentProduct = productData;

        // Update modal content
        document.getElementById('modal-3d-title').textContent = productData.name;
        document.getElementById('modal-3d-price').textContent = productData.price;

        // Update details
        const detailsContainer = document.getElementById('modal-3d-details');
        detailsContainer.innerHTML = '';
        productData.details.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            detailItem.innerHTML = `
                <span>${detail.label}:</span>
                <span>${detail.value}</span>
            `;
            detailsContainer.appendChild(detailItem);
        });

        // Initialize 3D viewer if not already
        if (!this.scene) {
            this.init();
        }

        // Create appropriate jewelry type
        this.createJewelry(productData.type);

        // Show modal
        this.modal.classList.add('active');

        // Start animation
        this.animate();
    }

    hide() {
        this.modal.classList.remove('active');

        // Stop animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// ========================================
// Initialize 3D Viewer
// ========================================
const viewer3D = new JewelryViewer3D();

// Close modal handlers
document.getElementById('close3dModal')?.addEventListener('click', () => {
    viewer3D.hide();
});

document.querySelector('.modal-3d-overlay')?.addEventListener('click', () => {
    viewer3D.hide();
});

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('viewer3d-modal').classList.contains('active')) {
        viewer3D.hide();
    }
});

// Showcase toggle button
document.getElementById('showcaseToggle')?.addEventListener('click', () => {
    viewer3D.toggleShowcase();
});

// Export for use in other scripts
window.viewer3D = viewer3D;