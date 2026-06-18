(function () {
    'use strict';

    function MainPage() {

        this.render = function () {

            return $(
                '<div style="width:100%;height:100%;">' +
                    '<iframe src="https://microdevapp.github.io/main.html?nocache=' + Date.now() + '"' +
                    ' style="width:100%;height:100%;border:none;"></iframe>' +
                '</div>'
            );
        };
    }

    Lampa.Component.add('main_page', MainPage);

    Lampa.Menu.addButton(
        '<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>',
        'Привет',
        function () {

            Lampa.Activity.push({
                title: 'Привет',
                component: 'main_page'
            });

        }
    );

})();