import * as React from "react";

import { MenuFilter } from "./MenuFilter"
import { MultiFieldFacetAccessor } from '../../../../core';

export class MenuRefinementListFilter extends MenuFilter {
  defineAccessor() {
    return new MultiFieldFacetAccessor(this.props.id, {
      ...this.props,
      ...this.getAccessorOptions()
    });
  }
}
