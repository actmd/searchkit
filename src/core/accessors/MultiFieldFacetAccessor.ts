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
        const accessor = this.searchkit.accessors.statefulAccessors[field];

        const terms = TermsBucket(field, field, omitBy({
            size: accessor.size,
            order: accessor.getOrder(),
            include: accessor.options.include,
            exclude: accessor.options.exclude,
            min_doc_count:accessor.options.min_doc_count
          }, isUndefined), result
        );
        if (field == this.key) {
          return terms;
        }
        return [
          terms,
          CardinalityMetric(field+"_count", field)
        ]
      }, {}
    )
  }
}
