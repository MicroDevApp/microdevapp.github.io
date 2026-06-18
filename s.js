(function () {
    'use strict';

    function HelloComponent(object) {
        var html = $('<div class="hello-page" style="padding: 3em;"></div>');
        var last;

        var message = $('<div class="hello-page__message" style="color:#fff; font-size:1.6em; margin-bottom:1.5em; min-height:1.5em;"></div>');

        var btn1 = $('<div class="selector simple-button" style="display:inline-block; margin-right:1em; padding:0.7em 1.5em; background:#28a745; color:#fff; border-radius:0.3em;">Кнопка 1</div>');
        var btn2 = $('<div class="selector simple-button" style="display:inline-block; padding:0.7em 1.5em; background:#dc3545; color:#fff; border-radius:0.3em;">Кнопка 2</div>');

        var buttons = $('<div class="hello-page__buttons"></div>');

        buttons.append(btn1).append(btn2);
        html.append(message).append(buttons);

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

        this.create = function () {
            return this.render();
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
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

            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            html.remove();
        };

        this.activity.loader(false);
        this.activity.toggle();
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