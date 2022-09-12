---
title: Overview
subtitle: Read about the basic concepts of the automation data structure
author: ryan
tags: [develop]
---

The goal of the OAK blockchain is to allow users to schedule actions to execute based on a condition. This guide will talk you through how to use OAK, and some examples of how it could be used.

## Glossary

**OAK**: The name of our blockchain. While the name changes for each deployment we will refer to it as OAK in this document regardless of the environment you are integrating with.
- OAK -> Polkadot
- TUR -> Kusama
- TUR -> Rococo (testnet)

**Native**: This will be preceding “token” or “event”. This refers to the token and events of     the OAK chain you are interacting with.

**Trigger**: Conditional logic that has to be true for a task to be execute

**Action**: The function to execute for a given trigger

**Task**: A trigger and an action 
- A user will add a task to execute 10 recurring payments at the 30th of each month.

**Transaction**: Anything triggered off of an extrinsic. For example, the scheduling of a task is a transaction, the execution of the action is not.

**Timestamp**: Unix standard time in seconds

## What is a Task?

In order to use OAK you need to understand our tasks. OAK allows you to schedule a singular task, schedule a recurring task, and cancel a task. In order to perform these actions you will need to call the appropriate extrinsics in the Automation pallets. When calling these extrinsics you will need to pass in the following data. 

- The `account_id` -> This is provided when you sign the extrinsic
- The `predefined_id`
- Trigger data
- Action data

The first two pieces of data are required for all task types and are hashed together to create the `task_id`. You need this id to cancel your task. The last two pieces of data depend on what type of task you are creating. Each type of trigger and action require specific pieces of data.

Once a task is created we link your action to the provided trigger. Then once the trigger is triggered we execute your action. If the trigger supports it you can configure the task to be recurring. In this case will add a new task with the newly calculated trigger after your action executes. Once your last action executes we remove your task from our storage. All of this of course happens on-chain :). 

## What is a trigger?
The OAK data structures supports the following triggers as part of the transaction. This is stored in the OAK registry until the condition is met. The condition check is frequent at varying cadences depedning on weight/fee and computational complexity.

Triggers that are supported but not limited to:

- Time
- XCMP event
- On-chain event 
- Token price (*In Beta Testing*)
- Numerical (*In Beta Testing*)

These triggers are based on inital conversations with potential partners. If you have suggestions for other potential triggers which have a strong value proposition to a project you're involved with, please reach out in our #parternships [Discord](https://discord.gg/7W9UDvsbwh) channel.

### Time
Our time trigger allows you to schedule an action to occur during a specific hour. To clarify we will ensure your action is executed within the requested hour but cannot guarantee when in that hour it will execute. In order to use this trigger you will need to provide a timestamp that is at least one hour in the future.

The following features are available for time-based triggers:

- Support scheduling for an minute
- Support scheduling for a day
- Support scheduling recurring actions

### XCMP Event
Our XCMP event trigger allows you to schedule an action when an XCMP event is received. We are thinking about two different version of this trigger. First, you could register this event and the data with OAK. This would allow other users to create triggers based on the data inside this event. Second, you could simply create a trigger that fires when this event is received by OAK.

### On-chain Event
Our on-chain event would work almost the same as the XCMP event trigger.

### Token Price
Our token price trigger allows you to schedule an action based on the price of a token. You will be able to select from a range of tokens, and state the condition you care are about. For example, you could trigger when the price of DOT is greater than or equal to a certain value set by the user(> or <). 

### Numerical
As a natural extension to token price, any given numerical data feed can be used as a trigger. The same conditional logic is used in price as in numerical trigger (> or <).

## What is an action?

A given trigger executes an action set by the parachain, dApp developer or user. 

Actions that are supported but not limited to:

- Native event
- Native token transfer
- KSM/DOT transfer
- Parachain token transfer
- Restaking dPoS Rewards
- Any cross-chain extrinsic

These actions are based on inital conversations with potential partners. If you have suggestions for other potential triggers which have a strong value proposition to a project you're involved with, please reach out in our #parternships [Discord](https://discord.gg/7W9UDvsbwh) channel.

### Native Event
Our native event action allows a user to schedule an event with custom text to fire on-chain. In order to use this action you will need to provide custom text. While this action was created as an mvp it could be used to trigger other actions in OAK.

### Native Token Transfer
Our native token transfer action allows you to transfer your token to another user. In order to use this action you will need to provide the user’s account id and the amount you wish to transfer. 

** An important note: We will NOT check that your account has the required balance when scheduling this action. We will only check your account balance when the action is being executed.

### KSM/DOT Transfer
Our KSM/DOT transfer action would work almost the same as the native token transfer action. The difference being that it sends KSM/DOT instead of our native token.

### Parachain Token Transfer
Our parachain token transfer action would work almost the same as the native token transfer action. The difference being that you would need to define the token you want to transfer.
