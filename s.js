(function () {
    'use strict';

    function startPlugin() {
        // Добавляем пункт в главное меню
        Lampa.Menu.add({
            title: 'Привет',
            subtitle: 'Мой раздел',
            icon: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2L2 14h4v10h6v-6h4v6h6V14h4L14 2z" fill="currentColor"/></svg>',
            action: function () {
                // Открываем свой экран
                Lampa.Activity.push({
                    url: '',
                    title: 'Привет',
                    component: 'hello_page',
                    page: 1
                });
            }
        });
    }

    // Регистрируем сам компонент "hello_page"
    function HelloComponent(object) {
        var html = $('<div style="padding: 2em; color: #fff; font-size: 2em;">Привет!</div>');

        this.create = function () {
            return html;
        };

        this.render = function () {
            return html;
        };

        this.start = function () {};
        this.pause = function () {};
        this.stop = function () {};
        this.destroy = function () {
            html.remove();
        };

        this.back = function () {
            Lampa.Activity.backward();
        };
    }

    Lampa.Component.add('hello_page', HelloComponent);

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