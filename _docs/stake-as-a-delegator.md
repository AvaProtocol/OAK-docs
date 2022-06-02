---
title: Delegate your stake to a collotor
subtitle: Stake as a delegator
author: charles
tags: [delegate, delegator, stake, collotor]
---

# Introduction

Collator candidates with the highest stake in the network join the active pool of collators (block producers), from which they are selected to offer a block to the relay chain.

Token holders can add to candidates' stake using their tokens, a process called delegation (also referred to as staking). When they do so, they are vouching for that specific candidate, and their delegation is a signal of trust. When delegating, tokens are deducted instantly and added to the total amount staked by the user. Exiting a position is divided into a two step operation: scheduling and execution. First, token holders must schedule a request to exit their position, and wait for a given delay or unbonding period, which depends on the network. Once the unbonding period has expired, users can execute their scheduled action.

Once a candidate joins the active set of collators, they are eligible to produce blocks and receive partial block rewards as part of the token inflationary model. They share these as staking rewards with their delegators, considering their proportional contribution toward their stake in the network.

This guide will show you how to stake on Turing via Polkadot.js Apps.

# How to stake to a collator

## Retrieving the List of Candidates

Before starting to stake tokens, it is important to retrieve the list of collator candidates available in the network. To do so:

1. Head to the Developer tab
1. Click on Chain State > Storage
1. Query `parachainStaking.candidatePool`. 

![candidate-pool](../../assets/img/staking-delegation/candidate-pool.png)

As shown above, there are currently two collator candidates in the network.

## Get your Number of Existing Delegations

Query `parachainStaking.delegatorState` by your account.

![delegator-state](../../assets/img/staking-delegation/delegator-state.png)

As shown above, there are currently **`1` delegation** in the account. **Remember this `delegationCount`**, we will use it in the process below.

If you have not delegated, the content here should be `<null>`.

The address of collator candidate is `691Fmzb8rhYmBxLvaqYEUApK22s3o6eCzC4whDY7dZZ83YYQ`, We cannot add delegation repeatedly to the same candidate.
Therefore, in the following process, we will not operate on this candidate. So I use another candidate(`699AH5KqTiTUsdtpQzxa3Bt3fc9yZzt4w5aYj5GPW6byUkmR`) in following sections.

## Get the Candidate Delegation Count

You need to get the candidateInfo, which will contain the delegator count, as you'll need to submit this parameter in a later transaction. To retrieve the parameter, make sure you're still on the Chain State tab of the Developer page, and query `parachainStaking.candidateInfo` by candidate account. 

![candidate-info](../../assets/img/staking-delegation/candidate-info.png)

**Remember the `candidateDelegationCount` value of this candidate**, we will use it in the next section.

## Staking your Tokens

Currently, everything related to staking needs to be accessed via the Extrinsics menu, under the Developer tab. To delegate a candidate, provide the following information:

![delegate](../../assets/img/staking-delegation/delegate.png)

- amount: Amounts are in `Planck`. 1 `TUR` = 10000000000 `Planck`. 

- candidateDelegationCount: Values ​​are available in the "[Get the Candidate Delegation Count](#get-the-candidate-delegation)" section above.

- delegationCount: Values ​​are available in the "[Get your Number of Existing Delegations](#get-your-number-of-existing-delegations)" section above.

# How to Stop Delegations

## Schedule Request to Stop Delegations

To delegate a candidate, send `parachainStaking.scheduleRevokeDelegation` extrinsic by the following information:

![schedule-revoke-delegation](../../assets/img/staking-delegation/schedule-revoke-delegation.png)

Once you have scheduled an exit delay(24 rounds * 600 block, 12 seconds per block in current Turing Network), you must wait an exit delay before you can then execute it.

# Staking Rewards

As candidates in the active set of collators receive rewards from block production, delegators get rewards as well.

In summary, delegators will earn rewards based on their stake of the total delegations for the collator being rewarded (including the collator's stake as well).

You can view the delegated amount and the change in the balance due to each round of staking rewards on the Accounts page.

![accounts](../../assets/img/staking-delegation/accounts.png)

# Risks

Holders of TUR tokens should perform careful due diligence on collators before delegating. Being listed as a collator is not an endorsement or recommendation fromthe Turing Network, or OAK Foundation. Neither the Turing Network, nor OAK Foundation has vetted the list collators and assumes no responsibility with regard to the selection, performance, security, accuracy, or use of any third-party offerings. You alone are responsible for doing your own diligence to understand the applicable fees and all risks present, including actively monitoring the activity of your collators.

You agree and understand that neither the Turing Network, nor OAK Foundation guarantees that you will receive staking rewards and any applicable percentage provided (i) is an estimate only and not guaranteed, (ii) may change at any time and (iii) may be more or less than the actual staking rewards you receive. The OAK Foundation makes no representations as to the monetary value of any rewards at any time.

Staking TUR tokens is not free of risk. Staked TUR tokens are locked up, and retrieving them requires a waiting period. Additionally, if a collator fails to perform required functions or acts in bad faith, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators. If a collators behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another collator. Delegators can also mitigate risk by electing to distribute their stake across multiple collators.
