---
title: Price Trigger APIs
subtitle: The API specifications for Price Triggers
author: ryan
tags: [api, price, triggers]
---

These APIs allow you to schedule an action to occur based on token price, and to cancel the task. All the APIs in this section are prefixed by `Automation-price`. 


### Schedule a Token Transfer
This API allows you to schedule transfering the provided token to another user.

#### Call
```rust
fn schedule_transfer_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// An id provided by the user. This id must be unique for the user.
    provided_id: Vec<u8>,
    /// The token you want to watch.
    target_token: Token,
    /// The comparison you want done. ex) greather than or equal to
    comparison: Comparison,
    /// The amount you want to compare to.
    target_amount: u128,
    /// The account you want to transfer tokens to.
    receiver_account_id: AccountId,
    /// The amount you want to transfer.
    amount: u128,
    /// The token you want to be transferred.
    token: Token,
    )
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