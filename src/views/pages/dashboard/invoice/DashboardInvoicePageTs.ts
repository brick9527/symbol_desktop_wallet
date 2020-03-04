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
// external dependencies
import {Component, Vue} from 'vue-property-decorator'
import {mapGetters} from 'vuex'
import {pluck, concatMap} from 'rxjs/operators'
import {of, Observable} from 'rxjs'
import {QRCodeGenerator, TransactionQR} from 'nem2-qr-library'
import {
  NetworkType,
  TransferTransaction,
  Address,
  MosaicId,
  Transaction,
  Mosaic,
  MosaicInfo,
  NamespaceId,
  MultisigAccountInfo,
  PublicAccount,
} from 'nem2-sdk'
import {WalletsModel} from '@/core/database/entities/WalletsModel'
import {WalletService} from '@/services/WalletService'

// child components
// @ts-ignore
import FormTransferTransaction from '@/views/forms/FormTransferTransaction/FormTransferTransaction.vue'
// @ts-ignore
import QRMessageInput from '@/components/QRMessageInput/QRMessageInput.vue'
// @ts-ignore
import MosaicSelectorDisplay from '@/components/MosaicSelectorDisplay/MosaicSelectorDisplay.vue'
// @ts-ignore
import EditableSpan from '@/components/EditableSpan/EditableSpan.vue'
// @ts-ignore
import SignerSelectorDisplay from '@/components/SignerSelectorDisplay/SignerSelectorDisplay.vue'

// resources
// @ts-ignore
import failureIcon from '@/views/resources/img/monitor/qr_failure.png'

// @TODO: to move out
/**
 * Mosaic object to be displayed in the views
 * @export
 * @interface BalanceEntry
 */
export interface BalanceEntry {
  /**
   * Mosaic Id
   * @type {MosaicId}
   */
  id: MosaicId
  /**
   * Mosaic hex Id
   * @type {string}
   */
  mosaicHex: string
  /**
   * Mosaic name
   * @type {string}
   */
  name: string
  /**
   * Relative amount
   * @type {number}
   */
  amount: number
}

type MosaicAttachmentType = {id: MosaicId, mosaicHex: string, name: string, amount: number}


@Component({
  components: {
    FormTransferTransaction,
    QRMessageInput,
    MosaicSelectorDisplay,
    EditableSpan,
    SignerSelectorDisplay,
  },
  computed: {...mapGetters({
    networkType: 'network/networkType',
    generationHash: 'network/generationHash',
    currentWalletAddress: 'wallet/currentWalletAddress',
    mosaicsNames: 'mosaic/mosaicsNames',
    namespacesNames: 'namespace/namespacesNames',
    currentWalletMosaics: 'wallet/currentWalletMosaics',
    currentWallet: 'wallet/currentWallet',

  })},
  subscriptions() {
    const qrCode$ = this
      .$watchAsObservable('transactionQR', {immediate: true})
      .pipe(pluck('newValue'),
        concatMap((args) => {
          if (args instanceof TransactionQR) return args.toBase64()
          return of(failureIcon)
        }))
    return {qrCode$}
  },
})
export class DashboardInvoicePageTs extends Vue {
  /**
   * Network type
   * @see {Store.Network}
   * @var {NetworkType}
   */
  public networkType: NetworkType

  /**
   * Transaction QR code
   * @type {Observable<string>}
   */
  public qrCode$: Observable<string>

  /**
   * Network's generation hash
   * @see {Store.Network}
   * @var {string}
   */
  public generationHash: string

  /**
   * The transaction to be translated to a QR code
   * @type {Transaction[]}
   */
  public transactions: Transaction[] = []

  /**
   * The transaction's mosaics to be displayed
   * @type {BalanceEntry[]}
   */
  public balanceEntries: BalanceEntry[] = []
  
  /**
   * form items
   * @var {any}
   */
  public formItems = {
    attachedMosaics: [],
    signerPublicKey: '',
    mosaicHex: '',
    message: '',
  }

  /**
   * List of known mosaics
   * @var {MosaicInfo[]}
   */
  public mosaicsInfo: MosaicInfo[]

  /**
   * List of known mosaics names
   * @var {any}
   */
  public mosaicsNames: any

  /**
   * List of known namespaces names
   * @var {any}
   */
  public namespacesNames: any

  /**
   * Currently active wallet's balances
   * @var {Mosaic[]}
   */
  public currentWalletMosaics: Mosaic[]

  /**
   * Currently active wallet
   * @var {WalletsModel}
   */
  public currentWallet: WalletsModel

  /**
   * Current wallet multisig info
   * @type {MultisigAccountInfo}
   */
  public currentWalletMultisigInfo: MultisigAccountInfo

  /**
   * Public key of the current signer
   * @var {any}
   */
  public currentSigner: PublicAccount

