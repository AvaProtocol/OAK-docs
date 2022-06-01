---
title: User Testing on Turing Staging
subtitle: Learn more about how to test our automation on the Turing Staging testnet
author: irsal
tags: [testing]
---

### Pre-requisites

1. Please grab your TUR tokens from our Discord faucet. [Instructions here.]()
2. Head over to the [Turing Staging PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech%2Fpublic-ws#/explorer)
3. Go to the developer > extrinsics tab

### Scheduling a Future Notification

![automation_time_124](../../assets/img/automation-time-124.png)

1. Select the "automationTime" [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech%2Fpublic-ws#/extrinsics)
2. Select the "scheduleNotifyTask" function
3. Set providedId as a unique identifier for the task (could be anything). Please do not reuse the same identifier. 
4. Find a timeslot in the future in one of the [many unix timestamp converters](https://www.unixtimestamp.com/).  The timeslot must be an hour.  You can add up to 24, hour timeslots in the future using the "+ Add Item" button.  Duplicate hours will only run once. For example, find a time at least 5 minutes in the future and on the next hour. 
Note: Please make sure the minute and seconds are set to 00, or the extrinsic will throw an error.
5. Write any message you'd like.
6. Hit "Submit Transaction".
7. If successful (green check mark on the top right), watch the ["Explorer" tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech%2Fpublic-ws#/explorer) and wait for your message to pop up.

### Scheduling a Future Transfer of Turing Staging Tokens

![automation_native_transfer_217](../../assets/img/automation-native-transfer-217.png)

1. Select the "automationTime" [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2rpc.turing-staging.oak.tech%2Fpublic-ws#/extrinsics)
2. Select the "scheduleNativeTransferTask" function
3. Set providedId as a unique identifier for the task (could be anything). Please do not reuse the same identifier. 
4. Find a timeslot in the future in one of the [many unix timestamp converters](https://www.unixtimestamp.com/).  The timeslot must be an hour.  You can add up to 24, hour timeslots in the future using the "+ Add Item" button.  Duplicate hours will only run once. For example, find a time at least 5 minutes in the future and on the next hour. 
Note: Please make sure the minute and seconds are set to 00, or the extrinsic will throw an error.
5. Select a recipient. Currently, this functionality only sends to your accounts or accounts in your address book. If you would like to send to an address, please make sure you have added to your address book first. 
Note: You cannot send to tokens from an address back to the same address. Please make sure that the selected account is different from the recipientId.
6. Input a value. Currently, the smallest value allowed is 1,000,000,000 (NOTE: please remove commas when inputting value into the extrinsic). This number is the equivalent of 0.1 TUR.
7. Hit "Submit Transaction".
8. If successful (green check mark on the top right), watch the ["Explorer" tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2rpc.turing-staging.oak.tech%2Fpublic-ws#/explorer) and wait for the message to confirm successful transfer of tokens.
