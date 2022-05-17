---
title: Examples
subtitle: A series of examples of what you can do with OAK
author: irsal
tags: [develop]
---

# Examples

💡 Use cases that OAK Network enables for decentralized applications on DotSama parachains.

---

Prior to Substrate and the OAK Network, scheduling and automating blockchain transactions required off-chain cron jobs run on centralized servers or semi-on-chain “keepers”; both of which require sacrificing custody of assets and/or security of private keys.

The OAK Network enables any dApp or parachain to trustlessly automate blockchain transactions by using a simple “event” trigger and “action” pair made possible by our event-driven execution kernel built on Substrate.

Here we explore many of the use cases that are open to dApps and parachains building with OAK Network. Join our [Telegram](https://t.me/OAKNetworkCommunity) and [Discord](https://discord.gg/UaqqV6wE) communities to discuss [#partnerships](https://discord.gg/uTcmAWFY)! 

## OAK Time Triggers

The Time Triggers API enables scheduling transactions at any pre-determined point in the future. All APIs in this section are prefixed by `Automation-time`.

### Scheduling payments

tl;dr - send ‘some asset’ to ‘some address’ at ‘some time(s)’

You can use OAK Network’s `schedule_transfer_task`* API to schedule repayment on DeFi loans, automatically process payroll (to DAO contributors, for example), pay for a subscription, or any other case where you want to schedule sending assets between accounts and between DotSama parachains.

You define the following parameters - and never sign over custody of your private key or tokens. 

**API Parameters**

- **`time` -** the UNIX standard time when OAK will execute the transaction (or series of times for up to 24 recurring transactions)
- **`accountID` -** the account identifier for the recipient (may be a person’s wallet or smart contract, etc.)
- **`paraID` -** the identifier of the parachain on which to enact the transaction (e.g. 2114 is the parachain ID for Turing Network)
- **`tokenID` -** the identifier for the token that you are transferring
- **`amount` -** the amount of the specified token that you are transferring

*This assumes a cross-parachain transaction. You may use `schedule_native_transfer_task` if you are scheduling a transfer of tokens that are native to the OAK Network (i.e. TUR or OAK).

### Dollar-Cost Averaging

tl;dr - swap ‘some token’ for ‘some other token’ at ‘some time(s)’

Investors frequently benefit from frequently buying smaller amounts of a given asset over a period of time when compared to buying a large amount of an asset at a single point in time (“apeing in”). However, executing on this strategy in DeFi typically requires the investor to execute and sign the same transaction each time (e.g. to be at their computer at the same time every week to swap aUSD for TUR).

 You can use OAK Network’s `schedule_contract_task`* API to schedule swapping your  and depositing awards as frequently as every hour. 

You define the following parameters - and never sign over custody of your private key or tokens. 

**API Parameters**

- **`time` -** the UNIX standard time when OAK will execute the transaction (or series of times for up to 24 recurring transactions)
- **`contractID` -** the identifier for the liquidity pool smart contract that you are interacting with
- **`paraID` -** the identifier of the parachain on which the smart contract exists (e.g. 2114 is the parachain ID for Turing Network)
- **`function` -** the ‘swap’ function in the smart contract that you are executing
- **`tokenID` -** the identifier for the token that you are transferring (e.g. aUSD identifier XYZ)
- **`amount` -** the amount of the specified token that you are swapping

*Coming soon. Subject to change and may differ for non-EVM chains. 

### Compounding Yield

tl;dr - automatically claim and deposit rewards to compound returns

DeFi protocols often incentivize deposits by offering rewards in the protocol’s native token, similar to how traditional banks offer interest (measured in APY) to incentivize fiat deposits. However, unlike the traditional banking system that systematically pays interest in fiat, token rewards typically remain locked in the smart contract until the user initiates a request to “claim rewards”. This results in capital inefficiencies as those tokens are not generating additional interest on top of the assets that were initially deposited. 

You can use OAK Network’s `schedule_contract_task`* API to schedule both claiming and depositing awards as frequently as every hour. 

You define the following parameters - and never sign over custody of your private key or tokens. 

**API Parameters (Claim)**

- **`time` -** the UNIX standard time when OAK will execute the transaction (or series of times for up to 24 recurring transactions)
- **`contractID` -** the identifier for the smart contract that you are claiming rewards from
- **`paraID` -** the identifier of the parachain on which the rewards contract exists (e.g. 2114 is the parachain ID for Turing Network)
- **`function` -** the ‘claim rewards’ function in the smart contract
- **`tokenID` -** null
- **`amount` -** null

To prevent failed deposit transactions, we recommend including a time delay in between the claim and deposit events. 

**API Parameters (Deposit)**

- **`time` -** the UNIX standard time when OAK will execute the transaction (or series of times for up to 24 recurring transactions)
- **`contractID` -** the identifier for the smart contract that you are depositing claimed rewards into
- **`paraID` -** the identifier of the parachain on which the deposit contract exists (e.g. 2114 is the parachain ID for Turing Network)
- **`function` -** the ‘deposit’ or ‘enter market’ function in the smart contract
- **`tokenID` -** the identifier for the token that you are depositing (e.g. aUSD identifier XYZ)
- **`amount` -** the amount of the specified token that you are depositing in the contract

*Coming soon. Subject to change and may differ for non-EVM chains. 
