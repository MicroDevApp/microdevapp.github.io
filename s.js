(function () {
    'use strict';

    function HelloComponent(object) {
        var html = $('<div class="hello-page" style="width:100%; height:100%;"></div>');
        var iframe = $('<iframe class="hello-page__frame" frameborder="0" allowtransparency="true" style="width:100%; height:100%; border:0; background:#15151a;"></iframe>');
        html.append(iframe);

        // путь к странице — можно положить рядом с плагином или захостить отдельно
        var pageUrl = 'https://microdevapp.github.io/main.html';

        function onMessage(e) {
            if (!e.data || typeof e.data !== 'object') return;

            if (e.data.type === 'back') {
                Lampa.Activity.backward();
            }
        }

        this.create = function () {
            return this.render();
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
            window.addEventListener('message', onMessage);

            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(html);
                    // отдаём фокус самому iframe — дальше навигацию ведёт скрипт внутри страницы
                    var node = iframe.get(0);
                    if (node) node.focus();
                },
                left: function () {},
                right: function () {},
                up: function () {},
                down: function () {},
                back: function () {
                    Lampa.Activity.backward();
                }
            });

            Lampa.Controller.toggle('content');

            iframe.attr('src', pageUrl);
        };

        this.pause = function () {};

        this.stop = function () {
            window.removeEventListener('message', onMessage);
        };

        this.destroy = function () {
            window.removeEventListener('message', onMessage);
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