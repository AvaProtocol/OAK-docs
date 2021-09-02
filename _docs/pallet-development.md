---
title: Pallet Development
subtitle: This document explains the pallet development
author: charles
tags: [develop]
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

### Substrate Pallet's code structure

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
### Development Guideline

We can define some storage structure in Runtime Storage section, and write core pallet logic function in Extrinsics section.

When extrinsics function is executed successfully, the code can dispath some event defined in Runtime Events section to inform user.

When extrinsics occurs some error, the code can throw some error.

For example:

https://github.com/OAK-Foundation/OAK-blockchain/blob/1c0bedd4632397e3f06ce2c10a58b244b96db588/pallets/quadratic-funding/src/lib.rs#L222

We write codes to cancel a round.
1. We read round struture from Rounds storage by round_index.
1. Set round.is_cancel to true.
1. Save round back to storage.
1. Dispatch a event to inform user.

![code](../../assets/img/pallet-development/code.jpg)

For more information about the development of Substrate blockchain, please refer to [substrate.dev](https://substrate.dev/).
