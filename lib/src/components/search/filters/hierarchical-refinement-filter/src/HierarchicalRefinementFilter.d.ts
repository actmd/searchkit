/// <reference types="lodash" />
/// <reference types="react" />
import { SearchkitComponent, NestedFacetAccessor, SearchkitComponentProps } from "../../../../../core";
export interface HierarchicalRefinementFilterProps extends SearchkitComponentProps {
    field: string;
    id: string;
    title: string;
    size?: number;
    orderKey?: string;
    orderDirection?: string;
    startLevel?: number;
    countFormatter?: (count: number) => number | string;
}
export declare class HierarchicalRefinementFilter extends SearchkitComponent<HierarchicalRefinementFilterProps, any> {
    accessor: NestedFacetAccessor;
    static defaultProps: {
        countFormatter: <T>(value?: T) => T;
    };
    static propTypes: any;
    defineBEMBlocks(): {
        container: string;
        option: string;
    };
    defineAccessor(): NestedFacetAccessor;
    addFilter(level: any, option: any): void;
    renderOption(level: any, option: any): JSX.Element;
    renderOptions(level: any): JSX.Element;
    render(): JSX.Element;
}
