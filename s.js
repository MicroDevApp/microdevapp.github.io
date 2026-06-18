(function () {
    'use strict';

    var HTML_URL = 'https://microdevapp.github.io/main.html';

    function MainPage() {

        this.create = function () {

            this.activity.loader(false);

            this.render = $(
                '<div style="width:100%;height:100%;">' +
                    '<iframe ' +
                        'src="' + HTML_URL + '?nocache=' + Date.now() + '" ' +
                        'style="width:100%;height:100%;border:none;">' +
                    '</iframe>' +
                '</div>'
            );
        };

        this.start = function () {
            this.activity.toggle();
            this.activity.append(this.render);
        };

        this.destroy = function () {
            if (this.render) this.render.remove();
        };
    }

    function startPlugin() {

        Lampa.Component.add('main_page', MainPage);

        Lampa.Menu.addButton(
            '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
            'Привет',
            function () {

                Lampa.Activity.push({
                    url: '',
                    title: 'Привет',
                    component: 'main_page'
                });

            }
        );
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                startPlugin();
            }
        });
    }

})();