import * as React from "react";
import * as moment from "moment";
import {
	SearchkitManager,
	SearchkitComponent,
	FacetAccessor,
	FastClick,
	SearchkitComponentProps,
	ReactComponentType,
	PureRender,
	renderComponent
} from "../../../../core"

import {defaults} from "lodash"
import {size} from "lodash"
import {map} from "lodash"

const displayFormat = 'DD MMM YYYY';
const searchkitFormat = "DD.MM.YYYY";

export class FilterItem extends React.Component<FilterItemProps, any> {

	render(){
		let props = this.props
		return (
			<div className={props.bemBlocks.option()
				.mix(props.bemBlocks.container("item"))
				.mix(`selected-filter--${props.filterId}`)()}>
				<div className={props.bemBlocks.option("name")}>{props.labelKey}: {props.labelValue}</div>
				<FastClick handler={props.removeFilter}>
					<div className={props.bemBlocks.option("remove-action")}>x</div>
				</FastClick>
			</div>
		)
	}
}

export interface FilterItemProps {
	key:string,
	bemBlocks?:any,
	filterId:string
	labelKey:string,
	labelValue:string,
	removeFilter:Function,
	translate:Function
}

export interface SelectedFiltersProps extends SearchkitComponentProps {
	itemComponent?:ReactComponentType<FilterItemProps>
}

export class SelectedFilters extends SearchkitComponent<SelectedFiltersProps, any> {

	static propTypes = defaults({
	}, SearchkitComponent.propTypes)

	static defaultProps = {
     itemComponent: FilterItem
   }

	constructor(props) {
		super(props)
		this.translate = this.translate.bind(this)
	}

	defineBEMBlocks() {
		var blockName = (this.props.mod || "sk-selected-filters")
		return {
			container: blockName,
			option:`${blockName}-option`
		}
	}

	getFilters():Array<any> {
		return this.getQuery().getSelectedFilters()
	}

	hasFilters():boolean {
		return size(this.getFilters()) > 0;
	}

	renderFilter(filter) {
    const filterValue = this.translateFilterValue(filter.value, filter.id);
		return renderComponent(this.props.itemComponent, {
			key:filter.name +'$$' + filterValue,
			bemBlocks:this.bemBlocks,
			filterId:filter.id,
			labelKey:this.translate(filter.name),
			labelValue:this.translate(filterValue),
			removeFilter:this.removeFilter.bind(this, filter),
			translate:this.translate
		})
	}

  translateFilterValue(filterValue, filterId){
    if (filterId == "range_due_at") {
      return this.formatDate(filterValue);
    } else {
      return filterValue;
    }
  };

  formatDate(dateString){
    const dateArray = dateString.split(" – ");
    return `${this.fromSearchkitToDisplayDate(dateArray[0])} - ${this.fromSearchkitToDisplayDate(dateArray[1])}`;
  };

  fromSearchkitToDisplayDate(dateString) {
    return moment(dateString, searchkitFormat).format(displayFormat);
  };

	removeFilter(filter) {
		filter.remove()
		this.searchkit.performSearch()
	}

  render() {
		if (!this.hasFilters()) {
			return null
		}
    return (
      <div className={this.bemBlocks.container()}>
				{map(this.getFilters(), this.renderFilter.bind(this))}
      </div>
    )
  }
}
