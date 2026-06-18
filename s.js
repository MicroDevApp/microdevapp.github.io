(function () {
    'use strict';

    function addMyMenuItem() {
        // Проверяем, существует ли вообще меню, прежде чем добавлять
        if (!Lampa.Menu) return;

        Lampa.Menu.add({
            title: 'Моя Роза',
            subtitle: 'Тестовый раздел',
            icon: '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="red"/></svg>',
            action: function () {
                Lampa.Noty.show('Раздел работает!');
            }
        });
        
        console.log('Плагин: пункт меню успешно добавлен');
    }

    if (window.appready) {
        addMyMenuItem();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                addMyMenuItem();
            }
        });
    }
})();