app.directive('formControl', function() {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {

      // Add class filled to form-control's that have a value
      
      scope.$watch(attrs.ngModel, function (v) {
        input = angular.element(element);
          if (v!="" && typeof(v)!="undefined"){
            input.parent().addClass('filled');
          }else{
            input.parent().removeClass('filled');
          }
      });
      
      if(element.val()){
        element.parent().addClass('filled');
      }

      element.bind('blur', function (e) {
        input = angular.element(e.currentTarget);
        if(input.val()){
          input.parent().addClass('filled');
        } else {
          input.parent().removeClass('filled');
        }
        input.parent().removeClass('active');
      }).bind('focus', function (e) {
        input = angular.element(e.currentTarget);
        input.parent().addClass('active');
      });

    }
  };
});
