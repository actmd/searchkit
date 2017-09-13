import { FacetAccessor } from ".";
export declare class MultiFieldFacetAccessor extends FacetAccessor {
    _getPath(key: any, path: any): any[];
    getBuckets(path?: any[]): any;
    buildOwnQuery(query: any): any;
    buildAggregations(query: any): object;
    buildSharedQuery(query: any): any;
}
