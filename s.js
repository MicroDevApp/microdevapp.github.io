(function() {
    'use strict';

    function init() {
        // Убедимся, что мы добавляем объект с обязательными полями
        Lampa.Settings.push({
            name: 'my_test_plugin', // Уникальный идентификатор
            label: 'Моя страница',   // Заголовок, который видит пользователь
            type: 'button',
            onClick: function() {
                Lampa.Activity.push({
                    url: '',
                    title: 'Приветствие', // Заголовок страницы
                    component: 'test_page',
                    page: 1
                });
            }
        });

        Lampa.Component.add('test_page', function() {
            this.create = function() {
                var div = document.createElement('div');
                div.style.padding = '50px';
                div.style.textAlign = 'center';
                div.innerHTML = '<h1>Привет!</h1>';
                return div;
            };
            this.render = function() { return this.create(); };
        });
    }

    if (window.lampa) {
        init();
    } else {
        window.addEventListener('lampa:ready', init);
    }
})();