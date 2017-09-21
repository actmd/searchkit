/// <reference types="react" />
import { State } from "./State";
export declare class ArrayState extends State<Array<string | number>> {
    getValue(): React.Key[];
    toggle(val: any): any;
    clear(): any;
    remove(val: any): any;
    add(val: any): any;
    resolveValue(currentState: any, val: any): any;
    contains(val: any): boolean;
}
