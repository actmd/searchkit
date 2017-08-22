/// <reference types="es6-promise" />
import { ESTransport } from "./ESTransport";
export declare class MockESTransport extends ESTransport {
    search(query: any): Promise<any>;
}
