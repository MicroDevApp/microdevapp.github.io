(function () {
    'use strict';

    var MAIN_HTML_URL = 'https://microdevapp.github.io/main.html';
    var VIEWER_HTML_URL = 'https://microdevapp.github.io/viewer.html';

    // ---------- Компонент страницы "Привет" (iframe) ----------
    function HelloComponent(object) {
        var html = $('<div style="width:100%; height:100%;"></div>');
        var frame = $('<iframe style="width:100%; height:100%; border:none;"></iframe>');
        var onMessage;

        html.append(frame);

        this.create = function () {
            var self = this;

            onMessage = function (e) {
                if (!e.data) return;

                if (e.data.type === 'lampa:back') {
                    Lampa.Activity.backward();
                }

                if (e.data.type === 'lampa:openLink' && e.data.url) {
                    Lampa.Activity.push({
                        title: 'Перегляд',
                        component: 'external_page',
                        external_url: e.data.url
                    });
                }
            };
            window.addEventListener('message', onMessage);

            var params = new URLSearchParams();
            params.set('nocache', Date.now());

            var hasMovieData = Boolean(object.movie_title);
            var targetUrl = hasMovieData ? VIEWER_HTML_URL : MAIN_HTML_URL;

            if (object.movie_title)        params.set('title', object.movie_title);
            if (object.movie_search_title) params.set('searchTitle', object.movie_search_title);
            if (object.movie_year)         params.set('year', object.movie_year);
            if (object.movie_rating)       params.set('rating', object.movie_rating);
            if (object.movie_overview)     params.set('overview', object.movie_overview);
            if (object.movie_genres)       params.set('genres', object.movie_genres);
            if (object.movie_poster)       params.set('poster', object.movie_poster);

            frame.attr('src', targetUrl + '?' + params.toString());

            self.activity.loader(false);
            self.activity.toggle();

            return html;
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {},
                left: function () { Lampa.Controller.toggle('menu'); },
                right: function () {},
                up: function () { Lampa.Controller.toggle('head'); },
                down: function () {},
                back: function () { Lampa.Activity.backward(); }
            });

            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            if (onMessage) window.removeEventListener('message', onMessage);
            html.remove();
        };
    }

    // ---------- Компонент для открытия произвольной внешней страницы (например hdrezka) ----------
    function ExternalPageComponent(object) {
        var html = $('<div style="width:100%; height:100%;"></div>');
        var frame = $('<iframe style="width:100%; height:100%; border:none;"></iframe>');

        html.append(frame);

        this.create = function () {
            var self = this;

            // Внешний сайт сам управляет своим JS — мы не вмешиваемся
            // в его код, поэтому postMessage от него не ожидается;
            // выход — только через системную кнопку "назад" в Controller.
            frame.attr('src', object.external_url || 'about:blank');

            self.activity.loader(false);
            self.activity.toggle();

            return html;
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {},
                left: function () {},
                right: function () {},
                up: function () {},
                down: function () {},
                back: function () { Lampa.Activity.backward(); }
            });

            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            html.remove();
        };
    }

    // ---------- Кнопка в карточке фильма ----------
    function initFullButton() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complite') return;

            var render = e.object.activity.render();
            var container = render.find('.full-start-new__buttons');

            if (container.find('.button--my-plugin').length) return;

            var myButton = $(
                '<div class="full-start__button selector button--my-plugin">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>' +
                    '</svg>' +
                    '<span>Моя кнопка</span>' +
                '</div>'
            );

            myButton.on('hover:enter', function () {
                var card = e.object.movie || e.object.card || {};

                var title = card.title || card.name || '';
                // Оригинальное название — не зависит от языка интерфейса Lampa,
                // используется для поиска на hdrezka
                var searchTitle = card.original_title || card.original_name || title;
                var year = ((card.release_date || card.first_air_date || '') + '').slice(0, 4);
                var rating = card.vote_average ? parseFloat(card.vote_average).toFixed(1) : '';
                var overview = card.overview || '';
                var genres = (card.genres || []).map(function (g) { return g.name; }).join(', ');
                var poster = card.poster_path ? 'https://image.tmdb.org/t/p/w500' + card.poster_path : '';

                Lampa.Activity.push({
                    title: 'Привет',
                    component: 'hello_page',
                    movie_title: title,
                    movie_search_title: searchTitle,
                    movie_year: year,
                    movie_rating: rating,
                    movie_overview: overview,
                    movie_genres: genres,
                    movie_poster: poster
                });
            });

            // prepend — кнопка слева, а не справа
            container.prepend(myButton);
        });
    }

    // ---------- Пункт в главном меню ----------
    function initMenuButton() {
        Lampa.Component.add('hello_page', HelloComponent);
        Lampa.Component.add('external_page', ExternalPageComponent);

        Lampa.Menu.addButton(
            '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
            'Привет',
            function () {
                Lampa.Activity.push({
                    title: 'Привет',
                    component: 'hello_page'
                });
            }
        );
    }

    // ---------- Общий запуск ----------
    function startPlugin() {
        initMenuButton();
        initFullButton();
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                startPlugin();
            }
        });
    }
})();
