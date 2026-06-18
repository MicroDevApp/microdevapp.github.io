(function () {
    'use strict';

    var HTML_URL = 'https://microdevapp.github.io/main.html';

    function startPlugin() {
        Lampa.Menu.add({
            title: 'Привет',
            subtitle: 'Мой раздел',
            icon: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C6 2 3 5 3 10c0 4 3 7 7 7s7-3 7-7c0-5-3-8-7-8z" fill="#E74C3C"/><path d="M10 5c-2 0-4 1-4 3 0 2 2 3 4 3s4-1 4-3c0-2-2-3-4-3z" fill="#C0392B"/></svg>',
            action: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'Привет',
                    component: 'web_page', // Имя компонента
                    page: 1
                });
            }
        });
    }

    function WebPageComponent(object) {
        var html = $('<div class="full-screen-container" style="width: 100%; height: 100%; background: #000;"></div>');
        var iframe = $('<iframe src="' + HTML_URL + '" style="width: 100%; height: 100%; border: none;"></iframe>');

        this.create = function () {
            html.append(iframe);
            return html;
        };

        this.render = function () {};

        this.back = function () {
            Lampa.Activity.backward();
        };

        this.destroy = function () {
            html.remove();
        };
    }

    // Регистрируем компонент
    Lampa.Component.add('web_page', WebPageComponent);

    // Инициализация
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();