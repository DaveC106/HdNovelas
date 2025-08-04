document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    const seriesGrid = document.querySelector('.series-grid');
    const feedbackBtn = document.querySelector('.feedback-btn');
    
    // Datos de series (simulados)
    const seriesData = [
        {
            title: "Chepe Fortuna",
            episodes: 151,
            poster: "posterchepe.png",
            link: "chepe.html",
            isNew: true,
            categories: ["popular", "recent"] // Ahora puede pertenecer a múltiples categorías
        }
    ];

    // Función para filtrar series
    function filterSeries(searchTerm = '', category = 'all') {
        return seriesData.filter(serie => {
            const matchesSearch = serie.title.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Modificado para manejar múltiples categorías
            const matchesCategory = category === 'all' || 
                                  (serie.categories && serie.categories.includes(category));
            
            return matchesSearch && matchesCategory;
        });
    }

    // Función para renderizar series
    function renderSeries(series) {
        seriesGrid.innerHTML = '';
        
        if (series.length === 0) {
            seriesGrid.innerHTML = '<p class="no-results">No se encontraron series</p>';
            return;
        }

        series.forEach(serie => {
            const serieCard = `
                <a href="${serie.link}" class="serie-card">
                    <div class="serie-poster-container">
                        <img src="${serie.poster}" alt="${serie.title}" class="serie-poster">
                        ${serie.isNew ? '<div class="serie-badge">Nuevo</div>' : ''}
                    </div>
                    <h3 class="serie-title">${serie.title}</h3>
                    <p class="serie-info">${serie.episodes} episodios</p>
                </a>
            `;
            seriesGrid.insertAdjacentHTML('beforeend', serieCard);
        });
    }

    // Evento de búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        const activeBtn = document.querySelector('.nav-btn.active');
        const activeCategory = activeBtn ? activeBtn.textContent.toLowerCase() : 'all';
        const filteredSeries = filterSeries(searchTerm, activeCategory);
        renderSeries(filteredSeries);
    }

    // Configuración de eventos
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Eventos de categorías
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            handleSearch();
        });
    });

    // Feedback box (simulado)
    feedbackBtn.addEventListener('click', function() {
        const feedbackText = document.querySelector('.feedback-box textarea').value.trim();
        if (feedbackText) {
            alert('¡Gracias por tu sugerencia! La tomaremos en cuenta para futuras actualizaciones.');
            document.querySelector('.feedback-box textarea').value = '';
        } else {
            alert('Por favor escribe tu sugerencia antes de enviar.');
        }
    });

    // Carga inicial - Mostrar todas las series
    renderSeries(seriesData);
});