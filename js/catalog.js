document.addEventListener('DOMContentLoaded', function () {
    // Обработка вкладки "Продажа"
    initTab('#sale-tab');

    // Обработка вкладки "Аренда"
    initTab('#rent-tab');

    // Инициализация переключения вкладок
    initTabs();
});

function initTab(tabSelector) {
    const searchInput = document.querySelector(`${tabSelector} .filters__search-input`);
    const propertyCards = Array.from(document.querySelectorAll(`${tabSelector} .property-card`));
    const propertyList = document.querySelector(`${tabSelector} .property-list__container`);

    let filteredCards = propertyCards.slice(); // Копия для фильтрации и сортировки
    let currentPage = 1;
    const itemsPerPage = 3; // Количество элементов на странице

    // Фильтрация по поиску
    searchInput.addEventListener('input', function () {
        const value = searchInput.value.trim().toLowerCase();
        filteredCards = propertyCards.filter(card => {
            const title = card.querySelector('.property-card__title').textContent.toLowerCase();
            const desc = card.querySelector('.property-card__description').textContent.toLowerCase();
            const district = card.dataset.district || '';
            return (
                title.includes(value) ||
                desc.includes(value) ||
                district.includes(value)
            );
        });
        currentPage = 1;
        renderCards();
        renderPagination();
    });

    // Сортировка
    document.querySelectorAll(`${tabSelector} .filters__sort-btn`).forEach(btn => {
        btn.addEventListener('click', function () {
            // Удаляем активный класс у всех кнопок сортировки
            document.querySelectorAll(`${tabSelector} .filters__sort-btn`).forEach(b => {
                b.classList.remove('active');
            });
            // Добавляем активный класс к текущей кнопке
            btn.classList.add('active');

            const sortType = btn.dataset.sort;
            if (sortType === 'price-asc') {
                filteredCards.sort((a, b) => a.dataset.price - b.dataset.price);
            } else if (sortType === 'price-desc') {
                filteredCards.sort((a, b) => b.dataset.price - a.dataset.price);
            } else if (sortType === 'area-asc') {
                filteredCards.sort((a, b) => a.dataset.area - b.dataset.area);
            } else if (sortType === 'area-desc') {
                filteredCards.sort((a, b) => b.dataset.area - a.dataset.area);
            }
            currentPage = 1;
            renderCards();
            renderPagination();
        });
    });

    // Пагинация
    function renderPagination() {
        const paginationContainer = document.querySelector(`${tabSelector} .pagination__container`);
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination__item' + (i === currentPage ? ' pagination__item_active' : '');
            btn.textContent = i;
            btn.addEventListener('click', function () {
                currentPage = i;
                renderCards();
                renderPagination();
            });
            paginationContainer.appendChild(btn);
        }
    }

    // Отрисовка карточек по текущей странице
    function renderCards() {
        if (!propertyList) return;

        propertyList.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        filteredCards.slice(start, end).forEach(card => {
            propertyList.appendChild(card);
        });
    }
    renderCards();
    renderPagination();
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.tabs__item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Удаляем активный класс у всех кнопок
            tabButtons.forEach(b => b.classList.remove('tabs__item_active'));
            // Добавляем активный класс к нажатой кнопке
            btn.classList.add('tabs__item_active');

            // Скрываем все вкладки
            tabContents.forEach(tc => tc.classList.remove('tab-content_active'));
            // Показываем нужную вкладку
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('tab-content_active');
        });
    });
}