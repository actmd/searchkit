import * as React from "react";

import { MenuFilter } from "./MenuFilter";
import { RefinementListFilter } from './RefinementListFilter';
import { MultiFieldFacetAccessor, FastClick } from '../../../../core';

export class MenuRefinementListFilter extends MenuFilter {
  defineAccessor() {
    return new MultiFieldFacetAccessor(this.props.id, {
      ...this.props,
      ...this.getAccessorOptions()
    });
  }
}

export class ChildRefinementListFilter extends RefinementListFilter {
  getItems() {
    return this.props.items;
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
