

function commenterDirective($timeout, githubService) {
  return {
    restrict:'E',
    templateUrl: 'views/annotator.html',
    link: function(scope, elm, attr) {
      var action, timeout;
      scope.toggled = scope.$eval(attr.toggle) || false;
      scope.btnText = 'Annotation';

      scope.toggle = function() {
        scope.toggled = !scope.toggled;
        scope.btnText = (scope.toggled) ? 'Annotation' : 'Abbrechen';
        scope.child = {};
      };

      attr.$observe('action', function(value) {
        action = scope.$eval(value);
      });

      scope.action = function(val) {
        action(val);
        scope.toggle();
      };
/**
      scope.$watch('child.name', function(newUserName) {
        if(newUserName) {
          if(timeout) $timeout.cancel(timeout);
          timeout = $timeout(function() {
            githubService.fetchUsers(newUserName)
              .success(function(res) {
                scope.items = res.data['items'] || [];
              });
          }, 300)
        }
      });
      **/
    }
  };
}
