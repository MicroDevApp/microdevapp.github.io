(function () {
    'use strict';

    function HelloComponent(object) {
        var html = $('<div class="hello-page" style="padding:3em;"></div>');
        var iframe = $('<iframe style="width:100%; height:70vh; border:0; display:block; background:lime;" srcdoc="<body style=\'background:lime;color:#000;font-size:3em;\'>ЭТО IFRAME</body>"></iframe>');
        html.append(iframe);

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
                },
                back: function () {
                    Lampa.Activity.backward();
                }
            });
            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};
        this.destroy = function () { html.remove(); };

        this.activity.loader(false);
        this.activity.toggle();
    }

    function startPlugin() {
        Lampa.Component.add('hello_page', HelloComponent);
        Lampa.Menu.addButton(
            '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
            'Привет',
            function () {
                Lampa.Activity.push({ title: 'Привет', component: 'hello_page' });
            }
        );
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();