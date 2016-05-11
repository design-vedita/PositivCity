
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
         * костыль
         * если нужны пустые блоки у них ставится имя &nbsp и на их месте будет
         * пустота размером с квадрат
         */

        var emptyElem = document.getElementsByClassName('js-item');

            if(!!emptyElem) {

                for (var i = 0; i < emptyElem.length; i++) {

                    var title = emptyElem[i].getElementsByClassName('element-title'),
                        preview = emptyElem[i].getElementsByClassName('preview');

                        for(var j = 0; j < title.length; j++) {

                            if(title[j].innerHTML == '&nbsp;') {
                                title[j].style.padding = 0;
                                title[j].style.height = 0;
                                emptyElem[i].querySelector('a').removeAttribute('href');

                                for(var k = 0; k < preview.length; k++) {
                                    preview[k].style.display = 'none';
                                }
                            }
                        }

                }
            }

        /**
         * Стилизованный инпут в галерее, его обработка
         */

        function customInputFile() {

            var $wrapper = $( ".file-upload" ),
                $inp = $wrapper.find( "input" ),
                $btn = $wrapper.find( "button" ),
                $lbl = $wrapper.find( "mark" );
            $btn.focus(function(){
                $inp.focus()
            });


            $inp.focus(function(){
                $wrapper.addClass( "focus" );
            }).blur(function(){
                $wrapper.removeClass( "focus" );
            });

            $btn.add( $lbl ).click(function(){
                $inp.click();
            });

            $btn.on(function(){
                $wrapper.addClass( "focus" );
            }).blur(function(){
                $wrapper.removeClass( "focus" );
            });

            var fileApi = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

            $inp.change(function(){
                var $fileName;
                if( fileApi && $inp[ 0 ].files[ 0 ] )
                    $fileName = $inp[ 0 ].files[ 0 ].name;
                else
                    $fileName = $inp.val().replace( "C:\\fakepath\\", '' );

                if( ! $fileName.length )
                    return;

                if( $lbl.is( ":visible" ) ){
                    $lbl.text( $fileName );
                    $btn.text( "Выбрать" );
                }else
                    $btn.text( $fileName );
            }).change();

        }

        customInputFile();

        /**
         * Слайдер в товарной карте
         */

        function mapSlider() {
            var slider = document.getElementsByClassName('js-map-slider')[0];

                if(!!slider) {
                    var slide = slider.getElementsByClassName('swiper-slide'),
                        sliderWidth = slider.offsetWidth,
                        sliderHeight = sliderWidth * .33;

                        slider.style.height = sliderHeight + 'px';
                        slider.style.minHeight = '400px';

                    for(var i = 0; i < slide.length; i++) {
                        slide[i].style.height = sliderHeight + 'px';
                        slide[i].style.minHeight = '400px';
                    }
                }
        }

        mapSlider();


        function heightBlocks() {
            var clientWidth = document.documentElement.clientWidth;

                if(clientWidth >= 460) {
                    var max_height = $(".anchor").width();
                    $(".two-square").css("height", max_height);
                    $(".four-square").css("height", max_height);
                    $(".six-square").css("height", max_height);
                } else {
                    $(".two-square").css("height", '');
                    $(".four-square").css("height", '');
                    $(".six-square").css("height", '');
                }
        }

        heightBlocks();


        /**
         * Всплывающее окно по центру
         */

        function popupCenter() {
            var links = document.getElementsByClassName('js-popup-link'),
                popup = document.getElementsByClassName('js-popup'),
                back = document.getElementsByClassName('js-back')[0],
                closePopup = document.getElementsByClassName('js-close-popup'),
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

                for (var m = 0; m < popup.length; m++) {
                    var width = popup[m].offsetWidth,
                        height = popup[m].offsetHeight;

                    popup[m].style.left = scrollLeft + (docElem.clientWidth - width) / 2 + 'px';
                    popup[m].style.top = scrollTop + (docElem.clientHeight - height) / 2 + 'px';
                }


                for(var i = 0; i < links.length; i++) {

                    links[i].onclick = function() {

                        var typePopup = this.getAttribute('data-link');

                        for (var j = 0; j < popup.length; j++) {



                            if(popup[j].getAttribute('data-link') == typePopup) {

                                popup[j].classList.add('view--popup');
                                back.classList.add('view--back');
                            }


                        }
                    }

                }

                for (var k = 0; k < closePopup.length; k++) {

                    closePopup[k].onclick = function() {

                        for (var n = 0; n < popup.length; n++) {
                            popup[n].classList.remove('view--popup');
                            back.classList.remove('view--back');
                        }

                    }

                }


                back.onclick = function() {

                     i = null;
                     for (i = 0; i < popup.length; i++) {
                         popup[i].classList.remove('view--popup');
                         back.classList.remove('view--back');
                     }
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

                        var count = $('.one-square').length;

                        if (count == 6) {
                            $('.one-square:nth-of-type(6),.one-square:nth-of-type(5)').wrapAll('<div class="two-square js-wrap"></div>');
                        }


                } else if( clientWidth >= 460 && clientWidth <= 767 ) {

                    if ( !$("#category-list .row").hasClass("re-layout"))
                    {
                        $("#category-list .row").addClass("re-layout");
                        $("#category-list .row").find(".content__list-category__element").each(function(index, element){ $(element).attr('data-order',index) });
                        $("#category-list .row").find(".one-square").appendTo("#category-list .row");
                        $("#category-list .row").find(".two-square").appendTo("#category-list .row");
                        $("#category-list .row").find(".four-square").appendTo("#category-list .row");
                        $("#category-list .row").find(".six-square").appendTo("#category-list .row");
                    }

                } else if( clientWidth >= 768 && clientWidth <= 999) {
                    $item.each(function() {
                        if($(this).parent().is('.js-wrap')) {
                            $(this).unwrap();
                        }
                    });
                    if ($(".row").hasClass("re-layout"))
                    {
                        $(".row").removeClass("re-layout");
                        var num_el = $(".row").find(".content__list-category__element").length;
                        for ( var i = 0; i < num_el; i++) {
                            $("#category-list").find(".content__list-category__element[data-order='"+i+"']").appendTo("#category-list .row");
                        }
                    }
                } else if( clientWidth >= 1401) {
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
                $widthCategory = $('.js-category-list').width(),
                $elem = $('.js-element').width(),
                $elemCategory = $('.js-element-category').width();

            $('.js-catalog-list').attr('data-width', $widthCatalog);
            $('.js-catalog-list').attr('elem-width', $elem);

            $('.js-category-list').attr('data-width', $widthCategory);
            $('.js-category-list').attr('elem-width', $elemCategory);


        }

        setCatalogAttr();

        function changeMargin() {
            var $container = $('.js-catalog-list');

            if(!!$container)
                $container = $('.js-catalog-list');
            else
                $container = $('.js-category-list');


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
            pagination: '.swiper-pagination-catalog',
            paginationClickable: true,
            height: 400
        });


        /**
         * 320-768 при клике по кнопке поиска, появляется поиск
         * 320-768 when you click on the search button appears search
         * */
        searchButton.onclick = function() {
            var clientWidth = document.documentElement.clientWidth;

                this.classList.toggle('open');
                searchInput.classList.toggle('visible-search');


                if(this.classList.contains('open')) {
                    this.querySelector('use').setAttribute('xlink:href','#close');
                } else {
                    this.querySelector('use').setAttribute('xlink:href','#search');
                }

                if(clientWidth >=320 && clientWidth <= 459) {
                    if(this.classList.contains('open')) {
                        burgerOrange.classList.add('no--visible');
                    } else {
                        burgerOrange.classList.remove('no--visible');
                    }
                }
        }


        /**
         * окрашиваем подложку при наведении на пункт меню
         * paint the substrate when you hover over a menu item
         **/

        $('.js-left-submenu li').mouseenter(function(){
            var $div = $(this).find('div');

                $div.addClass('color--orange');
                $(this).addClass('color--blue');
        });

        $('.js-left-submenu li').mouseleave(function(){
            var $div = $(this).find('div');

                if($(this).hasClass('active-menu')) {

                } else {
                    $div.removeClass('color--orange');
                    $(this).removeClass('color--blue');
                }

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

                    var footerSoc = document.getElementsByClassName('js-seti')[0];

                        footerSoc.classList.toggle('open--menu');

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
                    //heightBlocks();
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
            heightBlocks();
            mapSlider();




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

                function showVisible() {
                    var footer = document.getElementsByTagName('footer')[0],
                        content = document.getElementsByClassName('js-catalog-text')[0];

                    if(!!content) {
                        /**
                         * Для страниц с этим классом при прокрутке до этого блока - высота баннера
                         * баннер перестаёт с нами крутиться, чтобы не наезжать на текст.
                         */
                        if(scrollTop >= (getOffsetRect(content).top - 400)){
                            if(!!banner)
                                banner.classList.remove('scroll--banner');

                           /* if(!!map)
                                map.classList.remove('scroll--map');*/
                        }
                    }

                    if(!!footer) {
                        if (scrollTop >= (getOffsetRect(footer).top - 400)) {
                            if(!!banner)
                                banner.classList.remove('scroll--banner');

                            if(!!map)
                                map.classList.remove('scroll--map');

                        }
                    }
                }
            if(!!!isIos) {
                if(clientWidth > 768) {

                    if(!!wrapBanner) {
                        if(scrollTop >= getOffsetRect(wrapBanner).top) {

                            if(!!banner) {

                                var flagArticle = banner.classList.contains('js-article');

                                    banner.classList.add('scroll--banner');

                                    if(flagArticle && clientWidth < 1308)
                                        banner.classList.remove('scroll--banner');

                            }


                            if(!!map)
                                if(clientWidth >= 1045) {
                                    map.classList.add('scroll--map');
                                }


                        } else {

                            if(!!banner)
                                banner.classList.remove('scroll--banner');

                            if(!!map)
                                map.classList.remove('scroll--map');
                        }


                    }
                    showVisible();

                }
            }

        }
        scrollBanner();

        $('.js-date-input').datepicker({
            dateFormat: "dd.mm.yy"
        });


        window.onscroll = function() {
            fixedHeader();
            scrollBanner();
            popupCenter();
        }


    });

}());