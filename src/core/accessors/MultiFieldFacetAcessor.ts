import { FacetAccessor } from "."
import { TermsBucket, FilterBucket } from ".."
import {omitBy} from "lodash"
import {isUndefined} from "lodash"
import {get} from "lodash"
import {reduce} from "lodash"

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
            this.buildAggregations(query)
          )
        ))
    }
  }

  buildAggregations(query) {
    return reduce(this.options.fields.reverse(), (result:object, field:string, i:number) => {
        return TermsBucket(field, field, omitBy({
            size:this.size,
            order:this.getOrder(),
            include: this.options.include,
            exclude: this.options.exclude,
            min_doc_count:this.options.min_doc_count
          }, isUndefined), result
        )
      }, {}
    )
  }
}
