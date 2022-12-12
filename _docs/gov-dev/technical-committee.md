---
title: Technical Committee Operations
subtitle: Learn how to use Technical Committee via the polkadot.js app
author: charles
tags: [governance]
---

This article introduces how to use some functions of Technical committee.

*Pre-requisite: Before reading this article, you should be familiar with [how to submit a proposal](/docs/gov-dev/governance-via-polkadotjs/#introduction).*

## Fast-track an external proposal

When an urgent upgrade or configuration is required, the Technical Committee can use the "Fast track" to make **the external proposal submitted by the council** immediately go to a short referendum, and can set a short delay time for scheduled execution time.

![fast-track-external-proposal](../../../assets/img/governance-guide-for-developer/fast-track-external-proposal.png)

As shown in the figure below, a member of the Technical Committee submitted a Fast track proposal, setting the `voting period` to 20 blocks. When the voting is over, the proposal is executed after a delay of 1 block.

`voting period` must be greater than or equal to `FastTrackVotingPeriod` configured by pallet_democracy. `FastTrackVotingPeriod` is `3` hours in Turing.

![fast-track-proposal-submission-form](../../../assets/img/governance-guide-for-developer/fast-track-proposal-submission-form.png)

When the threshold is reached, click close to move the proposal to referenda.

![close-fast-track-proposal](../../../assets/img/governance-guide-for-developer/close-fast-track-proposal.png)

## Veto an external proposal

Any single Technical Committee member may veto a coming council proposal (external proposal). 

When a external proposal is vetoed, it is not only removed from democracy but also added to the blacklist.

The council can no longer submit proposals in the blacklist.

After the cooloff period (5 days in Turing, 10 days in OAK), the proposal will be removed from the blacklist.

1. Get the proposal hash**

	This is an external proposal. Please record the proposal hash for later use.

	![external-proposal](../../../assets/img/governance-guide-for-developer/technical-committee/veto-external/external-proposal.png)

1. Submit extrinsic**

	Submit an extrinsic to veto external proposal with proposal hash.

	Because calling `vetoExternal` requires Technical Committee permission. So we call it through `technicalCommittee.execute`.

	![veto-external](../../../assets/img/governance-guide-for-developer/technical-committee/veto-external/veto-external.png)

	*Note: The `lengthBound` parameter value must be larger than `proposal.using_encoded(|x| x.len())`*

	After executing the above extrinsic, the external proposal will be vetoed immediately.

	**Note: Please close this motion before the external proposal goes to a referendum.*8

## Cancel a proposal

We can remove a proposal in democracy through the Technical Committee.

1. Get the proposal index

	This is a proposal. Please record the proposal index for later use.

	![proposal](../../../assets/img/governance-guide-for-developer/technical-committee/cancel-proposal/proposal.png)

1. Submit a technical-committee motion

	Submit a technical-committee motion to cancel a proposal with proposal index.

	This call requires all Technical Committee members to approve. So we need to set the `threshold` to the number of Technical Committee members.

	![cancel-proposal](../../../assets/img/governance-guide-for-developer/technical-committee/cancel-proposal/cancel-proposal.png)

2. Vote

	![vote](../../../assets/img/governance-guide-for-developer/technical-committee/cancel-proposal/vote.png)

3. Close technical-committee proposal to execute.

	When you close the technical-committee proposal, the proposal in democracy will be removed.

	*Note: Please close this technical-committee proposal before the democracy proposal goes to a referendum.*

