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
 - `ScheduledTasksV3` - List of scheduled tasks.
 - `AccountTasks` - Record the tasks owned by each user.
 - `TaskQueueV2` -  A queue of tasks waiting to be executed.
 - `MissedQueueV2` - A queue of tasks that have not yet been executed.
 - `LastTimeSlot` - The last time slot to execute tasks.
 - `Shutdown` - Record whether to disable the function of this pallet.

#### Structs
 - `Action` - The enum that stores all action specific data.
    ```
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

 - `Schedule` - The enum stores the execution time and rules of the task.
    ```
    pub enum Schedule {
      Fixed { execution_times: Vec<UnixTime>, executions_left: u32 },
      Recurring { next_execution_time: UnixTime, frequency: Seconds },
    }
    ```

 - `Task` - Task structure
    ```
    pub struct Task<AccountId, Balance, CurrencyId> {
      pub owner_id: AccountId,
      pub provided_id: Vec<u8>,
      pub schedule: Schedule,
      pub action: Action<AccountId, Balance, CurrencyId>,
    }
    ```

#### Extrinsics Functions

 - `pub fn schedule_xcmp_task(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, para_id: ParaId, currency_id: T::CurrencyId, xcm_asset_location: VersionedMultiLocation, encoded_call: Vec<u8>, encoded_call_weight: Weight) -> DispatchResult` - Schedule a task through XCMP to fire an XCMP message with a provided call.

 - `pub fn schedule_xcmp_task_through_proxy(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, para_id: ParaId, currency_id: T::CurrencyId, xcm_asset_location: VersionedMultiLocation, encoded_call: Vec<u8>, encoded_call_weight: Weight, schedule_as: T::AccountId) -> DispatchResult` - Schedule a task through XCMP to fire an XCMP message with a provided call through proxy account.

 - `pub fn schedule_auto_compound_delegated_stake_task(origin: OriginFor<T>, execution_time: UnixTime, frequency: Seconds, collator_id: AccountOf<T>, account_minimum: BalanceOf<T>) -> DispatchResult` - Schedule a task to increase delegation to a specified up to a minimum balance.

 - `pub fn schedule_dynamic_dispatch_task(origin: OriginFor<T>, provided_id: Vec<u8>, schedule: ScheduleParam, call: Box<<T as Config>::Call>) -> DispatchResult` - Schedule a task that will dispatch a call.

 - `pub fn cancel_task(origin: OriginFor<T>, task_id: TaskId<T>) -> DispatchResult` - Tasks can only can be cancelled by their owners.

 - `pub fn force_cancel_task(origin: OriginFor<T>, owner_id: AccountOf<T>, task_id: TaskId<T>) -> DispatchResult` - Sudo can force cancel a task.
 
### Development Guideline

We can define some storage structure in Runtime Storage section, and write core pallet logic function in Extrinsics section.

When extrinsics function is executed successfully, the code can dispath some event defined in Runtime Events section to inform user.

When extrinsics occurs some error, the code can throw some error.

For example:

https://github.com/OAK-Foundation/OAK-blockchain/blob/master/pallets/automation-time/src/lib.rs#L622

We write codes to cancel a round.
1. Check origin permissions.
2. Get the user's task from AccountTasks storage.
3. Remove the task.
4. Dispatch a `TaskCancelled` event to inform user in remove_task function.

![code](../../assets/img/pallet-development/code.png)

For more information about the development of Substrate blockchain, please refer to [substrate.dev](https://substrate.dev/).
