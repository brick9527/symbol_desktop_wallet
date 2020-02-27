<template>
  <div class="harvesting-container secondary_page_animate">
    <div class="top-container">
      <div class="left-container">
        <div class="top-title">
          <span></span>
          <span class="title-large">最新累积收益</span>
          <span class="title-min">/100Blocks</span>
        </div>
        <div class="bottom-amount">
          <span class="amount-large">0.00</span>
          <span class="amount-min">xym</span>
        </div>
        <div class="top-title">
          <span></span>
          <span class="title-large">最新平均收益</span>
          <span class="title-min">/100Blocks</span>
        </div>
        <div class="bottom-amount">
          <span class="amount-large">0.00</span>
          <span class="amount-min">xym</span>
        </div>
      </div>
      <div class="right-container">
        <HarvestingCard class="first-box">
          <span slot="number">1</span>
          <span slot="title">代理账户绑定</span>
          <div slot="status">未绑定</div>
        </HarvestingCard>
        <HarvestingCard class="second-box">
          <span slot="number">2</span>
          <span slot="title">远程节点设置</span>
          <div slot="status">未设置</div>
        </HarvestingCard>
        <HarvestingCard class="third-box">
          <span slot="number">3</span>
          <span slot="title">发起委托请求</span>
          <div slot="status">未请求</div>
        </HarvestingCard>
        <HarvestingCard class="fourth-box">
          <span slot="number">4</span>
          <span slot="title">收益状态显示</span>
        </HarvestingCard>
      </div>
    </div>

    <div class="bottom-container">
      <p>最新收益列表</p>
      <div class="harvesting-list">
        <i-table height="150" :columns="columns1" :data="data1"></i-table>
      </div>
      <div class="page-container">
        <Page :total="1" class="page-ontent" />
    </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { DashboardHarvestingPageTs } from "./DashboardHarvestingPageTs";
import "./DashboardHarvestingPage.less";

export default class DashboardHarvestingPage extends DashboardHarvestingPageTs {}
</script>
