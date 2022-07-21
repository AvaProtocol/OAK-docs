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

* Rust `Vec<u8>` input fields accepts a string input. For example, "I am as unique as a snowflake" is a valid input.  
* If you are unfamiliar with unix time here is a handy [converter](https://www.epochconverter.com).  


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

* We are still working on the RPC call to generate the task_id. Please save your `provided_id` so you can generate this later.

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

* Rust `Vec<u8>` input fields accepts a string input. For example, "I am as unique as a snowflake" is a valid input.  
* If you are unfamiliar with unix time here is a handy [converter](https://www.epochconverter.com).  
* The unix time stamp must be at the start of any minute. This means that the timestamp number modulo 60 must be 0.  
* The smallest acceptable amount is 1,000,000,000, which is equivalent to 0.1 NEU.  

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

* Rust `Vec<u8>` input fields accepts a string input. For example, "I am as unique as a snowflake" is a valid input.
* This RPC should return the task ID associated with this unique combination of account ID and provided ID.
* This RPC does not provide the task ID for only tasks that are scheduled. It can provided the potential task ID for non-scheduled tasks, so long as the non-scheduled tasks are scheduled with the provided account_id and provided_id. 

#### Errors
* **Unable to generate task_id**: Could not generate the task_id.

#### Example
Sample Request
```cURL
curl --location --request POST 'http://rpc.turing-staging.oak.tech' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": "automationTime_generateTaskId", "params": ["5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "savedProvidedID"]}'
```

Sample Response
```JSON
{
    "jsonrpc": "2.0",
    "result": "0x45edb12767422ace02643641c0224b7a37d584751779e78e35819212d04100fd",
    "id": 1
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

* Note that this RPC does not return the inclusion fee of including the task onto the block. That is a separate RPC call: payment.queryFeeDetails. This only provides the execution fee of the task. 
* The difference between inclusion fee and execution fee is created in the fact that the OAK blockchain runs tasks in the future off of a time trigger. This means that fees are charged not only for inclusion of the task onto the chain, but also the execution of the task in the future. This current RPC only shows the execution cost.
* The enums for AutomationAction are as follows:
```rust 
pub enum AutomationAction {
    Notify,
    NativeTransfer,
    XCMP,
    AutoCompoundDelgatedStake,
}
```

#### Errors
* **Unable to get time automation fees**: The fee calculation went wrong
* **RPC value doesn't fit in u64 representation**: The fee amount is too large and cannot fit in u64 representation.

#### Example
Sample Request
```cURL
curl --location --request POST 'http://rpc.turing-staging.oak.tech' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": "automationTime_getTimeAutomationFees", "params": ["Notify", 3]}'
```

Sample Response
```JSON
{
    "jsonrpc": "2.0",
    "result": 252000000,
    "id": 1
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

* This RPC will return a JSON object with a time period and an APY. The time period represents the optimal staking duration and the APY is the projected staking return.

#### Errors
* **Unable to calculate optimal autostaking**: The optimal autostaking calculation went wrong.
* **collator does not exist**: The collator provided is not a real collator.
* **could not calculate fee**: The fee calculation went wrong.

#### Example
Sample Request
```cURL
curl --location --request POST 'http://rpc.turing-staging.oak.tech' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": "automationTime_calculateOptimalAutostaking", "params": [1000000000000, "6AwtFW6sYcQ8RcuAJeXdDKuFtUVXj4xW57ghjYQ5xyciT1yd"]}'
```

Sample Response
```JSON
{
    "jsonrpc": "2.0",
    "result": {
        "period": 63,
        "apy": 0.08711145708327778
    },
    "id": 1
}
```

### RPC: Get Task IDs for Auto-compounding staking delegation tasks
This API gets the task IDs for auto-compounded stake delegation tasks. Auto-compounding staking delegation tasks are unique to an wallet address and collator pair. This RPC collects all of the task IDs for existing auto-compounding staking delegation tasks for each unique wallet address to collator pair, given a single wallet address. The auto-compounding task must exist in order for this RPC to return a task ID. The delegator must also have delegated to a collator first in order for the auto-compounding task to be included. 

#### Call
```rust
fn get_auto_compound_delegated_stake_task_ids(
    /// The account ID of the wallet of the delegator.
    account_id: AccountId
)
```

* This RPC will return the task IDs of the auto-compounding staking delegation task for each collator that this wallet has staked with.

#### Errors
* **Unable to get AutoCompoundDelegatedStakeTask ids**: Retrieval of Task IDs went wrong.

#### Example
Sample Request
```cURL
curl --location --request POST 'http://rpc.turing-staging.oak.tech' \
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": "automationTime_getAutoCompoundDelegatedStakeTaskIds", "params": ["68vqVx27xVYeCkqJTQnyXrcMCaKADUa7Rywn9TSrUZyp4NGP"]}'
```

Sample Response
```JSON
{
    "jsonrpc": "2.0",
    "result": [
        "0xceff6bb4a24529cbd4707cafd9ee158774ecbdc31e3479e1452a259df91f2c50",
        "0xb222b3501b23c6482894b6051d7fcbae7de3da9c8a8dc9e54971dbaff129b028"
    ],
    "id": 1
}
```

## Experimental

### Experimental: XCMP Custom Action
This API allows another parachain to schedule a call in the future and have OAK call back to the initiating parachain with a pre-packaged extrinsic call in order to perform an action in the future. For example, this can be used to schedule transferring a provided token to another user. Currently this extrinsic is built in such a way that the cross-chain action is being initiated by another parachain to schedule something on OAK, for OAK to send back later. However, this paradigm may shift in the future to have the user directly schedule on OAK. 

#### Call
```rust
fn schedule_xcmp_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>,
    /// An id provided by the user. This id must be unique for the user.
    provided_id: Vec<u8>,
    /// The unix standard time in seconds for when the task should run. You can insert up to 24 reoccurances.
    execution_times: Vec<UnixTime>,
    /// The parachain location to where the user wants to send the call back
    para_id: ParaId,
    /// The encoded extrinsic call to perform a custom action.
    call: Vec<u8>,
    /// The total weight of the encoded call that will be sent back to the parachain.
    weight_at_most: Weight,
)
```

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
    /// ParaId provided does not match origin paraId.
    ParaIdMismatch,
}
```
