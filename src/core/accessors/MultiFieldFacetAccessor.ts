import { FacetAccessor } from "."
import {omitBy} from "lodash"
import {isUndefined} from "lodash"
import {reduce} from "lodash"
import {keys} from "lodash"
import {values} from "lodash"
import {
  TermQuery, TermsBucket, CardinalityMetric,
  SelectedFilter, FilterBucket, BoolMust
} from "../query";
import {map} from "lodash"

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
        const cardinality = CardinalityMetric(field+"_count", field)
        return {...terms, ...cardinality}
      }, {}
    )
  }

  buildSharedQuery(query) {
    var filters = this.state.getValue()

    if(filters.length > 0){

      var filterTerms = map(filters, (filter)=> {
        const filterKeys = keys(filter),
        _filterTerms = filterKeys.map((k) => {
            return TermQuery(k, filter[k])
          });

        return this.fieldContext.wrapFilter({
          bool: {
            filter: _filterTerms
          }
        })
      })

      query = query.addFilter(this.uuid, filterTerms)
    }

    return query
  }
}
