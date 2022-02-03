---
title: Time Trigger APIs
subtitle: The API specifications for Time Triggers
author: ryanh
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
    /// An id provided by the user. This id must be unique for the user.
    provided_id: Vec<u8>,
    /// The unix standard time in seconds for when the task should run.
    time: u64,
    /// The message you want the event to have.
    message: Vec<u8>,
    )
```

** For those who are not familiar with rust `Vec<u8>` accepts a string input. For example, "I am as unique as a snowflake" is a valid input.


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

## In Development

**The schemas in this section are mostly locked in, but some changes could occur.**

### Schedule a Native Token Transfer
This API allows you to schedule transfering the chain's native token to another user.

#### Call
```rust
fn schedule_native_transfer_task(
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
    )
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

