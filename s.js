(function () {

    'use strict';

    // Полный URL вашей страницы main.html (должен реально быть доступен по сети)
    var HTML_URL = 'https://microdevapp.github.io/main.html';
    function startPlugin() {
        Lampa.Menu.addButton(
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C6 2 3 5 3 10c0 4 3 7 7 7s7-3 7-7c0-5-3-8-7-8z" fill="#E74C3C"/><path d="M10 5c-2 0-4 1-4 3 0 2 2 3 4 3s4-1 4-3c0-2-2-3-4-3z" fill="#C0392B"/></svg>',
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