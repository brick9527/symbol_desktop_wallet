<template>
  <div class="mosaic-attachment-group-wrapper">
    <NewMosaicAttachmentInput
      v-for="(item,index) in rowList"
      :key="index"
      :index="index"
      :mosaics="mosaics"
      :is-first-row="index === 0"
      @delete="onDeleteMosaic"
      @update-data="onUpdateDate"
    />
    <div v-if="mosaics.length > 0 && rowList.length < mosaics.length" class="append-item-button-container">
      <span class="append-button" @click="addRow">
        {{ $t('add_mosaic') }}
      </span>
    </div>
  </div>  
</template>

<script lang="ts">
import { MosaicAttachmentGroupTs } from './MosaicAttachmentGroupTs'
import './MosaicAttachmentGroup.less'
export default class MosaicAttachmentGroup extends MosaicAttachmentGroupTs {}
</script>

