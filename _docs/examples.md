---
title: Examples
subtitle: A series of examples of what you can do with OAK
author: chris
tags: [develop]
date: 2022-02-03
---

# Examples

💡 Use cases that OAK Network enables for decentralized applications on DotSama parachains.

---

Prior to Substrate and the OAK Network, scheduling and automating blockchain transactions required off-chain cron jobs run on centralized servers or semi-on-chain “keepers”; both of which require sacrificing custody of assets and/or security of private keys.

The OAK Network enables any dApp or parachain to trustlessly automate blockchain transactions by using a simple “event” trigger and “action” pair made possible by our event-driven execution kernel built on Substrate.

Here we explore many of the use cases that are open to dApps and parachains building with OAK Network. Join our [Telegram](https://t.me/OAKNetworkCommunity) and [Discord](https://discord.gg/UaqqV6wE) communities to discuss [#partnerships](https://discord.gg/uTcmAWFY)! 

## Time-based triggers

The Time Triggers API enables scheduling transactions at any pre-determined point in the future. All APIs in this section are prefixed by `automation-time`.

### Scheduling payments

tl;dr - send ‘some asset’ to ‘some address’ at ‘some time(s)’

You can use OAK Network’s API to schedule repayment on DeFi loans, automatically process payroll (to DAO contributors, for example), pay for a subscription, or any other case where you want to schedule sending assets between accounts and between DotSama parachains.

You define the following parameters - and never sign over custody of your private key or tokens. 

### Dollar-Cost Averaging

tl;dr - swap ‘some token’ for ‘some other token’ at ‘some time(s)’

Investors frequently benefit from frequently buying smaller amounts of a given asset over a period of time when compared to buying a large amount of an asset at a single point in time (“apeing in”). However, executing on this strategy in DeFi typically requires the investor to execute and sign the same transaction each time (e.g. to be at their computer at the same time every week to swap aUSD for TUR).

You can use OAK Network’s API to schedule swaps as frequently as every hour.

You define the following parameters - and never sign over custody of your private key or tokens. 

### Compounding Yield

tl;dr - automatically claim and deposit rewards to compound returns

DeFi protocols often incentivize deposits by offering rewards in the protocol’s native token, similar to how traditional banks offer interest (measured in APY) to incentivize fiat deposits. However, unlike the traditional banking system that systematically pays interest in fiat, token rewards typically remain locked in the smart contract until the user initiates a request to “claim rewards”. This results in capital inefficiencies as those tokens are not generating additional interest on top of the assets that were initially deposited. 

You can use OAK Network’s API to schedule both claiming and depositing awards as frequently as every hour. 

You define the following parameters - and never sign over custody of your private key or tokens. 

To prevent failed deposit transactions, we recommend including a time delay in between the claim and deposit events. 

## Price-based or Numeric-based triggers

The Price or Numeric Triggers API enables scheduling transactions based on an increase or decrease of any variable numeric data stream provided by the DApp or user. All APIs in this section are prefixed by `automation-price`.

### Stop-loss order

If you're keen on ensuring that you don't leave money on the table, you can send a data stream of any price or price-pair you'd like to the OAK Blockchain. Then you can indicate that when the price goes below a certain threshold, you want to swap or sell for another asset or stable.

### TVL detection

Worried about your favorite protocol going below a certain threshold of TVL due to liquidiations, then you can rest assured that OAK can cover the use case of if the TVL drops below a certain threshold, then you can exit your liquidity in a matter of seconds (~12 seconds).

Similarly, if you'd like to keep your ownership percentage at the same, you can add conditional logic to lock up more tokens to your favorite protocol.

### Wallet balance top-up

Do you have a wallet that you use for staking, governance, nft purchases and subscriptions? Do you need to make sure your wallet keeps a certain amount present? Then our numeric-based data stream can support this.
