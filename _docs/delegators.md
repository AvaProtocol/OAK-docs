---
title: Delegator Overview
subtitle: How to stake to a collator and earn rewards
author: charles
tags: [delegator]
---
## How to stake TUR
This guide provides links and instructions for staking by delegating an existing Turing Network collator. See [Collator Overview](https://docs.oak.tech/docs/collators/) for instructions on setting up your own collator.

_Please exercise caution when following links to external resources that are not maintained or tested by the OAK Network team!_

## Which wallet are you using?

### Option 1: Browser Extension
- Use [OAK Staking Dashboard](https://web3go.xyz/#/OAKStaking) by Web3Go to stake and delegate an existing collator from your web browser. 

### Option 2: Nova Wallet
- Nova Wallet ([Android](https://play.google.com/store/apps/details?id=io.novafoundation.nova.market)) and ([iOS](https://apps.apple.com/us/app/nova-polkadot-kusama-wallet/id1597119355)) supports staking and delegating from your mobile device.

### Option 3: Polkadot JS ([Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics))
Keep scrolling in this document or visit one the following guides created by members of the OAK Network community:

- [Turing Staking Guide](https://oak-turing.pathrocknetwork.org) by pathrocknetwork, one of Turing Network's node operators.
- [How to Stake TUR with the Turing Network](https://medium.com/stakebaby/how-to-stake-tur-with-the-turing-oak-network-by-stakebaby-23229f632b29) by StakeBaby, one of Turing Network's node operators. 

### Which collator will you delegate your stake to?

[StakeTur](https://staketur.com) by StakeBaby, staking applications, and wallet interfaces with staking support will provide additional information that can help you choose who to delegate. Join the [OAK Discord Server](https://discord.gg/7W9UDvsbwh) for #collator-open-chat about delegation.

**Important disclaimer about risks**

_Holders of TUR tokens should perform careful due diligence on collators before delegating. Being listed as a collator is not an endorsement or recommendation from the Turing Network, or OAK Foundation. Neither the Turing Network, nor has OAK Foundation vetted the list collators and assumes no responsibility with regard to the selection, performance, security, accuracy, or use of any third-party offerings. You alone are responsible for doing your own diligence to understand the applicable fees and all risks present, including actively monitoring the activity of your collators._

_You agree and understand that neither the Turing Network, nor OAK Foundation guarantees that you will receive staking rewards and any applicable percentage provided (i) is an estimate only and not guaranteed, (ii) may change at any time and (iii) may be more or less than the actual staking rewards you receive. The OAK Foundation makes no representations as to the monetary value of any rewards at any time._

_Staking TUR tokens is not free of risk. Staked TUR tokens are locked up, and retrieving them requires a waiting period. Additionally, if a collator fails to perform required functions or acts in bad faith, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators. If a collators behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another collator. Delegators can also mitigate risk by electing to distribute their stake across multiple collators._

## How to stake TUR using PolkadotJS

### Step 1: Figure out your inputs
You will need 3 inputs to stake your tokens. These inputs are as follows:
1. Amount
2. Candidate Delegation Count
3. Delegation Count

These numbers are dynamic and will change with additional delegators. Please check these inputs every time before staking more tokens. In this step, there are 2 options below to find these inputs. You can either use Javascript or read the chain state on the UI.

#### Option 1: Find Inputs Via Javascript
To be stake your delegator via PolakdotJS extrinsics, you'll need to figure out three numbers. We've provided a helpful script for you to use. Navigate to the **Developer > Javascript** tab on the [PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/js). 

Delete the content of the white box, copy and paste the script below, then replace `COLLATOR_WALLET_ADDRESS` and `YOUR_WALLET_ADDRESS` with the correct addresses.

```javascript
const collatorWalletAddress = "COLLATOR_WALLET_ADDRESS";
const delegatorWalletAddress = "YOUR_WALLET_ADDRESS";
const minDelegationStake = await api.consts.parachainStaking.minDelegation;
const candidateInfo = await api.query.parachainStaking.candidateInfo(
  collatorWalletAddress
);
const candidateDelegationCount = JSON.parse(candidateInfo).delegationCount;
const delegatorState = await api.query.parachainStaking.delegatorState(
  delegatorWalletAddress
);
const delegationsLength = (delegatorState.toJSON() !== null && delegatorState.toJSON().delegations)
  ? delegatorState.toJSON().delegations.length
  : 0;
console.log(`2a. Minimum Amount to be staked: ${minDelegationStake}`);
console.log(`2b. Candidate Delegation Count: ${candidateDelegationCount}`);
console.log(`2c. Delegation Count: ${delegationsLength}`);
```

#### Option 2: Find Inputs Via Polkadot JS UI
##### Minimum Amount
![minDelegation](../../assets/img/staking-delegation/minDelegation.png)
This should show the number that represents the minimum amount that can be inputted into the `amount` field on the `parachainStaking.delegate` call in Step 3. Your input for `amount` must be larger than or equal to this number.

1. Go Developer > Chain State > Constants in order to reach the page
2. For the query, use the left drop down on the page to select `parachainStaking` first. This should allow you to select `minDelegation` from the right drop down.
3. Press the circular `+` button on the right of the drop downs in order to execute your query.

##### Candidate Delegation Count
![candidateInfo](../../assets/img/staking-delegation/candidateInfo.png)
This contains information about the collator candidate. Under the field `delegationCount` from the result of the query, you can find the number you need for the `candidateDelegationCount` field on the `parachainStaking.delegate` call in the Step 3. Remember to save this number. Each time another delegator delegates funds to a given collator, this number increases by 1 for that specific collator.

1. Go Developer > Chain State > Storage in order to reach the page
2. For the query, use the left drop down on the page to select `parachainStaking` first. This should allow you to select `candidateInfo` from the right drop down.
3. In the field below that says `AccountId32`, please insert the wallet address of the collator you want to stake with.
4. Press the circular `+` button on the right of the drop downs in order to execute your query.

##### Delegation Count
![minDelegation](../../assets/img/staking-delegation/delegatorState.png)
This contains information about the delegator state. The field `delegations` should be a list. Count the number of items in this list, with each item defined by a set of brackets containing an owner and an amount. In the picture above, it consists of 2 items. Remember to save this number for the `delegationCount` field on the `parachainStaking.delegate` call in the Step 3. Each time you delegate to another collator, this number increases by 1. 

1. Go Developer > Chain State > Storage in order to reach the page
2. For the query, use the left drop down on the page to select `parachainStaking` first. This should allow you to select `delegatorState` from the right drop down.
3. In the field below that says `AccountId32`, please insert your wallet address where you have your TUR tokens for staking.
4. Press the circular `+` button on the right of the drop downs in order to execute your query.

### Step 2: Stake your tokens to a collator

Currently, everything related to staking needs to be accessed via the Extrinsics menu, under the Developer tab. To delegate a candidate, provide the following information:

![delegate](../../assets/img/staking-delegation/delegate.png)

- `candidate`: This will be the collator you so choose to stake towards from your research in Step 1 and has the same `COLLATOR_WALLET_ADDRESS` from Step 2 above.
- `amount`: Figure out how much you would like to stake to the collator. At minimum you must stake `2a. Minimum Amount to be staked` from the output above. Please note, in order to determine how much TUR to stake, you must multiply the number of TUR you want to stake by 10,000,000,000. In other words, take the number of TUR you want to stake and add 10 zeros behind it. Please be sure to type the correct number of zeros, as it could result in significantly more or less TUR than intended being staked.
- `candidateDelegationCount`: Values ​​are available from section above as `2b. Candidate Delegation Count`. Each time another delegator delegates funds to a given collator, this number increases by 1 for that specific collator.
- `delegationCount`: Values ​​are available from the section above as `2c. Delegation Count`. Each time you delegate to another collator, this number increases by 1. 

## FAQ

### How do I check how many TUR rewards I’ve received?

Search for your wallet on the [Turing Subscan](https://turing.subscan.io/event?address=YOUR_NOMINATOR_WALLET&module=parachainstaking&event=reward) and filter for "reward" events.

### What rewards will I get?

The Turing Network pays 2.5% in annual token inflation to the stakers who back the collators which successfully author blocks. Those rewards are distributed proportionally among the stakers for each collator, including the self-bond of the node operator and up to 300 delegators.

Each block pays the same amount in rewards, so your portion of rewards for authoring each block will be lower when delegating to a collator with a higher total stake (self-bond plus delegated stake) when compared to a collator with a lower total stake.

[StakeTur](https://staketur.com) by StakeBaby, staking applications, and wallet interfaces with staking support will provide additional information that can help you estimate staking rewards and APR.

## Turing Network - Kusama Parachain

_Note: The source of truth for these values is the chain state and constants, so please query that to confirm the values_

| Field                                                         | Current Value                                              |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| Minimum Delegator Bond `const parachainStaking.minDelegation` | 50 TUR or `500000000000` planck                            |
| Maximum Number of Delegators per Collator                     | 300                                                        |
| Round Length `parachainStaking.round`                         | 600 blocks or ~2 hours                                     |
| Rewards payout `const parachainStaking.rewardPaymentDelay`    | Time left to complete current round + 2 rounds or ~4 hours |
| Inflation `parachainStaking.inflationConfig`                  | 5.00% annually                                             |
