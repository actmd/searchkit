/// <reference types="react" />
import * as React from "react";
import { Panel, RangeSlider } from "../../../../../src";
export declare class MockRange extends React.Component<any, any> {
    constructor(props: any);
    static defaultProps: {
        rangeComponent: typeof RangeSlider;
        containerComponent: typeof Panel;
    };
    static propTypes: {
        containerComponent: any;
        rangeComponent: any;
    };
    render(): React.ReactElement<any>;
}
