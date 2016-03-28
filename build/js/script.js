(function () {
    "use strict";

    $(function(){

        var burger = document.getElementsByClassName('js-burger')[0],
            searchButton = document.getElementsByClassName('js-search768')[0],
            searchInput = document.getElementsByClassName('js-search-input')[0],
            leftMenu = document.getElementsByClassName('js-left-menu-hover')[0],
            leftSubmenu = document.getElementsByClassName('js-left-submenu')[0],
            leftSubmenuUl = leftSubmenu.querySelector('ul'),
            leftSubmenuli = leftSubmenuUl.querySelectorAll('li'),
            rightBlock = document.getElementsByClassName('js-right-block')[0];

            burger.onclick = function() {
                this.classList.toggle('open--burger');
                leftSubmenu.classList.toggle('open--submenu');
            }

            searchButton.onclick = function() {
                searchInput.classList.toggle('visible-search');
            }


            leftSubmenuUl.onmouseover = function() {
                leftMenu.style.width = '280px';
                leftMenu.classList.remove('close');
                leftMenu.classList.add('hover');
                rightBlock.style.width = 'calc(100% - 280px)';


            }
            leftSubmenuUl.onmouseout = function() {
                leftMenu.style.width = '69px';
                rightBlock.style.width = 'calc(100% - 69px)';
                leftMenu.classList.remove('hover');
                leftMenu.classList.add('close');

            }


            for (var i = 0; i < leftSubmenuli.length; i++) {
                leftSubmenuli[i].onmouseover = function() {

                    var block = this.querySelector('div'),
                        svg = block.querySelector('svg'),
                        link = this.querySelectorAll('div:last-child');

                        block.classList.add('color--orange');
                        svg.style.fill = '#fff';
                        link.classList.add('color--blue');
                }

                leftSubmenuli[i].onmouseout = function() {

                    var block = this.querySelector('div'),
                        svg = block.querySelector('svg'),
                        link = block.getElementsByClassName('wrap-link');

                    block.classList.remove('color--orange');
                    svg.style.fill = '';
                    link.classList.remove('color--blue');
                }
            }

    });
}());