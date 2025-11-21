// ========================================
// 360° Product Photography Viewer
// Image-based rotation viewer for Featured Collection
// ========================================

class ProductViewer360 {
    constructor() {
        this.modal = null;
        this.canvas = null;
        this.ctx = null;
        this.images = [];
        this.currentFrame = 0;
        this.totalFrames = 36; // Number of images in 360° sequence
        this.isDragging = false;
        this.startX = 0;
        this.startFrame = 0;
        this.autoRotate = true;
        this.autoRotateSpeed = 0.5;
        this.animationFrame = null;
        this.isLoading = true;
        this.loadedImages = 0;
        this.hotspots = [];
        this.productData = null;

        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        const modalHTML = `
            <div id="viewer360-modal" class="modal-360">
                <div class="modal-360-overlay"></div>
                <div class="modal-360-content">
                    <button class="modal-360-close" id="close360Modal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div class="modal-360-header">
                        <h2 id="modal-360-title">Produktname</h2>
                        <p id="modal-360-price">€ 0.00</p>
                    </div>

                    <div class="modal-360-body">
                        <div class="viewer-360-container">
                            <canvas id="canvas360"></canvas>

                            <!-- Loading Indicator -->
                            <div class="viewer-360-loading" id="loading360">
                                <div class="loading-spinner"></div>
                                <p class="loading-text">Lädt <span id="loadingPercent">0</span>%</p>
                            </div>

                            <!-- Hotspots Container -->
                            <div class="hotspots-container" id="hotspotsContainer"></div>

                            <!-- Instructions -->
                            <div class="viewer-360-hint">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                                <span>Ziehen Sie zum Drehen • Klicken Sie auf Hotspots für Details</span>
                            </div>

                            <!-- Controls -->
                            <div class="viewer-360-controls">
                                <button class="control-btn" id="autoRotateToggle" title="Auto-Rotation">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M23 4v6h-6M1 20v-6h6"/>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                                    </svg>
                                </button>
                                <button class="control-btn" id="resetView" title="Zurücksetzen">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                        <path d="M21 3v5h-5"/>
                                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                    </svg>
                                </button>
                                <button class="control-btn" id="fullscreenToggle" title="Vollbild">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                                    </svg>
                                </button>
                            </div>

                            <!-- Frame Counter -->
                            <div class="frame-counter">
                                <span id="currentFrameDisplay">1</span> / <span id="totalFramesDisplay">36</span>
                            </div>
                        </div>

                        <!-- Product Info Sidebar -->
                        <div class="product-info-sidebar">
                            <h3>Produktdetails</h3>
                            <div id="productDetailsContainer"></div>
                            <button class="cta-button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Jetzt anfragen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('viewer360-modal');
        this.canvas = document.getElementById('canvas360');
        this.ctx = this.canvas.getContext('2d');
    }

    setupEventListeners() {
        // Close button
        document.getElementById('close360Modal').addEventListener('click', () => this.hide());

        // Overlay click
        this.modal.querySelector('.modal-360-overlay').addEventListener('click', () => this.hide());

        // Auto-rotate toggle
        document.getElementById('autoRotateToggle').addEventListener('click', () => {
            this.autoRotate = !this.autoRotate;
            const btn = document.getElementById('autoRotateToggle');
            btn.classList.toggle('active', this.autoRotate);
            if (this.autoRotate) {
                this.animate();
            }
        });

        // Reset view
        document.getElementById('resetView').addEventListener('click', () => {
            this.currentFrame = 0;
            this.render();
        });

        // Fullscreen toggle
        document.getElementById('fullscreenToggle').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                this.modal.querySelector('.modal-360-content').requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        // Mouse drag
        this.canvas.addEventListener('mousedown', (e) => this.onDragStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.onDrag(e));
        this.canvas.addEventListener('mouseup', () => this.onDragEnd());
        this.canvas.addEventListener('mouseleave', () => this.onDragEnd());

        // Touch drag
        this.canvas.addEventListener('touchstart', (e) => this.onDragStart(e.touches[0]));
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.onDrag(e.touches[0]);
        }, { passive: false });
        this.canvas.addEventListener('touchend', () => this.onDragEnd());

        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            if (e.key === 'ArrowLeft') {
                this.currentFrame = (this.currentFrame - 1 + this.totalFrames) % this.totalFrames;
                this.render();
            } else if (e.key === 'ArrowRight') {
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                this.render();
            } else if (e.key === 'Escape') {
                this.hide();
            }
        });
    }

    show(data) {
        this.productData = data;

        // Update modal content
        document.getElementById('modal-360-title').textContent = data.name;
        document.getElementById('modal-360-price').textContent = data.price;

        // Display product details
        this.displayProductDetails(data.details);

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load images for this product
        this.loadImages(data.type);

        // Setup hotspots if provided
        if (data.hotspots) {
            this.setupHotspots(data.hotspots);
        }

        // Resize canvas
        this.resizeCanvas();

        // Start auto-rotation
        if (this.autoRotate) {
            this.animate();
        }
    }

    hide() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.autoRotate = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    loadImages(productType) {
        this.isLoading = true;
        this.loadedImages = 0;
        this.images = [];

        const loadingEl = document.getElementById('loading360');
        loadingEl.style.display = 'flex';

        // Image paths für verschiedene Produkttypen
        const imagePaths = {
            ring: 'images/img_1.jpg',  // Verwenden Sie Ihr vorhandenes Bild
            necklace: 'images/img_1.jpg',  // Momentan dasselbe Bild
            bracelet: 'images/img_1.jpg'   // Momentan dasselbe Bild
        };

        const imagePromises = [];

        for (let i = 0; i < this.totalFrames; i++) {
            const img = new Image();
            const promise = new Promise((resolve, reject) => {
                img.onload = () => {
                    this.loadedImages++;
                    const percent = Math.round((this.loadedImages / this.totalFrames) * 100);
                    document.getElementById('loadingPercent').textContent = percent;
                    resolve(img);
                };
                img.onerror = () => {
                    console.warn(`Image not found, using fallback: ${img.src}`);
                    // Bei Fehler: Fallback zu generiertem Placeholder
                    img.src = this.generatePlaceholderFrame(i, productType);
                    resolve(img);
                };
            });

            // Versuch 1: Lade echte 360° Bilder wenn vorhanden
            const realImagePath = `images/360/${productType}/frame_${String(i).padStart(3, '0')}.jpg`;

            // Prüfe ob Bild existiert, sonst verwende img_1.jpg
            img.src = realImagePath;

            // Fallback: Wenn 360° Ordner nicht existiert, verwende vorhandenes Bild
            img.onerror = () => {
                img.onerror = null; // Verhindere Loop
                img.onload = () => {
                    this.loadedImages++;
                    const percent = Math.round((this.loadedImages / this.totalFrames) * 100);
                    document.getElementById('loadingPercent').textContent = percent;
                    resolve(img);
                };
                // Verwende vorhandenes Bild oder generiere Placeholder
                if (imagePaths[productType]) {
                    img.src = imagePaths[productType];
                } else {
                    img.src = this.generatePlaceholderFrame(i, productType);
                }
            };

            imagePromises.push(promise);
            this.images.push(img);
        }

        Promise.all(imagePromises).then(() => {
            this.isLoading = false;
            loadingEl.style.display = 'none';
            this.render();
        }).catch(err => {
            console.error('Error loading 360° images:', err);
            this.isLoading = false;
            loadingEl.style.display = 'none';
        });
    }

    generatePlaceholderFrame(frameIndex, productType) {
        // Generate a placeholder image with rotation indicator
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const gradient = ctx.createRadialGradient(400, 400, 100, 400, 400, 400);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 800);

        // Draw ring shape (simple representation)
        const angle = (frameIndex / this.totalFrames) * Math.PI * 2;
        ctx.save();
        ctx.translate(400, 400);
        ctx.rotate(angle);

        // Outer ring
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 30;
        ctx.beginPath();
        ctx.ellipse(0, 0, 150, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Inner ring
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.ellipse(0, 0, 120, 30, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Diamond (when visible)
        if (Math.abs(Math.sin(angle)) < 0.5) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(0, -60);
            ctx.lineTo(10, -40);
            ctx.lineTo(0, -20);
            ctx.lineTo(-10, -40);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Highlights
        ctx.strokeStyle = '#f0c952';
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(-50, -20, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        // Frame number indicator
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame ${frameIndex + 1}/${this.totalFrames}`, 400, 750);

