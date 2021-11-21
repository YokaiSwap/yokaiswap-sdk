import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  GW_DEVNET = 1024777,
  GW_TESTNET = 71393,
  GW_MAINNET = 71394
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS =
  Number(process.env.REACT_APP_CHAIN_ID) === ChainId.GW_MAINNET
    ? '0x9816009ADcefC3b510E7BD92300b87d7991C462e' // TODO: use mainnet address
    : Number(process.env.REACT_APP_CHAIN_ID) === ChainId.GW_TESTNET
    ? '0x9816009ADcefC3b510E7BD92300b87d7991C462e'
    : '0x3E08BC5320652090Eac8FAB2acE5fA38fdd3bF22' // godwoken devnet

export const INIT_CODE_HASH = '0x63a0795e9ce9291273519bb2edcd3edd1043cfa10fea99808b19f125f7c743a4'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(9975)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
