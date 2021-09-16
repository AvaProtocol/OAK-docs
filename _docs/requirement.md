---
title: Validator Requirements
subtitle: This document covers the operating and token requirements of a validator
author: charles
tags: [validator]
---

## Minimum System Requirements
- Debian/Ubuntu (Recommended)
- Docker (Optional)
- 250GB storage
- 4GB RAM
- Static IP address

## Operating Requirements
Validators in a Proof of Stake network are responsible for keeping the network in consensus and verifying state transitions. As the number of validators is limited, validators in the set have the responsibility to be online and faithfully execute their tasks.

This primarily means that validators:

- Must be high availability.
- Must have infrastructure that protects the validator's signing keys so that an attacker cannot take control and commit slashable behavior.

>⚠️ Warning: It is highly recommended that you have significant system administration experience before attempting to run your own validator. You must be able to handle technical issues and anomalies with your node which you must be able to tackle yourself. Being a validator involves more than just executing the Polkadot binary.

## Token Requirements
Currently there is no minimum funding requirement to become a validator candidate. There are 12 Validators seats on the OAK testnet, meaning at any time the maximum number of validators selected is 12. The number 12 might change in future.

Whether to be selected as a validator depends on the amount of staking funds. Staking funds can be provided by both validators and nominators. Validator can set more staking reward sharing ratios to encourage more nominees for support.

In order to select a validator, a nominator should consider several factors comprehensively, including the stability of the Validator node, the amount of staked funds and the profit share ratio.

## Slashing

Slashing will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. They and their nominators will get slashed by losing a percentage of their bonded/staked OAK.

Any slashed OAK will be added to the Treasury. The rationale for this (rather than burning or distributing them as rewards) is that slashes may then be reverted by the Council by simply paying out from the Treasury. This would be useful in situations such as a faulty runtime causing slashing or forcing validators offline through no fault of their own. In the case of legitimate slashing, it moves tokens away from malicious validators to those building the ecosystem through the normal Treasury process.

Validator pools with larger total stake backing them will get slashed more harshly than less popular ones, so we encourage nominators to shift their nominations to less popular validators to reduce their possible losses.

It is important to realize that slashing only occurs for active validations for a given nominator, and slashes are not mitigated by having other inactive or waiting nominations. They are also not mitigated by the validator operator running separate validators; each validator is considered its own entity for purposes of slashing, just as they are for staking rewards.
