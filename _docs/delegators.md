---
title: Delegator Overview
subtitle: How to stake to a collator and earn rewards
author: charles
tags: [delegator]
---

## Risks
*Holders of TUR tokens should perform careful due diligence on collators before delegating. Being listed as a collator is not an endorsement or recommendation from the Turing Network, or OAK Foundation. Neither the Turing Network, nor has OAK Foundation vetted the list collators and assumes no responsibility with regard to the selection, performance, security, accuracy, or use of any third-party offerings. You alone are responsible for doing your own diligence to understand the applicable fees and all risks present, including actively monitoring the activity of your collators.*

*You agree and understand that neither the Turing Network, nor OAK Foundation guarantees that you will receive staking rewards and any applicable percentage provided (i) is an estimate only and not guaranteed, (ii) may change at any time and (iii) may be more or less than the actual staking rewards you receive. The OAK Foundation makes no representations as to the monetary value of any rewards at any time.*

*Staking TUR tokens is not free of risk. Staked TUR tokens are locked up, and retrieving them requires a waiting period. Additionally, if a collator fails to perform required functions or acts in bad faith, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators. If a collators behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another collator. Delegators can also mitigate risk by electing to distribute their stake across multiple collators.*

## How to stake

### Step 1: Figure out who you want to stake to

Before staking tokens to collators, we recommend you do your research on who to stake towards. To figure out the candidate pool, you can find the set of collators in [Subscan](https://turing.subscan.io/validator). Save their wallet address as `COLLATOR_WALLET_ADDRESS` to be used on the step below.

### Step 2: Figure out your inputs
To be stake your delegator via PolakdotJS extrinsics, you'll need to figure out three numbers. We've provided a helpful script for you to use. Navigate to the **Developer > Javascript** tab on the [PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/js).

```javascript
const collatorWalletAddress = 'COLLATOR_WALLET_ADDRESS';
const delegatorWalletAddress = 'YOUR_WALLET_ADDRESS';
const minDelegationStake = await api.consts.parachainStaking.minDelegation;
const candidateInfo = await api.query.parachainStaking.candidateInfo(collatorWalletAddress);
const candidateDelegationCount = JSON.parse(candidateInfo).delegationCount;
const delegatorState = await api.query.parachainStaking.delegatorState(delegatorWalletAddress);
const delegationsLength = delegatorState.delegations ? delegatorState.delegations.length : 0;
console.log(`2a. Minimum amount to be staked: ${minDelegationStake}`);
console.log(`2b. Candidate delegation count: ${candidateDelegationCount}`);
console.log(`2c. Delegation count: ${delegationsLength}`);
```

### Step 3: Stake your tokens to a collator

Currently, everything related to staking needs to be accessed via the Extrinsics menu, under the Developer tab. To delegate a candidate, provide the following information:

![delegate](../../assets/img/staking-delegation/delegate.png)

- `candidate`: This will be the collator you so choose to stake towards from your research in Step 1 and has the same `COLLATOR_WALLET_ADDRESS` from Step 2 above.
- `amount`: Figure out how much you would like to stake to the collator. At minimum you must stake `2a. Minimum amount to be staked` from the output above.
- `candidateDelegationCount`: Values ​​are available from section above as `2b. Candidate delegation count`.
- `delegationCount`: Values ​​are available from the section above as `2c. Delegation count`.

---
## How to stop staking to a collator

### Step 1: Schedule Request to Stop Delegations

To delegate a candidate, send `parachainStaking.scheduleRevokeDelegation` extrinsic by the following information:

![schedule-revoke-delegation](../../assets/img/staking-delegation/schedule-revoke-delegation.png)

Once you have scheduled an exit delay(24 rounds * 600 block, 12 seconds per block in current Turing Network), you must wait an exit delay before you can then execute it.

## FAQ

### How do I pick which collator to delegate to?
While we cannot answer this question for you, you can identify the collator from the [identity](../identity) that they set on-chain. Please do your research on their background based on the information provided. You can also ask #collator-open-chat in our Discord server for more information.

Staking rewards are split evenly between all delegators for a given collator so delegating to a collator with less total stake will net you more proportional rewards.
Only the top 24 collators are selected to the active set for block authoring so any delegations to collators outside the active set will not receive rewards.
Only the top 300 delegators for each collator will receive rewards.

### How do I check how many TUR rewards I’ve received?
You can navigate to [Turing's Subscan](https://turing.subscan.io/event?address=YOUR_NOMINATOR_WALLET&module=parachainstaking&event=reward) page to view your rewards. 

### What rewards will I get?
2.5% of annual inflation is distributed amongst the stakers of each collator (including the collator themselves) based on the number of blocks they successfully author.  Those rewards are distributed proportionally among the stakers of that collator.

As candidates in the active set of collators receive rewards from block production, delegators get rewards as well.

You can view the delegated amount and the change in the balance due to each round of staking rewards on the Accounts page.

![accounts](../../assets/img/staking-delegation/accounts.png)