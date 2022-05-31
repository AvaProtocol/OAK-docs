---
title: Overview
subtitle: A high level view of OAK
author: ryan
tags: [develop]
---

The goal of the OAK blockchain is to allow users to schedule actions to execute based on a condition. This guide will talk you through how to use OAK, and some examples of how it could be used.

## Glossary

*OAK*: The name of our blockchain. While the name changes for each deployment we will refer to it as OAK in this document regardless of the environment you are integrating with.
- OAK -> Polkadot
- TUR -> Kusama
- TUR -> testnet

*Native*: This will be preceding “token” or “event”. This refers to the token and events of     the OAK chain you are interacting with.

*Trigger*: Conditional logic that has to be true for a task to be execute

*Action*: The function to execute for a given trigger

*Task*: A trigger and an action 
- A user will add a task to execute 10 recurring payments at the 30th of each month.

*Transaction*: Anything triggered off of an extrinsic. For example, the scheduling of a task is a transaction, the execution of the action is not.

*Timestamp*: Unix standard time in seconds

## What is a Task?

In order to use OAK you need to understand our tasks. OAK allows you to schedule a singular task, schedule a recurring task, and cancel a task. In order to perform these actions you will need to call the appropriate extrinsics in the Automation pallets. When calling these extrinsics you will need to pass in the following data. 

- The `account_id` -> This is provided when you sign the extrinsic
- The `predefined_id`
- Trigger data
- Action data

The first two pieces of data are required for all task types and are hashed together to create the `task_id`. You need this id to cancel your task. The last two pieces of data depend on what type of task you are creating. Each type of trigger and action require specific pieces of data.

It is worth taking some time to dive into the `task_id`. The `task_id` is the unique key we use to store the details about your task. You will need the `task_id` if you want to cancel the task or look it up later. The critical thing here is that the `task_id` has to be unique, and the caller needs to be able to derive this id themselves. By having the caller pass in the `predefined_id`, and hashing that with their account id, we can ensure the `task_id`s are unique and the caller has what they need to derive the `task_id`. This of course means the caller needs to ensure the `predefined_id` is unique to them(since we are hashing it with their account id callers can use the same `predefined_id`), and we will return a duplicate `task_id` error if it is not. In reality this constraint is even more relaxed as each trigger has its own storage space. This means you could use the same `predefined_id` across different triggers. To make it easier for you to track these `task_ids` we would not recommend this.

Once a task is created we link your action to the provided trigger. Then once the trigger is triggered we execute your action. If the trigger supports it you can configure the task to be recurring. In this case will add a new task with the newly calculated trigger after your action executes. Once your last action executes we remove your task from our storage. All of this of course happens on-chain :). 
