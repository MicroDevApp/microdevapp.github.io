(function () {
    'use strict';

    // ссылка на отдельный файл — например, через jsDelivr для GitHub-репозитория:
    // https://cdn.jsdelivr.net/gh/USER/REPO@main/hello.html
    var pageUrl = 'https://cdn.jsdelivr.net/gh/USER/REPO@main/hello.html';

    function HelloComponent(object) {
        var html = $('<div class="hello-page" style="position:absolute; top:0; left:0; right:0; bottom:0;"></div>');
        var iframe = $('<iframe class="hello-page__frame" frameborder="0" style="position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; border:0; background:#15151a;"></iframe>');
        html.append(iframe);

        function onMessage(e) {
            if (!e.data || typeof e.data !== 'object') return;
            if (e.data.type === 'back') {
                Lampa.Activity.backward();
            }
        }

        function loadPage() {
            fetch(pageUrl)
                .then(function (resp) {
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.text();
                })
                .then(function (text) {
                    iframe.attr('srcdoc', text);
                })
                .catch(function (err) {
                    console.error('hello_page: не удалось загрузить страницу', err);
                    iframe.attr('srcdoc', '<body style="background:#15151a;color:#fff;font-family:Arial;padding:2em;">Ошибка загрузки страницы</body>');
                });
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

            loadPage();
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