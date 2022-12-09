---
title: Fast-track an External Proposal
subtitle: Learn how to fast-track an external proposal with Technical Committee via the polkadot.js app
author: charles
tags: [governance]
---
# Fast track

*Pre-requisite: Before reading this article, you should be familiar with [how to submit a proposal](/docs/gov-dev/governance-via-polkadotjs/#introduction).*

When an urgent upgrade or configuration is required, the technical committee can use the "Fast track" to make **the external proposal submitted by the council** immediately go to a short referendum, and can set a short delay time for scheduled execution time.

![fast-track-external-proposal](../../../assets/img/governance-guide-for-developer/fast-track-external-proposal.png)

As shown in the figure below, a member of the technical committee submitted a Fast track proposal, setting the `voting period` to 20 blocks. When the voting is over, the proposal is executed after a delay of 1 block.

`voting period` must be greater than or equal to `FastTrackVotingPeriod` configured by pallet_democracy. `FastTrackVotingPeriod` is `3` hours in Turing.

![fast-track-proposal-submission-form](../../../assets/img/governance-guide-for-developer/fast-track-proposal-submission-form.png)

When the threshold is reached, click close to move the proposal to referenda.

![close-fast-track-proposal](../../../assets/img/governance-guide-for-developer/close-fast-track-proposal.png)
