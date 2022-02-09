---
title: User Testing on Neumann
subtitle: Learn more about how to test our automation on the Neumann testnet
author: irsal
tags: [testing]
---

### Pre-requisites

1. Please grab your NEU tokens from our Discord faucet. [Instructions here.](https://medium.com/oak-blockchain/launching-neumann-oaks-parachain-testnet-c982e7f492f)
2. Head over to the [Neumann PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fneumann.api.onfinality.io%2Fpublic-ws#/explorer)

### Go to the developer > extrinsics tab

![automation_time_124](../../assets/img/automation-time-124.png)

1. Select the "automationTime" [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fneumann.api.onfinality.io%2Fpublic-ws#/extrinsics)
2. Select the "scheduleNotifyTask" function
3. Set providedId as a unique identifier for the task (could be anything). Please do not reuse the same identifier. 
4. Find a timeslot in the future in one of the [many unix timestamp converters](https://www.unixtimestamp.com/). For example, find a time 5 minutes in the future. 
Note: Please make sure the seconds are set to 00, or the extrinsic will throw an error. We currently only support 2 tasks per minute.
5. Write any message you'd like.
6. Hit "Submit Transaction".
7. If successful (green check mark on the top right), watch the ["Explorer" tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fneumann.api.onfinality.io%2Fpublic-ws#/explorer) and wait for your message to pop up.