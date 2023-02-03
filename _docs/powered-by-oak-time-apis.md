---
title: Powered By OAK - Time APIs
subtitle: Trigger any transaction to occur at a future time or set of times.
author: chris
tags: [api, price, triggers]
date: 2022-09-13
---

The APIs and Polkadot{.js} libraries on this page allow users and multi-chain applications to schedule calling any Substrate extrinsic or smart contract function at a future time (stamp) or set of times. 

1. `scheduleXcmpTask` can be used to store transaction instructions and time-based trigger conditions for future execution, unlocking cross-chain automation features including:
 - compounding returns (yield boost), 
 - buying over time (stable-cost-averaging), 
 - paying over time (recurring payments on a foreign chain),
 - anything else you can do on supported parachains, sometime(s) in the future.

1. `scheduleDynamicDispatchTask` can be used to schedule execution of any extrinsic or batch of extrinsics on-chain.

1. `cancelTask` can be used to cancel any existing automation tasks (must be from the account which created the task). 

Head over to [Price Automation](https://docs.oak.tech/docs/automation-price-apis/) if you want to trigger future transactions using any data other than "time".

# Application Requirements (Assumptions, APIs, and Extrinsics)

| Environment             | RPC Endpoint                                                 |
| ----------------------- | ------------------------------------------------------------ |
| Turing Staging (Rococo) | `rpc.turing-staging.oak.tech`                                |
| Turing Network (Kusama) | `rpc.turing.oak.tech`                                        |
| OAK Network (Polkadot)  | `Coming Soon!` Don't miss [the OAK crowdloan!](https://oak.tech/oak/crowdloan/) |

## Assumptions
1. The application interface presents the user with the option to interact with a parachain's extrinsic at some time(s) in the future.
    1. The time(s) may be defined by the user or the application.
    2. The target parachain may be any parachain that satisfies [Parachain Prerequisites](https://docs.oak.tech/docs/powered-by-oak-time-apis/#parachain-prerequisites).
2. The user has created an OAK-derived proxy that can (only) be used by OAK (or Turing) to trigger future transactions via XCM.
    1. See [Application Prerequisites: Derive proxy identifier](https://docs.oak.tech/docs/powered-by-oak-time-apis/#derive-proxy-identifier)
3. The user's Turing account contains a balance that is sufficient for automation fees.
    1. See [Application Prerequisites: Get fees](https://docs.oak.tech/docs/powered-by-oak-time-apis/#get-fees)

If any of these are not true (i.e. the proxy doesn't exist or you assume that users never have enough $TUR), then any of following may be required prior to scheduling a user's first automation task on a foreign chain:

1. Create and permission a proxy to be used for cross-chain automation.
2. Acquire $TUR for payment of automation fees
3. Transfer $TUR to Turing Network for payment of automation fees. 
4. Execute a transaction immediately (if the user wishes to stake/pay/buy/supply "now" as well as in the future).

Endpoints and libraries will vary by foreign chain.

## Scheduling a cross-chain task (scheduleXcmpTask)
Automate a future transaction using the available RPCs or [OAK.js](https://docs.oak.tech/docs/oak-js/). 

OAK (Turing) will communicate the encoded extrinsic call to the specified parachain at the scheduled time(s) using a proxy that can be used only for future transactions and only by OAK (Turing) via XCM. 

#### API
```rust
fn schedule_xcmp_task(
    /// The address of the account that created or is creating the task. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>,

    /// Your unique identifier for the task. Accepts any string input (e.g. "I am as unique as a snowflake").
    provided_id: Vec<u8>,      

    /// API Param for Scheduling. You can schedule fixed or recurring tasks.
    /// pub enum ScheduleParam {
	///     Fixed { execution_times: Vec<UnixTime> },
	///     Recurring { next_execution_time: UnixTime, frequency: Seconds },
    /// }
    /// Both execution_times and next_execution_time should be unix standard timestamps (in seconds) for when the task should run (accepts a string input). The timestamp must be at the start of any hour (i.e. the timestamp number modulo 3600 must equal 0).
    schedule: ScheduleParam,

    /// The parachain location where the encoded extrinsic call will be sent.
    para_id: ParaId,

    /// The identifier of the token that is to be used for cross-chain automation fees (assume $TUR).
    currency_id: T::CurrencyId,

    /// A proxied version of the encoded extrinsic call to perform the future action.
    encoded_call: Vec<u8>,

    /// The total weight of the encoded call that will be sent back to the parachain.
    encoded_call_weight: u64,
)

```

## Create a dynamic dispatch task
This API allows you to schedule execution of any extrinsic or batch of extrinsics on-chain.

#### API
```rust
fn schedule_dynamic_dispatch_task(
    /// The address of the account that created or is creating the task. Automatically passed in when the transaction is signed.
    origin: OriginFor<T>,
   
    /// Your unique identifier for the task. Accepts any string input (e.g. "I am as unique as a snowflake").
    provided_id: Vec<u8>,      

    /// API Param for Scheduling. You can schdule fixed or recurring task.
    /// pub enum ScheduleParam {
	///     Fixed { execution_times: Vec<UnixTime> },
	///     Recurring { next_execution_time: UnixTime, frequency: Seconds },
    /// }
    /// Both execution_times and next_execution_time should be unix standard timestamps (in seconds) for when the task should run (accepts a string input). The timestamp must be at the start of any hour (i.e. the timestamp number modulo 3600 must equal 0).
    schedule: ScheduleParam,
	
    //  The call to be executed. Any call on the chain can be executed.
    call: Box<<T as Config>::Call>,
)
```

#### Errors
```rust
pub enum Error<T> {
    /// Time must end in a whole hour.
    InvalidTime,
    /// Time must be in the future.
    PastTime,
    /// Time cannot be too far in the future.
    TimeTooFarOut,
    /// The message cannot be empty.
    EmptyMessage,
    /// The provided_id cannot be empty
    EmptyProvidedId,
    /// There can be no duplicate tasks.
    DuplicateTask,
    /// Time slot is full. No more tasks can be scheduled for this time.
    TimeSlotFull,
    /// The task does not exist.
    TaskDoesNotExist,
    /// Block time not set.
    BlockTimeNotSet,
    /// Amount has to be larger than 0.1 OAK.
    InvalidAmount,
    /// Sender cannot transfer money to self.
    TransferToSelf,
    /// Insufficient balance to pay execution fee.
    InsufficientBalance,
    /// Account liquidity restrictions prevent withdrawal.
    LiquidityRestrictions,
    /// Too many execution times provided.
    TooManyExecutionsTimes,
    /// The call can no longer be decoded.
    CallCannotBeDecoded,
}
```

## Cancel a Task
This API allows you to cancel a scheduled task with a specified task identifier. 

#### API
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

# Application Prerequisites

## Derive proxy and task identifiers (new and existing)
Unique identifiers for the proxy (unique for each account) and the task ID (unique for each automation task) can be derived using the available RPCs or [OAK.js](https://docs.oak.tech/docs/oak-js/). 

Applications are recommended to store identifiers in order to more easily reference existing accounts and tasks in the future (to [Cancel Task](https://docs.oak.tech/docs/powered-by-oak-time-apis/#cancel-a-task), for example).

### Derive proxy identifier
This API will return a deterministic proxy identifier using Account ID for both new and existing accounts. This proxy can be used only for future transactions and only by OAK (Turing) Network via XCM.

While the proxy implementation may vary by parachain, each account must create a proxy on the chain where the transaction is to be executed prior to scheduling any automation tasks. Many Substrate wallets streamline the multi-chain user experience to enable creating the proxy (on the foreign chain) while scheduling automation (on Turing) without manually changing networks. 

#### API
```rust
fn generate_accountID(
    /// The address of the account that created or is creating a proxy.
    account_id: AccountId,         
)
```

#### Request (Sample)
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

### Derive task identifier
This API will return a deterministic task identifier using a Provided ID and Account ID for both new and existing tasks. Generating and using your own unique (provided) ID to derive the OAK Task ID will allow tasks to be more easily referenced in the future (to [Cancel Task](https://docs.oak.tech/docs/powered-by-oak-time-apis/#cancel-a-task), for example).

#### API
```rust
fn generate_TaskId(
    /// The address of the account that created or is creating the task.
    account_id: AccountId,     

    /// Your unique identifier for the task. Accepts any string input (e.g. "I am as unique as a snowflake").
    provided_id: Vec<u8>,      
)
```

#### Request (Sample)
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

#### Response (Sample)
```JSON
{
    "jsonrpc": "2.0",
    "result": "0x45edb12767422ace02643641c0224b7a37d584751779e78e35819212d04100fd",
    "id": 1
}
```

## Get fees
Automation fees for Turing can be retrieved using the available RPCs or [OAK.js](https://docs.oak.tech/docs/oak-js/). Call weight from the foreign chain is required in order to retrieve fees for Turing Network. Additional fees may be required for setting up a proxy , swapping, and/or transferring tokens for automation fees.

### Get foreign chain weight (and fees, if applicable)
Retrieve the [call weight](https://polkadot.js.org/docs/api/cookbook/tx/#how-do-i-estimate-the-transaction-fees) for the transaction by encoding the extrinsic call that will be sent to the parachain by Turing via XCM. 

Additional fees may apply on the foreign chain if user has not completed proxy setup or has an insufficient Turing account balance for automation fees:
1. Inclusion fee to create and permission a proxy to be used for cross-chain automation.
2. Inclusion fee to execute the first transaction (if the user wishes to stake/pay/buy/supply "now" as well as in the future).
3. Inclusion fee for the user to acquire $TUR for automation fees.
4. The XCM fee to transfer $TUR to Turing Network for automation fees. 

Endpoints and libraries for retrieving fees will vary by foreign chain.

### Get Turing fees for automation task
This API will retrieve the fees for a given (time automation) task, such as `automationTime.scheduleDynamicDispatchTask` and `automationTime.scheduleXcmpTask`. Payment is collected up front from the user’s Turing account when scheduling future task(s), including all fees for a defined number of occurrences. Fees for indefinitely recurring transactions can be paid at each occurrence.

#### API
```rust
fn query_fee_details(
    /// For DynamicDispatch and XCMP automation, developers can use the new queryFeeDetails rpc. This extrinsic appropriately takes into account the correct fees for both Fixed and Scheduled executions.
    uxt: Block::Extrinsic,
)
```

#### Request (Sample)
```bash
curl --location --request POST 'https://rpc.turing-staging.oak.tech' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "id":1,
    "jsonrpc":"2.0",
    "method": "automationTime_queryFeeDetails",
    "params": [EXTRINSIC]
  }'
```

Replace `EXTRINSIC` with encoded call data of `automationTime.scheduleDynamicDispatchTask` or `automationTime.scheduleXcmpTask`.

#### Response (Sample)
```JSON
{
    "jsonrpc": "2.0",
    "result": { "executionFee": "0xa8c93a80", "xcmpFee": "0x0" },
    "id": 1
}
```

# Parachain Prerequisites
The following requirements apply for any Kusama parachain that wishes to support cross-chain automation (including recurring payments, auto-compounding liquidity / staking rewards, automatic swaps, and more):

## Enable support for XCM communication from OAK
Open [bi-directional HRMP Channels](https://github.com/OAK-Foundation/OAK-blockchain/wiki/HRMP-Channels-and-You) with Turing Network (Kusama relay chain) and Turing Staging (Rococo relay chain):

#### Request (Sample)
```hrmp.hrmpInitOpenChannel(recipient: 2114, proposedMaxCapacity: 1000, proposedMaxMessageSize: 102400)```

#### Accept (Sample)
```hrmp.hrmpAcceptOpenChannel(sender: 2114)```

(View connected parachains)[https://dotsama-channels.vercel.app/#/] 

## 2. Enable proxy account creation and permissioning
Enable users to create a proxy account that can be used only for future transactions and only by Turing Network via XCM.

[OAK Foundation: Create account](https://github.com/OAK-Foundation/substrate-parachain-template/pull/12) provides an example proxy pallet implementation. 

[OAK Foundation: Allow delegation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/14) provides an example delegation via proxy pallet. This example demonstrates the most permissive proxy type and may differ from the proxy implementation on other parachains.

## 3. Enable liquidity for fees (if applicable)
Enable users to obtain $TUR or $OAK to pay for automation fees:

1. The inclusion fee to store the future extrinsic(s).
2. The execution fee when the future extrinsic(s) are triggered.
3. The XCM fee to communicate future extrinsic(s) to a foreign chain (where applicable).

Let's discuss if you would like to allow users to pay fees in a foreign token. 

## 4. Enable smart contract automation (if applicable)
Enable OAK to interact with smart contracts on your parachain using XCM. 

Examples coming soon