  // region computed properties getter/setter
  /**
   * Recipient to be shown in the view
   * @readonly
   * @type {string}
   */
  public get recipient(): string {
    if (!this.transactions.length) return ''

    // - read TransferTransaction instance
    const transfer = this.transactions.shift() as TransferTransaction
    const recipient = transfer.recipientAddress
    return recipient instanceof Address ? recipient.pretty() : recipient.toHex()
  }

  /**
   * Transaction QR code arguments
   * @readonly
   * @type {TransactionQR}
   */
  public get transactionQR(): TransactionQR {
    if (!this.transactions.length) return null

    // - read TransferTransaction instance
    const transfer = this.transactions.shift() as TransferTransaction
    console.log("invoice transfer: ", transfer)

    try {
      return QRCodeGenerator.createTransactionRequest(
        // @ts-ignore // @TODO SDK upgrade
        transfer,
        this.networkType,
        this.generationHash,
      )
    }
    catch (e) {
      return null
    }
  }
  /// end-region computed properties getter/setter

  /**
   * Hook called when the child component FormInvoiceCreation
   * emits the 'change' event with its new values.
   * @param {any} formItems
   */
  public onInvoiceChange(transactions: Transaction[]) {
    Vue.set(this, 'transactions', transactions)
  }

  /**
   * Hook called when the download QR button is pressed
   * @return {void}
   */
  public onDownloadQR() {
    if (!this.transactionQR) return

    // - read QR code base64
    const QRCode: any = document.querySelector('#qrImg')
    if (!QRCode) return
    const url = QRCode.src

    // - create link (<a>)
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = `qr_receive_${this.recipient}`
    a.href = url

    // - start download
    a.dispatchEvent(event)
  }

  /// region computed properties getter/setter
  get signers(): {publicKey: string, label: string}[] {
    return this.getSigners()
    // return this.getSigners()
  }

  /**
   * Internal helper to format a {Mosaic} entry into
   * an array of MosaicAttachmentType used in this form.
   * @internal
   * @param {Mosaic[]} mosaics 
   * @return {MosaicAttachmentType[]}
   */
  protected mosaicsToAttachments(mosaics: Mosaic[]): MosaicAttachmentType[] {
    return mosaics.map(
      mosaic => {
        const info = this.mosaicsInfo.find(i => i.id.equals(mosaic.id))
        const div = info ? info.divisibility : 0
        // amount will be converted to RELATIVE
        return {
          id: mosaic.id as MosaicId, // XXX resolve mosaicId from namespaceId
          mosaicHex: mosaic.id.toHex(), // XXX resolve mosaicId from namespaceId
          name: this.getMosaicName(mosaic.id),
          amount: mosaic.amount.compact() / Math.pow(10, div)
        }
      })
  }

  /**
   * internal helper for mosaic names
   * @param {Mosaic} mosaic 
   * @return {string}
   */
  protected getMosaicName(mosaicId: MosaicId | NamespaceId): string {
    if (this.mosaicsNames.hasOwnProperty(mosaicId.toHex())) {
      return this.mosaicsNames[mosaicId.toHex()]
    }
    else if (this.namespacesNames.hasOwnProperty(mosaicId.toHex())) {
      return this.namespacesNames[mosaicId.toHex()]
    }

    return mosaicId.toHex()
  }

  /**
   * Get a list of known signers given a `currentWallet`
   * @return {{publicKey: string, label:string}[]}
   */
  protected getSigners(): {publicKey: string, label: string}[] {
    if (!this.currentWallet) return []

    const self = [
      {
        publicKey: this.currentWallet.values.get('publicKey'),
        label: this.currentWallet.values.get('name'),
      },
    ]

    const multisigInfo = this.currentWalletMultisigInfo
    if (!multisigInfo) return self

    // in case "self" is a multi-signature account
    if (multisigInfo && multisigInfo.isMultisig()) {
      self[0].label = self[0].label + this.$t('label_postfix_multisig')
    }

    // add multisig accounts of which "self" is a cosignatory
    if (multisigInfo) {
      const service = new WalletService(this.$store)
      return self.concat(...multisigInfo.multisigAccounts.map(
        ({publicKey}) => ({
          publicKey,
          label: service.getWalletLabel(publicKey, this.networkType) + this.$t('label_postfix_multisig'),
        })))
    }

    return self
  }

  /**
   * Hook called when a signer is selected.
   * @param {string} signerPublicKey 
   */
  public async onChangeSigner(signerPublicKey: string) {
    this.currentSigner = PublicAccount.createFromPublicKey(signerPublicKey, this.networkType)

    const isCosig = this.currentWallet.values.get('publicKey') !== signerPublicKey
    const payload = !isCosig ? this.currentWallet : {
      networkType: this.networkType,
      publicKey: signerPublicKey,
    }

    await this.$store.dispatch('wallet/SET_CURRENT_SIGNER', {model: payload})
  }


  get selectedMosaic(): string {
    return this.formItems.mosaicHex
  }

  set selectedMosaic(hex: string) {
    this.formItems.mosaicHex = hex
  }
}
