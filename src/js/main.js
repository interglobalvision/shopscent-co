/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr */

Site = {
  mobileThreshold: 601,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    if ($('body').hasClass('template-product')) {
      _this.Product.init();
    }

  },

  onResize: function() {
    var _this = this;

    if ($('#product-gallery').length) {

      // debounce gallery
      setTimeout(function() {
        _this.Product.setGalleryDimensions();
        _this.Product.bindGalleryDrag();
      }, 500);
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

Site.Product = {
  init: function() {
    var _this = this;

    if ($('#product-gallery').length) {
      _this.setGalleryDimensions();
    }

    if ($('#related-products').length) {
      _this.pickRelated();
    }
  },

  setGalleryDimensions: function() {
    var _this = this;
    var galleryWidth = 0;
    var windowWidth = $(window).width();

    $('.product-gallery-item').each(function() {
      galleryWidth += $(this).width();
    });

    $('#product-gallery-row').width(galleryWidth);

    if (galleryWidth > windowWidth) {
      var galleryContainerWidth = galleryWidth + (galleryWidth - windowWidth);

      $('#product-gallery')
        .width(galleryContainerWidth)
        .css('left', ((windowWidth / 2) - (galleryContainerWidth / 2)) + 'px');

      $('#product-gallery-row').css('transform', 'translateX(' + ((galleryContainerWidth / 2) - (galleryWidth / 2)) + 'px)');

      _this.bindGalleryDrag();

    } else {

      $('#product-gallery')
        .width(galleryWidth)
        .css('left', ((windowWidth / 2) - (galleryWidth / 2)) + 'px');

      $('#product-gallery-row').css({
        'transform': 'translateX(0)',
        'left' : '0'
      });
    }

  },

  bindGalleryDrag: function() {
    var _this = this;
    var galleryWidth = $('#product-gallery-row').width();
    var windowWidth = $(window).width();

    if (galleryWidth > windowWidth) {
      $('#product-gallery-row').pep({
        axis: 'x',
        constrainTo: 'parent',
        place: false
      }).css('cursor', 'ew-resize');
    } else {
      $.pep.unbind($('#product-gallery-row'));
      $('#product-gallery-row').css('cursor', 'default');
    }
  },

  pickRelated: function() {
    $('.related-products-item').pick(4);

    $('#related-products').removeClass('u-hidden');
  },
};

jQuery(document).ready(function () {
  'use strict';

  Site.init();

});
