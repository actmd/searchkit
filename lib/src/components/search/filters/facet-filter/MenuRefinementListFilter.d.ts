/// <reference types="react" />
import * as React from "react";
import { MenuFilter } from "./MenuFilter";
import { RefinementListFilter } from './RefinementListFilter';
import { MultiFieldFacetAccessor } from '../../../../core';
export declare class MenuRefinementListFilter extends MenuFilter {
    defineAccessor(): MultiFieldFacetAccessor;
    onSelect(value: any, childKey: any, childValue: any): void;
    getSelectedItemsInBucket(bucket: any, childKey: any): any[];
    getSelectedItems(): (string | number)[];
    render(): React.ReactElement<any>;
}
export declare class ChildRefinementListFilter extends RefinementListFilter {
    getItems(): Object[];
    toggleFilter(key: any): void;
    getSelectedItems(): any;
    renderShowMore(): JSX.Element;
    getMoreSizeOption(): {
        size: number;
        label: string;
    };
}
