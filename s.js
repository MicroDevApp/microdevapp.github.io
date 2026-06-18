(function () {
    'use strict';

    // Полный URL вашей страницы main.html (должен реально быть доступен по сети)
    var HTML_URL = 'https://microdevapp.github.io/main.html';

    function startPlugin() {
        Lampa.Menu.addButton(
            '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
            'Привет',
            function () {
                // Добавляем случайный параметр, чтобы каждый раз грузить
                // свежую версию main.html, а не кешированную браузером
                var freshUrl = HTML_URL + '?nocache=' + Date.now();

                Lampa.Iframe.show({
                    url: freshUrl,
                    onBack: function () {
                        // вызывается, когда пользователь нажал "назад"
                    }
                });
            }
        );
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