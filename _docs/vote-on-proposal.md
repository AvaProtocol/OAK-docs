---
title: Voting on Proposals
subtitle: Learn how to vote on governance proposals on the Turing Network
author: christian
tags: [governance]
---

![how-to-vote](../../assets/img/governance/how-to-vote.jpg)

### Introduction

After a proposal has reached public referenda – token holders may vote in support of the proposal by locking TUR tokens. The weight and impact of the vote is determined by:

1.  The number of tokens locked.
2.  The duration the tokens will remain locked for – referred to as conviction.

The purpose of this system is to ensure that votes are backed by genuine token holders. This governance system has been demonstrated to be effective on Kusama and other parachains within the ecosystem.

### Definitions

Key parameters for this document include the following

-   **Voting period** – The total duration of a referendum that users may vote during. This duration is 5 days for the Turing Network.

-   **Turnout** – the total number of tokens for and against a vote.

-   **Electorate** – the total number of tokens issued by the network.

-   **Maximum number of votes** – the maximum number of votes per an account. This is 100 for the Turing Network

-   **Enactment period** – The time after a proposal has been approved. This is 2 days for the Turing Network.

-   **Lock period -** Minimum duration of time that the tokens of winning voters are locked for. Tokens locked from voting can still be used for staking or further voting.

-   **Delegation –** The process of transferring your voting power to another individual.

### The Journey of a Proposal

Before a change is enacted within the system a proposal must go through a comprehensive process from starting as a preimage to being an enacted referendum.

1.  A token holder must create a proposal preimage which defines the action or change to be carried out. The individual who submitted the primage proposal must pay a fee in return for a preimage hash.
2.  Token holders can now submit the proposal using the preimage hash locking the proposal deposit tokens. Successfully submission will list the proposal publicly.
3.  Other token holders may now endorse/second the proposal by locking their tokens in support of the proposal. Seconding or endorsing a proposal will lock the same value of tokens as the original proposal deposit.
4.  The proposal with the most seconded votes will move to the public referendum.
5.  Token holders vote Aye or Nay on proposals within the referendum. Any token holder can lock an allocation of their tokens for a selected amount of time. A greater number of tokens locked for a longer length of time will create a stronger vote impact.
6.  If a proposal passes it will be enacted following the enactment period.

### Voting on a Referendum

The following section describes the process for voting on a referendum. You can currently vote on referenda using the Polkdadot.js app or through Subsquare.  In the near future Polkassembly support will be added as an alternative way to vote.

#### How to Vote via Polkadot.js.

You may vote on a proposal using your Polkadot.js wallet account. Simply navigate to the Polkadot.js [Turing's Democracy page](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/democracy).

Voting on the Turing network is relatively straight forward. For users with experience with voting on Kusama or Polkadot or another parachain, this process will be familiar. Referenda that are available for voting will be found in the democracy page on Polkadot.js. Select a referendum that you wish to vote on and click the **vote** button.

![vote-button-polkadotjs](../../assets/img/governance/vote-button-polkadotjs.png)

After clicking the vote button, you will be required to provide the following information:

1.  Select the account you wish to vote from.
2.  Enter the number of tokens that you want to lock up for your vote. You are not able to vote with your entire balance – this is to ensure your wallet maintains the minimum amount of tokens. This minimum deposit is called Existential Deposit (ED) and for Turing is .01 TUR.  Maintaining a minimum of .01 TUR in your wallet will ensure it stays active.
3.  Select the conviction multiplier. This field determines the duration your tokens will be locked for. The longer the lock duration the greater your voting weight.
4.  Click on either **Vote Aye** or **Vote Nay** to either support or oppose the proposal. Finally, sign the transaction.

![aye-button-polkadotjs](../../assets/img/governance/aye-button-polkadotjs.png)

After the conclusion of the voting period, approved proposals from the referendum will be visible under the **Dispatch** tab. This tab will also display the time remaining until the proposal is enacted.

![dispatch-queue](../../assets/img/governance/dispatch-queue.png)

#### How to Vote via Subsquare

If you would like an alternative to voting using the democracy tab on Polkadot.js you can also use the [<u>Turing Network Governance dashboard</u>](https://turing.subsquare.io/) on Subsquare for governance. The Subsquare dashboard can be used for endorsing proposals, voting on referenda, and participating in governance-based discussions. You will still need the Polkadot.js wallet extension. Once you have navigated to the [<u>Turing Network Governance dashboard</u>](https://turing.subsquare.io/) you will need to complete the following steps.

1.  Login to the Subsquare platform using the account you wish to vote from.

![login-subsq](../../assets/img/governance/login-subsq.png)

2.  You will need to provide an email address if you wish to receive notifications and updates on your votes.
3.  Select the referenda you wish to vote on and click the vote icon on the right side of the screen.

![vote-button-subsq](../../assets/img/governance/vote-button-subsq.png)

4.  Enter the amount of TUR tokens (value) you wish to lock and set the conviction multiplier (vote lock) and select your **Aye** or **Nay** vote. Finally, sign the transaction.

![aye-button-subsq](../../assets/img/governance/aye-button-subsq.png)