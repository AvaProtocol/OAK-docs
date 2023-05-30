---
title: Pallet Development
subtitle: This document explains the procedures of pallet development with an example
author: charles
tags: [develop]
date: 2021-08-31
---

## Pallet Development
OAK blockchain is a blockchain developed based on substrate.
### Substrate

Substrate is a modular framework that enables you to create purpose-built blockchains by composing custom or pre-built components.

Home page: https://substrate.dev/

Github: https://github.com/paritytech/substrate
### Pallet

Pallet is functional module in substate. 

Substrate runtime engineers can define custom logic for their blockchain by writing their own pallets and encapsulating their blockchains desired functionality
### Substrate Node Template

We can study to develop a substrate based blockchain with Substrate Node Template.

https://github.com/substrate-developer-hub/substrate-node-template

Your can checkout the source code by the command below.
```
git clone -b latest --depth 1 https://github.com/substrate-developer-hub/substrate-node-template
```

The Substrate Node Template provides a minimal working runtime which you can use to quickly get started building your own custom blockchain. 

The Substrate Developer Hub Node Template, which is used as the starting point for this tutorial, has a FRAME-based runtime. FRAME is a library of code that allows you to build a Substrate runtime by composing modules called "pallets". 
### Directory Files

Open the Node Template in your favorite code editor. A pallet file structure likes this: 

```
substrate-node-template
|
+-- node
|
+-- pallets
|   |
|   +-- template
|       |
|       +-- Cargo.toml     <-- Pallet crate file
|       |
|       +-- src
|           |
|           +-- lib.rs     <-- Pallet contents
|           |
|           +-- mock.rs    <-- Test mock
|           |
|           +-- tests.rs   <-- Tests
|
+-- runtime
|
+-- scripts
|
+-- ...

```

### Code Framework

Open the file pallets/template/src/lib.rs.

A pallet is commonly composed of 7 sections:
```
// 1. Imports and Dependencies
pub use pallet::*;
#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;
}

// 2. Declaration of the Pallet type 
// This is a placeholder to implement traits and methods.
#[pallet::pallet]
#[pallet::generate_store(pub(super) trait Store)]
pub struct Pallet<T>(PhantomData<T>);

// 3. Runtime Configuration Trait
// All types and constants go here. 
// Use #[pallet::constant] and #[pallet::extra_constants] 
// to pass in values to metadata.
#[pallet::config]
pub trait Config: frame_system::Config { ... }

// 4. Runtime Storage
// Use to declare storage items.
#[pallet::storage]
#[pallet::getter(fn something)]
pub type MyStorage<T: Config> = StorageValue<_, u32>;

// 5. Runtime Events
// Can stringify event types to metadata.
#[pallet::event]
#[pallet::metadata(T::AccountId = "AccountId")]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> { ... }

// 6. Hooks
// Define some logic that should be executed
// regularly in some context, for e.g. on_initialize.
#[pallet::hooks]
impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> { ... }

// 7. Extrinsics
// Functions that are callable from outside the runtime.
#[pallet::call]
impl<T:Config> Pallet<T> { ... }
```

