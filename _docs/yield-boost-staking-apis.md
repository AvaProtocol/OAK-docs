---
title: Yield Boost - Staking APIs
subtitle: Enable auto-compounding for your validator/collator stake.
author: chris
tags: [api, yield-boost]
---


Dotsama blockchains that use the parachain-staking pallet deposit rewards into the delegator's wallet at the beginning of every round. Currently in the Dotsama ecosystem, parachain stakers that want to maximize their gains have to manually increase the size of their delegation each time they receive a staking reward. The Turing blockchain allows delegators to auto-compound their stake on a fixed schedule without risking their private key or having to run their own infrastructure.

## Scheduling an Auto-Compounding Task

This extrinsic schedules a task that increases a delegator's stake based on configurable parameters. In this example, Charlie is scheduling a task to auto-compound his delegation to the collator Alice every week as long as his account has a minimum of 100 TUR.

![](https://i.imgur.com/gRkNuDi.png)

Module: **AutomationTime**

Method: **scheduleAutoCompoundDelegatedStakeTask**

Args:
- **executionTime**: A unix timestamp (to the nearest hour); when the task should run for the first time.
- **frequency**: An integer number of seconds (to the nearest hour); how often the wallet balance should be auto compounded.
- **collatorId**: The account id of the target collator.
- **accountMinimum**: The minimum amount that should be kept in the user's wallet.

### Detecting Success

When the task is successfully scheduled the websocket will return a success response and the chain will emit the `automationTime.TaskScheduled` event. The `taskId` can be used to track and interact with a scheduled task.

![](https://i.imgur.com/BYRMKB4.png)

When the task executes successfully the chain will emit the `automationTime.SuccesfullyAutoCompoundedDelegatorStake` event. This event will include the `amount` by which the delegation was increased.

![](https://i.imgur.com/0XYZjYh.png)

### Error Handling

Errors can occur both at the time of initial scheduling and when the task is executed. Scheduling errors will be returned as a websocket response while execution errors will be signaled by on-chain events. 

[List of scheduling errors](https://github.com/OAK-Foundation/OAK-blockchain/blob/d8cf668764fd8abce62fd3bb65e7c9c794fac66e/pallets/automation-time/src/lib.rs#L246-L277)

## Viewing Active Auto-Compounding Tasks

The Turing blockchain exposes a rpc endpoint that allows developers to query a user's scheduled auto compounding tasks.

Module: **AutomationTime**

Method: **getAutoCompoundDelegatedStakeTaskIds**

Args:
- **accountId**: The user's ss58 encoded account id

Example Response:
```
{
    "jsonrpc": "2.0",
    "result": [
        "0xa22d90bd566e7abfcb3d7a06032a046677c2f33e5a9404ec62724cc07dc6fbad", // TaskId
        "0x43aa90bd566e7abfcb3d7a06032a046677c2f33e5a9404ec62724cc07dc6fdba",
        ...
    ]
    },
    "id": 1
}
```

## Cancelling an Auto-Compounding Task

Active auto-compounding tasks can be cancelled by submitting an extrinsic to the Turing blockchain. In this example, Charlie is cancelling the task that he scheduled earlier. Users can only cancel tasks that they have scheduled.

![](https://i.imgur.com/nwy5Eko.png)

Module: **AutomationTime**

Method: **cancelTask**

Args:
- **taskId**: Id of the task to cancel

### Detecting Success

When a task is successfully cancelled the websocket will return a success response and the chain will emit an `automationTime.TaskCancelled` event that includes the `taskId` of the cancelled task.

![](https://i.imgur.com/FR6e5vk.png)

### Error Handling

On error the websocket will return a response that includes a dispatch error of either: `TaskDoesNotExist` or `NotTaskOwner`.

## Querying for an Optimal Auto-Compounding Time

An RPC call is provided to perform a calculation to return the period of time in days that maximizes APY given a user's principal and target collator.  Access to this RPC via API is not currently available in the UI but can be called manually.

Module: **AutomationTime**

Method: **calculateOptimalAutostaking**

Args:
* **principal**: An integer balance (in Planck); the initial balance a user wishes to stake.
* **collator**: The account id of the target collator

Results:
* **period**: An integer number of days; how often restaking is optimal for the given parameters 
* **apy**: A decimal APY.

Example Response:
```
{
    "jsonrpc": "2.0",
    "result": {
        "apy":0.029450359762913332,
        "period":46
    },
    "id": 1
}
```

## Events

- AutomationTime.TaskScheduled { who: AccountId, task_id: Hash }
  - The task was successfully scheduled (or rescheduled)
  - [Example block with event](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech#/explorer/query/0x15e3fe60dbe1e591126e49f654875d0ca80b82b3453f1fed18989c73cd7a81ee)
- AutomationTime.TaskCancelled { who: AccountId, task_id: Hash }
  - The task was successfully cancelled
  - [Example block with event](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech#/explorer/query/0xd67080c178efc30870f02b01b9100928736aa0e6624eaaa125c69ff409598514)
- AutomationTime.TaskMissed { who: AccountId, task_id: Hash, execution_time: UnixTime }
  - The task could not be performed at the scheduled time
- AutomationTime.SuccessfullyAutoCompoundedDelegatorStake { task_id: Hash, amount: Balance }
  - The user's delegation was increased by `amount`
  - [Example block with event](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech#/explorer/query/0x485624b3c61626e8f9b7d3dadb168f3b67aa05b8290b2562c836a27643f7427c)
- AutomationTime.AutoCompoundDelegatorStakeFailed { task_id: Hash, error_message: String, error: DispatchError }
  - The task failed with the specified error
  - [Example Event](https://turing.subscan.io/extrinsic/852564-0?event=852564-0)
- ParachainStaking.DelegationIncreased { delegator: AccountId, candidate: AccountId, amount: Balance }
  - The user's delegation was increased by the specified `amount`
  - [Example block with event](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing-staging.oak.tech#/explorer/query/0x485624b3c61626e8f9b7d3dadb168f3b67aa05b8290b2562c836a27643f7427c)
