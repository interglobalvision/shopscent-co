/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr, Shopify */

Site = {
  mobileThreshold: 601,
  debounceTimer: null,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    if ($('body').hasClass('template-index')) {
      _this.Index.init();
    }

    if ($('body').hasClass('template-product')) {
      _this.Product.init();
    }

    $('.js-tilt').tilt({
      reset: false,
    });

  },

  onResize: function() {
    var _this = this;

    if ($('#header').hasClass('index-header')) {
      // reset header offset top on resize
      _this.Index.getHeaderTop();
    }

    if ($('#product-gallery').length) {
      // debounce resize event for product gallery
      clearTimeout(_this.debounceTimer);

      _this.debounceTimer = setTimeout(function () {
        _this.Product.setGalleryDimensions();
        clearTimeout(_this.debounceTimer);
        _this.debounceTimer = null;
      }, 100);
    }
  },

  fixWidows: function() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  },


};

Site.Index = {
  init: function() {
    var _this = this;

    if (window.location.href.indexOf('#shop') != -1) {
      // url has #shop

      // remove #shop from url in address bar
      history.replaceState({}, document.title, '/');

      // scrollto shop after 300ms
      setTimeout(function(){
        _this.scrollToShop();
      }, 300);
    }

    if ($('#header').hasClass('index-header')) {
      // bind stickyheader and scrollto shop
      _this.bindSticky();
      _this.bindScroll();
    }

    // if youtube video in splash, detect autoplay
    // if mobile browser detected, remove youtube video
    if ($('#front-video').length) {
      detectAutoplay(2000, function() {
        $('#front-video').remove();
      });
    }
  },

  getHeaderTop: function() {
    var _this = this;

    _this.headerTop = $('#header').offset().top;
  },

  bindSticky: function() {
    var _this = this;

    _this.getHeaderTop();

    $(window).on('scroll', function() {
      var scrollPos = $(this).scrollTop();

      // stick header
      if (scrollPos >= _this.headerTop){
        $('#header').removeClass('index-header');
      }

      // unstick header
      if (scrollPos < _this.headerTop){
        $('#header').addClass('index-header');
      }
    });
  },

  bindScroll: function() {
    var _this = this;

    // Shop nav link clicked on index page
    $('.js-scroll-to-shop').on('click', function(event){
      event.preventDefault();

      _this.scrollToShop();

      // unfocus Shop nav link
      $(this).trigger('blur');
    });
  },

  scrollToShop: function() {
    var shopTop = $('#front-splash').height();

    $('body').stop().animate({scrollTop: shopTop}, '500', 'swing');
  },
};

Site.Product = {
  init: function() {
    var _this = this;

    if ($('#product-gallery').length) {
      $('#product-gallery').imagesLoaded( function() {
        _this.setGalleryDimensions();
      });
    }

    if ($('#product-select').length) {
      _this.productSelect();
    }

    if ($('#related-products').length) {
      _this.pickRelated();
    }
  },

  setGalleryDimensions: function() {
    var _this = this;
    var galleryWidth = 0;
    var windowWidth = $(window).width();

    // get total width of gallery items
    $('.product-gallery-item').each(function() {
      // using getBoundingClientRect because jQuery width() rounds values
      galleryWidth += $(this)[0].getBoundingClientRect().width;
    });

    $('#product-gallery-row').css('transition', 'none');

    //  set gallery width to width of gallery items
    $('#product-gallery-row').width(galleryWidth);

    if (galleryWidth > windowWidth) {
      // gallery is more than window width
      var galleryContainerWidth = galleryWidth + (galleryWidth - windowWidth);

      // set the gallery container width and horizontally center it
      $('#product-gallery')
        .width(galleryContainerWidth)
        .css('left', ((windowWidth / 2) - (galleryContainerWidth / 2)) + 'px');

      // horizontally center gallery in container
      $('#product-gallery-row').css('left', ((galleryContainerWidth / 2) - (galleryWidth / 2)) + 'px');

      // bind dragging
      _this.bindGalleryDrag();

    } else {
      // gallery is less than window width

      // center the gallery container. same width as gallery
      $('#product-gallery')
        .width(galleryWidth)
        .css('left', ((windowWidth / 2) - (galleryWidth / 2)) + 'px');

      // 0 the gallery position in its container
      $('#product-gallery-row').css({
        'left' : '0'
      });

      // unbind dragging
      _this.unbindGalleryDrag();
    }

  },

  bindGalleryDrag: function() {
    // bind the drag and change cursor to arrows
    $('#product-gallery-row').pep({
      axis: 'x',
      constrainTo: 'parent',
      place: false,
      useCSSTranslation: false
    }).css('cursor', 'ew-resize');
  },

  unbindGalleryDrag: function() {
    // unbind the drag and change cursor to default
    $.pep.unbind($('#product-gallery-row'));
    $('#product-gallery-row').css('cursor', 'default');
  },

  selectCallback: function(variant, selector) {
    if (variant && variant.available === true) {
      // variant exists. hide out-of-stock notice and enable button
      $('#product-add-holder').removeClass('out-of-stock');
      $('#add').removeAttr('disabled');
    }
    else {
      // variant doesn't exist. show out-of-stock notice and disable button
      $('#product-add-holder').addClass('out-of-stock');
      $('#add').attr('disabled', 'disabled');
    }
  },

  productSelect: function() {
    var _this = this;
    var productJson = JSON.parse($('#product-info').attr('data-product'));

    // replaces variant select with multiple variant selects.
    // handles select callback
    new Shopify.OptionSelectors("product-select", {
      product: productJson,
      onVariantSelected: _this.selectCallback
    });

    // add some extra padding-top to add-to-cart button
    // container when we have variant selects.
    $('#product-add-holder').addClass('padding-top-small');
  },

  pickRelated: function() {
    // keeps random 4 related products and removes others
    $('.related-products-item').pick(4);

    $('#related-products').removeClass('u-hidden');
  },
};

jQuery(document).ready(function () {
  'use strict';

  Site.init();

});
