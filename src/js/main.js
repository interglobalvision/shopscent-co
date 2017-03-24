/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr, Shopify */

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
      }, 1000);
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

    $.each($('.product-gallery-item'), function() {
      galleryWidth += $(this).width();
    });

    $('#product-gallery-row').width(galleryWidth + 1);

    if (galleryWidth > windowWidth) {
      var galleryContainerWidth = galleryWidth + (galleryWidth - windowWidth);

      $('#product-gallery')
        .width(galleryContainerWidth - 1)
        .css('left', ((windowWidth / 2) - (galleryContainerWidth / 2)) + 'px');

      $('#product-gallery-row').css('left', ((galleryContainerWidth / 2) - (galleryWidth / 2)) + 'px');

      _this.bindGalleryDrag();

    } else {

      $('#product-gallery')
        .width(galleryWidth)
        .css('left', ((windowWidth / 2) - (galleryWidth / 2)) + 'px');

      $('#product-gallery-row').css({
        'left' : '0'
      });

      _this.unbindGalleryDrag();
    }

  },

  bindGalleryDrag: function() {
    $('#product-gallery-row').pep({
      axis: 'x',
      constrainTo: 'parent',
      place: false,
      useCSSTranslation: false
    }).css('cursor', 'ew-resize');

  },

  unbindGalleryDrag: function() {
    $.pep.unbind($('#product-gallery-row'));
    $('#product-gallery-row').css('cursor', 'default');
  },

  selectCallback: function(variant, selector) {
    if (variant && variant.available === true) {
      $('#product-add-holder').removeClass('out-of-stock');
      $('#add').removeAttr('disabled');
    }
    else {
      // variant doesn't exist
      $('#product-add-holder').addClass('out-of-stock')
      $('#add').attr('disabled', 'disabled');
    }
  },

  productSelect: function() {
    var _this = this;
    var productJson = JSON.parse($('#product-info').attr('data-product'));

    new Shopify.OptionSelectors("product-select", {
      product: productJson,
      onVariantSelected: _this.selectCallback
    });

    $('#product-add-holder').addClass('padding-top-small');
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
