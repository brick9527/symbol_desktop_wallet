<template>
  <div class="invoice-container secondary_page_animate">
    <div class="invoice-header-container">
      <div class="header-button-group">
        <Icon type="ios-refresh" />
        <span>重置</span>
      </div>
      <div class="header-button-group">
        <Icon type="md-download" />
        <span>下载</span>
      </div>
      <div class="header-button-group">
        <Icon type="md-copy" />
        <span>复制</span>
      </div>
    </div>
    <div class="invoice-inner-container scroll">
      <div class="invoice-section-container">
        <div class="image-container">
          <img id="qrImg" :src="qrCode$" alt="Transaction QR code">
        </div>
        <div class="description-container">
          <div id="address_text" class="address_text top-qr-text">
            <span class="top-qr-text-title">{{ $t('Recipient') }}:</span>
          </div>

          <div class="address-value-box">
            <span class="gray">{{ recipient }}</span>
          </div>

          <div class="top-qr-text overflow_ellipsis">
            <span class="top-qr-text-title">{{ $t('assets') }}:</span>
          </div>

          <div class="qr-asset-value-box">
            <div v-if="balanceEntries.length">
              <div 
                v-for="({mosaicHex, name, amount}, index) in balanceEntries"
                :key="index"
              >
                <span class="blue">{{ amount }}&nbsp;</span>
                <span class="blue">{{ name }}</span>
                <span class="gray">（{{ mosaicHex }}）</span>
              </div>
            </div>
            <span v-else>{{ 'N/A' }}</span>
          </div>

          <div class="top-qr-text overflow_ellipsis">
            <span class="top-qr-text-title">设置金额:</span>
          </div>

          <div class="qr-amount-value-box">

          </div>

          <div class="top-qr-text">
            <span class="top-qr-text-title">{{ $t('message') }}:</span>
          </div>
          <div class="qr-message-value-box">
            <Input v-model="qrMessage" type="textarea" :rows="2" />
          </div>

          <!-- <div class="qr_button">
            <span class="radius pointer" @click="onDownloadQR">{{ $t('Download') }}</span>
          </div> -->
        </div>
      </div>

      <!-- <FormTransferTransaction
        :hide-signer="true"
        :disable-submit="true"
        @onTransactionsChange="onInvoiceChange"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import {DashboardInvoicePageTs} from './DashboardInvoicePageTs'
import './DashboardInvoicePage.less'

export default class DashboardInvoicePage extends DashboardInvoicePageTs {}
</script>
