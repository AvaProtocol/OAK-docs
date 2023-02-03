---
title: Benchmarking
subtitle: This document covers the benchmarking, the performance testing procedure for pallet development
author: charles
tags: [develop]
date: 2021-08-31
---

In this section, we’re going to explain the concept of benchmarking during Substrate pallet development. When referred to, “benchmarking” in this article means to establish a standard for runtime performance in particular. 

The first question is, __what is benchmarking?__ For short, in order to achieve a certain block time, for example 6 seconds per block, there is a limited number of lines of code can be run during that time frame. When writing a pallet function, the developer is responsible for calculating its computational complexity, which is called weight in Parity. The process of determining that complexity, or simply put, time cost is called benchmarking.

### What is “weight” and its usage?

The resources available on a blockchain are limited. They include memory, storage I/O, computation, transaction/block size, and the size of the state database. Therefore, the chain needs to manage the occupation of resources smartly and prevent any components on a chain from consuming too much resources.

The weight is the unit used for the chain to manage the time cost. For example, the total weight of all functions are what it takes to verify one block. Generally speaking, it is used to limit storage I/O and computation.

The end users, the heavier the weight, the more gas fee to be paid. When a transaction, or particularly a function call, needs to consume more I/O and computation resource, more transaction fees need to be paid.

For more information about how transaction fees are related to “weights”, please refer to [Transaction Fees in Substrate.dev](https://substrate.dev/docs/en/knowledgebase/runtime/fees).

### How to calculate the “weight”?

This article takes our Open Grant project, quadratic-funding-pallet as an example to explain the process of weight determination.

repo: <https://github.com/OAK-Foundation/quadratic-funding-pallet>

1. __Complete pallet dev code__

	Note that the benchmarking process should happen after all functionalities are developed and tested, so make sure the dev code is in lockdown first.

1. __Write a benchmarking.rs for pallet__
	
	The purpose of the benchmark.rs file is to generate performance test cases programmably, with the flexibility of updating test logic in accordance with dev code change.

	For example, there’s a array query code in our function and we need to determine the weight for it. Using binary search for the query will add O(log2n) time, where n is the size of the array. In this case, the benchmarking.rs file and the CLI running it will take care of the weight calculation of the binary search and add the O(log2n) time programmably, so we don’t need to calculate every detail manually.

	Below we show some example code. Our quadratic funding pallet has a schedule_round function. We will write a benchmarking.rs file for it. The format of the file goes like this:

	![benchmarks](../../assets/img/benchmarking/benchmarks.png)

	The benchmarking.rs starts with a benchmarks! macro, and the majority of logic is in the function body. The last block, verifying final state is optional.

	Take the [benchmarking.rs file of quadratic-funding](https://github.com/OAK-Foundation/quadratic-funding-pallet/blob/add_weights/pallets/quadratic-funding/src/benchmarking.rs) as an example:

	![schedule_round](../../assets/img/benchmarking/schedule_round.png)

	You can see that inside the first bracket resides the code to set the initialization state.

	For example, in this loop we create a number of projects to simulate the data in real scenario.

	![project_indexs](../../assets/img/benchmarking/project_indexs.png)

	In the end of above code snippet, _(RawOrigin::Root, 100u32.into(), 200u32.into(), 10u32.into(), project_indexes) is a benchmarks! macro, which will run the actual dev code schedule_round().

1. __Configure the benchmarking CLI__
   
	After we write the benchmarking.rs file, we need to configure for the benchmarking CLI to run.

	3.1 Add frame-benchmarking crate and runtime-benchmarks feature in cargo.toml of pallet.

	![dependencies](../../assets/img/benchmarking/dependencies.png)

	3.2 Configure pallet benchmarking in runtime
	
	3.2.1. Include runtime-benchmarking features in cargo.toml

	![runtime-benchmarks](../../assets/img/benchmarking/runtime-benchmarks.png)

	3.2.2. Configure pallet benchmarking in runtime.rs

	![add_benchmark](../../assets/img/benchmarking/add_benchmark.png)

1. __Run the CLI to generate a weights.rs file__
   
	4.1 Compile the CLI code

	```
	cargo build --release --features runtime-benchmarks
	```

	4.2 Run the benchmarking command
	
	```
	./target/release/oak-testnet benchmark --chain=oak-testnet --steps=50 --repeat=20 --pallet=pallet_quadratic_funding --extrinsic=’*’ --execution=wasm --wasm-execution=compiled --heap-pages=4096 --output=pallets/quadratic-funding/src/weights.rs --template=./.maintain/frame-weight-template.hbs
	```

	Note: — template=./.maintain/frame-weight-template.hbs is a generated template that specifies a weights.rs, here I directly used [frame-weight-template file in the Substrate repo](https://github.com/paritytech/substrate/blob/master/.maintain/frame-weight-template.hbs).

	The weights.rs file is generated by the command.  

1. __Add a weight tag to the function of the pallet__
		
	5.1 In the pallet’s lib.rs file, we need to adding function weights by with the following code.

	```
	#[cfg(feature = “runtime-benchmarks”)]
	mod benchmarking;
	pub mod weights;
	```

	5.2 Add a weight tag to a pallet function

	![tag](../../assets/img/benchmarking/tag.png)

	The WeightInfo::schedule_round parameter needs an input as the max value for the “s” variable of schedule_round in benchmarking.rs file, setting upper limit of the weight of that function.

	And you are all set! An accurate benchmarking is required for Substrate code contribution. We hope that this tutorial explain the benchmarking concept and help developers during the Substrate programming.

### Reference
What Is Runtime Benchmarking?  
<https://substrate.dev/docs/en/knowledgebase/runtime/benchmarking>

Transaction fees and weights  
<https://substrate.dev/docs/en/knowledgebase/runtime/fees>
