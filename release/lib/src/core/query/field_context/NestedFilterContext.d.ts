import { FieldContext } from './FieldContext';
export declare class NestedFilterContext extends FieldContext {
    wrapAggregations(...aggregations: any[]): {
        [x: number]: any;
    }[];
    getAggregationPath(): string[];
    wrapFilter(filter: any): {
        nested: {
            path: any;
            query: any;
        } & {};
    };
}
