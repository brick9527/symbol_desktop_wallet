<template>
  <div class="invoice-container secondary_page_animate">
    <div class="invoice-header-container">
      <div class="header-button-group">
        <Icon type="ios-refresh" />
        <span>重置</span>
      </div>
      <div class="header-button-group" @click="onDownloadQR">
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

          <div class="address-value-box qr-value-box">
            <SignerSelectorDisplay v-model="formItems.signerPublicKey" :signers="signers" @change="onChangeSigner" />
          </div>

          <div class="top-qr-text overflow_ellipsis">
            <span class="top-qr-text-title">{{ $t('assets') }}:</span>
          </div>

          <div class="qr-asset-value-box qr-value-box">
            <MosaicSelectorDisplay :mosaics="currentWalletMosaics" @input="getSelectedMosaicInfo" />
          </div>

          <div class="top-qr-text overflow_ellipsis">
            <span class="top-qr-text-title">设置金额:</span>
          </div>

          <div class="qr-amount-value-box qr-value-box">
            <EditableSpan />
          </div>

          <div class="top-qr-text">
            <span class="top-qr-text-title top-text">{{ $t('message') }}:</span>
          </div>
          <div class="qr-message-value-box qr-value-box">
            <QRMessageInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {DashboardInvoicePageTs} from './DashboardInvoicePageTs'
import './DashboardInvoicePage.less'

export default class DashboardInvoicePage extends DashboardInvoicePageTs {}
</script>
