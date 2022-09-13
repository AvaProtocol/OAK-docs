---
title: Powered By OAK - Time APIs
subtitle: Trigger any transaction based on the increase or decrease in value change of any numerical data (e.g. price).
author: irsal
tags: [api, price, triggers]
---

## User Experience (assumptions)

Any DApp or connected parachain can create automated tasks with time triggers to execute any extrinsic call. We assume that most DApps do not have persistent storage outside of the blockchain itself (aka stateless). Thus, we assume that a DApp can initiate the OAK.js call to schedule call(s) and create tasks on OAK and execute an extrinsic in [any connected parachain](https://dotsama-channels.vercel.app/#/).

1. `schedule_xcmp_task` - Schedule an action to occur based on a set of provided timestamps.
2. `scheduled_tasks_V2` - Get scheduled tasks for the whole time slot
3. `cancel_task` - Cancel an existing task

| Environment             | RPC Endpoint                                                 |
| ----------------------- | ------------------------------------------------------------ |
| Turing Staging (Rococo) | `rpc.turing-staging.oak.tech`                                |
| Turing (Kusama)         | `rpc.turing.oak.tech`                                        |
| OAK (Polkadot)          | [Crowdloan launching soon!](https://oak.tech/oak/crowdloan/) |

## Parachain Requirements
The following requirements apply for any Kusama parachain that wishes to support cross-chain automation (including recurring payments, auto-compounding liquidity / staking rewards, automatic swaps, and more):

1. **Open bi-directional HRMP channels** - [HRMP Channels and You](https://github.com/OAK-Foundation/OAK-blockchain/wiki/HRMP-Channels-and-You)
2. **Enable users to authorize future transactions powered by OAK** using a proxy pallet and XCM origin converter.
    
    2a. [Proxy pallet implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/12)
    
    2b. [XCM converter implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/14)

3. Ability to swap the parachain token (e.g. MGX) for TUR (or OAK).

## Application Requirements
### Calculate Fees
Swap parachain token for TUR and pay Turing inclusion, execution, and XCM fees in TUR.

#### Get combined fees for inclusion, execution, and XCM.

```bash
curl --location --request POST 'https://rpc.turing-staging.oak.tech' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "id":1,
    "jsonrpc":"2.0",
    "method": "xcmpHandler_fees",
    "params": ["SIGNED_ENCODED_CALL"]
  }'
```

Replace `SIGNED_ENCODED_CALL` with a hex encoded call that has been signed.

#### Get user accountId for proxy account.

```bash
curl --location --request POST 'https://rpc.turing-staging.oak.tech' \
  --header 'Content-Type: application/json' \
  --data-raw '{
   "id":1,
   "jsonrpc":"2.0",
   "method": "xcmpHandler_crossChainAccount",
   "params": ["SS58_ACCOUNT_ID"]
 }'
```

Replace `SS58_ACCOUNT_ID` with the account you want to lookup.

#### Query autocompounding tasks by user accountId.

```bash
curl --location --request POST 'https://rpc.turing-staging.oak.tech' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "id":1,
    "jsonrpc":"2.0",
    "method": "automationTime_getAutoCompoundDelegatedStakeTaskIds",
    "params": ["SS58_ACCOUNT_ID"]
  }'
```

Replace `SS58_ACCOUNT_ID` with a Turing account you want to lookup.

#### [Get extrinsic fee](https://polkadot.js.org/docs/api/cookbook/tx/#how-do-i-estimate-the-transaction-fees)

### Generate a task by taskId

```bash
curl --location --request POST 'https://rpc.turing-staging.oak.tech' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "id":1,
    "jsonrpc":"2.0",
    "method": "automationTime_generateTaskId",
    "params": ["SS58_ACCOUNT_ID", "PROVIDED_ID"]
  }'
```

Replace `SS58_ACCOUNT_ID` with your Turing account.
Replace `PROVIDED_ID` with a random identifier.

### Schedule an XCMP task
This API allows another parachain to schedule a call in the future and have OAK call back to the initiating parachain with a pre-packaged extrinsic call in order to perform an action in the future. For example, this can be used to schedule transferring a provided token to another user. 

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
    /// If the `time` parameter does not end in a whole hour.
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

### Cancel a Task
Only the account that created the task can cancel the task:

`taskID` - a unique identifier for this account’s task.

#### API Call
```rust
fn cancel_task(
    /// The `account_id` of the caller. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>, 
    /// The id of the task.
    task_id: Hash,
)
```

### Errors
```rust
pub enum Error {
    /// You are not the owner of the task.
    NotTaskOwner,
    /// The task does not exist.
    TaskDoesNotExist,
}
```
