(function () {
    'use strict';

    // Укажите здесь полный URL, по которому реально доступен main.html
    // (тот же хостинг, где лежит и этот s.js)
    var HTML_URL = 'https://microdevapp.github.io/main.html';

    function HelloComponent(object) {
        var html = $('<div></div>');
        var last;

        this.create = function () {
            return this.render();
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
            var self = this;

            $.get(HTML_URL, function (markup) {
                html.html(markup);

                var message = html.find('.hello-page__message');
                var btn1 = html.find('.hello-page__btn-1');
                var btn2 = html.find('.hello-page__btn-2');

                btn1.on('hover:enter', function () {
                    message.text('Вы нажали Кнопку 1!');
                });

                btn2.on('hover:enter', function () {
                    message.text('Вы нажали Кнопку 2!');
                });

                btn1.on('hover:focus', function (e) {
                    last = e.target;
                });

                btn2.on('hover:focus', function (e) {
                    last = e.target;
                });

                Lampa.Controller.add('content', {
                    toggle: function () {
                        Lampa.Controller.collectionSet(html);
                        Lampa.Controller.collectionFocus(last || false, html);
                    },
                    left: function () {
                        if (Navigator.canmove('left')) Navigator.move('left');
                        else Lampa.Controller.toggle('menu');
                    },
                    right: function () {
                        Navigator.move('right');
                    },
                    up: function () {
                        if (Navigator.canmove('up')) Navigator.move('up');
                        else Lampa.Controller.toggle('head');
                    },
                    down: function () {
                        if (Navigator.canmove('down')) Navigator.move('down');
                    },
                    back: function () {
                        Lampa.Activity.backward();
                    }
                });

                self.activity.loader(false);
                self.activity.toggle();

                Lampa.Controller.toggle('content');
            }).fail(function () {
                html.html('<div style="padding:3em; color:#fff;">Не удалось загрузить страницу</div>');

                self.activity.loader(false);
                self.activity.toggle();
            });
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            html.remove();
        };
    }

    function startPlugin() {
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
