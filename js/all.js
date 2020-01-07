// $(document).ready(function() {
//
//     const body = document.body;
//
//     const docEl = document.documentElement;
//
//     const lineEq = (y2, y1, x2, x1, currentVal) => {
//         // y = mx + b
//         var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
//         return m * currentVal + b;
//     };
//
//     const lerp = (a,b,n) => (1 - n) * a + n * b;
//
//     const distance = (x1,x2,y1,y2) => {
//         var a = x1 - x2;
//         var b = y1 - y2;
//         return Math.hypot(a,b);
//     };
//
//     const getMousePos = (e) => {
//         let posx = 0;
//         let posy = 0;
//         if (!e) e = window.event;
//         if (e.pageX || e.pageY) {
//             posx = e.pageX;
//             posy = e.pageY;
//         }
//         else if (e.clientX || e.clientY) 	{
//             posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//             posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//         }
//         return { x : posx, y : posy };
//     };
//
//     let winsize;
//     const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
//     calcWinsize();
//     window.addEventListener('resize', calcWinsize);
//
//     const feDisplacementMapEl = document.querySelector('feDisplacementMap');
//
//     class Menu {
//         constructor() {
//             this.DOM = {
//                 svg: document.querySelector('svg.distort'),
//                 menu: document.querySelector('nav.menu')
//             };
//             this.DOM.imgs = [...this.DOM.svg.querySelectorAll('g > image')];
//             console.log(this.DOM.imgs);
//             this.DOM.menuLinks = [...this.DOM.menu.querySelectorAll('.menu__link')];
//             this.mousePos = {x: winsize.width/2, y: winsize.height/1};
//             this.lastMousePos = {
//                 translation: {x: winsize.width/2, y: winsize.height/2},
//                 displacement: {x: 0, y: 0}
//             };
//             this.dmScale = 0;
//
//             this.current = -1;
//
//             this.initEvents();
//             requestAnimationFrame(() => this.render());
//         }
//         initEvents() {
//             window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
//
//             this.DOM.menuLinks.forEach((item, pos) => {
//                 charming(item);
//                 const letters = [...item.querySelectorAll('span')];
//
//                 const mouseenterFn = () => {
//                     if ( this.current !== -1 ) {
//                        TweenMax.set(this.DOM.imgs[this.current], {opacity: 0});
//                     }
//                     this.current = pos;
//
//                     if ( this.fade ) {
//                         TweenMax.to(this.DOM.imgs[this.current], 0.5, {ease: Quad.easeOut, opacity: 1});
//                         this.fade = false;
//                     }
//                     else {
//                         TweenMax.set(this.DOM.imgs[this.current], {opacity: 1});
//                     }
//
//                 };
//                 item.addEventListener('mouseenter', mouseenterFn);
//             });
//
//             const mousemenuenterFn = () => this.fade = true;
//             const mousemenuleaveFn = () => TweenMax.to(this.DOM.imgs[this.current], .2, {ease: Quad.easeOut, opacity: 0});
//
//             this.DOM.menu.addEventListener('mouseenter', mousemenuenterFn);
//             this.DOM.menu.addEventListener('mouseleave', mousemenuleaveFn);
//         }
//         render() {
//             this.lastMousePos.translation.x = lerp(this.lastMousePos.translation.x, this.mousePos.x, 0.1);
//             this.lastMousePos.translation.y = lerp(this.lastMousePos.translation.y, this.mousePos.y, 0.1);
//             this.DOM.svg.style.transform = `translateX(${(this.lastMousePos.translation.x-winsize.width/2)}px) translateY(${this.lastMousePos.translation.y-winsize.height/2}px)`;
//
//             // Scale goes from 0 to 100 for mouseDistance values between 0 to 100
//             this.lastMousePos.displacement.x = lerp(this.lastMousePos.displacement.x, this.mousePos.x, 0.1);
//             this.lastMousePos.displacement.y = lerp(this.lastMousePos.displacement.y, this.mousePos.y, 0.1);
//             const mouseDistance = distance(this.lastMousePos.displacement.x, this.mousePos.x, this.lastMousePos.displacement.y, this.mousePos.y);
//             this.dmScale = Math.min(mouseDistance, 100);
//             feDisplacementMapEl.scale.baseVal = this.dmScale;
//
//             requestAnimationFrame(() => this.render());
//         }
//     }
//
//     new Menu();
//
// });
"use strict";
"use strict";

