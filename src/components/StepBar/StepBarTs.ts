/**
 * Copyright 2020 NEM Foundation (https://nem.io)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export class StepBarTs extends Vue {

  /**
   * Is show child nodes.
   */
  @Prop({
    default: false,
  })
  isShowChildNode: boolean

  /**
   * Step node list.
   */
  @Prop()
  stepList: any

  @Prop({
    default: 0,
  })
  currentStep: number

  public defaultStepList = [
    {
      index: 1,
      text: '创建助记词',
      isChild: false,
    },
    {
      index: 0,
      text: '备份助记词',
      isChild: true,
    },
    {
      index: 0,
      text: '验证备份',
      isChild: true,
    },
    {
      index: 2,
      text: '设置账户',
      isChild: false,
    },
    {
      index: 3,
      text: '导入钱包',
      isChild: false,
    },
  ]

  /**
   * get final step list.
   */
  get finalStepList() {
    if (this.stepList && this.stepList.length > 0) {
      return this.stepList
    }
    return this.defaultStepList
  }
}