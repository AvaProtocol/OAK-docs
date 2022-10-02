---
title: Creating a Proposal
subtitle: Learn how to propose a change through governance on the Turing Network
author: christian
tags: [governance]
---

![how-to-create-a-proposal](../../assets/img/governance/how-to-create-a-proposal.jpg)

### Introduction

A governance proposal is a submission to the chain in which a token holder suggests for a change or action to be implemented by the system. Any token holder may create a proposal through the governance network.

Proposals are a foundational element for any governance system as they operate as the main tool for how the users and community can enact change. On the Turing Network users with TUR tokens will be able to create, endorse, and vote on proposals using their TUR wallet address.

The following document describes the process of creating a proposal. 

### Definitions

Key parameters for this document include:

-   **Proposal** – an action being proposed by a TUR token holder.

-   **Endorse** – another user may endorse/second a proposal if they wish to support the proposal becoming a public referenda. Seconding a proposal requires matching the deposit of the original proposal.

-   **Preimage hash** – the hash of the proposal to be enacted. The hash is used primarily as an identifier.

-   **Minimum proposal deposit** – the minimum amount of TUR tokens that must be bonded when submitting a proposal.

-   **Launch period** – how often new public referendums are launched.

-   **Cool**-**off period** – duration of time in which a proposal must wait before being re-submitted after a veto.

| **Variable**             | **Value**             |
|--------------------------|-----------------------|
| Launch period            | 36000 blocks (5 days) |
| Cool-off period          | 50400 blocks (7 days) |
| Minimum preimage deposit | 4 TUR                 |
| Minimum proposal deposit | 40 TUR                | 

### The Journey of a Proposal

Before a change is enacted within the system a proposal must go through a comprehensive process from starting as a preimage to being an enacted referendum.

1.  A token holder must create a proposal preimage which defines the action or change to be carried out. The individual who submitted the preimage proposal must pay a fee in return for a preimage hash.
2.  Token holders can now submit the proposal using the preimage hash locking the proposal deposit tokens. Successfully submission will list the proposal publicly.
3.  Other token holders may now endorse/second the proposal by locking their tokens in support of the proposal. Seconding or endorsing a proposal will lock the same value of tokens as the original proposal deposit.
4.  The proposal with the most seconded votes will move to the public referendum.
5.  Token holders vote Aye or Nay on proposals within the referendum. Any token holder can lock an allocation of their tokens for a selected amount of time. A greater number of tokens locked for a longer length of time will create a stronger vote impact.
6.  If a proposal passes it will be enacted following the enactment period.

![governance-flow-diagram](../../assets/img/governance/flow-diagram.png)

### How to create a proposal

The following section will cover the process of creating a proposal using the Polkadot.js portal – this process will include the creation of a preimage. All aspects of governance for the Turing Network can be found under the [Democracy tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/democracy) on the Polkadot portal.

#### Steps to submit a preimage:

1.  Navigate to [Turing's Democracy page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/democracy) and click the "Submit preimage" button.

![submit-preimage-button](../../assets/img/governance/submit-preimage-button.png)

2.  Select the account from which you want to submit a preimage.
3.  Choose the pallet you wish to interact with and the action (dispatchable function) to propose.
4.  Enter the code or string you wish to implement. Identical proposals will not be accepted. Information from the proposal will be stored on-chain so do not enter sensitive or inappropriate information.
5.  Copy and save the preimage hash. This hash will represent your proposal so store it safely.
6.  Click the Submit preimage button to complete and sign the transaction.

The storage cost of the preimage is displayed at the bottom corner of the below screen.

![submit-preimage](../../assets/img/governance/submit-preimage.png)

### Submitting a Proposal

Once you have successfully submitted a preimage you can use the democracy screen to follow the next steps to submit a proposal.

#### Steps to submit your proposal:

1.  Navigate to [Turing's Democracy page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/democracy) and click the "Submit proposal" button.

![submit-proposal-button](../../assets/img/governance/submit-proposal-button.png)

2.  Select the account from which you want to submit the proposal. If only one account is connected this will be the only one available.
3.  Enter the preimage hash that you saved from earlier.
4.  Set the balance you wish to lock. Proposals with the greatest number of tokens will be included within the next referendum.
5.  Click the Submit proposal button and sign the transaction.

![submit-proposal](../../assets/img/governance/submit-proposal.png)

![authorize-transaction](../../assets/img/governance/authorize-transaction.png)

After the transaction is submitted you will see a confirmation window in the top right corner of the Polkadot.js interface.

### Discussing Proposals

An important aspect of a functional governance system is providing an environment where users can discuss current and future proposals. Discussion is important for ensuring that the community is appropriately informed about the future of the Turing Network. There are a number of ways to get involved in the community and discuss current proposals:

-   The [Turing Network Governance dashboard](https://turing.subsquare.io/) on Subsquare provides a discussion tab.

-   [Polkassembly](https://kusama.polkassembly.io/) also offers a dashboard for discussion and will support Turing in the near future.

-   A Governance channel on our community [Discord](https://discord.gg/7W9UDvsbwh) is available for any discussions about on-chain governance or democracy.

### Endorsing and Seconding a Proposal

To endorse or second a proposal means that you are in agreement with the proposal and wish to support the proposal reaching public referenda. This support requires a user to lock their tokens for the same amount as the proposer’s original deposit.

A single account or user may endorse a proposal multiple times. A proposal's success is determined by the number of tokens locked in support of the proposal, not the number of supporters.

The following section will outline the steps to endorsing a proposal. To begin the process, click the Endorse button located to the right of the proposal you wish to support.

![endorse-button](../../assets/img/governance/endorse-button.png)

From here you can review the following information:

1.  Ensure that the correct account has been selected.
2.  Verify that you understand the number of tokens that will be required to endorse the proposal.
3.  Confirm that you have selected the correct proposal.
4.  When ready you can click the Endorse button and sign the transaction.

![endorse-proposal](../../assets/img/governance/endorse-proposal.png)

Once the transaction is submitted successfully you will be able to see your endorsement on the proposal screen. Tokens will be locked for the duration of the proposal and subsequent referendum.

![endorsement](../../assets/img/governance/endorsement.png)