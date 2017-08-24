/// <reference types="react" />
import { MenuFilter } from "./MenuFilter";
import { RefinementListFilter } from './RefinementListFilter';
import { MultiFieldFacetAccessor } from '../../../../core';
export declare class MenuRefinementListFilter extends MenuFilter {
    defineAccessor(): MultiFieldFacetAccessor;
}
export declare class ChildRefinementListFilter extends RefinementListFilter {
    getItems(): Object[];
    renderShowMore(): JSX.Element;
    getMoreSizeOption(): {
        size: number;
        label: string;
    };
}
