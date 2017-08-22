import MenuFilter from './MenuFilter';
import RefinementListFilter from './RefinementListFilter';
import MultiFieldFacetAccessor from '../../../core/accessors/MultiFieldFacetAccessor';

class MenuRefinementListFilter extends MenuFilter {
  defineAccessor() {
    return new MultiFieldFacetAccessor(this.props.id, {
      ...this.props,
      ...this.getAccessorOptions()
    });
  }
}

export class ChildRefinementListFilter extends RefinementListFilter {

  defineAccessor() {}

  getItems() {
    return this.props.items;
  }
}

export default MenuRefinementListFilter;


