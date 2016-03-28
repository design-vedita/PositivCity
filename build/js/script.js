(function () {
    "use strict";

    $(function(){

        var burger = document.getElementsByClassName('js-burger')[0],
            burgerOrange = document.getElementsByClassName('js-burger460')[0],
            searchButton = document.getElementsByClassName('js-search768')[0],
            searchInput = document.getElementsByClassName('js-search-input')[0],
            leftMenu = document.getElementsByClassName('js-left-menu-hover')[0],
            leftSubmenu = document.getElementsByClassName('js-left-submenu')[0],
            leftSubmenuUl = leftSubmenu.querySelector('ul'),
            rightBlock = document.getElementsByClassName('js-right-block')[0];

            /*---------------------��� ����� �� ������� ���������� ����----------------*/
            function viewMenu() {
                var clientWidth = document.documentElement.clientWidth;

                if(clientWidth >= 768) {
                    burger.onclick = function() {
                        this.classList.toggle('open--burger');
                        leftSubmenu.classList.toggle('open--submenu');
                    }
                } else if(clientWidth < 767) {
                    burger.onclick = function() {
                        leftMenu.classList.toggle('translate');
                        leftSubmenu.classList.toggle('open--submenu');
                        this.classList.toggle('open--burger');
                    }
                }

            }

            viewMenu();

            /*-----------------------------------------------------------------------*/

            /*----------320-768 ��� ����� �� ������ ������, ���������� �����------------*/
            searchButton.onclick = function() {
                searchInput.classList.toggle('visible-search');
            }

            /*-------------------------------------------------------*/

            /*----------��� ��������� �� ����� ���� ������ ������� ������-----*/
            leftSubmenu.onmouseenter = function() {
                burger.classList.add('view-menu');
            }

            leftSubmenu.onmouseleave = function() {
                burger.classList.remove('view-menu');
            }

            /*------------------------------------------------------------------*/


            /*------------------------- ���������� �������� ��� ��������� �� ����� ����------------------*/
            $('.js-left-submenu li').mouseenter(function(){
                $(this).find('div').addClass('color--orange');
                $(this).addClass('color--blue');

            });

            $('.js-left-submenu li').mouseleave(function(){
                $(this).find('div').removeClass('color--orange');
                $(this).removeClass('color--blue');
            });

            /*------------------------------------------------------------------------------*/

            /*
            * �������� ���������� ������� ���� ������� �������� ������ � �� ��� �����
            * ��������� ����� ����. ������ ���� �������������� ��� ��� � �������� ���� �������
            * */

            function openMenu() {

                var clientWidth = document.documentElement.clientWidth;

                function getOffsetRect(elem) {
                    var box = elem.getBoundingClientRect()

                    var body = document.body;
                    var docElem = document.documentElement;

                    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

                    var clientTop = docElem.clientTop || body.clientTop || 0;
                    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

                    var top  = box.top +  scrollTop - clientTop;
                    var left = box.left + scrollLeft - clientLeft;

                    return { top: Math.round(top), left: Math.round(left) }
                }

                var arr = Array(),
                    submenu_li = document.getElementsByClassName('js-wrap-link');

                for (var i = 0; i < submenu_li.length; i++) {
                    arr[i] = getOffsetRect(submenu_li[i]).left + submenu_li[i].offsetWidth;
                }

                var max = Math.max.apply(0, arr);

                if(clientWidth >= 768) {
                    leftSubmenuUl.onmouseover = function() {
                        leftMenu.style.width = max + 'px';
                        leftMenu.classList.remove('close');
                        leftMenu.classList.add('hover');
                        rightBlock.style.width = 'calc(100% - '+ max +'px)';
                        rightBlock.style.transition = '';
                    }
                    leftSubmenuUl.onmouseout = function() {
                        leftMenu.style.width = '69px';
                        rightBlock.style.width = 'calc(100% - 69px)';
                        rightBlock.style.transition = 'width .5s ease .5s';
                        leftMenu.classList.remove('hover');
                        leftMenu.classList.add('close');
                    }
                } else if(clientWidth < 767) {
                    rightBlock.style.width = '';
                }

            }

            openMenu();

            window.onresize = function() {
                openMenu();
                viewMenu();
                fixedHeader();
            }

            /*------------------------------------------------------------------------------*/

            /*--------------���� �� ������� � ������� ���� �� 320-460-----------*/

            burgerOrange.onclick = function() {
                leftMenu.classList.toggle('translate');
                burger.classList.toggle('view-menu');
                burger.classList.toggle('open--burger');
                burger.classList.toggle('open--translate');
                leftSubmenu.classList.toggle('open--submenu');
            }


            /*---------------fixed � ����� ��� ������� ���� ������ ����� � �� 320-767--------------*/

            function fixedHeader() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                    header = document.getElementsByTagName('header')[0],
                    headerHeight = header.offsetHeight,
                    clientWidth = document.documentElement.clientWidth;

                if (scrollTop >= headerHeight) {
                    header.classList.add('scroll--fixed');

                    if(clientWidth >=460 && clientWidth <= 767) {
                        header.style.width = 'calc(100% - 40px)';
                    } else if(clientWidth >=320 && clientWidth <=459) {
                        header.style.width = 'calc(100% - 20px)';
                    }

                } else {
                    header.classList.remove('scroll--fixed');
                }

            }

            fixedHeader();

            window.onscroll = function() {
                fixedHeader();
            }


    });
}());