import * as React from "react"
import { filter } from "lodash"
import { get } from "lodash"
import { MenuFilter } from "./MenuFilter";
import { RefinementListFilter } from './RefinementListFilter';
import { MultiFieldFacetAccessor, FastClick, renderComponent, FacetAccessor } from '../../../../core';

export class MenuRefinementListFilter extends MenuFilter {
  defineAccessor() {
    return new MultiFieldFacetAccessor(this.props.id, {
      ...this.props,
      ...this.getAccessorOptions()
    });
  }

  onSelect(value, childKey, childValue) {
    this.accessor.state = this.accessor.state.toggle({
      [this.props.id]: value,
      [childKey]: childValue
    })
    this.searchkit.performSearch()
  }

  getSelectedItemsInBucket(bucket, childKey) {
    const selectedItems = this.accessor.state.getValue(),
    bucketItems = filter(selectedItems, (item) => {
      return get(item,[this.props.id]) == bucket
    });

    return bucketItems ? bucketItems.map((i)=> i[childKey]) : [];
  }

  getSelectedItems(){
    return this.accessor.state.getValue()
  }

  render() {
    const { listComponent, containerComponent, showCount, title, id, countFormatter } = this.props
    return renderComponent(containerComponent, {
      title,
      className: id ? `filter--${id}` : undefined,
      disabled: false // !this.hasOptions()
    }, [
      renderComponent(listComponent, {
        key:"listComponent",
        items: this.getItems(),
        itemComponent:this.props.itemComponent,
        selectedItems: this.getSelectedItems(),
        toggleItem: this.toggleFilter.bind(this),
        setItems: this.setFilters.bind(this),
        docCount: this.accessor.getDocCount(),
        showCount,
        translate:this.translate,
        countFormatter,
        onSelect: this.onSelect.bind(this),
        getSelectedItems: this.getSelectedItemsInBucket.bind(this)
      }),
      this.renderShowMore()
    ]);
  }
}

export class ChildRefinementListFilter extends RefinementListFilter {

  getItems() {
    return this.props.items;
  }

  toggleFilter(key) {
    this.props.onSelect(this.props.title, this.props.id, key);
  }

  getSelectedItems() {
    return this.props.getSelectedItems(this.props.title, this.props.id);
  }

  renderShowMore() {
    const option = this.getMoreSizeOption()

    if (!option || !this.props.showMore) {
      return null;
    }

    return (
      <FastClick handler={() => this.toggleViewMoreOption(option)} key="showMore">
        <div data-qa="show-more" className={this.bemBlocks.container("view-more-action")}>
          {this.translate(option.label)}
        </div>
      </FastClick>
    )
  }

  getMoreSizeOption() {
    let option = {size:0, label:""}
    const total = this.props.total,
      accessor = this.accessor;
    if (total <= accessor.defaultSize) return null;

    const size = this.getItems() ? this.getItems().length : 0;
    if (total <= size) {
      option = {size: accessor.defaultSize, label: accessor.translate("facets.view_less")}
    } else if (total > size ) {
      option = {size:total, label: accessor.translate("facets.view_all")}
    } else if (total) {
      option = null
    }

    return option;
  }
}