        return canvas.toDataURL();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        if (!this.isLoading && this.images.length > 0) {
            this.render();
        }
    }

    render() {
        if (!this.ctx || this.images.length === 0) return;

        const img = this.images[this.currentFrame];
        if (!img.complete) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate dimensions to fit image
        const scale = Math.min(
            this.canvas.width / img.width,
            this.canvas.height / img.height
        );

        const x = (this.canvas.width - img.width * scale) / 2;
        const y = (this.canvas.height - img.height * scale) / 2;

        // Draw image
        this.ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Update frame counter
        document.getElementById('currentFrameDisplay').textContent = this.currentFrame + 1;
        document.getElementById('totalFramesDisplay').textContent = this.totalFrames;
    }

    onDragStart(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startFrame = this.currentFrame;
        this.autoRotate = false;
        document.getElementById('autoRotateToggle').classList.remove('active');
        this.canvas.style.cursor = 'grabbing';
    }

    onDrag(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        const sensitivity = 2; // Adjust sensitivity
        const frameDelta = Math.floor(deltaX / sensitivity);

        this.currentFrame = (this.startFrame + frameDelta + this.totalFrames * 10) % this.totalFrames;
        this.render();
    }

    onDragEnd() {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }

    animate() {
        if (!this.autoRotate) return;

        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        this.render();

        this.animationFrame = requestAnimationFrame(() => {
            setTimeout(() => this.animate(), 1000 / 30); // 30 FPS
        });
    }

    displayProductDetails(details) {
        const container = document.getElementById('productDetailsContainer');
        if (!details || details.length === 0) {
            container.innerHTML = '<p>Keine Details verfügbar</p>';
            return;
        }

        let html = '<ul class="detail-list">';
        details.forEach(detail => {
            html += `
                <li class="detail-item-360">
                    <span class="detail-label">${detail.label}</span>
                    <span class="detail-value">${detail.value}</span>
                </li>
            `;
        });
        html += '</ul>';

        container.innerHTML = html;
    }

    setupHotspots(hotspots) {
        const container = document.getElementById('hotspotsContainer');
        container.innerHTML = '';

        hotspots.forEach((hotspot, index) => {
            const hotspotEl = document.createElement('div');
            hotspotEl.className = 'hotspot';
            hotspotEl.style.left = hotspot.x + '%';
            hotspotEl.style.top = hotspot.y + '%';
            hotspotEl.innerHTML = `
                <div class="hotspot-marker"></div>
                <div class="hotspot-popup">
                    <h4>${hotspot.title}</h4>
                    <p>${hotspot.description}</p>
                </div>
            `;

            container.appendChild(hotspotEl);
        });
    }
}

// Initialize 360° Viewer
window.addEventListener('DOMContentLoaded', () => {
    window.viewer360 = new ProductViewer360();
    console.log('✨ 360° Product Viewer initialized');
});