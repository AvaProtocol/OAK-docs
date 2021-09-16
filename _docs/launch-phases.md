---
title: Mainnet Launch Phases
subtitle: This document covers the operating procedures for OAK network launch
author: chris
tags: [develop]
---

## OAK Network Launch Phases
The OAK Network mainnet launch follows a phased roll-out plan, with important milestones toward decentralization marking each phase. Please keep up-to-date with the OAK's phased roll-out plan at by viewing [the OAK Network Roadmap](https://oak-network.notion.site/oak-network/984d64e9778c4677883a9338e4abc1a6).
### 1. The PoA Launch
The Genesis block of the OAK Network will be launched on the 2nd quarter of 2022, as a Proof of Authority (PoA) network. Governance was restricted to the single Sudo (super-user) key, which was held by the OAK Foundation to issue the commands and upgrades necessary to complete the launch process. During this time, validators start joining the network and signaling their intention to participate in consensus.
### 2. Nominated Proof of Stake
Once the OAK Foundation feels confident in the stability of the network and there is a sufficient number of validator intentions, the OAK Foundation will use Sudo — a superuser account with access to governance functions — to initiate the first validator election. Following the election, the network transitioned from PoA into its second phase, Nominated Proof of Stake (NPoS). For detailed information about the consensus, please refer to the [NPoS Consensus](../consensus).
### 3. Enable Governance
After the chain has been running well with the validator set, the Sudo key will issue a runtime upgrade that enabled the suite of governance modules in OAK; namely, the modules to enable a Council, a Technical Committee, and public referenda.
### 4. Remove Sudo
The Sudo module is removed by a runtime upgrade, transitioning the governance of the chain into the hands of the token (OAK) holders.

From this point, the network will be entirely in the hands of the token holders and is no longer under control of any centralized authority.
### 5. Enable Balance Transfers
The last step is to enable balance transfer for OAK tokens. In order to enable it, the community needs to make a public proposal for a runtime upgrade that lifts the restriction on balance transfers. Transfer functionality will be subsequently enabled on OAK after the proposal is approved.
