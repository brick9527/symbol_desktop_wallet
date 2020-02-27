<template>
  <div class="card-wrapper">
    <div class="box">
      <div class="top-title-box">
        <span>
          <slot name="number"></slot>
        </span>
        <span>
          <slot name="title"></slot>
        </span>
      </div>
      <div class="icon-right">
        <Icon type="ios-arrow-forward" size="24" />
      </div>
      <div class="bottom-title-box">
        <slot name="status"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import "./HarvestingCard.less";

@Component
export default class HarvestingCard extends Vue {}
</script>
