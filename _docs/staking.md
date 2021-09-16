---
title: Staking
subtitle: This document covers the staking, reward mechanism and estimated rate of return.
author: chris
tags: [develop]
---

## Staking
OAK Network uses [NPoS (Nominated Proof-of-Stake)](../consensus) as its consensus mechanism. In NPoS, users are free to become validator candidates, or become nominators. Nominators approve of candidates that they trust and back them with their tokens, and once per era a committee of validators is elected according to the current nominators’ preferences.

Both validators and nominators lock their tokens as collateral and receive staking rewards on a pro-rata basis, but may also be slashed and lose their collateral in case a backed validator shows negligent or adversarial behavior. Nominators thus participate indirectly in the consensus protocol with an economic incentive to pay close attention to the evolving set of candidates and make sure that only the most capable and trustworthy among them get elected.
### Reward Rate
The staking reward for validators and nominators is designed in a way that it correlates to the staking rate of all OAK tokens. The inflation rate of the network is designed to be approximately 10% annually, and an ideal staking rate is set at 70%, as shown in below graph. Validators and nominators are incentivized to stake OAK towards the ideal staking rate. At 70% staking rate, __the annual rate of return for stakers is approximately at 20%__, assuming that the OAK tokens are continuously staked during a year.


![staking_rate](../../assets/img/staking/staking-rate.png)

- x-axis: Proportion of DOT staked
- y-axis: Inflation, annualized percentage

- Blue line: Inflation rewards to stakers
- Green line: Staker rate of return

The above chart shows the inflation model of the network. Depending on the staking participation, the distribution of the inflation to validators/nominators versus the treasury will change dynamically to provide incentives to participate (or not participate) in staking.

For instance, assuming that the ideal staking rate is 70%, all of the inflation would go to the validators/nominators if 70% of all OAK are staked. Any deviation from the 70% - positive or negative - sends the proportional remainder to the treasury and effectively reduces staking rewards.

### Reward Distribution

Rewards are recorded per session (approximately four hours on OAK Network) and calculated per era (approximately twenty-four hours). Thus, rewards will be calculated once per day.

Rewards are calculated based on era points, which have a probabilistic component. In other words, there may be slight differences in your rewards from era to era, and even amongst validators in the active set at the same time. These variations should cancel out over a long enough timeline. 

### Slashing
Slashing will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. They and their nominators will get slashed by losing a percentage of their bonded/staked OAK.

Any slashed OAKs will be added to the Treasury. The rationale for this (rather than burning or distributing them as rewards) is that slashes may then be reverted by the Council by simply paying out from the Treasury. This would be useful in situations such as a faulty runtime causing slashing or forcing validators offline through no fault of their own. In the case of legitimate slashing, it moves tokens away from malicious validators to those building the ecosystem through the normal Treasury process.

Validator pools with larger total stake backing them will get slashed more harshly than less popular ones, so we encourage nominators to shift their nominations to less popular validators to reduce their possible losses.

It is important to realize that slashing only occurs for active validations for a given nominator, and slashes are not mitigated by having other inactive or waiting nominations. They are also not mitigated by the validator operator running separate validators; each validator is considered its own entity for purposes of slashing, just as they are for staking rewards.
