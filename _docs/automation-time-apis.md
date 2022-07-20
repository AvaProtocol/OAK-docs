---
title: Time Trigger APIs
subtitle: The API specifications for Time Triggers
author: ryan
tags: [api, time, triggers]
---

These APIs allow you to schedule an action to occur at a specific minute, and to cancel the task. All the APIs in this section are prefixed by `Automation-time`. 


## Launched

### Schedule a Native Event
This API allows you to schedule firing an event on the chain with a custom message.


#### Call
```rust
fn schedule_notify_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// An id provided by the user. This id must be unique for each task for a given user.
    provided_id: Vec<u8>,
    /// The unix standard time in seconds for when the task should run.
    time: u64,
    /// The message you want the event to have.
    message: Vec<u8>,
    )
```

** For those who are not familiar with rust `Vec<u8>` accepts a string input. For example, "I am as unique as a snowflake" is a valid input.  
** If you are unfamiliar with unix time here is a handy [converter](https://www.epochconverter.com).  


#### Errors
```rust
pub enum Error {
    /// If the `time` parameter does not end in a whole minute.
    InvalidTime,
    /// The `time` parameter must be in the future.
    PastTime,
    /// The `provided_id` cannot be empty.
    EmptyProvidedId,
    /// The `provided_id` is already in use for your account.
    DuplicateTask,
    /// The time you requested in full. No more tasks can be scheduled for this time.
    TimeSlotFull,
    /// The message cannot be empty.
	EmptyMessage,
}
```

### Cancel a Task
This API allows you to cancel a scheduled task. In order to do this you must have created the task and have the `task_id`.

** We are still working on the RPC call to generate the task_id. Please save your `provided_id` so you can generate this later.

#### Call
```rust
fn cancel_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// The id of the task.
    task_id: Hash,
    )
```

#### Errors
```rust
pub enum Error {
    /// You are not the owner of the task.
    NotTaskOwner,
    /// The task does not exist.
    TaskDoesNotExist,
}
```

### Schedule a Native Token Transfer
This API allows you to schedule transfering the chain's native token to another user.

#### Call
```rust
fn schedule_native_transfer_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// An id provided by the user. This id must be unique for each task for a given user.
    provided_id: Vec<u8>,
    /// The unix standard time in seconds for when the task should run.
    time: u64,
    /// The account you want to transfer tokens to.
    recipient_id: AccountId,
    /// The amount you want to transfer. 
    amount: u128,
    )
```

** For those who are not familiar with rust `Vec<u8>` accepts a string input. For example, "I am as unique as a snowflake" is a valid input.  
** If you are unfamiliar with unix time here is a handy [converter](https://www.epochconverter.com).  
** The unix time stamp must be at the start of any minute. This means that the timestamp number modulo 60 must be 0.  
** The smallest acceptable amount is 1,000,000,000, which is equivalent to 0.1 NEU.  

#### Errors
```rust
pub enum Error {
    /// If the `time` parameter does not end in a whole minute.
    InvalidTime,
    /// The `time` parameter must be in the future.
    PastTime,
    /// The `provided_id` cannot be empty.
    EmptyProvidedId,
    /// The `provided_id` is already in use for your account.
    DuplicateTask,
    /// The time you requested in full. No more tasks can be scheduled for this time.
    TimeSlotFull,
    /// The message cannot be empty.
	EmptyMessage,
    /// Amount has to be larger than 0.1 OAK.
    InvalidAmount,
    /// Sender cannot transfer money to self.
    TransferToSelf,
}
```

### RPC: Generate Task ID based on Provided ID and Account ID
This API allows you to generate the Task ID based on the Provided ID and Account ID used to create the task.

#### Call
```rust
fn generate_task_id(
    /// The `account_id` of the user. This is the wallet address of the user who created the task.
    account_id: AccountId,
    /// An id provided by the user. This id must be unique for each task for a given user.
    provided_id: Vec<u8>,
    )
```

** For those who are not familiar with rust `Vec<u8>` accepts a string input. For example, "I am as unique as a snowflake" is a valid input.
** This RPC should return the task ID associated with this unique combination of account ID and provided ID.
** This RPC does not provide the task ID for only tasks that are scheduled. It can provided the potential task ID for non-scheduled tasks, so long as the non-scheduled tasks are scheduled with the provided account_id and provided_id. 

#### Errors
```rust
pub enum Error {
    // Could not generate the task_id.
    "Unable to generate task_id",
}
```

### RPC: Get Time Automation Fees
This API allows you to get the execution fees for the automation time task.

#### Call
```rust
fn get_time_automation_fees(
    /// The action that you will be using, provided in String format.  
    action: AutomationAction,
    /// The number of task executions
    executions: u32,
    )
```

** The 4 enums for AutomationAction are: Notify, NativeTransfer, XCMP, AutoCompoundDelegatedStake.
** Note that this RPC does not return the inclusion fee of including the task onto the block. That is a separate RPC call: payment.queryFeeDetails. This only provides the execution fee of the task. 
** The difference between inclusion fee and execution fee is created in the fact that the OAK blockchain runs tasks in the future off of a time trigger. This means that fees are charged not only for inclusion of the task onto the chain, but also the execution of the task in the future. This current RPC only shows the execution cost.

#### Errors
```rust
pub enum Error {
    // The fee calculation went wrong
    "Unable to get time automation fees",
    // The fee amount is too large and cannot fit in u64 representation.
    "RPC value doesn't fit in u64 representation",
}
```

### RPC: Calculate Optimal Autostaking
This API calculates the optimal parameters for autostaking. Autostaking is the process of restaking the returns from some staked principal. Restaking too frequently becomes too costly for fees, but restaking too infrequently leaves too much opportunity cost on the table, as the unstaked balance sits in the wallet without providing additional staking value. This function finds the optimal frequency and the corresponding APY for restaking.

#### Call
```rust
fn calculate_optimal_autostaking(
    /// The amount that will be staked.
    principal: i128,
    /// The collator to which the principal will be staked.
    collator: AccountId,
    )
```

** This RPC will return a JSON object with a time period and an APY. The time period represents the optimal staking duration and the APY is the projected staking return.

#### Errors
```rust
pub enum Error {
    // The optimal autostaking calculation went wrong.
    "Unable to calculate optimal autostaking",
    // The collator provided is not a real collator.
    "collator does not exist",
    // The fee calculation went wrong.
    "could not calculate fee",
}
```

### RPC: Get Task IDs for Auto-compounding staking delegation tasks.
This API gets the task IDs for auto-compounded stake delegation tasks. Auto-compounding staking delegation tasks are unique to an wallet address and collator pair. This RPC collects all of the task IDs for each unique wallet address to collator pair, given a single wallet address.

#### Call
```rust
fn get_auto_compound_delegated_stake_task_ids(
    /// The account ID of the wallet of the delegator.
    account_id: AccountId
    )
```

** This RPC will return the task IDs of the auto-compounding staking delegation task for each collator that this wallet has staked with.

#### Errors
```rust
pub enum Error {
    // Retrieval of Task IDs went wrong.
    "Unable to get AutoCompoundDelegatedStakeTask ids",
}
```

## Coming soon

**The schemas in this section are preliminary. Expect them to change.**

### Schedule a Token Transfer
This API allows you to schedule transfering the provided token to another user.

#### Call
```rust
fn schedule_transfer_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// An id provided by the user. This id must be unique for the user.
    provided_id: Vec<u8>,
    /// The unix standard time in seconds for when the task should run.
    time: u64,
    /// The account you want to transfer tokens to.
    receiver_account_id: AccountId,
    /// The amount you want to transfer.
    amount: u128,
    /// The token you want to be transferred.
    token: Token,
    )
```

