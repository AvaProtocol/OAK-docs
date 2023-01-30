---
title: Develop Custom Workflow
subtitle: Read about the guide of creating automation workflows with Dynamic Dispatch. Automate future tasks including switching or splitting Turing Network staking delegations!
author: nikhil
tags: [develop]
---

Automate future tasks including switching or splitting Turing Network staking delegations!

In case you missed it, [StakeTUR](http://staketur.com/), [Nova Wallet](https://novawallet.io/), and [SubWallet](https://subwallet.app/) users are now automating web3 chores and boosting rewards by automatically staking spare $TUR. But Turing Network users have increasingly asked to automate other tasks as well-automating payments, splitting staking delegations, switching delegation to another collator, and delegating indefinitely.

Rather than enable each ofthese use cases independently, OAK Network is launching Dynamic Dispatch to:

1. Extend time-based automation to every extrinsic on Turing Network

2. Enable indefinitely recurring transactions

Javascript code snippets are now available in the [OAK.js SDK repo](https://github.com/OAK-Foundation/oak.js) to show developers how to build automation workflows using the new Dynamic Dispatch blockchain API.

Keep reading to learn how to use Dynamic Dispatch via [Polkadot{.js}](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/explorer) to switch collator delegationsand indefinitely auto-compound with pay-as-you-go fees!

## Switching Delegations with Dynamic Dispatch

Switching collator delegations is one of many workflows that Dynamic Dispatch unlocks. The below example combines:

1. Call to schedule leaving the current delegation (initiate wait period)

1. Call to unbond from the current (prior) delegation (after wait period)

1. Call to delegate the new collator

![staking-delegation](../../assets/img/develop-custom-workflow/staking-delegation.png)

<div class="figure-caption">Using Polkadot{.js} to switch Turing Network staking delegation using Dynamic Dispatch</div>

## Auto-compounding with Dynamic Dispatch

Also new to Dynamic Dispatch is the abilityto schedule indefinitely
recurring taskstoeliminate the needfor applicationsand users to define the set of times that atask will recur.

In this example, Dynamic Dispatch is used to create an indefinite "Recurring" delegation that begins at a fixed time (expressed as a UNIX
timestamp) and recurs at a set frequency (expressed in seconds).

![recurring-delegations](../../assets/img/develop-custom-workflow/recurring-delegations.png)

<div class="figure-caption">Using Polkadot{.js} of schedule indefinitely recurring delegations using Dynamic Dispatch</div>

Note that automation fees for indefinitely recurring tasks are calculated (in $TUR) and debited from the user's account each time the task is triggered. Tasks scheduled for a finite number of occurrences still require up-front payment for automation fees.

Join the OAK community on Discord for more updates and to [#brainstorm](https://discord.com/channels/840137038316699648/956658332112941086) automation workflows!

## About OAK Network

OAK Network provides automation infrastructure that enables web3 applications to offer recurring payments, stable-cost-averaging, auto-compounding, and more. OAK's layer-one blockchain infrastructure is optimized for storing and triggering future transactions by using event-driven execution and cross-chain messaging.