Taking [pallet-automation-time](https://github.com/OAK-Foundation/OAK-blockchain/tree/master/pallets/automation-time) as an example, the definitions is as follows:

#### Storages
 
 The Automation Time pallet saves data in these fields.
 - `ScheduledTasksV3` - List of participating projects.
 - `AccountTasks` - Number of projects submitted to a campaign.
 - `TaskQueueV2` -  List of the past and the current round of campaigns.
 - `MissedQueueV2` - Total number of campaign including the past and the current.
 - `LastTimeSlot` - The maximum number of grants allowed in one campaign.
 - `Shutdown` - The withdrawal expiration period in block number. If grant funds are not withdrawn within a long period of time the grant will expire and funds will be unfrozen for the pallet to re-use.

#### Structs
 - `Action` - Holds the data for each campaign. There is only one campaign can happen at any given time.
    ```
    /// The enum that stores all action specific data.
    #[derive(Clone, Debug, Eq, PartialEq, Encode, Decode, TypeInfo)]
    pub enum Action<AccountId, Balance, CurrencyId> {
      Notify {
        message: Vec<u8>,
      },
      NativeTransfer {
        sender: AccountId,
        recipient: AccountId,
        amount: Balance,
      },
      XCMP {
        para_id: ParaId,
        currency_id: CurrencyId,
        xcm_asset_location: VersionedMultiLocation,
        encoded_call: Vec<u8>,
        encoded_call_weight: Weight,
        schedule_as: Option<AccountId>,
      },
      AutoCompoundDelegatedStake {
        delegator: AccountId,
        collator: AccountId,
        account_minimum: Balance,
      },
      DynamicDispatch {
        encoded_call: Vec<u8>,
      },
    }
    ```

 - `Schedule` - An open source software program application submitted to a campaign
    ```
    pub enum Schedule {
      Fixed { execution_times: Vec<UnixTime>, executions_left: u32 },
      Recurring { next_execution_time: UnixTime, frequency: Seconds },
    }
    ```

 - `Task` - When admitted into a campaign, a project becomes a grant which allows users to contribute funds to.
    ```
    pub struct Task<AccountId, Balance, CurrencyId> {
      pub owner_id: AccountId,
      pub provided_id: Vec<u8>,
      pub schedule: Schedule,
      pub action: Action<AccountId, Balance, CurrencyId>,
    }
    ```

 - `Contribution` - The contribution users made to a grant project.
    ```
    pub struct Contribution<AccountId, Balance> {
      account_id: AccountId,
      value: Balance,
    }
    ```


#### Extrinsics Functions

- `schedule_notify_task(origin: OriginFor<T>, provided_id: Vec<u8>, execution_times: Vec<UnixTime>, message: Vec<u8>) -> DispatchResult` - Create a project by a developer.

 - `pub fn schedule_native_transfer_task(origin: OriginFor<T>, provided_id: Vec<u8>, execution_times: Vec<UnixTime>, recipient_id: AccountOf<T>, #[pallet::compact] amount: BalanceOf<T>) -> DispatchResult` - Create a project by a developer.

 - `pub fn schedule_xcmp_task(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, para_id: ParaId, currency_id: T::CurrencyId, xcm_asset_location: VersionedMultiLocation, encoded_call: Vec<u8>, encoded_call_weight: Weight) -> DispatchResult` - Donate to the QF pallet account, usually called by the committee but can be called by any one. Tokens donated via this method will be part of the matching fund. Regular users should call contribute() instead of this method.

 - `pub fn schedule_xcmp_task_through_proxy(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, para_id: ParaId, currency_id: T::CurrencyId, xcm_asset_location: VersionedMultiLocation, encoded_call: Vec<u8>, encoded_call_weight: Weight, schedule_as: T::AccountId) -> DispatchResult` - Schedule a round of campaign by the committee. The method will decide what projects are included as grant projects.

 - `pub fn schedule_auto_compound_delegated_stake_task(origin: OriginFor<T>, execution_time: UnixTime, frequency: Seconds, collator_id: AccountOf<T>, account_minimum: BalanceOf<T>) -> DispatchResult` - Cancel a whole round of campaign.

 - `pub fn schedule_dynamic_dispatch_task(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, call: Box<<T as Config>::Call>) -> DispatchResult` - Finalize a round by the committee. When called, the function calculate matching funds for each grant project.

 - `pub fn cancel_task(origin: OriginFor<T>, task_id: TaskId<T>) -> DispatchResult` - Contribute to a grant project during a campaign, called by users.

 - `pub fn force_cancel_task(origin: OriginFor<T>, owner_id: AccountOf<T>, task_id: TaskId<T>) -> DispatchResult` - Make allocated grant funds available for the developer team to withdraw, called by the committee. The method allows for fund dispensing upon milestone delivery. For example, 300 DOTs were allocated to a team's funding during campaign finalization, and the committee can approve 100 DOTs after the first month, and 100 DOTs every month after. 

 - `pub fn cancel(origin, round_index: RoundIndex, project_index: ProjectIndex) -> DispatchResult` - Cancel a project by the committee, usually due to the reason that the project is found at foul play or withdrawal. This method can be called after the campaign start block and before campaign finalization. When this method is called, no more contribution could be made and the previous contribution from users will be returned. When cancelled, the grant project will receive no matching fund during finalization.
 
### Development Guideline

We can define some storage structure in Runtime Storage section, and write core pallet logic function in Extrinsics section.

When extrinsics function is executed successfully, the code can dispath some event defined in Runtime Events section to inform user.

When extrinsics occurs some error, the code can throw some error.

For example:

https://github.com/OAK-Foundation/OAK-blockchain/blob/master/pallets/automation-time/src/lib.rs#L622

We write codes to cancel a round.
1. We read round struture from Rounds storage by round_index.
1. Set round.is_cancel to true.
1. Save round back to storage.
1. Dispatch a event to inform user.

![code](../../assets/img/pallet-development/code.jpg)

For more information about the development of Substrate blockchain, please refer to [substrate.dev](https://substrate.dev/).
