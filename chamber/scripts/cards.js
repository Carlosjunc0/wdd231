// script.js

// Configuración global
const MEMBERS_DATA_URL = 'data/members.json';

// Clase para manejar el directorio de miembros
class DirectoryManager {
    constructor() {
        this.members = [];
        this.currentView = 'grid';
        this.init();
    }

    async init() {
        await this.loadMembers();
        this.renderMembers();
        this.setupEventListeners();
        this.updateFooterDates();
    }

    // Cargar miembros desde JSON
    async loadMembers() {
        try {
            const response = await fetch(MEMBERS_DATA_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.members = data.members;
            console.log('Members loaded successfully:', this.members);
        } catch (error) {
            console.error('Error loading members data:', error);
            this.displayError('Failed to load member data. Please try again later.');
        }
    }

    // Renderizar miembros según la vista actual
    renderMembers() {
        const container = document.getElementById('membersGrid');
        if (!container) return;

        container.className = this.currentView === 'grid' ? 'members-grid' : 'members-list';
        container.innerHTML = '';

        if (this.members.length === 0) {
            container.innerHTML = '<p class="loading">Loading members...</p>';
            return;
        }

        this.members.forEach(member => {
            const memberElement = this.createMemberElement(member);
            container.appendChild(memberElement);
        });
    }

    // Crear elemento HTML para un miembro
    createMemberElement(member) {
        const membershipClass = this.getMembershipClass(member.membershipLevel);
        const membershipBadge = this.getMembershipBadge(member.membershipLevel);

        if (this.currentView === 'grid') {
            return this.createGridViewElement(member, membershipClass, membershipBadge);
        } else {
            return this.createListViewElement(member, membershipClass, membershipBadge);
        }
    }

    // Vista de cuadrícula
    createGridViewElement(member, membershipClass, membershipBadge) {
        const article = document.createElement('article');
        article.className = `member-card ${membershipClass}`;

        article.innerHTML = `
            <h3>${member.name}</h3>
            <p class="member-category">${member.category}</p>
            <p class="member-description">${member.description}</p>
            <div class="member-contact">
                <p><strong>📍</strong> ${member.address}</p>
                <p><strong>📞</strong> ${member.phone}</p>
                <p><strong>🌐</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <span class="member-badge ${membershipBadge.class}">${membershipBadge.text}</span>
            </div>
        `;

        return article;
    }

    // Vista de lista
    createListViewElement(member, membershipClass, membershipBadge) {
        const div = document.createElement('div');
        div.className = `member-list-item ${membershipClass}`;

        div.innerHTML = `
            <div>
                <h3>${member.name}</h3>
                <p class="member-category">${member.category}</p>
            </div>
            <div>
                <p><strong>📞</strong> ${member.phone}</p>
            </div>
            <div>
                <p><strong>🌐</strong> <a href="${member.website}" target="_blank">Website</a></p>
            </div>
            <div>
                <span class="member-badge ${membershipBadge.class}">${membershipBadge.text}</span>
            </div>
        `;

        return div;
    }

    // Obtener clase CSS según nivel de membresía
    getMembershipClass(level) {
        switch (level) {
            case 3: return 'gold';
            case 2: return 'silver';
            default: return '';
        }
    }

    // Obtener badge de membresía
    getMembershipBadge(level) {
        switch (level) {
            case 3: return { class: 'badge-gold', text: 'Gold Member' };
            case 2: return { class: 'badge-silver', text: 'Silver Member' };
            default: return { class: 'badge-member', text: 'Member' };
        }
    }

    // Configurar event listeners
    setupEventListeners() {
        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');

        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', () => this.switchView('grid'));
            listViewBtn.addEventListener('click', () => this.switchView('list'));
        }
    }

    // Cambiar entre vistas
    switchView(view) {
        if (this.currentView === view) return;

        this.currentView = view;

        // Actualizar botones activos
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');

        // Re-renderizar miembros
        this.renderMembers();
    }

    // Mostrar errores
    displayError(message) {
        const container = document.getElementById('membersGrid');
        if (container) {
            container.innerHTML = `<p class="error-message">${message}</p>`;
        }
    }

    // Actualizar fechas en el footer
    updateFooterDates() {
        // Año de copyright
        const copyrightYear = document.getElementById('copyrightYear');
        if (copyrightYear) {
            copyrightYear.textContent = new Date().getFullYear();
        }

        // Última modificación
        const lastModified = document.getElementById('lastModified');
        if (lastModified) {
            lastModified.textContent = document.lastModified;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DirectoryManager();
});

// Función utilitaria para formatear fechas
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;