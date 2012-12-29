// data_envelope = {id:"123", checks:{}, contents:{}}

(function($) {
  storageunit = {};
  storageunit.store = function (data_envelope, degree) {
    var previousitem;
    // if local storage is up, first merge with that.
    if (degree >= 1 && typeof(Storage) !== "undefined") {
      if (data_envelope.id) {
        localStorage.setItem(data_envelope.id, {checks:data_envelope.checks, contents:data_envelope.contents});
      }
      else {
        
      }
    }
    if (degree >= 2 && typeof(Storage) !== "undefined") {
      
    }

  };
  storageunit.retrieve = function () {};
})(jQuery);
