import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'CCAKE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xf5f4b8a090ba1449215fa9dee5283d7f017971f4',
    },
    tokenSymbol: 'CCAKE',
    tokenAddresses: {
      97: '',
      56: '0xc7091aa18598b87588e37501b6ce865263cd67ce',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'CCAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xba5a564e81b184612d65b04dc8469d34cb8506f1',
    },
    tokenSymbol: 'CCAKE',
    tokenAddresses: {
      97: '',
      56: '0xc7091aa18598b87588e37501b6ce865263cd67ce',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 17,
    risk: 5,
    lpSymbol: 'CCAKE-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xc7476db809bd61c78e7b2275b7e389d86434b9ba',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 22,
    risk: 4,
    lpSymbol: 'CCAKE-DOT LP',
    lpAddresses: {
     97: '',
      56: '0x5776b3522e5e0f8bf23ec2b35591420920b44be4',
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 20,
    risk: 4,
    lpSymbol: 'CCAKE-SXP LP',
    lpAddresses: {
      97: '',
      56: '0x9b8aa735a8d450a0e575135c0dab920f62f80b0a',
    },
    tokenSymbol: 'SXP',
    tokenAddresses: {
      97: '',
      56: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 14,
    risk: 4,
    lpSymbol: 'CCAKE-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x9f726ef03b13774b1a59b5d950b173e38da065d2',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 12,
    risk: 4,
    lpSymbol: 'CCAKE-BAKE LP',
    lpAddresses: {
      97: '',
      56: '0x72f3a53ef3491adf8a8e5229e688c042440d61aa',
    },
    tokenSymbol: 'BAKE',
    tokenAddresses: {
      97: '',
      56: '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    risk: 1,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  
  {
    pid: 5,
    risk: 4,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    risk: 4,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 10,
    risk: 4,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xBA51D1AB95756ca4eaB8737eCD450cd8F05384cF',
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '',
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'CCAKE',
    lpAddresses: {
      97: '',
      56: '0xf5f4b8A090bA1449215FA9DeE5283D7f017971F4', // CCAKE-BUSD LP
    },
    tokenSymbol: 'CCAKE',
    tokenAddresses: {
      97: '',
      56: '0xc7091aa18598b87588e37501b6ce865263cd67ce',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '',
      56: '0xf5f4b8a090ba1449215fa9dee5283d7f017971f4', // CCAKE-BUSD LP (BUSD-BUSD will ignore)
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 9,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 18,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 23,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'DOT',
    lpAddresses: {
      97: '',
      56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 21,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'SXP',
    lpAddresses: {
      97: '',
      56: '0x2f82286c2178e9144f2a7b8d27d5b3203253cba4', // SXP-BUSD LP
    },
    tokenSymbol: 'SXP',
    tokenAddresses: {
      97: '',
      56: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 19,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'UNI',
    lpAddresses: {
      97: '',
      56: '0x8f3624467993967f89c30c5f65d270b154b1b0fd', // UNI-BUSD LP
    },
    tokenSymbol: 'UNI',
    tokenAddresses: {
      97: '',
      56: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 24,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'LINK',
    lpAddresses: {
      97: '',
      56: '0xE54a9d8412287cfC675caE18a0011483Ef975f05', // LINK-BUSD LP
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      97: '',
      56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 15,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 13,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'BAKE',
    lpAddresses: {
      97: '',
      56: '0xe2d1b285d83efb935134f644d00fb7c943e84b5b', // BAKE-BUSD LP
    },
    tokenSymbol: 'BAKE',
    tokenAddresses: {
      97: '',
      56: '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 11,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'JULD',
    lpAddresses: {
      97: '',
      56: '0x9b86f82e441da14dfad3ee68059e81052c05a35b', // JULD-BUSD LP
    },
    tokenSymbol: 'JULD',
    tokenAddresses: {
      97: '',
      56: '0x5a41f637c3f7553dba6ddc2d3ca92641096577ea',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 16,
    risk: 4,
    isTokenOnly: true,
    lpSymbol: 'AUTO',
    lpAddresses: {
      97: '',
      56: '0x7723fe13747cf31496da38c5038160a40200bf8e', // AUTO-BUSD LP
    },
    tokenSymbol: 'AUTO',
    tokenAddresses: {
      97: '',
      56: '0xa184088a740c695e156f91f5cc086a06bb78b827',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  // {
  //  pid: 11,
  //  risk: 4,
  //  lpSymbol: 'CCAKE-ADA LP',
  //  lpAddresses: {
  //    97: '',
  //    56: '0xbed57b6324ec34e141ca8c183865a1614681e4b1',
  //  },
  //  tokenSymbol: 'CCAKE',
  //  tokenAddresses: {
  //    97: '',
  //    56: '0xc7091aa18598b87588e37501b6ce865263cd67ce',
  //  },
  //  quoteTokenSymbol: QuoteToken.ADA,
  //  quoteTokenAdresses: contracts.ada,
  // },
]

export default farms