$(document).ready(function () {
  // Pages in the website
  var PAGES = {
    home: {
      page: 1,
      id: 'homepage',
      label: 'Homepage'
    },
    whyHedge: {
      page: 2,
      id: 'why-unreal-361',
      label: 'Why UNREAL 361°'
    },
    thisIsUs: {
      page: 3,
      id: 'portfolio',
      label: 'PORTFOLIO'
    },
    whatWeDo: {
      page: 4,
      id: 'contact',
      label: 'Contacts'
    }
    // howWeDoIt: {
    //   page: 5,
    //   id: 'how-we-do-it',
    //   label: 'How we do it'
    // },
  }; // Generated page keys map, E.g. { 1: 'home', 2: 'whatWeDo' }

  var PAGE_KEYS = Object.keys(PAGES).reduce(function (pageKeys, key) {
    pageKeys[PAGES[key].page] = key;
    return pageKeys;
  }, {}); // Generated page ids map, E.g. { 'homepage': 1, 'contact': 2 }

  var PAGE_IDS = Object.keys(PAGES).reduce(function (pageIds, key) {
    pageIds[PAGES[key].id] = PAGES[key].page;
    return pageIds;
  }, {}); // Generated page numbers array, E.g. [1,2,3]

  var PAGE_NUMS = Object.keys(PAGES).map(function (key) {
    return PAGES[key].page;
  });
  var curPage = null;
  var numOfPages = Object.keys(PAGES).length;
  var invertedPages = [PAGES.whatWeDo.page];
  var coralLogo = [PAGES.home.page, PAGES.whyHedge.page, PAGES.whatWeDo.page, PAGES.thisIsUs.page];
  var animTime = 1750;
  var isScrolling = false;
  var pgPrefix = ".skw-page-";
  var disableScrolling = true;

  function _setCurrentPage(page) {
    if (curPage === page) return;
    curPage = page;
    pagination();
    setBodyClass();
    setVideoPlay();
    setLogoColour();
    PAGE_NUMS.forEach(function (num) {
      if (num === curPage || num < curPage) {
        $(".skw-page-" + num).addClass("active").removeClass("inactive");
      } else {
        $(".skw-page-" + num).removeClass("active").removeClass("inactive");
      }
    });
    var pageKey = PAGE_KEYS[curPage];
    if (pageKey == 'whatWeDo') {
      $('#main-centre-logo').hide();
    } else {
      $('#main-centre-logo').show();
    }
    if (pageKey == 'whatWeDo') {
      $('#bottom-multi-logo').show();
    } else {
      $('#bottom-multi-logo').hide();
    }
    history.pushState(null, null, '#' + PAGES[pageKey].id);
  }

  function setBodyClass() {
    if (invertedPages.indexOf(curPage) !== -1) {
      $(document.body).addClass('skw-pages--inverted');
    } else {
      $(document.body).removeClass('skw-pages--inverted');
    }
  }

  function setVideoPlay() {
    var videoElement = $('.skw-page-' + curPage + ' video');

    if (videoElement.length) {
      console.log('videoElement: ', videoElement[0].play);
      videoElement.get(0).play();
    }
  }

  function setLogoColour() {
    //checkUrl();
    if (coralLogo.indexOf(curPage) !== -1) {
      $('.hedge-logo svg g').css('fill', '#FA7D73', 400);
    } else {
      $('.hedge-logo svg g').css('fill', '#ffffff');
    }
  }

  function pagination() {
    $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    $(pgPrefix + (curPage - 1)).addClass("inactive");
    $(pgPrefix + (curPage + 1)).removeClass("active");
  } // Desktop scrolling


  $(document).on("mousewheel DOMMouseScroll", function (e) {
    _triggerScroll(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0);
  }); // Mobile scrolling

  var ts;
  $(document).bind('touchstart', function (e) {
    ts = e.originalEvent.touches[0].clientY;
  });
  $(document).bind('touchend', function (e) {
    var te = e.originalEvent.changedTouches[0].clientY;

    if (ts > te + 5) {
      _triggerScroll(false);
    } else if (ts < te - 5) {
      _triggerScroll(true);
    }
  }); // Keyboard scrolling

  $(document).on("keydown", function (e) {
    if (e.which === 38) {
      _triggerScroll(true);
    } else if (e.which === 40) {
      _triggerScroll(false);
    }
  });
  var scrollTimeout = null;

  function _triggerScroll(up) {
    if (isScrolling || disableScrolling) return;
    isScrolling = true;

    if (up) {
      navigateUp();
    } else {
      navigateDown();
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      isScrolling = false;
    }, animTime * 0.6);
  }

  function navigateUp() {
    if (curPage === 1) return;

    _setCurrentPage(curPage - 1);
  }

  function navigateDown() {
    if (curPage === numOfPages) return;

    _setCurrentPage(curPage + 1);
  } // Team slider arrows


  // $('.team-slider').slick({
  //   prevArrow: "<span class='slick-prev' style='background url(./img/left.svg)'></span>",
  //   nextArrow: "<span class='slick-next' style='background url(./img/right.svg)'></span>",
  //   dots: true
  // }); // Change slide by name

  // $('li[data-slide]').click(function () {
  //   var slideno = $(this).data('slide');
  //   $('.team-slider').slick('slickGoTo', slideno - 1);
  // }); // On team-slider click (update the list)

  // $('.team-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
  //   $('li[data-slide]').removeClass('selected');
  //   $('li[data-slide]').eq(currentSlide).addClass('selected');
  // }); // Add iPad only to slick dots

  // $('.slick-dots').addClass('desktop-only'); // Set the first team member (mobile)

  if ($(window).width() <= 991) {
    // Update image
    $('.skw-page-5 .skw-page__half--right .skw-page__content').css("background", "url('img/1.jpg')").css("background-size", "cover"); // Update contact buttons

    var email = 'andrew.gibson@hedge-re.co';
    var emailLabel = 'Email me';
    $(".team-contact.mobile-only a.email").attr("href", "mailto:" + email);
    $(".team-contact.mobile-only a.email").html(emailLabel);
    var phone = '07866 602 381';
    $(".team-contact.mobile-only a.phone").attr("href", "tel:" + phone);
    $(".team-contact.mobile-only a.phone").html(phone);
    var tel = '02075 804 797';
    $(".team-contact.mobile-only a.tel").attr("href", "tel:" + tel);
    $(".team-contact.mobile-only a.tel").html(tel);
  }

  $('.team-list .ag').click(function () {
    // Update image
    //$('.skw-page-5 .skw-page__half--right .skw-page__content').css("background", "url('img/2.jpg')").css("background-size", "cover");
    // Update contact buttons
    //$(".team-contact.mobile-only a.email").attr("href", "mailto:andrew.gibson@hedge-re.co");
    //$(".team-contact.mobile-only a.phone").attr("href", "tel:07866602381");
    var email = 'andrew.gibson@hedge-re.co';
    var emailLabel = 'Email me';
    $(".team-contact.mobile-only a.email").attr("href", "mailto:" + email);
    $(".team-contact.mobile-only a.email").html(emailLabel);
    var phone = '07866 602 381';
    $(".team-contact.mobile-only a.phone").attr("href", "tel:" + phone);
    $(".team-contact.mobile-only a.phone").html(phone);
    var tel = '02075 804 797';
    $(".team-contact.mobile-only a.tel").attr("href", "tel:" + tel);
    $(".team-contact.mobile-only a.tel").html(tel);
  });
  $('.team-list .bos').click(function () {
    // Update image
    //$('.skw-page-5 .skw-page__half--right .skw-page__content').css("background", "url('img/3.jpg')").css("background-size", "cover");
    // Update contact buttons
    //$(".team-contact.mobile-only a.email").attr("href", "mailto:ben.orchard-smith@hedge-re.co");
    //$(".team-contact.mobile-only a.phone").attr("href", "tel:07557988115");
    var email = 'ben.orchard-smith@hedge-re.co';
    var emailLabel = 'Email me';
    $(".team-contact.mobile-only a.email").attr("href", "mailto:" + email);
    $(".team-contact.mobile-only a.email").html(emailLabel);
    var phone = '07557 988 115';
    $(".team-contact.mobile-only a.phone").attr("href", "tel:" + phone);
    $(".team-contact.mobile-only a.phone").html(phone);
    var tel = '02075 804 797';
    $(".team-contact.mobile-only a.tel").attr("href", "tel:" + tel);
    $(".team-contact.mobile-only a.tel").html(tel);
  });
  $('.team-list .pg').click(function () {
    // Update image
    //$('.skw-page-5 .skw-page__half--right .skw-page__content').css("background", "url('img/1.jpg')").css("background-size", "cover");
    // Update contact buttons
    //$(".team-contact.mobile-only a.email").attr("href", "mailto:paul.gold@hedge-re.co");
    //$(".team-contact.mobile-only a.phone").attr("href", "tel:07779100875");
    var email = 'paul.gold@hedge-re.co';
    var emailLabel = 'Email me';
    $(".team-contact.mobile-only a.email").attr("href", "mailto:" + email);
    $(".team-contact.mobile-only a.email").html(emailLabel);
    var phone = '07779 100 875';
    $(".team-contact.mobile-only a.phone").attr("href", "tel:" + phone);
    $(".team-contact.mobile-only a.phone").html(phone);
    var tel = '02075 804 797';
    $(".team-contact.mobile-only a.tel").attr("href", "tel:" + tel);
    $(".team-contact.mobile-only a.tel").html(tel);
  });
  $('.team-list .tg').click(function () {
    // Update image
    //$('.skw-page-5 .skw-page__half--right .skw-page__content').css("background", "url('img/4.jpg')").css("background-size", "cover");
    // Update contact buttons
    //$(".team-contact.mobile-only a.email").attr("href", "mailto:tim.gee@hedge-re.co");
    //$(".team-contact.mobile-only a.phone").attr("href", "tel:#");
    var email = 'tim.gee@hedge-re.co';
    var emailLabel = 'Email me';
    $(".team-contact.mobile-only a.email").attr("href", "mailto:" + email);
    $(".team-contact.mobile-only a.email").html(emailLabel);
    var phone = '07975 999 446';
    $(".team-contact.mobile-only a.phone").attr("href", "tel:" + phone);
    $(".team-contact.mobile-only a.phone").html(phone);
    var tel = '02075 804 797';
    $(".team-contact.mobile-only a.tel").attr("href", "tel:" + tel);
    $(".team-contact.mobile-only a.tel").html(tel);
  });
  $(function () {
    $('.team-list li').click(function () {
      $(this).addClass('selected').siblings().removeClass('selected');
    });
  });
  /**
   * INITIALISE
   */
  // Generate the main navigation, ensuring pages are in order

  Object.keys(PAGE_KEYS).sort().forEach(function (num) {
    var key = PAGE_KEYS[num];
    var element = '' + '<li class="nav-btn skw-page-' + PAGES[key].page + '">' + '<span>' + PAGES[key].label + '</span>' + '</li>';
    $('#main-navigation').append(element);
  }); // Attach page classes to page content div's

  Object.keys(PAGE_IDS).forEach(function (id) {
    $('div#' + id).addClass('skw-page-' + PAGE_IDS[id]);
  });
  setTimeout(function () {
    // Set up click handlers for navigation
    PAGE_NUMS.forEach(function (num) {
      $("li.skw-page-" + num).on('click', function () {
        _setCurrentPage(num);
      });
    }); // Navigate to current page

    Object.keys(PAGE_IDS).forEach(function (id) {
      if (window.location.href.indexOf("#" + id) > -1) {
        _setCurrentPage(PAGE_IDS[id]);
      }
    }); // Default to home page

    if (curPage === null) {
      _setCurrentPage(PAGES.home.page);
    }
  }, 50); // Fade out logo if on mobile
  // setTimeout(function () {
  //     $('.hedge-logo')
  //         .removeClass('hedge-logo--fixed')
  //         .addClass('hedge-logo--fade-splash');
  // }, animTime + 200);
  // // Fade in logo if on mobile
  // setTimeout(function () {
  //     $('.hedge-logo')
  //         .removeClass('hedge-logo--fade-splash');
  // }, animTime + (400 * 2));
  // Allow page to scroll after splash page animation

  setTimeout(function () {
    disableScrolling = false;
  }, 4000); // Listen for changes on the history api

  window.onpopstate = history.onpushstate = function () {
    Object.keys(PAGE_IDS).forEach(function (id) {
      if (window.location.href.indexOf("#" + id) > -1) {
        _setCurrentPage(PAGE_IDS[id]);
      }
    });
  };
}); // Page loader

$(window).on('load', function () {
  $('#splash').delay(2000).fadeOut(2000); // Set cookie to only show the splash page once
  // var visited = localStorage.getItem('visited');
  // if (!visited) {
  //     localStorage.setItem('visited', true);
  //     document.getElementById("splash").style.visibility = "visible";
  //     document.getElementById("skw-pages").style.visibility = "visible";
  //     document.getElementById("nav-panel").style.visibility = "visible";
  // } else {
  //     document.getElementById("splash").style.visibility = "hidden";
  //     document.getElementById("skw-pages").style.visibility = "visible";
  //     document.getElementById("nav-panel").style.visibility = "visible";
  // }
});