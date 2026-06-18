(function () {
    'use strict';

    function HelloComponent(object) {
        this.object = object || {};

        this.create = function () {
            this.html = $('<div style="padding: 3em; color: #fff; font-size: 2em; text-align: center;">Привет!</div>');

            this.activity.loader(false);
            this.activity.toggle();
        };

        this.render = function () {
            return this.html;
        };

        this.start = function () {};
        this.pause = function () {};
        this.stop = function () {};

        this.back = function () {
            Lampa.Activity.backward();
        };

        this.destroy = function () {
            this.html.remove();
        };
    }

    function startPlugin() {
        Lampa.Component.add('hello_page', HelloComponent);

        Lampa.Menu.addButton(
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C6 2 3 5 3 10c0 4 3 7 7 7s7-3 7-7c0-5-3-8-7-8z" fill="#E74C3C"/><path d="M10 5c-2 0-4 1-4 3 0 2 2 3 4 3s4-1 4-3c0-2-2-3-4-3z" fill="#C0392B"/></svg>',
            'Твій розділ',
            function () {
                Lampa.Activity.push({
                    title: 'Олександр',
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