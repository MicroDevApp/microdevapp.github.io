(function () {
    'use strict';

    var HTML_URL = 'https://microdevapp.github.io/main.html';

    function HelloComponent(object) {
        var html = $('<div style="width:100%; height:100%;"></div>');
        var frame = $('<iframe style="width:100%; height:100%; border:none;"></iframe>');

        html.append(frame);

        this.create = function () {
            var self = this;

            // src ставим здесь — с nocache чтобы не кешировалось
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
