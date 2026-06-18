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
            '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
            'Привет',
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