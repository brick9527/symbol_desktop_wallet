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

// @ts-ignore
import NewMosaicAttachmentInput from '@/components/NewMosaicAttachmentInput/NewMosaicAttachmentInput.vue'

type IUpdateData = {
  index: number
  hex?: string
  amount?: number
}

type IMosaicList = {
  // id: number
  hex: string
  amount: number
}

@Component({
  components: {
    NewMosaicAttachmentInput,
  },
})
export class MosaicAttachmentGroupTs extends Vue {
  @Prop() mosaics: Mosaic[]


  rowList: IMosaicList[] = [
    {hex: '', amount: 0},
  ]

  /**
   * Hook called when the child component MosaicAttachmentDisplay triggers
   * the event 'delete'
   * @return {void}
   */
  public onDeleteMosaic(id: number) {
    
    this.rowList.splice(id, 1)
    // const updatedAttachedMosaics = [...this.formItems.attachedMosaics]
    //   .filter(({mosaicHex}) => mosaicHex !== id.toHex())

    // // fixes reactivity on attachedMosaics (observer resolution)
    // Vue.set(this.formItems, 'attachedMosaics', updatedAttachedMosaics)
  }

  public addRow() {
    this.rowList.push({hex: '', amount: 0})
  }

  // public updateDate(data: IUpdateData) {}
  updateDate() {
    console.log('update')
    
  }
}
