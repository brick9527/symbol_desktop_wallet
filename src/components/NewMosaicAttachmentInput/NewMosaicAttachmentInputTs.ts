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
import {MosaicId, MosaicInfo} from 'nem2-sdk'
import {Component, Vue, Prop} from 'vue-property-decorator'
import {mapGetters} from 'vuex'

// child components
import {ValidationObserver} from 'vee-validate'
// @ts-ignore
import MosaicSelector from '@/components/MosaicSelector/MosaicSelector.vue'
// @ts-ignore
import AmountInput from '@/components/AmountInput/AmountInput.vue'
// @ts-ignore
import ButtonDelete from '@/components/ButtonDelete/ButtonDelete.vue'
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue'
import {MosaicsModel} from '@/core/database/entities/MosaicsModel'

@Component({
  components: {
    ValidationObserver,
    MosaicSelector,
    AmountInput,
    ButtonDelete,
    FormRow,
  },
  computed: {...mapGetters({
    networkMosaic: 'mosaic/networkMosaic',
    mosaicsInfo: 'mosaic/mosaicsInfoList',
    mosaicsNames: 'mosaic/mosaicsNames',
  })},
})
export class NewMosaicAttachmentInputTs extends Vue {

  @Prop({
    default: [],
  }) mosaics: MosaicsModel[]

  @Prop({
    default: true,
  }) isFirstRow: boolean

  @Prop() index: number

  /**
   * Form items
   * @var {any}
   */
  public formItems = {
    selectedMosaicHex: '',
    relativeAmount: 0,
  }

  /// region computed properties getter/setter
  get selectedMosaic(): string {
    return this.formItems.selectedMosaicHex
  }

  set selectedMosaic(hex: string) {
    this.formItems.selectedMosaicHex = hex
  }

  get relativeAmount(): number {
    return this.formItems.relativeAmount
  }

  set relativeAmount(amount: number) {
    this.formItems.relativeAmount = amount
  }
  /// end-region computed properties getter/setter

  public onChangeMosaic(hex: string) {
    this.$emit('update-data', {
      index: this.index,
      hex,
    })
    this.selectedMosaic = hex
  }

  public onClickDelete() {
    this.$emit('delete', this.index)
  }

  public updateAmount(amount: string) {    
    const mosaicAmount = Number(amount)
    this.relativeAmount = mosaicAmount
    this.$emit('update-data', {
      index: this.index,
      amount: mosaicAmount,
    })
  }
}
