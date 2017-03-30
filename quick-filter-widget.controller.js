/* @flow */
import {
  extend
} from 'lodash';
// types
import D from '../../api/dropdown-service';
import type {
  Organisation
} from '../../declarations/scf-types';

class QuickFilterWidgetController {
  static $inject: Array<string>;
  $scope: any;
  DropdownService: D;
  openFilter: boolean;
  buyers: Array<Organisation>;
  suppliers: Array<Organisation>;

  filters: {
    supplierId?: string;
    buyerId?: string;
  };
  filterConfig: {
    supplier: Object;
    buyer: Object;
  };

  constructor(DropdownService: D, $scope: any) {
    extend(this, {
      $scope,
      DropdownService
    });
    this.fetchSuppliers();
    this.fetchBuyers();
    this.filters = {};
    this.openFilter = false;
    this.filterConfig = {
      supplier: {
        maxItems: 1,
        valueField: 'id',
        labelField: 'name',
        sortField: 'name',
        searchField: ['id', 'name', 'code'],
        hideSelected: true,
        closeAfterSelect: true
      },
      buyer: {
        maxItems: 1,
        valueField: 'id',
        labelField: 'name',
        sortField: 'name',
        searchField: ['id', 'name', 'code'],
        hideSelected: true,
        closeAfterSelect: true
      }
    };
  }

  fetchSuppliers(): Promise<Array<Organisation>> {
    return this.DropdownService.fetchSuppliers()
      .then(response => this.suppliers = response);
  }

  fetchBuyers(): Promise<Array<Organisation>> {
    return this.DropdownService.fetchBuyers()
      .then(response => this.buyers = response);
  }
}

QuickFilterWidgetController.$inject = [
  'DropdownService',
  '$scope'
];

export default QuickFilterWidgetController;
