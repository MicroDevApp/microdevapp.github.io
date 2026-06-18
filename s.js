(function () {
    'use strict';

    var pageHtml = '<!DOCTYPE html>' +
        '<html lang="ru"><head><meta charset="UTF-8">' +
        '<style>' +
        'html, body { margin:0; padding:0; background:#15151a; color:#fff; font-family:Arial, sans-serif; height:100%; }' +
        '.page { padding:3em; }' +
        '.message { font-size:1.6em; margin-bottom:1.5em; min-height:1.5em; }' +
        '.buttons { display:flex; }' +
        '.btn { padding:0.7em 1.5em; border-radius:0.3em; margin-right:1em; cursor:pointer; outline:none; border:0.2em solid transparent; font-size:1em; }' +
        '.btn-1 { background:#28a745; color:#fff; }' +
        '.btn-2 { background:#dc3545; color:#fff; }' +
        '.btn:focus { border-color:#fff; box-shadow:0 0 0 0.2em rgba(255,255,255,0.4); }' +
        '</style></head><body>' +
        '<div class="page">' +
        '<div class="message" id="message"></div>' +
        '<div class="buttons">' +
        '<button class="btn btn-1" id="btn1">Кнопка 1</button>' +
        '<button class="btn btn-2" id="btn2">Кнопка 2</button>' +
        '</div></div>' +
        '<script>' +
        'var message=document.getElementById("message");' +
        'var btn1=document.getElementById("btn1");' +
        'var btn2=document.getElementById("btn2");' +
        'btn1.addEventListener("click",function(){message.textContent="Вы нажали Кнопку 1!";});' +
        'btn2.addEventListener("click",function(){message.textContent="Вы нажали Кнопку 2!";});' +
        'document.addEventListener("keydown",function(e){' +
        'var focusable=[btn1,btn2];' +
        'var current=document.activeElement;' +
        'var index=focusable.indexOf(current);' +
        'if(e.key==="ArrowRight"||e.keyCode===39){if(index===-1||index===focusable.length-1)focusable[0].focus();else focusable[index+1].focus();}' +
        'if(e.key==="ArrowLeft"||e.keyCode===37){if(index===-1||index===0)focusable[focusable.length-1].focus();else focusable[index-1].focus();}' +
        'if(e.key==="Escape"||e.key==="Backspace"||e.keyCode===27||e.keyCode===8){e.preventDefault();parent.postMessage({type:"back"},"*");}' +
        '});' +
        'btn1.focus();' +
        '<\/script>' +
        '</body></html>';

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

            iframe.attr('srcdoc', pageHtml);
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