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
import { MosaicId, MosaicInfo } from 'symbol-sdk'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

// child components
import { ValidationObserver } from 'vee-validate'
// @ts-ignore
import MosaicSelector from '@/components/MosaicSelector/MosaicSelector.vue'
// @ts-ignore
import AmountInput from '@/components/AmountInput/AmountInput.vue'
// @ts-ignore
import ButtonAdd from '@/components/ButtonAdd/ButtonAdd.vue'
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue'
import { MosaicsModel } from '@/core/database/entities/MosaicsModel'

@Component({
  components: {
    FormRow,
  },
})
export class SingleFormRowTs extends Vue {

}
