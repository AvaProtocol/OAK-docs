---
title: Updates and Roadmap
subtitle: This document covers the detail of OAK and Turing network updates and roadmap
author: chris
tags: [develop]
date: 2022-01-04
---

The Polkadot ecosystem enables multiple types of networks: a testnet, canary and mainnet. Below are the different networks.
- *Turing Staging (TUR)*: testnet parachain; expect chaos and occassional downtime for the network; these tokens hold no value
- *Turing (TUR)*: Kusama parachain (launched April 2022); this is a canary, expect chaos but limited/no downtime; these tokens do hold value
- *OAK*: Polkadot parachain (expected to launch November 2022); this is the mainnet

## 4Q2021 - Completed & Launched
- Event Registry Proof of Concept

## 1Q2022 - Completed & Launched
### Apps
- OAK Website Design Rebrand
- Kusama crowdloan for Turing (TUR) Network parachain

### Blockchain
- Neumann Testnet Launch (Testnet)
  - Neumann is a parachain version of the forenamed “OAK Testnet” in the PolkadotJS App
- Onboarding community collators (closed set) to the Neumann testnet
- Event Registry (Event VM): development and testing of the core time-based event data structure
- Missed events implementation: handling missed tasks for a given time slot
- **Triggers:** time
- **Actions:** sending an event, and wallet-to-wallet transaction for NEU

## 2Q2022 - Completed & Launched 
### Apps
- Blockchain SDKs for developers (JS) - [DApp Competition](https://oak.tech/community/grants/)
- Turing Automation DApps: transparency for the end-users' transactions
- DEX integration with select partner
- Yield farming integration with select partner (e.g. adjusting composable yield strategies based on personal risk profiles)
- Wallet integration with select partner

### Blockchain
- [Turing Network Launch (Kusama Parachain)](https://oak.tech/turing/phases/)
- Turing Network is fully decentralized
- Onboarding more collators to the Neumann & Turing Networks
- Security & technical audits
- Time specificity: crafting granularity in when a task is to be triggered and at what slippage
- HRMP Channels to select partners (Karura, Parallel, Khala)
- **Triggers:** staking events
- **Actions:** recurring actions, cross-chain asset transfer

## 3Q2022 - In Progress
### Apps
- Polkadot crowdloan app for OAK
- Auto-compounding with select partners
- Liquidity pool compounding with select partner
- Portfolio and other DApp integrations with additional partners for Turing

### Blockchain
- Removal of sudo for Turing Network
- EVM integration with select partner
- Node infrastructure performance optimization
- Customized triggers for consumers and developers
- **Triggers:** price, XCMP events
- **Actions:** smart contracts, limit orders, XCMP events

## 4Q2022
### Apps
- Trigges and Actions DApp Marketplace: an online marketplace where creators can submit automation DApps and consumers can opt to use them similar to [IFTTT](https://ifttt.com/explore)

### Blockchain
- OAK Network Launch
- Ethereum bridge expansion
- Private automated tasks pilot
- Automation fees optimization
- Insurance fees pilot
- Refunding tasks pilot
- Customized triggers for consumers and developers
- **Triggers:** smart contracts, external data feed (weather, etc.)
- **Actions:** IoT actions

