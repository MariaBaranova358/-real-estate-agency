document.addEventListener('DOMContentLoaded', function () {
    //Галерея изображений
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        const thumbnails = document.querySelectorAll('.gallery-container__thumbnail-img');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
            });
        });
    }

    const reviewsList = document.getElementById('reviewsList');
    const reviewForm = document.getElementById('review-form__form');

    if (!reviewForm || !reviewsList) {
        console.error('Не найдены необходимые элементы формы или списка отзывов');
        return;
    }

    function getReviews() {
        try {
            return JSON.parse(localStorage.getItem('reviews')) || [];
        } catch (e) {
            console.error('Ошибка чтения отзывов из localStorage:', e);
            return [];
        }
    }

    // Сохраняем отзывы в localStorage
    function saveReviews(reviews) {
        try {
            localStorage.setItem('reviews', JSON.stringify(reviews));
        } catch (e) {
            console.error('Ошибка сохранения отзывов в localStorage:', e);
        }
    }

    // Преобразуем рейтинг в звездочки
    function renderStars(rating) {
        return '★★★★★☆☆☆☆☆'.slice(5 - rating, 10 - rating);
    }

    // Добавляем отзыв в DOM
    function addReviewToDOM(review) {
        const li = document.createElement('li');
        li.className = 'reviews__item';
        li.innerHTML = `
            <div class="reviews__author">${review.name}</div>
            <div class="reviews__date">${review.date}</div>
            <div class="reviews__rating">${renderStars(review.rating)}</div>
            <p class="reviews__text">${review.text}</p>
        `;
        reviewsList.append(li);
    }

    // Отображаем все отзывы
    function renderReviews() {
        reviewsList.innerHTML = '';
        const reviews = getReviews();
        reviews.forEach(addReviewToDOM);
    }

    // Обработка отправки формы
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = reviewForm.querySelector('[name="name"]').value.trim();
        const rating = reviewForm.querySelector('[name="rating"]:checked')?.value;
        const text = reviewForm.querySelector('[name="review"]').value.trim();

        if (!name || !rating || !text) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const review = {
            name,
            date: new Date().toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }),
            rating: parseInt(rating),
            text
        };

        const reviews = getReviews();
        reviews.unshift(review);
        saveReviews(reviews);

        renderReviews();
        reviewForm.reset();
    });

    renderReviews();
});