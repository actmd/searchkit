import {FieldContext} from './FieldContext';
import {NestedBucket, NestedQuery} from "../query_dsl"
import {FilterBucket} from '..';

export class NestedFilterContext extends FieldContext {

  wrapAggregations(...aggregations){
    return [NestedBucket(
      "inner",
      this.fieldOptions.options.path,
      FilterBucket(
        "inner",
        this.fieldOptions.options,
        ...aggregations
      )
    )]
  }

  getAggregationPath() {
    return ["inner", "inner"]
  }

  wrapFilter(filter) {
      return NestedQuery(
        this.fieldOptions.options.path,
        filter,
        this.fieldOptions.options
      )
  }
}
