import MenuFilter from './MenuFIlter';

class MenuRefinementListFilter extends MenuFilter {
  defineAccessor() {
    return new SubFacetAccessor(this.props.id, {
      ...this.props,
      ...this.getAccessorOptions()
    });
  }
}

export default MenuRefinementListFilter
