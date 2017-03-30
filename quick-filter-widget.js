/* @flow */
import controller from './quick-filter-widget.controller';
import tplDashboardFilter from './elements/dashboard-filter.html!text';

const COMPONENT_PATH = '/app/components/quick-filter-widget';

let quickFilterWidgetModule = angular.module('quickFilterWidget', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('dashboard-filter.html', tplDashboardFilter);
  }])
  .directive('quickFilterPopover', ['$templateCache', '$compile', function ($templateCache, $compile): Object {
    return {
      restrict: 'A',
      controller,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      link: function (scope, element, attrs) {
        let templateHtml = $templateCache.get(attrs.template);
        let popOverContent = $compile(templateHtml)(scope);
        let options = {
          content: popOverContent,
          placement: attrs.placement,
          html: true
        };

        $(element).popover(options);
      }
    };
  }])
  .directive('quickFilterButton', function (): Object {
    return {
      restrict: 'E',
      templateUrl: `${COMPONENT_PATH}/quick-filter-button.html`,
      controller,
      controllerAs: 'vm',
      bindToController: true,
      scope: {}
    };
  });

export default quickFilterWidgetModule;
