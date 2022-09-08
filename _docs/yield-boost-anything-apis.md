---
title: Yield Boost - General APIs
subtitle: Enable auto-compounding for your liquidity pools, or any yield generating use cases.
author: irsal
tags: [api, yield-boost]
---

## User Experience (assumptions)

//

Turing Staging RPC (Rococo): `rpc.turing-staging.oak.tech`

Turing RPC (Kusama): In Beta testing. Contact <developers@oak.tech> to get early access.

OAK RPC (Polkadot): [Crowdloan launching soon!](https://oak.tech/oak/crowdloan/)

## Parachain Requirements
The following requirements apply for any Kusama parachain that wishes to support cross-chain automation (including recurring payments, auto-compounding liquidity / staking rewards, automatic swaps, and more):

1. **Open bi-directional HRMP channels** - [HRMP Channels and You](https://github.com/OAK-Foundation/OAK-blockchain/wiki/HRMP-Channels-and-You)
2. **Enable users to authorize future transactions powered by OAK** using a proxy pallet and XCM origin converter.
    
    2a. [Proxy pallet implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/12)
    
    2b. [XCM converter implementation](https://github.com/OAK-Foundation/substrate-parachain-template/pull/14)
    
    2c. Get proxy accountId:
```    
curl --location --request POST 
'http:*//rpc.turing-staging.oak.tech' \*
--header 'Content-Type: application/json' \
--data-raw '{"id":1, "jsonrpc":"2.0", "method": 
"xcmpHandler_crossChainAccount", 
"params": ["{{accountId32}}"]}' \
```

## Application Requirements [Extrinsics]
### Fees

Up front payment is collected from the user’s account to schedule future task(s), including fees for a defined number of future occurrences. Fees for indefinitely recurring transactions may be paid at each occurrence. An RPC endpoint to retrieve the following Turing Network Fees will be delivered in October:

1. The Turing inclusion fee to store the future extrinsic(s).
2. The Turing execution fee when the future extrinsic(s) are triggered.
3. The XCM fee to communicate future extrinsic(s) to a foreign chain (if applicable).

[Let's discuss](https://calendly.com/oak-matt/price) paying fees in another token and adding you to the whitelist to create a new data stream.

### Define a new data stream (addAsset)

Creating a new data stream requires an initial value and the maximum amount of time that a tasks can remain open against this data stream. Examples include token values (fungible and non-fungible), network gas prices, or even account balance.

`asset` - a unique name for the data stream.

`targetPrice` - an integer representing the current value of the asset.
- The denominating currency and decimals are irrelevant as long as the same method is used for subsequent updates (i.e. multiply the value by factors of 10 until the asset’s significant value can be represented by an integer).

`expirationPeriod` - an integer representing the maximum amount of time (seconds) for a task to remain open.
- Minimum expiration period = 86,400 seconds (one day)
- Maximum expiration period = 2,592,000 seconds (30 days)
- Must be an even number of minutes (multiple of 60)

This example defines an asset with the name TUR:MGX with an initial value of 3:

![image](https://user-images.githubusercontent.com/104159482/188995942-1e7c8f37-0b22-48cb-a1ab-b4222f4d5399.png)

### Update an existing data stream (AssetPriceUpdate)

Only the account that created the data stream can update the stream with the (now-) current value:

`asset` - the unique name of the data stream to update (addAsset above).

`value` - an integer representing the (now-) current value of the asset.
- The denominating currency and decimals are irrelevant as long as the same method is used as previous updates (i.e. continue to multiply the value by the same factor of 10).

This example updates the asset named `TUR:MGX` with a new value of `2`:

![image](https://user-images.githubusercontent.com/104159482/189068826-3c244ea6-1325-40ad-b299-afe14dccf138.png)

### Schedule a task (scheduleTask)

Scheduling a future task enables your application and users to define trigger conditions that include a percentage change in a data stream’s value in either direction (up or down).

Any account on a connected parachain can authorize OAK to transact in the future. Proxy permissions can be included in the batch transaction to schedule the first task if it has not already been completed. (see Parachain Requirements above)

`providedID` - a unique identifier for this account’s task. A single account may schedule multiple tasks for a single data stream and single direction.

`asset` - the data stream’s name that can trigger the task’s execution.

`direction` - the direction (up or down) that will trigger the tasks’s execution. 

`triggerPercentage` - the percent change in the defined direction which will transaction to be communicated via XCM.
- Let’s discuss what level of granularity is needed to optimize for application’s UX.
- Tasks cannot be scheduled to trigger immediately.

`paraID` - the parachain identifier for the transaction’s execution instructions (see Parachain Requirements above)

`encodedExtrinsic` - a **proxied version of the batch call** containing the extrinsic(s) to execute the transaction on the specified (in the future).

### Schedule a Token Transfer
This API allows you to schedule transfering the provided token to another user.

Proxy permissions can be included in the batch transaction to schedule the first task if it has not already been completed. (see Parachain Requirements above)

`providedID` - a unique identifier for this account’s task. A single account may schedule multiple tasks for a single data stream and single direction.

`asset` - the data stream’s name that can trigger the task’s execution.

`direction` - the direction (up or down) that will trigger the tasks’s execution. 

`triggerPercentage` - the percent change in the defined direction when the transaction will be triggered on Turing Network.

`recipient` - where TUR will be sent.

`amount`- the amount of TUR that will sent from your account to the recipient account when the above conditions have been met (in the future).

This example agrees to send `10 TUR` to `MATT-TEST` when the value of `TUR:MGX` goes `up` by `10` percent:

![image](https://user-images.githubusercontent.com/104159482/189070001-a85e5299-d3d3-4cfc-a817-43ed6adc12e0.png)

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
Only the account that created the task can cancel the task:

`taskID` - a unique identifier for this account’s task. A single account may schedule multiple tasks for a single data stream and single direction.

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