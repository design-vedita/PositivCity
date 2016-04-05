(function () {
    "use strict";

    $(function(){

        var burger = document.getElementsByClassName('js-burger')[0],
            burgerOrange = document.getElementsByClassName('js-burger460')[0],
            searchButton = document.getElementsByClassName('js-search768')[0],
            searchInput = document.getElementsByClassName('js-search-input')[0],
            leftMenu = document.getElementsByClassName('js-left-menu-hover')[0],
            leftSubmenu = document.getElementsByClassName('js-left-submenu')[0],
            footerLinks = document.getElementsByClassName('js-footer-links')[0],
            rightBlock = document.getElementsByClassName('js-right-block')[0],
            clientWidth = document.documentElement.clientWidth;

        /**
         * 320-768 при клике по кнопке поиска, появляется поиск
         * 320-768 when you click on the search button appears search
         * */
        searchButton.onclick = function() {
            searchInput.classList.toggle('visible-search');
        }


        /**
         * окрашиваем подложку при наведении на пункт меню
         * paint the substrate when you hover over a menu item
         **/

        $('.js-left-submenu li').mouseenter(function(){
            $(this).find('div').addClass('color--orange');
            $(this).addClass('color--blue');
        });

        $('.js-left-submenu li').mouseleave(function(){
            $(this).find('div').removeClass('color--orange');
            $(this).removeClass('color--blue');
        });

        /*------------------------------------------------------------------------------*/

        /**
         * Получаем координату правого угла каждого элемента списка и на эту длину
         * открываем левое меню. Правый блок подстраивается под это и получает свои размеры
         * Get coordinate of the right corner of each list item, and on the length of the open left menu. Right block adapts it and gets its size
         **/

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

            var max = Math.max.apply(0, arr) ;

            if(clientWidth >= 768) {
                burger.onclick = function() {
                    leftMenu.style.width = (max + 20) + 'px';

                    leftMenu.classList.toggle('hover');

                    /*
                    * Пересчёт длины левого и правого блоков,
                    * при открытом меню
                    * */

                    if (leftMenu.classList.contains('hover')) {
                        rightBlock.style.width = 'calc(100% - ' + (max + 20) + 'px)';
                        rightBlock.style.transition = '';
                        this.classList.add('view-menu', 'open--burger');
                        leftMenu.classList.remove('close');
                    } else {
                        leftMenu.style.width = '69px';
                        rightBlock.style.width = 'calc(100% - 69px)';
                        rightBlock.style.transition = 'width .5s ease .5s';
                        this.classList.remove('view-menu', 'open--burger');
                        leftMenu.classList.remove('hover');
                        leftMenu.classList.add('close');
                    }

                    /**
                     * на разных разрешениях добавляем снизу отступ,
                     * чтобы наши ссылки в футере помещались
                     * */
                    if(clientWidth >= 1400 && clientWidth <= 1960) {
                        var  heightLinks = footerLinks.offsetHeight;

                        if(this.classList.contains('view-menu')) {
                            footerLinks.style.height = heightLinks + 200 + 'px';
                        } else {
                            footerLinks.style.height = '';
                        }
                    } else if(clientWidth >= 1000 && clientWidth < 1400) {
                        var  heightLinks = footerLinks.offsetHeight,
                             div = footerLinks.querySelectorAll('div:not(.js-contacts)');

                        /**
                         * добавляем в футер высоты, чтобы блоки поместились и задаём при открытом меню
                         * длину блоков, чтобы не расползалось
                         */

                        if(this.classList.contains('view-menu')) {

                            footerLinks.style.height = heightLinks + 300 + 'px';

                            for (var i = 0; i < div.length; i++) {
                                div[i].style.width = '33%';
                            }

                        } else {

                            footerLinks.style.height = '';

                            for (var i = 0; i < div.length; i++) {
                                div[i].style.width = '';
                            }

                        }

                    } else if(clientWidth >= 768 && clientWidth < 1000) {
                        var  heightLinks = footerLinks.offsetHeight,
                             div = footerLinks.querySelectorAll('div:not(.js-contacts)');

                        /**
                         * добавляем в футер высоты, чтобы блоки поместились и задаём при открытом меню
                         * длину блоков, чтобы не расползалось
                         */

                        if(this.classList.contains('view-menu')) {

                            footerLinks.style.height = heightLinks + 500 + 'px';

                            for (var i = 0; i < div.length; i++) {
                                div[i].style.width = '50%';
                            }

                        } else {

                            footerLinks.style.height = '';

                            for (var i = 0; i < div.length; i++) {
                                div[i].style.width = '';
                            }

                        }
                    }


                }
            } else if(clientWidth < 767) {
                rightBlock.style.width = '';

                /**
                 * При маленьком размере экрана левое меню невидимо
                 * и при открытии наезжает сверху
                 */
                burger.onclick = function() {
                    leftMenu.classList.toggle('translate');
                    leftSubmenu.classList.toggle('open--submenu');
                    this.classList.toggle('open--burger');
                }
            }


        }

        openMenu();

        window.onresize = function() {
            openMenu();
            fixedHeader();
        }


        /**
         * Клик по бургеру в верхнем меню на 320-460
         * Click on a burger in the top menu on 320-460
         * */

        burgerOrange.onclick = function() {
            leftMenu.classList.toggle('translate');
            burger.classList.toggle('view-menu');
            burger.classList.toggle('open--burger');
            burger.classList.toggle('open--translate');
            leftSubmenu.classList.toggle('open--submenu');
        }


        /**
         * fixed у шапки при скролле выше высоты шапки и на 320-767
         * have fixed header when scrolling up cap height and 320-767
         * */

        function fixedHeader() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                header = document.getElementsByTagName('header')[0],
                headerHeight = header.offsetHeight,
                clientWidth = document.documentElement.clientWidth;


            if(clientWidth <=767) {
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

        }

        fixedHeader();

        window.onscroll = function() {
            fixedHeader();
        }

        /**
         * Initialize Swiper slider
         * */

        var swiper = new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            slidesPerView: 5,
            spaceBetweenSlides: 60,
            breakpoints: {
                1800: {
                    slidesPerView: 4
                },
                1399: {
                    slidesPerView: 2.8
                },
                999: {
                    slidesPerView: 2,
                    spaceBetweenSlides: 16
                },
                767: {
                    slidesPerView: 2
                },
                650: {
                    slidesPerView: 1.5
                },
                510: {
                    slidesPerView: 1.2
                },
                459: {
                    slidesPerView: 1
                },
                360: {
                    slidesPerView: .8
                }
            }
        });


    });
}());