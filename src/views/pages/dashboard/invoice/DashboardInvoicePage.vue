<template>
  <div class="invoice-container secondary_page_animate">
    <div class="left-container scroll">
      <div class="invoice-section-container">
        <div class="top-feature">
          <span>复制</span>
          <span>重置</span>
          <span>下载</span>
        </div>
        <div class="image-container">
          <img id="qrImg" :src="qrCode$" alt="Transaction QR code" />
        </div>
        <div class="description-container">
          <div id="address_text" class="address_text top-qr-text">
            <span class="top-qr-text-title">{{ $t('Recipient') }}:</span>
            <input
              class="full-width-item-container input-size input-style"
              :placeholder="$t('placeholder_address_or_alias')"
              type="text"
            />
          </div>

          <div class="top-qr-text overflow_ellipsis">
            <span class="top-qr-text-title">{{ $t('select_assets') }}:</span>
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
            <span v-else>{{ 'N/A' }}</span>
          </div>
          <div class="top-qr-text">
            <span class="top-qr-text-title">{{ $t('set_amount') }}:</span>
            <span></span>
          </div>

          <div class="top-qr-text">
            <span class="top-qr-text-title">{{ $t('message') }}:</span>
            <textarea></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DashboardInvoicePageTs } from "./DashboardInvoicePageTs";
import "./DashboardInvoicePage.less";
export default class DashboardInvoicePage extends DashboardInvoicePageTs {}
</script>