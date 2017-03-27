/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr, Shopify, detectAutoplay */

Site = {
  mobileThreshold: 601,
  debounceTimer: null,
  isIndex: $('.index-content').length,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    if (_this.isIndex) {
      _this.Index.init();
    }

    if ($('body').hasClass('template-product')) {
      _this.Product.init();
    }

    if ($('#doodle').length) {
      _this.Doodle.init();
    }

    $('.js-tilt').tilt({
      reset: false,
    });

  },

  onResize: function() {
    var _this = this;

    if (_this.isIndex) {
      // reset header offset top and sticky state on resize
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

    if (window.location.href.indexOf('#shop') !== -1) {
      // url has #shop

      // remove #shop from url in address bar
      history.replaceState({}, document.title, '/');

      // scrollto shop after 300ms
      setTimeout(function(){
        _this.scrollToShop();
      }, 300);
    }

    if ($('.index-header').length) {
      // bind stickyheader and scrollto shop
      _this.getHeaderTop();
      _this.bindScroll();
      _this.bindShopClick();
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

    _this.headerTop = $(window).innerHeight() - $('#header').outerHeight();

    _this.setSticky();
  },

  bindScroll: function() {
    var _this = this;

    $(window).on('scroll', function() {
      _this.setSticky();
    });
  },

  setSticky: function() {
    var _this = this;
    var scrollPos = $(window).scrollTop();

    // stick header
    if (scrollPos >= _this.headerTop){
      $('#header').removeClass('index-header');
    }
    // unstick header
    if (scrollPos < _this.headerTop){
      $('#header').addClass('index-header');
    }
  },

  bindShopClick: function() {
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
  $gallery: $('#product-gallery'),
  $galleryRow: $('#product-gallery-row'),
  init: function() {
    var _this = this;

    if (_this.$gallery.length) {
      _this.$gallery.imagesLoaded( function() {
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

    _this.$galleryRow.css('transition', 'none');

    //  set gallery width to width of gallery items
    _this.$galleryRow.width(galleryWidth);

    if (galleryWidth > windowWidth) {
      // gallery is more than window width
      var galleryContainerWidth = galleryWidth + (galleryWidth - windowWidth);

      // set the gallery container width and horizontally center it
      _this.$gallery
        .width(galleryContainerWidth)
        .css('left', ((windowWidth / 2) - (galleryContainerWidth / 2)) + 'px');

      // horizontally center gallery in container
      _this.$galleryRow.css('left', ((galleryContainerWidth / 2) - (galleryWidth / 2)) + 'px');

      // bind dragging
      _this.bindGalleryDrag();

    } else {
      // gallery is less than window width

      // center the gallery container. same width as gallery
      _this.$gallery
        .width(galleryWidth)
        .css('left', ((windowWidth / 2) - (galleryWidth / 2)) + 'px');

      // 0 the gallery position in its container
      _this.$galleryRow.css({
        'left' : '0'
      });

      // unbind dragging
      _this.unbindGalleryDrag();
    }

  },

  bindGalleryDrag: function() {
    var _this = this;

    // bind the drag and change cursor to arrows
    _this.$galleryRow.pep({
      axis: 'x',
      constrainTo: 'parent',
      place: false,
      useCSSTranslation: false
    }).css('cursor', 'ew-resize');
  },

  unbindGalleryDrag: function() {
    var _this = this;

    // unbind the drag and change cursor to default
    $.pep.unbind(_this.$galleryRow);
    _this.$galleryRow.css('cursor', 'default');
  },

  selectCallback: function(variant) {
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

Site.Doodle = {
  init: function() {
    var _this = this;
    var keyframeSupport = $.keyframe.isSupported();

    // stretch doodle to fit viewport
    $('#doodle svg')[0].setAttribute('preserveAspectRatio', 'none');

    if (keyframeSupport) {
      // CSS keyframes supported unprefixed

      var time = 0;
      _this.keyframe = 1;

      // run drawPath animation on each path or polyline elem
      $('#doodle svg path, #doodle svg polyline').each(function() {
        var elem = this;

        setTimeout(function() {
          _this.drawPath($(elem));
        }, time);

        time += 1000;
      });
    }
  },

  getPathLength: function(el){
    var pathCoords = el.get(0);
    var pathLength = pathCoords.getTotalLength();
    return pathLength;
  },

  drawPath: function(el) {
    var _this = this;
    var pathLength = _this.getPathLength(el);

    $.keyframe.define([{
      name: 'keyframe-' + _this.keyframe,
      '0%':   {'stroke-dashoffset':pathLength},
      '50%':  {'stroke-dashoffset':0},
      '100%': {'stroke-dashoffset':pathLength}
    }]);

    el.css({
      'stroke-dasharray': pathLength,
      'opacity': 1
    }).playKeyframe({
      name: 'keyframe-' + _this.keyframe,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      duration: '10s'
    });

    _this.keyframe++;
  },
}

jQuery(document).ready(function () {
  'use strict';

  Site.init();

});
