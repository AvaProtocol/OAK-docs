---
title: Testnet Specifications
subtitle: This document covers the specifications of testnet
author: xingyou
tags: [validator]
---

## Versioning

- spec-name: oak-testnet

- impl-name: oak-testnet-node

Version naming notation:

- Authoring version: Equals testnet generation spec. Testnet generation will not change authoring interface.

- Spec/Impl Versions: High number = testnet generation; low number = testnet runtime upgrades. Example: 10 for Testnet v1 genesis, 21 for Testnet v2 Patch 1.

Testnet generation my not be backwards compatible with old networks. A periodic blockchain wipe is suggested for compatibility and to keep testnet resources available for other users.

**Testnet generation life cycle is estimated to be between two weeks and two months**

### Testnet Migration Guidelines

Testnet upgrade types fall into one of two categories:

- Major upgrade

- Minor runtime patch

Runtime patches have a minor impact and end users should not notice any changes. These patches are non breakable features and minor network maintenance patches.

Major upgrades occur when the testnet is completely rebuilt including major upgrades and changes from the previous version. These upgrades increase the version number. These upgrades can include breaking changes or entire blockchain wipes to optimize user resources.

## OAK Testnet

This is a reference network for future mainnet.

Planned features:

- Vitural machine for smart contracts.

Operator staking

- Validator rewards.

Version

- authoring_version: 10

- spec_version: 256
  
- impl_version: 1

### Core modules

- System - core substrate functionality

- Timestamp - timestamp runtime oracle

- Session - authority session keys management

- Babe - block producing consensus engine

- Grandpa - block finalizing consensus engine

- Indices - account indexing engine

- Balances - native asset operations

- RandomnessCollectiveFlip - random number generator

- Contracts - smart contract support

- Sudo - superuser actions

### Governance modules

- Democracy - public voting

- Council - The council is an elected body of on-chain accounts that are intended to represent the passive stakeholders of Polkadot and/or Kusama.

- Treasury - The Treasury is a pot of funds collected through transaction fees, slashing, staking inefficiencies, etc.

- Bounties - Bounties Spending proposals aim to delegate the curation activity of spending proposals to experts called Curators: They can be defined as addresses with agency over a portion of the Treasury with the goal of fixing a bug or vulnerability, developing a strategy, or monitoring a set of tasks related to a specific topic: all for the benefit of the Polkadot ecosystem.

- TechnicalCommittee - The Technical Committee can, along with the Council, produce emergency referenda, which are fast-tracked for voting and implementation. These are used for emergency bug fixes, or rapid implementation of new but battle-tested features into the runtime.

### Funding modules

- Quadratic Funding - A crowdfund matching mechanism for public goods
