(function () {
    'use strict';
    function HelloComponent(object) {
        var html = $('<div class="hello-page" style="padding: 3em;"></div>');
        var last;
        var message = $('<div class="hello-page__message" style="color:#fff; font-size:1.6em; margin-bottom:1.5em; min-height:1.5em;"></div>');
        var btn1 = $('<div class="selector simple-button" style="display:inline-block; margin-right:1em; padding:0.7em 1.5em; background:
#28a745; color:#fff; border-radius:0.3em;">Кнопка 1</div>');
        var btn2 = $('<div class="selector simple-button" style="display:inline-block; padding:0.7em 1.5em; background:
#dc3545; color:#fff; border-radius:0.3em;">Кнопка 2</div>');
        var buttons = $('<div class="hello-page__buttons"></div>');
        buttons.append(btn1).append(btn2);
        html.append(message).append(buttons);
        btn1.on('hover:enter', function () {
            message.text('Вы нажали Кнопку 1!');
        });
        btn2.on('hover:enter', function () {
            message.text('Вы нажали Кнопку 2!');
        });
        btn1.on('hover:focus', function (e) {
            last = e.target;
        });
        btn2.on('hover:focus', function (e) {
            last = e.target;
        });
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
                    Lampa.Controller.collectionFocus(last || false, html);
                },
                left: function () {
                    if (Navigator.canmove('left')) Navigator.move('left');
                    else Lampa.Controller.toggle('menu');
                },
                right: function () {
                    Navigator.move('right');
                },
                up: function () {
                    if (Navigator.canmove('up')) Navigator.move('up');
                    else Lampa.Controller.toggle('head');
                },
                down: function () {
                    if (Navigator.canmove('down')) Navigator.move('down');
                },
                back: function () {
                    Lampa.Activity.backward();
                }
            });
            Lampa.Controller.toggle('content');
        };
        this.pause = function () {};
        this.stop = function () {};
        this.destroy = function () {
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

---------------------------

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Привет</title>
<style>
    html, body {
        margin: 0;
        padding: 0;
        background: 
#15151a;
        color: #fff;
        font-family: Arial, sans-serif;
    }
    .page {
        padding: 3em;
    }
    .message {
        font-size: 1.6em;
        margin-bottom: 1.5em;
        min-height: 1.5em;
    }
    .buttons {
        display: flex;
    }
    .btn {
        padding: 0.7em 1.5em;
        border-radius: 0.3em;
        margin-right: 1em;
        cursor: pointer;
        outline: none;
        border: 0.2em solid transparent;
        font-size: 1em;
    }
    .btn-1 {
        background: 
#28a745;
        color: #fff;
    }
    .btn-2 {
        background: 
#dc3545;
        color: #fff;
    }
    /* Стиль фокуса для навигации с пульта/клавиатуры (Tab или стрелки) */
    .btn:focus {
        border-color: #fff;
        box-shadow: 0 0 0 0.2em rgba(255,255,255,0.4);
    }
</style>
</head>
<body>
    <div class="message" id="message"></div>
    <div class="buttons">
        <button class="btn btn-1" id="btn1">Кнопка 1</button>
        <button class="btn btn-2" id="btn2">Кнопка 2</button>
    </div>
<script>
    var message = document.getElementById('message');
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    btn1.addEventListener('click', function () {
        message.textContent = 'Зачем ВЫыыы кешируете всё? 1?';
    });
    btn2.addEventListener('click', function () {
        message.textContent = 'Зачем ВЫыыы кешируетеы Кнопку 2?';
    });
    // Обычные <button> сами получают фокус и реагируют на Enter/Space
    // через стандартное поведение браузера — дополнительный keydown не нужен.
    // Стрелки влево/вправо для переключения фокуса между кнопками:
    document.addEventListener('keydown', function (e) {
        var focusable = [btn1, btn2];
        var current = document.activeElement;
        var index = focusable.indexOf(current);
        if (e.key === 'ArrowRight' || e.keyCode === 39) {
            if (index === -1 || index === focusable.length - 1) focusable[0].focus();
            else focusable[index + 1].focus();
        }
        if (e.key === 'ArrowLeft' || e.keyCode === 37) {
            if (index === -1 || index === 0) focusable[focusable.length - 1].focus();
            else focusable[index - 1].focus();
        }
    });
    // Ставим фокус на первую кнопку при загрузке страницы
    btn1.focus();
</script>
</body>
</html>