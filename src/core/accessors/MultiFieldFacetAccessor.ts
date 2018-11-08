import { FacetAccessor } from "."
const omitBy = require("lodash/omitBy")
const isUndefined = require("lodash/isUndefined")
const reduce = require("lodash/reduce")
const keys = require("lodash/keys")
const groupBy = require("lodash/groupBy")
const each = require("lodash/each")
import {
  TermQuery, TermsBucket, CardinalityMetric,
  SelectedFilter, FilterBucket, BoolMust
} from "../query";
const map = require("lodash/map")

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
            this.buildAggregations(),
            CardinalityMetric(this.key+"_count", this.key)
          )
        ))
    }
  }

  buildAggregations() {
    const options = [].concat(this.options.fields).reverse();
    return reduce(options, (result:object, field:string) => {
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
