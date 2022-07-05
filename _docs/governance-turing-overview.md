---
title: Governance on the Turing Network
subtitle: Overview of governance on the Turing Network
author: christian
tags: [governance]
---

![governance-overview](../../assets/img/governance/governance-overview.png)

#### Introduction

The Turing Network is a decentralized network in which all token holders will have the opportunity to help govern and influence the future development of the network. Turing’s governance process will enable the sentiment and desires of our community to be considered when advancing our protocol. Our governance process has been designed to be inclusive of all members of the Polkadot and Kusama ecosystems including developers, collators, users, investors, partners, and other contributors. OAK Network highly values open discussion and will utilize governance forums such as the [Subsquare governance dashboard](https://turing.subsquare.io/) to enable proposals to be generated and shaped based on community input.

#### Governance Definitions

Some important terms to understand when engaging with Turing Network governance.

-   **Proposals** **–** Items or actions which are proposed by TUR token holders. During a launch period the proposal with the most support is moved to referendum status.

-   **Referendum –** A proposal which has received the most votes by the community during a launch period. There can be a maximum of five active referenda at a time.

-   **Launch period –** A period of 5 days in which new public referenda are launched.

-   **Voting period –** The time length in which TUR token holders have to vote for a referendum.

-   **Fast-Track Voting Period –** The duration for voting for emergency proposals which address critical issues.

-   **Voting –** Token holders can vote on referenda using a stake and conviction weighted basis. Conviction is based on the duration of time that a token holder will voluntarily lock their tokens. The longer a voter locks their tokens the greater weight their vote has. Referenda that pass are subject to delayed enactments.

-   **Enactment Period –** The duration of time between a proposal being approved and enacted.

-   **Lock Period –** Minimum duration of time that the tokens of winning voters are locked for. Tokens locked from voting can still be used for staking or further voting.

-   **Cool-off Period –** The duration a veto from a technical committee member lasts before the proposal may be submitted again.

-   **Delegations –** An act of transferring your voting power to another account or wallet to vote on your behalf.

#### Governance Reference

| **Variable**             | **Value**             |
|--------------------------|-----------------------|
| Voting period            | 36000 blocks (5 days) |
| Fast-track voting period | 900 blocks (3 hours)  |
| Enactment period         | 14400 blocks (2 days) |
| Cool-off period          | 50400 blocks (7 days) |
| Lock Period              | 50400 blocks (7 days) |
| Minimum Deposit          | 40 TUR                |
| Maximum proposals        | 100                   |

#### Values and Principles

The Turing Network aims to ensure the following values and principles are considered throughout the governance process:

-   A commitment to open and transparent decision-making from the OAK Network team with appropriate communication to our community.

-   Working to maintain the greater good of the network and of the overall Dotsama ecosystem ahead of individual gain.

-   Being inclusive to all token holders that are impacted by governance decisions.

#### On-Chain Governance Mechanics

The on-chain governance process for the Turing Network will operate similarly to the Kusama and Polkadot relay chain governance system. Turing will utilize the Democracy, Council, and Treasury Substrate frame pallets. The purpose of these modules is to allow token holders on the network to determine the outcomes of decisions which influence the network.

The core components of the Turing Network governance model include:

-   **Referendum –** a proposal for a change to the Turing Network system which may include key parameter values, code upgrades including run-time upgrades, or changes to the governance system.

-   **Voting –** Referenda are voted on by token holders using a stake-weighted basis.

-   **Council –** Elected individuals who are expected to propose referenda and have special voting rights within the system. OAK Network will initially appoint council members whose decisions regarding the network such as runtime upgrades are made transparent on-chain. Once the Turing Network is appropriately bootstrapped and stabilized, a referendum will be started to move governance to an Elected Council system where council members are elected by public voting.

-   **Technical Committee –** Technical committee members possess the ability to fast-track emergency referenda in urgent and critical circumstances. A fast-tracked referendum may be created even during an and active existing referendum.

-   **Treasury –** A collection of TUR funds that the council can spend on appropriate proposals. Proposals must be approved by the council and require a deposit to be submitted. Rejected proposals will result in the deposit being burnt.

To learn more about how on-chain governance is implemented for Polkadot and Kusama parachains you can visit the [Walkthrough of Polkadot’s governance](https://polkadot.network/blog/a-walkthrough-of-polkadots-governance/) article.

#### Voting Weights

The voting weight of a token holder is determined by two parameters. The vote multiplier (the value of tokens locked) and the conviction multiplier (the duration of token lock). This system of voluntary locking is utilized effectively on Kusama currently and allows token holders to increase their voting power by declaring how long they are willing to lock up their tokens.

The conviction multiplier increases the vote multiplier every time the lock period is doubled.

More information about the Kusama governance process can be found [here.](https://guide.kusama.network/docs/learn-governance/)

#### The Council and Technical Committee’s Voting Rights

-   The technical committee may cancel a proposal before it has been passed if there is a unanimous vote.

-   Each technical committee member may veto a council proposal. This may only be done once per proposal. A proposal which has been subject to a veto must complete the required cool-off period.
