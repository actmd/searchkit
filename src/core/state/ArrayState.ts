import {State} from "./State"
import {indexOf} from "lodash"
import {without} from "lodash"
import {find} from "lodash"
import {isEqual} from "lodash"
import {isObject} from "lodash"

export class ArrayState extends State<Array<string|number>> {
  getValue() {
    return this.value || []
  }
  toggle(val) {
    const resolvedValue = this.resolveValue(this.value, val);
    if (this.contains(resolvedValue)) {
      return this.remove(resolvedValue)
    } else {
      return this.add(resolvedValue)
    }
  }
  clear(){
    return this.create([])
  }
  remove(val) {
    return this.create(without(this.getValue(), val))
  }
  add(val) {
    return this.create(this.getValue().concat(val))
  }
  resolveValue(currentState, val) {
    if (isObject(val)) {
      const resolvedVal = find(currentState, (item) => isEqual(item, val))
      return resolvedVal || val;
    }
    return val;
  }
  contains(val) {
    return indexOf(this.value, val) !== -1
  }
}
