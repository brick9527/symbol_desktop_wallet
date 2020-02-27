<template>
  <div class="verify-mnemonic-page-wrapper">
    <span @click="$router.push({name: $route.meta.nextPage})">
      跳过
    </span>
    <div class="verify-mnemonic-container">
      <!--<MnemonicVerification :words="mnemonicWords" />-->
      <MnemonicVerification
        :words="mnemonicWords"
        @success="$router.push({name: 'accounts.creation.accountInfo'})"
        @cancelled="$router.back()"
      />
    </div>
    <div class="right-tip-container">
      <RightTipDisplay 
        :tip-content="tipContents"
      />
    </div>
  </div>
</template>

<script>
import VerifyMnemonicTs from './VerifyMnemonicTs'
import './VerifyMnemonic.less'
export default class VerifyMnemonic extends VerifyMnemonicTs {

}
</script>
