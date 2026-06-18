(function () {
    'use strict';

    function init() {
        // Регистрация в меню Lampa
        Lampa.Controller.add('content', {
            toggle: function () {},
            left: function () {},
            right: function () {},
            up: function () {},
            down: function () {},
            back: function () {}
        });
        console.log('Мой плагин инициализирован');
    }

    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                init();
            }
        });
    }
})();