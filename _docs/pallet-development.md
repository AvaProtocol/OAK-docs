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

Taking [quadratic-funding](https://github.com/OAK-Foundation/OAK-blockchain/tree/oak-testnet/pallets/quadratic-funding) as an example, the definitions is as follows:

#### Storages
 
 The Quadratic Funding pallet saves data in these fields.
 - `Projects` - List of participating projects.
 - `ProjectCount` - Number of projects submitted to a campaign.
 - `Rounds` -  List of the past and the current round of campaigns.
 - `RoundCount` - Total number of campaign including the past and the current.
 - `MaxGrantCountPerRound` - The maximum number of grants allowed in one campaign.
 - `WithdrawalExpiration` - The withdrawal expiration period in block number. If grant funds are not withdrawn within a long period of time the grant will expire and funds will be unfrozen for the pallet to re-use.
 - `IsIdentityRequired` - Whether on-chain identity of an address is required for functions. Currently this variable is only used by project creation. If turned on, the creator is required to have an on-chain identity for submission.


#### Structs
 - `Round` - Holds the data for each campaign. There is only one campaign can happen at any given time.
    ```
    pub struct Round<AccountId, Balance, BlockNumber> {
      start: BlockNumber,
      end: BlockNumber,
      matching_fund: Balance,
      grants: Vec<Grant<AccountId, Balance, BlockNumber>>,
      is_canceled: bool,
      is_finalized: bool,
    }
    ```

 - `Project` - An open source software program application submitted to a campaign
    ```
    pub struct Project<AccountId> {
      name: Vec<u8>,
      logo: Vec<u8>,
      description: Vec<u8>,
      website: Vec<u8>,
      owner: AccountId,
    }
    ```

 - `Grant` - When admitted into a campaign, a project becomes a grant which allows users to contribute funds to.
    ```
    pub struct Grant<AccountId, Balance, BlockNumber> {
      project_index: ProjectIndex,
      contributions: Vec<Contribution<AccountId, Balance>>,
      is_approved: bool,
      is_canceled: bool,
      is_withdrawn: bool,
      withdrawal_expiration: BlockNumber,
      matching_fund: Balance,
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

 - `pub fn create_project(origin, name: Vec<u8>, logo: Vec<u8>, description: Vec<u8>, website: Vec<u8>)` - Create a project by a developer.

 - `pub fn fund(origin, fund_balance: BalanceOf<T>)` - Donate to the QF pallet account, usually called by the committee but can be called by any one. Tokens donated via this method will be part of the matching fund. Regular users should call contribute() instead of this method.

 - `pub fn schedule_round(origin, start: T::BlockNumber, end: T::BlockNumber, matching_fund: BalanceOf<T>, project_indexes: Vec<ProjectIndex>)` - Schedule a round of campaign by the committee. The method will decide what projects are included as grant projects.

 - `pub fn cancel_round(origin, round_index: RoundIndex)` - Cancel a whole round of campaign.

 - `pub fn finalize_round(origin, round_index: RoundIndex)` - Finalize a round by the committee. When called, the function calculate matching funds for each grant project.

 - `pub fn contribute(origin, project_index: ProjectIndex, value: BalanceOf<T>)` - Contribute to a grant project during a campaign, called by users.

 - `pub fn approve(origin, round_index: RoundIndex, project_index: ProjectIndex)` - Make allocated grant funds available for the developer team to withdraw, called by the committee. The method allows for fund dispensing upon milestone delivery. For example, 300 DOTs were allocated to a team's funding during campaign finalization, and the committee can approve 100 DOTs after the first month, and 100 DOTs every month after. 

 - `pub fn cancel(origin, round_index: RoundIndex, project_index: ProjectIndex)` - Cancel a project by the committee, usually due to the reason that the project is found at foul play or withdrawal. This method can be called after the campaign start block and before campaign finalization. When this method is called, no more contribution could be made and the previous contribution from users will be returned. When cancelled, the grant project will receive no matching fund during finalization.
 
 - `pub fn set_max_grant_count_per_round(origin, max_round_grants: u32)` - Set the maximum allowed number of grants in one round. The method is not expected to be called frequently since the default value of 60 should be sufficient.

 - `pub fn set_withdrawal_expiration(origin, withdrawal_period: T::BlockNumber)` - Set withdrawal expiration in block number. After approved, if the funds is not withdrawn by the developer team within a certain number of blocks, the approval will be undone and the funds will return to the pallet address for reuse. This is to make sure funds approved is not locked for good and the developer team deliver the milestones within the planned duration.

 - `pub fn withdraw(origin, round_index: RoundIndex, project_index: ProjectIndex)` - Withdraw approved funds by the developer team. 

 - `pub fn set_is_identity_required(origin, is_identity_needed: bool)` - Set whether an on-chain identity is required for project submission, called by the commitee.

 #### Genesis Config

Genesis config is defined in node/src/chain_spec.rs. The default values of the genesis config are:

- `init_max_grant_count_per_round: 60`
    The maximum number of grants in one campaign. 

- `init_withdrawal_expiration: 1000`
    The withdrawal expiration period in block number.

- `init_is_identity_required: false`
    Whether on-chain identity of an address is required for functions.

### Development Guideline

We can define some storage structure in Runtime Storage section, and write core pallet logic function in Extrinsics section.

When extrinsics function is executed successfully, the code can dispath some event defined in Runtime Events section to inform user.

When extrinsics occurs some error, the code can throw some error.

For example:

https://github.com/OAK-Foundation/OAK-blockchain/blob/1c0bedd4632397e3f06ce2c10a58b244b96db588/pallets/quadratic-funding/src/lib.rs#L305

We write codes to cancel a round.
1. We read round struture from Rounds storage by round_index.
1. Set round.is_cancel to true.
1. Save round back to storage.
1. Dispatch a event to inform user.

![code](../../assets/img/pallet-development/code.jpg)

For more information about the development of Substrate blockchain, please refer to [substrate.dev](https://substrate.dev/).
