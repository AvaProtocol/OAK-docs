---
title: Multi-sig wallets
subtitle: Learn more about how to create and use multi-sig wallets
author: charles
tags: [multi-sig, multisig]
---

### Introduction

The multi-sig wallet is a multi-person collaborative wallet. When a participant launches a transaction proposal from the wallet, other participants are required to sign the proposal. The transaction will only be executed when the number of signatures reaches the threshold.

### Pre-requisites

1. Head over to the [Turing Staging PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech%2Fpublic-ws#/explorer) or [Turing PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech%2Fpublic-ws#/explorer)
2. Go to the Accounts > Accounts

### Create multisig wallet

1. Click the multisig button in the account UI.

    ![multisig-button](../../assets/img/multi-sig/multisig-button.png)

2. Please select the participants(Order insensitive) of the multisig wallet and set the threshold.

    ![add-multisig](../../assets/img/multi-sig/add-multisig.png)

    As in the example above, this multisig wallet has 3 participants. The threshold is 2, which means that a transaction needs to be signed by 2 participants to be valid.

    Click the "create" button and You get a multisig wallet.

    ![wallet](../../assets/img/multi-sig/wallet.png)

### Authorize transaction

1. When you send extrinsic using a multisig wallet, you need to authorize it.

    Note: Be sure to save the `multisig call data` and `call hash`. Send them to other participants.

    ![authorize-transaction](../../assets/img/multi-sig/authorize-transaction.png)


2. Other participants will receive multisig approval notification on the UI. He can approve this approval.

    ![notification](../../assets/img/multi-sig/notification.png)

3. Check `pending hashes` and paste `multisig call data` into `call data for final approval` textbox.

    ![multisig-approval](../../assets/img/multi-sig/multisig-approval.png)

    ![multisig-approval2](../../assets/img/multi-sig/multisig-approval2.png)

4. When the number of Approves reaches a threshold, this extrinsic is executed on-chain.
