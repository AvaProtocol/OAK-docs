---
title: NPoS Consensus
subtitle: This document explain the consensus and its hybrid approach of implementations on OAK Network
author: chris
tags: [develop]
date: 2021-08-31
---

Consensus is a method for blockchain nodes to reach an agreement over a shared state. It is the method on which the nodes in a decentralized network rely to stay synced with each other. Without consensus, there is no way to ensure that the state one node believes true will be shared by the other nodes. Consensus aims to provide an objective view of the state amid participants who each have their own subjective views. 

OAK Network chooses __NPoS, or Nominated Proof of Stake__ as its network's consensus method.

## Nominated Proof of Stake
Many blockchain projects launched in recent years substitute the highly inefficient Proof-of-Work (PoW) component of Nakamoto’s consensus protocol with Proof-of-Stake (PoS), in which validators participate in block production with a frequency proportional to their token holdings, as opposed to their computational power. However, while a pure PoS system allows any token holder to participate directly, most projects propose some level of centralized operation, where the number of validators with full participation rights is limited. 

Therefore, rather than let the centralized operation be formed off-chain, it is more convenient for the system to formalize a democracy on-chain, and allow users to vote with their stake to elect validators that represent them and act on their behalf. Networks following this approach include Polkadot, Cardano, EOS, Tezos, and Cosmos, among many others. While similar in spirit, the approaches in these networks vary in terms of design choices such as the incentive structure, the number of validators elected, and the election rule used to select them.

### Validators and Nominators
The Nominated Proof of Stake is designed with the roles of __validators__ and __nominators__, to maximize chain security.

Validators do most of the heavy lifting: they produce new block candidates in BABE, vote and come to consensus in GRANDPA, validate the state transition function of parachains, and some other responsibilities regarding data availability and XCM.

Nominators, on the other hand, have far fewer responsibilities. They can choose to approve validator candidates who they trust and back them with their tokens. Once delegate their tokens to validators, nominators responsibilities include monitoring their validators' performance, keeping an eye on changing commission rates (a validator can change commission at any time), and general health monitoring of their and their validators' account. Thus, a nominator's experience is relatively hands-off compared to a validators.

## Hybrid Approach of Implementation
There are two protocols we use when we talk about the consensus protocol of OAK Network, [__GRANDPA__](#grandpa) and [__BABE__](#babe), the combination of which is known as a hybrid consensus. Hybrid consensus splits up the finality gadget from the block production mechanism.

The approach is invented and applied in Polkadot Network. This is an approach of getting the benefits of probabilistic finality (the ability to always produce new blocks) and provable finality (having a universal agreement on the canonical chain with no chance for reversion). It also avoids the corresponding drawbacks of each mechanism (the chance of unknowingly following the wrong fork in probabilistic finality, and a chance for "stalling" - not being able to produce new blocks - in provable finality). By combining these two mechanisms, OAK Network allows for blocks to be rapidly produced, and the slower finality mechanism to run in a separate process to finalize blocks without risking slower transaction processing or stalling.

In below sections we will examine each component separately.
<a name="babe"></a>
### BABE: Block Production
BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between the validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to [Ouroboros Praos](https://eprint.iacr.org/2017/573.pdf), with some key differences in chain selection rule and slot time adjustments. BABE assigns block production slots to validators according to stake and using the OAK randomness cycle.

Validators in OAK Network will participate in a lottery in every slot that will tell them whether or not they are the block producer candidate for that slot. Slots are discrete units of time, nominally 6 seconds in length. Because of this randomness mechanism, multiple validators could be candidates for the same slot. Other times, a slot could be empty, resulting in inconsistent block time.
<a name="grandpa"></a>
### GRANDPA: Finality Gadget

GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement) is the finality gadget that is implemented as the second component of the hybrid approach. It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly speeding up the finalization process, even after long-term network partitioning or other networking failures. In other words, as soon as more than 2/3 of validators attest to a chain containing a certain block, all blocks leading up to that one are finalized at once.

