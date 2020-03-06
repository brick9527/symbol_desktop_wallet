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
import {
  Mosaic,
} from 'nem2-sdk'
import {IMosaicAttachmentCore} from '@/views/forms/FormTransferTransaction/FormTransferTransactionTs'

// @ts-ignore
import NewMosaicAttachmentInput from '@/components/NewMosaicAttachmentInput/NewMosaicAttachmentInput.vue'

type IUpdateData = {
  index: number
  hex?: string
  amount?: number
}

type IMosaicList = {
  hex: string
  amount: number
}

type IFinalData = {
  amount: number
}

type IFinalDataRecord = Record<string, IFinalData>

@Component({
  components: {
    NewMosaicAttachmentInput,
  },
})
export class MosaicAttachmentGroupTs extends Vue {
  @Prop() mosaics: Mosaic[]


  rowList: IMosaicAttachmentCore[] = [
    {mosaicHex: '', amount: 0},
  ]

  /**
   * Hook called when the child component MosaicAttachmentDisplay triggers
   * the event 'delete'
   * @return {void}
   */
  public onDeleteMosaic(id: number) {
    this.rowList.splice(id, 1)
    this.$emit('update-data', this.finalData)
  }

  public addRow() {
    this.rowList.push({mosaicHex: '', amount: 0})
  }

  /**
   * Hook called when the child component NewMosaicAttachmentInput triggers
   * the event 'delete'
   * @param {IUpdateData} data 
   */
  public onUpdateDate(data: IUpdateData) {
    const { index, hex, amount } = data
    this.rowList[index].mosaicHex = hex ? hex : this.rowList[index].mosaicHex
    this.rowList[index].amount = amount || amount === 0 ? amount : this.rowList[index].amount    
    this.$emit('update-data', this.finalData)
    
  }

  get finalData() {
    const finalRow: IFinalDataRecord = {}
    this.rowList.map((item: IMosaicAttachmentCore) => {
      if (Object.keys(finalRow).includes(item.mosaicHex)) {
        finalRow[item.mosaicHex].amount += item.amount
      } else {
        finalRow[item.mosaicHex] = {
          amount: item.amount,
        }
      }
    })

    const mosaicAttachment: IMosaicAttachmentCore[] = []
    for (const key in finalRow) {
      mosaicAttachment.push({
        mosaicHex: key,
        amount: finalRow[key].amount,
      })
    }
    return mosaicAttachment
  }
}
