/// <reference types="react" />
import * as React from "react";
import { SearchkitManager } from "../SearchkitManager";
import { ImmutableQuery } from "../query";
import { Accessor } from "../accessors/Accessor";
export interface SearchkitComponentProps {
    mod?: string;
    className?: string;
    translations?: Object;
    searchkit?: SearchkitManager;
    key?: string;
}
export declare class SearchkitComponent<P extends SearchkitComponentProps, S> extends React.Component<P, S> {
    searchkit: SearchkitManager;
    accessor: Accessor;
    stateListenerUnsubscribe: Function;
    translations: Object;
    unmounted: boolean;
    static contextTypes: React.ValidationMap<any>;
    static translationsPropType: (translations: any) => any;
    static propTypes: any;
    constructor(props?: any);
    defineBEMBlocks(): any;
    defineAccessor(): Accessor;
    translate(key: any, interpolations?: any): any;
    readonly bemBlocks: any;
    _getSearchkit(): any;
    componentWillMount(): void;
    componentWillUnmount(): void;
    getResults(): any;
    getHits(): any[];
    getHitsCount(): number;
    hasHits(): boolean;
    hasHitsChanged(): boolean;
    getQuery(): ImmutableQuery;
    isInitialLoading(): boolean;
    isLoading(): boolean;
    getError(): any;
}
