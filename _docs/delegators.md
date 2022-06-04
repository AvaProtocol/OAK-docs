---
title: Delegator Overview
subtitle: How to stake to a collator and earn rewards
author: charles
tags: [delegator]
---

**Important disclaimer about risks**

_Holders of TUR tokens should perform careful due diligence on collators before delegating. Being listed as a collator is not an endorsement or recommendation from the Turing Network, or OAK Foundation. Neither the Turing Network, nor has OAK Foundation vetted the list collators and assumes no responsibility with regard to the selection, performance, security, accuracy, or use of any third-party offerings. You alone are responsible for doing your own diligence to understand the applicable fees and all risks present, including actively monitoring the activity of your collators._

_You agree and understand that neither the Turing Network, nor OAK Foundation guarantees that you will receive staking rewards and any applicable percentage provided (i) is an estimate only and not guaranteed, (ii) may change at any time and (iii) may be more or less than the actual staking rewards you receive. The OAK Foundation makes no representations as to the monetary value of any rewards at any time._

_Staking TUR tokens is not free of risk. Staked TUR tokens are locked up, and retrieving them requires a waiting period. Additionally, if a collator fails to perform required functions or acts in bad faith, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators. If a collators behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another collator. Delegators can also mitigate risk by electing to distribute their stake across multiple collators._

## Network Specific Information

### Turing Network - Kusama Parachain

- [PolkadotJS Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics) - use this to execute post calls or functions (e.g. signing up to be a collator)
- [Subscan](https://turing.subscan.io/) - use this for an indexing or reference service with a delightful user experience
- [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate) - use this to query fungible storage items (e.g. the number of selected candidates)
- [Chain Constants](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate/constants) - use this to query constants for the blockchain (e.g. any parameter with a `const` below)
- [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

| Field                                                         | Current Value                                              |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| Minimum Delegator Bond `const parachainStaking.minDelegation` | 50 TUR or `500000000000` planck                            |
| Maximum Number of Delegators per Collator                     | 300                                                        |
| Round Length `parachainStaking.round`                         | 600 blocks or ~2 hours                                     |
| Rewards payout `const parachainStaking.rewardPaymentDelay`    | Time left to complete current round + 2 rounds or ~4 hours |
| Inflation `parachainStaking.inflationConfig`                  | 5.00% annually                                             |

_Note: The source of truth for the values above is the chain state and constants, so please query that to double-check the values_

## How to stake

### Step 1: Figure out who you want to stake to

Before staking tokens to collators, we recommend you do your research on who to stake towards. To figure out the candidate pool, you can find the set of collators in [Subscan](https://turing.subscan.io/block), under the Collator column. Save their wallet address as `COLLATOR_WALLET_ADDRESS` to be used on the step below.

### Step 2: Figure out your inputs
You will need 3 inputs to stake your tokens. These inputs are as follows:
1. Amount
2. Candidate Delegation Count
3. Delegation Count

These numbers are dynamic and will change with additional delegators. Please check these inputs every time before staking more tokens. In this step, there are 2 options below to find these inputs. You can either use Javascript or read the chain state on the UI.

#### Find Inputs Via Javascript
To be stake your delegator via PolakdotJS extrinsics, you'll need to figure out three numbers. We've provided a helpful script for you to use. Navigate to the **Developer > Javascript** tab on the [PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/js). Delete the content of the white box, copy and paste the script below, then replace `COLLATOR_WALLET_ADDRESS` and `YOUR_WALLET_ADDRESS` with the correct addresses.

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

#### Find Inputs Via Polkadot JS UI
##### Minimum Amount
![minDelegation](../../assets/img/staking-delegation/minDelegation.png)
This should show the number that represents the minimum amount that can be inputted into the `amount` field on the `parachainStaking.delegate` call in Step 3. Your input for `amount` must be larger than or equal to this number.

##### Candidate Delegation Count
![candidateInfo](../../assets/img/staking-delegation/candidateInfo.png)
This contains information about the collator candidate. Under the field `delegationCount` from the result of the query, you can find the number you need for the `candidateDelegationCount` field on the `parachainStaking.delegate` call in the Step 3. Remember to save this number. Each time another delegator delegates funds to a given collator, this number increases by 1 for that specific collator.

##### Delegation Count
![minDelegation](../../assets/img/staking-delegation/delegatorState.png)
This contains information about the delegator state. The field `delegations` should be a list. Count the number of items in this list, with each item defined by a set of brackets containing an owner and an amount. In the picture above, it consists of 2 items. Remember to save this number for the `delegationCount` field on the `parachainStaking.delegate` call in the Step 3. Each time you delegate to another collator, this number increases by 1. 

### Step 3: Stake your tokens to a collator

Currently, everything related to staking needs to be accessed via the Extrinsics menu, under the Developer tab. To delegate a candidate, provide the following information:

![delegate](../../assets/img/staking-delegation/delegate.png)

- `candidate`: This will be the collator you so choose to stake towards from your research in Step 1 and has the same `COLLATOR_WALLET_ADDRESS` from Step 2 above.
- `amount`: Figure out how much you would like to stake to the collator. At minimum you must stake `2a. Minimum Amount to be staked` from the output above.
- `candidateDelegationCount`: Values ​​are available from section above as `2b. Candidate Delegation Count`. Each time another delegator delegates funds to a given collator, this number increases by 1 for that specific collator.
- `delegationCount`: Values ​​are available from the section above as `2c. Delegation Count`. Each time you delegate to another collator, this number increases by 1. 

## FAQ

### How do I pick which collator to delegate to?

While we cannot answer this question for you, you can identify the collator from the [identity](../identity) that they set on-chain. Please do your research on their background based on the information provided. You can also ask #collator-open-chat in the [OAK Discord](https://discord.gg/7W9UDvsbwh) server for more information.

Staking rewards are split evenly between all delegators for a given collator so delegating to a collator with less total stake will net you more proportional rewards.
Only the top 24 collators are selected to the active set for block authoring so any delegations to collators outside the active set will not receive rewards.
Only the top 300 delegators for each collator will receive rewards.

### How do I check how many TUR rewards I’ve received?

You can navigate to [Turing's Subscan](https://turing.subscan.io/event?address=YOUR_NOMINATOR_WALLET&module=parachainstaking&event=reward) page to view your rewards.

### What rewards will I get?

2.5% of annual inflation is distributed amongst the stakers of each collator (including the collator themselves) based on the number of blocks they successfully author. Those rewards are distributed proportionally among the stakers of that collator.

As candidates in the active set of collators receive rewards from block production, delegators get rewards as well.

You can view the delegated amount and the change in the balance due to each round of staking rewards on the Accounts page.

![accounts](../../assets/img/staking-delegation/accounts.png)
