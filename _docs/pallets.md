---
title: Pallets & Modules
subtitle: This document covers the specifications of OAK testnet
author: charles
tags: [collators]
---

### Source code
The source code of OAK's testnet is hosted on [OAK Network's Github](https://github.com/OAK-Foundation/OAK-blockchain).  

### Core modules
The major pallets are as follows
- Automation Time - our core automation for time triggers

- System - core substrate functionality

- Timestamp - timestamp runtime oracle

- Session - authority session keys management

- BABE - block producing consensus engine

- Indices - account indexing engine

- Balances - native asset operations

- RandomnessCollectiveFlip - random number generator

- Contracts - smart contract support

- Sudo - superuser actions

### Governance modules

- Democracy - The public referenda chamber is a on-chain governance. Public referenda can be proposed and voted on by any token holder in the system as long as they provide a bond. 

- Council - The council is an elected body of on-chain accounts that are intended to represent the passive stakeholders of Polkadot and/or Kusama.

- Treasury - The Treasury is a pot of funds collected through transaction fees, slashing, staking inefficiencies, etc.

- Bounties - Bounties Spending proposals aim to delegate the curation activity of spending proposals to experts called Curators: They can be defined as addresses with agency over a portion of the Treasury with the goal of fixing a bug or vulnerability, developing a strategy, or monitoring a set of tasks related to a specific topic: all for the benefit of the Polkadot ecosystem.

- TechnicalCommittee - The Technical Committee can, along with the Council, produce emergency referenda, which are fast-tracked for voting and implementation. These are used for emergency bug fixes, or rapid implementation of new but battle-tested features into the runtime.

### Funding modules

- Quadratic Funding - A crowdfund matching mechanism for public goods
