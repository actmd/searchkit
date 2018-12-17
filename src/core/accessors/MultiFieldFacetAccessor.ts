import { FacetAccessor } from "."
import {omitBy} from "lodash"
import {isUndefined} from "lodash"
import {reduce} from "lodash"
import {keys} from "lodash"
import {groupBy} from "lodash"
import {each} from "lodash"
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
            this.buildAggregations(query)
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

        const cardinality = CardinalityMetric(field+"_count", field),
        const stats = StatsMetric(field+"_stats", field+".integer")

        return {...terms, ...cardinality, ...stats}
      }, {}
    )
  }

  createNestedQuery(filters) {
    const filterTerms = map(filters, (filter)=> {
      const filterKeys = keys(filter);
      return {
        bool: {
          must: filterKeys.map((k) => {
            return TermQuery(k, filter[k])
          })
        }
      }
    });

    return this.fieldContext.wrapFilter({
      bool: {
        should: filterTerms
      }
    })
  }

  buildSharedQuery(query) {
    const filters = this.state.getValue()

    if(filters.length > 0) {

      const groupedFilters = groupBy(filters, (f) => f[this.key]),
      filterTerms = {
        bool: {
          must: map(groupedFilters, this.createNestedQuery.bind(this))
        }
      }

      const selectedFilters:Array<SelectedFilter> = map(filters, (filter)=> {
        return {
          name:this.options.title || this.translate(this.key),
          value:this.translate(filter),
          id:this.options.id,
          remove:()=> this.state = this.state.remove(filter)
        }
      })

      query = query.addFilter(this.uuid, filterTerms)
        .addSelectedFilters(selectedFilters)
    }

    return query
  }
}
