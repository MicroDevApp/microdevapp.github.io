(function () {
    'use strict';

    var HTML_URL = 'https://microdevapp.github.io/main.html';

    // ---------- Компонент страницы "Привет" (iframe) ----------
    function HelloComponent(object) {
        var html = $('<div style="width:100%; height:100%;"></div>');
        var frame = $('<iframe style="width:100%; height:100%; border:none;"></iframe>');
        var onMessage;

        html.append(frame);

        this.create = function () {
            var self = this;

            onMessage = function (e) {
                if (e.data && e.data.type === 'lampa:back') {
                    Lampa.Activity.backward();
                }
            };
            window.addEventListener('message', onMessage);

            frame.attr('src', HTML_URL + '?nocache=' + Date.now());

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
                // По нажатию открываем нашу страницу "Привет"
                Lampa.Activity.push({
                    title: 'Привет',
                    component: 'hello_page'
                });
            });

            container.append(myButton);
        });
    }

    // ---------- Пункт в главном меню ----------
    function initMenuButton() {
        Lampa.Component.add('hello_page', HelloComponent);

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
