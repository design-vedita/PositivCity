
(function () {
    "use strict";

    $(function(){

        var isIos = navigator.userAgent.match(/iPhone|iPad|iPod/i);

        var burger = document.getElementsByClassName('js-burger')[0],
            header = document.getElementsByTagName('header')[0],
            burgerOrange = document.getElementsByClassName('js-burger460')[0],
            searchButton = document.getElementsByClassName('js-search768')[0],
            searchInput = document.getElementsByClassName('js-search-input')[0],
            leftMenu = document.getElementsByClassName('js-left-menu-hover')[0],
            leftSubmenu = document.getElementsByClassName('js-left-submenu')[0],
            footerLinks = document.getElementsByClassName('js-footer-links')[0],
            banner = document.getElementsByClassName('js-banner')[0],
            map = document.getElementsByClassName('js-yMap')[0],
            rightBlock = document.getElementsByClassName('js-right-block')[0];

        /**
         * Всплывающее окно по центру
         */

        function popupCenter() {
            var cityLink = document.getElementsByClassName('js-city-link')[0],
                popup = document.getElementsByClassName('js-popup'),
                back = document.getElementsByClassName('js-back')[0],
                cityPopup = document.getElementsByClassName('js-city')[0],
                closePopup = document.getElementsByClassName('js-close-popup')[0],
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;


                cityLink.onclick = function() {
                    cityPopup.classList.add('view--popup');
                    back.classList.add('view--back');
                }

                back.onclick = function() {
                    cityPopup.classList.remove('view--popup');
                    back.classList.remove('view--back');
                }

                closePopup.onclick = function() {
                    cityPopup.classList.remove('view--popup');
                    back.classList.remove('view--back');
                }

                for (var i = 0; i < popup.length; i++) {
                    var width = popup[i].offsetWidth,
                        height = popup[i].offsetHeight;

                        popup[i].style.left = scrollLeft + (docElem.clientWidth - width) / 2 + 'px';
                        popup[i].style.top = scrollTop + (docElem.clientHeight - height) / 2 + 'px';
                }
        }
        popupCenter();

        /**
         * При фокусе на инпуте убираем плейсхолдер,
         * при уходе возвращаем
         */

        function attrInput() {
            var input  = document.getElementsByClassName('js-input');

            for (var i = 0; i < input.length; i++) {
                input[i].onfocus = function() {
                    var attr = this.getAttribute('placeholder');
                    this.removeAttribute('placeholder');
                    this.setAttribute('data-placeholder', attr);
                }

                input[i].onblur = function() {
                    var text = this.getAttribute('data-placeholder');
                    this.setAttribute('placeholder', text);
                }
            }
        }

        attrInput();

        /**
         * Блоки на главной странице
         */


        function adaptive() {
            var clientWidth = document.documentElement.clientWidth;

                var $item = $('.item');

                if (clientWidth >= 1000 && clientWidth <= 1400) {

                    $('.one-square:nth-of-type(6),.one-square:nth-of-type(5)').wrapAll('<div class="two-square js-wrap"></div>');

                } else if( clientWidth >= 460 && clientWidth <= 767 ) {

                    $("#category-list").find(".one-square").appendTo("#category-list");
                    $("#category-list").find(".two-square").appendTo("#category-list");
                    $("#category-list").find(".four-square").appendTo("#category-list");
                    $("#category-list").find(".six-square").appendTo("#category-list");

                } else if( clientWidth >= 768 && clientWidth <= 999) {
                    $item.each(function() {
                        if($(this).parent().is('.js-wrap')) {
                            $(this).unwrap();
                        }
                    })
                }
        }

        adaptive();

        /*
        * Активные табы в карточке
        * */

        function openTab() {

                $('.js-tabs-link a').click(function(){
                    var attr = $(this).attr('data-tab');

                    var link = $('.js-tabs-link li');
                        link.each(function() {
                            $(this).removeClass('active');
                        });

                    $(this).parent().addClass('active');

                    var block =  $('.js-tabs-text').find('div[data-link]');
                        block.each(function(){
                            if($(this).attr('data-link') == attr) {
                                $(this).addClass('view-block');
                            } else {
                                $(this).removeClass('view-block');
                            }
                        });
                });
        }

        openTab();



        /**
         * Делаем равные отступы между блоками в каталоге
         */

        /*
         * Устанавливаем у враппера аттрибут, с его длиной, чтобы по клику
         * на отрытие меню блоки выстраивались ровно и не ломались
         */

        function setCatalogAttr() {
            var $widthCatalog = $('.js-catalog-list').width(),
                $elem = $('.js-element').width();

            $('.js-catalog-list').attr('data-width', $widthCatalog);
            $('.js-catalog-list').attr('elem-width', $elem);

        }

        setCatalogAttr();

        function changeMargin() {
            var $container = $('.js-catalog-list'),
                elem = $('.js-element');


            if(!!$container) {
                $container.toggleClass('no-resize');

                if($container.hasClass('no-resize')) {
                    var $containerWidth = $($container).attr('data-width');
                    var $elementWidth = $($container).attr('elem-width');
                } else {
                    var $containerWidth = $($container).width();
                    var $elementWidth = $('.js-element').width();
                }

            }


            var $elementCount = Math.floor($containerWidth / $elementWidth),
                $elementsWidth = $elementWidth * $elementCount,
                $difference = $containerWidth - $elementsWidth,
                $margin = $difference / ($elementCount - 1),
                clientWidth = document.documentElement.clientWidth;

            $('.js-element').each(function(index){
                if (index > 0 && index % $elementCount != 0) {
                    var margins = ($margin / clientWidth) * 100;
                    $(this).css({'margin-left': margins + '%'});
                } else
                    $(this).css({'margin-left': '0'});
            });

            /**
             * В разделе каталога в ряд по 3 штуки, поэтому переделал логику
             * расстановки отступов. У квадрата обязателен класс .js-element, по его размеру
             * будут задаваться отступы
             */

            if(clientWidth > 1194) {
                $('.js-element-list').each(function(index){
                    if (index > 0 && (index + 1 ) % ($elementCount - 1) != 0) {
                        var margins = ($margin / clientWidth) * 100;
                        $(this).css({'margin-left': margins + '%'});
                    } else
                        $(this).css({'margin-left': '0'});
                });
            }
        }

        changeMargin();

        /**
         * Стилизация чекбоксов и селектов
         */
        var selects = document.getElementsByClassName('js-custom');

            if(!!selects) {
                $(selects).styler();
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

        var swiperTop = new Swiper('.js-top-slider', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });

        var swiperCatalog = new Swiper('.js-slider-theme', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            height: 400
        });


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
                var box = elem.getBoundingClientRect();

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
                burger.onclick = function() {

                    /**
                     * Если после маленького экрана ресайз на большой,
                     * чтобы меню работало правильно при открытии, выставляем своё максимальное значение
                     * самого длинного слова
                     */
                    if ( Math.sign(max) == -1 ) {
                        max = 283;
                    }
                    /*-------------------------------*/

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

                    changeMargin();
                }
            } else if(clientWidth < 767) {
                rightBlock.style.width = '';
                leftMenu.style.width = '';

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


        window.onresize = function() {
            openMenu();
            fixedHeader();
            setCatalogAttr();
            changeMargin();
            adaptive();
            popupCenter();


            var clientWidth = document.documentElement.clientWidth;

                /**
                 * очищаем классы при ресайзе, чтобы ничего не ломалось.
                 * */
                if(clientWidth >= 767 ) {
                    burger.classList.remove('view-menu');
                    burger.classList.remove('view-menu');
                    burger.classList.remove('open--translate');
                    leftMenu.classList.remove('translate');
                    header.classList.remove('scroll--fixed');
                    header.style.width = '';

                    if(!!banner)
                        banner.classList.remove('scroll--banner');

                    if(!isIos) {
                        leftMenu.style.width = '';
                        leftMenu.classList.remove('hover');
                        burger.classList.remove('open--burger');
                    }
                }
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

        /**
         * При прокрутке на высоту до баннера и до карты в карточке
         * баннер/карта прокручиваются с нами и если футер в зоне видимости
         * перкращают с нами крутиться
         */

        function scrollBanner() {

            var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                banner = document.getElementsByClassName('js-banner')[0],
                wrapBanner = document.getElementsByClassName('js-wrap-banOrMap')[0],
                map = document.getElementsByClassName('js-yMap')[0],
                clientWidth = document.documentElement.clientWidth;

                function getOffsetRect(elem) {
                    var box = elem.getBoundingClientRect();

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

                function isVisible(elem) {

                    var coords = elem.getBoundingClientRect();

                    var windowHeight = document.documentElement.clientHeight;

                    var topVisible = coords.top > 0 && coords.top < windowHeight;
                    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

                    return topVisible || bottomVisible;
                }

                function showVisible() {
                    var footer = document.getElementsByTagName('footer')[0];

                    if (isVisible(footer)) {
                        if(!!banner)
                            banner.classList.remove('scroll--banner');

                        if(!!map)
                            map.classList.remove('scroll--map');

                    }
                }

            if(clientWidth > 768) {
               // window.scrollBy(0, 1);
                if(!!wrapBanner) {
                    if(scrollTop >= getOffsetRect(wrapBanner).top) {

                        if(!!banner)
                            banner.classList.add('scroll--banner');

                        if(!!map)
                            map.classList.add('scroll--map');

                    } else {

                        if(!!banner)
                            banner.classList.remove('scroll--banner');

                        if(!!map)
                            map.classList.remove('scroll--map');
                    }
                    showVisible();
                }

            }

        }
        scrollBanner();


        window.onscroll = function() {
            fixedHeader();
            scrollBanner();
            popupCenter();
        }


    });

    window.onload = function() {
        /**
         * initialize masonry
         * */
/*
        $('.js-category-list').masonry({
            itemSelector: '.item',
            singleMode: false,
            isResizable: true,
            isAnimated: true,
            isInitLayout: false,
            animationOptions: {
                queue: false,
                duration: 500
            },
            gutter: 30
        });
        */


    }
}());