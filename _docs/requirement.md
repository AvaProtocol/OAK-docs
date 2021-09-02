---
title: Validator Requirements
subtitle: This document covers the requirement of Becoming a validator
author: charles
tags: [validator]
---

## Minimum System Requirements
- Debian/Ubuntu (Recommended)
- Docker (Optional)
- 20GB storage
- 4GB RAM
- x86 architecture
- Static IP address

## Operating Requirements

- 7 x 24 hours stable running environment
- 7 x 24 hours stable network environment

Networking stable
## Token Requirements
- There is no minimum funding requirement to become a candidate
- Become a validator

	Currently, there are 12 Validators seats on the OAK blockchain. This amount may be adjusted as needed in the future.

	Whether to be selected as a validator depends on the amount of staking funds. Staking funds can be provided by validators and nominators.

	Validator can set more staking reward sharing ratios to encourage more nominees to support himself.

	The nominator can comprehensively consider the stability of the Validator, the amount of funds and the share ratio to select the validator.
## Slashing

Slashing will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. They and their nominators will get slashed by losing a percentage of their bonded/staked OAK.

Any slashed OAK will be added to the Treasury. The rationale for this (rather than burning or distributing them as rewards) is that slashes may then be reverted by the Council by simply paying out from the Treasury. This would be useful in situations such as a faulty runtime causing slashing or forcing validators offline through no fault of their own. In the case of legitimate slashing, it moves tokens away from malicious validators to those building the ecosystem through the normal Treasury process.

Validator pools with larger total stake backing them will get slashed more harshly than less popular ones, so we encourage nominators to shift their nominations to less popular validators to reduce their possible losses.

It is important to realize that slashing only occurs for active validations for a given nominator, and slashes are not mitigated by having other inactive or waiting nominations. They are also not mitigated by the validator operator running separate validators; each validator is considered its own entity for purposes of slashing, just as they are for staking rewards.
