---
title: Yield Boost - General APIs
subtitle: Enable auto-compounding for your liquidity pools, or any yield generating use cases.
author: chris
tags: [api, yield-boost]
---

## User Experience (assumptions)

//

| Environment             | RPC Endpoint                                                 |
| ----------------------- | ------------------------------------------------------------ |
| Turing Staging (Rococo) | `rpc.turing-staging.oak.tech`                                |
| Turing (Kusama)         | `rpc.turing.oak.tech`                                        |
| OAK (Polkadot)          | [Crowdloan launching soon!](https://oak.tech/oak/crowdloan/) |

## Parachain Requirements
The following requirements apply for any Kusama parachain that wishes to support cross-chain automation (including recurring payments, auto-compounding liquidity / staking rewards, automatic swaps, and more):

1. **Open bi-directional HRMP channels** - [HRMP Channels and You](https://github.com/OAK-Foundation/OAK-blockchain/wiki/HRMP-Channels-and-You)
2. **Enable users to authorize future transactions powered by OAK** using a proxy pallet and XCM origin converter.
    
    2a. [Proxy pallet implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/12)
    
    2b. [XCM converter implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/14)
    
    2c. Get proxy accountId:
```    
curl --location --request POST 
'http:*//rpc.turing-staging.oak.tech' \*
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": 
"xcmpHandler_crossChainAccount", 
"params": ["{{accountId32}}"]}' \
```

## Application Requirements [Extrinsics]
### Fees

Up front payment is collected from the user’s account to schedule future task(s), including fees for a defined number of future occurrences. Fees for indefinitely recurring transactions may be paid at each occurrence. An RPC endpoint to retrieve the following Turing Network Fees will be delivered in October:

1. The Turing inclusion fee to store the future extrinsic(s).
2. The Turing execution fee when the future extrinsic(s) are triggered.
3. The XCM fee to communicate future extrinsic(s) to a foreign chain (if applicable).
