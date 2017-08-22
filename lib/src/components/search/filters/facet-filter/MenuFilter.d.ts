/// <reference types="lodash" />
import { ItemList, Panel, CheckboxItemList } from '../../../ui';
import { FacetFilter } from "./FacetFilter";
import { FacetFilterProps } from "./FacetFilterProps";
export declare class MenuFilter extends FacetFilter<FacetFilterProps> {
    static propTypes: any;
    static defaultProps: {
        listComponent: typeof CheckboxItemList;
        containerComponent: typeof Panel;
        size: number;
        collapsable: boolean;
        showCount: boolean;
        showMore: boolean;
        bucketsTransform: <T>(value?: T) => T;
    } & {
        listComponent: typeof ItemList;
        operator: string;
    };
    toggleFilter(option: any): void;
    setFilters(options: any): void;
    getSelectedItems(): (string | number)[];
    getItems(): {
        key: string;
        label: string;
        doc_count: any;
    }[];
}
