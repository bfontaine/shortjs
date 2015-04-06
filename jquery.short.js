/**! jquery.short.js */
// include this script after short.js
(function($) {

  /**
   * Usage:
   *   $(".foo").short()
   *
   * Call `short` on each element's text and replace it.
   **/
  $.fn.short = function() {
    var $this = $(this);
    $this.text(short($this.text()));
    return $this;
  };

})(jQuery);
