---
title: Collator Guide
subtitle: This document covers the operating and token requirements of a collator
author: irsal
tags: [infra]
---

## Minimum System Requirements
- Debian/Ubuntu (Recommended)
- Docker (Optional)
- 30GB storage
- 6400M memory
- 2000M CPU
- Static IP address

## Operating Requirements
Collators are responsible for producing block candidates for the parachain.

This primarily means that collators:

- Must be high availability.
- Must have infrastructure that protects the collator's signing keys so that an attacker cannot take control and commit slashable behavior.

>⚠️ Warning: It is highly recommended that you have significant system administration experience before attempting to run your own collator. You must be able to handle technical issues and anomalies with your node which you must be able to tackle yourself. Being a collator involves more than just executing the Polkadot binary.

## Token Requirements
Currently there is no minimum funding requirement to become a collator candidate. There are 12 collators seats on the OAK testnet, meaning at any time the maximum number of collators selected is 12. The number 12 might change in future.

Whether to be selected as a collator depends on the amount of staking funds. Staking funds can be provided by both collators and nominators. collator can set more staking reward sharing ratios to encourage more nominees for support.

In order to select a collator, a nominator should consider several factors comprehensively, including the stability of the collator node, the amount of staked funds and the profit share ratio.

## Slashing

Slashing will happen _manually_ if a collator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network.

## Interested in becoming a collator?

Please email collators@oak.tech.
