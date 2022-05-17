import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string
  public readonly projectLink?: string

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    projectLink?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
    this.projectLink = projectLink
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WRAPPED_NATIVE = {
  [ChainId.GW_MAINNET]: new Token(
    ChainId.GW_MAINNET,
    '0xE934f463d026d97F6CE0A10215D0ac4224f0a930',
    8,
    'WCKB',
    'Wrapped CKB'
  ),
  [ChainId.GW_TESTNET]: new Token(
    ChainId.GW_TESTNET,
    '0xD3a77b082cF44a31B31768148539314Ac802c96C',
    18,
    'WCKB',
    'Wrapped CKB'
  ),
  [ChainId.GW_DEVNET]: new Token(
    ChainId.GW_DEVNET,
    '0x41b81Bc77E6426bD15cd18307DC20e7181676B94',
    8,
    'WCKB',
    'Wrapped CKB'
  )
}
