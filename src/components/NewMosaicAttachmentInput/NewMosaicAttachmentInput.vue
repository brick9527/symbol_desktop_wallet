<template>
  <FormRow>
    <template v-if="isFirstRow" v-slot:label>
      {{ $t('asset_type') }}:
    </template>
    <template v-slot:inputs>
      <ValidationObserver 
        v-slot="{ handleSubmit }"
        class="row-mosaic-attachment-input inputs-container"
        :class="[isFirstRow ? 'row-mosaic-attachment-input-2' : 'row-mosaic-attachment-input-3']"
        tag="div"
      >
        <MosaicSelector
          :value="selectedMosaic"
          :mosaics="mosaics"
          @input="onChangeMosaic"
        />
        <AmountInput
          :value="relativeAmount"
          class="pl-2"
          @input="updateAmount"
        />
        <ButtonDelete
          :disabled="isFirstRow"
          class="button-add align-right"
          @click="handleSubmit(onClickDelete)"
        />
      </ValidationObserver>
    </template>
  </FormRow>
</template>

<script lang="ts">
import {NewMosaicAttachmentInputTs} from './NewMosaicAttachmentInputTs'
export default class NewMosaicAttachmentInput extends NewMosaicAttachmentInputTs {}
</script>

