import { FacetAccessor } from "."
import { TermsBucket, FilterBucket } from ".."
import {omitBy} from "lodash"
import {isUndefined} from "lodash"
import {reduce} from "lodash"
import {CardinalityMetric} from "../query"

export class MultiFieldFacetAccessor extends FacetAccessor {

  _getPath(key, path) {
    var getPath = path ? [key, ...path] : [key];
    return [this.uuid, ...this.fieldContext.getAggregationPath(), ...getPath, "buckets"];
  }

  getBuckets(path = []) {
    var getPath = this._getPath(this.key, path)
    return this.getAggregations(getPath, []);
  }

  buildOwnQuery(query) {
    if (!this.loadAggregations){
      return query
    } else {
      let excludedKey = (this.isOrOperator()) ? this.key : undefined
      return query.setAggs(
        FilterBucket(
          this.uuid,
          query.getFiltersWithoutKeys(excludedKey),
          ...this.fieldContext.wrapAggregations(
            this.buildAggregations(query),
            CardinalityMetric(this.key+"_count", this.key)
          )
        ))
    }
  }

  buildAggregations(query) {
    const options = [].concat(this.options.fields).reverse();
    return reduce(options, (result:object, field:string, i:number) => {
        return FilterBucket(
          field,
          TermsBucket(field, field, omitBy({
            size:this.size,
            order:this.getOrder(),
            include: this.options.include,
            exclude: this.options.exclude,
            min_doc_count:this.options.min_doc_count
          }, isUndefined), result
        ),
          CardinalityMetric(field+"_count", field)
        )
      }, {}
    )
  }
}
