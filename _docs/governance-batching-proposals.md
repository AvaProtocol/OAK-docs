---
title: Batching Proposals
subtitle: Learn how to batch governance calls using Polkadot.js to speed up process of public and external proposals.
author: christian
tags: [governance]
---

The following document provides information on how to batch governance calls using Polkadot.js and can be used for proposals, council motions, and external proposals. 

The information can be used for creating proposals on the Turing Network, Turing Staging, and OAK Network. Though the methods will also work on other parachains.

### Introduction

Allowing multiple calls to be executed in a single dispatch can be useful for a variety of reasons within the governance system. For example:

- Combining proposals for blockchain runtime upgrade such as `set_code` with the corresponding `set_storage`.

- Updating multiple members for the Council or Technical Committee in the same instance.

- Completing multiple treasury payouts with a singular signature verification.


### Parallel & Sequential

If you want to include multiple actions under a singular governance pre-image, first you must determine if the actions of the request can be run in **parallel** or will need to be run **sequentially**. In most cases, we recommend you to use the sequential method to construct the actions in order. For more information about the process of starting a proposal, check out our documentation for creating a proposal on the Turing network [here](https://docs.oak.tech/docs/governance-propose-change/).

- **Parallel** - All actions will happen simultaneously.

- **Sequentially** - The actions will take place one after the other.

Next, we will walk you through the steps for creating a proposal or motion which uses the Batch functionality.

### Step 1:

Head to the Governance tab on Polkadot.js and click to submit a preimage or council motion in the same method as usual for when creating a proposal.

![menu](../../assets/img/governance/batching-proposals/menu.png)

![submit-buttons](../../assets/img/governance/batching-proposals/submit-buttons.png)

### Step 2:
In the proposal select the **utility** branch of calls from the drop down menu on the left hand side.

![propose-a-council-motion](../../assets/img/governance/batching-proposals/propose-a-council-motion.png)

![utility-pallet](../../assets/img/governance/batching-proposals/utility-pallet.png)


### Step 3:

For actions that can be completed parallel (simultaneously) select the **batch** call. For sequential actions use the **batchAll** call as the calls will then be atomically executed.

![utility-batch](../../assets/img/governance/batching-proposals/utility-batch.png)

![utility-batchall](../../assets/img/governance/batching-proposals/utility-batchall.png)

*Note: If any of the calls fail through a batch call or batchAll, **the whole transaction will roll back.***

*In this demo, we use batch() call for a parallel execution because the three operations can happen at the same time.*

More information about each call can be found here.

[https://paritytech.github.io/substrate/master/pallet_utility/pallet/struct.Pallet.html#method.batch](https://paritytech.github.io/substrate/master/pallet_utility/pallet/struct.Pallet.html#method.batch)

[https://paritytech.github.io/substrate/master/pallet_utility/pallet/struct.Pallet.html#method.batch_all](https://paritytech.github.io/substrate/master/pallet_utility/pallet/struct.Pallet.html#method.batch_all)

### Step 4:

Add the items required for the proposal with the add item button.

*Note: The number of calls must not exceed the `batched_calls_limit` which can be found in the constant metadata.*

![add-item](../../assets/img/governance/batching-proposals/add-item.png)

*Note: The batched calls must be from the same origin.*

For example:

Call 1 -

![add-item](../../assets/img/governance/batching-proposals/call1.png)

Call 2 -

![add-item](../../assets/img/governance/batching-proposals/call2.png)

Call 3 -

![add-item](../../assets/img/governance/batching-proposals/call3.png)

If unsure of the origin type check the pallet information in the link below or search for the correct pallet at the top of the page.

[https://paritytech.github.io/substrate/master/pallet_utility/index.html](https://paritytech.github.io/substrate/master/pallet_utility/index.html)

### Step 5:

Review each action to ensure the details are correct and then submit the proposal/motion in the standard manner. The actions will be batched and only a singular authorization is required for the proposal.

*Note: Be sure to save the call hash*

![call-hash](../../assets/img/governance/batching-proposals/call-hash.png)

### Step 6:

Once your proposal or motion is submitted you can add information for the public about the purpose of your proposal on [Polkassembly](https://turing.polkassembly.io/) and [Subsquare](https://turing.subsquare.io/). We also recommend visiting our community [Discord](https://discord.com/invite/vmvmWFmW5p) and putting a post in our #Governance channel.

An example of a successful batch is displayed below.

![meta-data](../../assets/img/governance/batching-proposals/metadata.png)

To review the entire example on Subsquare click the link [here](https://turing.subsquare.io/council/motion/1261270_0x76cc222d1f650eca64fd61e2ab2616411b9f15c41b9264c6848805f54328ac08).

To review the example on Polkassembly click the link [here](https://docs.oak.tech/).
